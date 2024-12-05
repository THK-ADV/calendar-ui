<script lang="ts">
  import FullCalendar, {
    type DatesSetArg,
    type EventClickArg,
    type EventContentArg,
    type EventInput
  } from "svelte-fullcalendar"
  import timeGridPlugin from "@fullcalendar/timegrid"
  import dayGridPlugin from "@fullcalendar/daygrid"
  import interactionPlugin from "@fullcalendar/interaction"
  import deLocale from "@fullcalendar/core/locales/de"
  import {
    createDateRange,
    createHolidays,
    createSemesterPlan,
    eventSourceList,
    filter,
    scheduleEvents
  } from "$lib/store.svelte"
  import {
    holidaysToFullCalendarEvent,
    scheduleEventToFullCalendarEvent,
    semesterPlanToFullCalendarEvent
  } from "$lib/utils"
  import type { CalendarOptions } from "@fullcalendar/core"

  const dateRange = createDateRange()
  const holidays = createHolidays()
  const semesterPlan = createSemesterPlan()

  const scheduleEventRenderer = (arg: EventContentArg) => {
    if (arg.event.allDay) {
      return {
        html: `<div title="${arg.event.title}" style="display: flex; flex-direction: column; margin: 1em; gap: 1em; overflow: hidden">${arg.event.title}</div>`
      }
    }

    if (arg.view.type === "timeGridWeek" || arg.view.type === "timeGridDay") {
      return {
        html: `
    <div title="${arg.event.title}" style="display: flex; flex-direction: column; height: 100%; padding: 1em; gap: 1em; overflow: hidden;">
      <span style="font-weight: 600; display: flex; align-items: center; flex-direction: row; gap: .5em;"><img title="${arg.event.extendedProps.lecturer?.name}" style="height: 20px; width: 20px; border-radius: 300px;" src="${arg.event.extendedProps.lecturer?.img ? arg.event.extendedProps.lecturer?.img : ""}" alt="lecturer">${arg.event.extendedProps.abbrev} (${arg.event.extendedProps.courseType})</span>
      <div style="display: flex; flex-direction: column;">
        <span style="display: flex; flex-direction: row; align-items: center; gap: .5em;"><span class="material-icons" style="font-size: 1.5em;">room</span>${arg.event.extendedProps.location?.identifier}</span>
        <span style="display: flex; flex-direction: row; align-items: start; gap: .5em;"><span class="material-icons" style="font-size: 1.5em;">person</span>${arg.event.extendedProps.lecturer?.name}</span>
      </div>
    </div>
  `
      }
    }

    if (arg.view.type === "dayGridMonth") {
      return {
        html: `
  <div title="${arg.event.title}" style="display: flex; flex-direction: row; margin: 1em; gap: 1em; overflow: hidden; width: 100%;">
    <img style="height: 20px; border-radius: 300px;" src="${arg.event.extendedProps.lecturer?.img ? arg.event.extendedProps.lecturer?.img : ""}" alt="lecturer">
    <span style="font-weight: 600; display: flex; align-items: center; flex-direction: row; gap: .5em;">${arg.event.extendedProps.abbrev} (${arg.event.extendedProps.courseType})</span>
    <span style="flex-grow: 1; display: flex; align-items: center; justify-content: center;"><hr style="width: 100%; background-color: #00000022; border: none; height: 1px;"></span>
    <span style="display: flex; flex-direction: row; align-items: center; gap: .5em;"><span class="material-icons" style="font-size: 1.8em;">room</span>${arg.event.extendedProps.location?.identifier}</span>
  </div>
  `
      }
    }
    return ""
  }

  const onEventClick = (arg: EventClickArg) => {
    if (!("type" in arg.event.extendedProps)) {
      return
    }
    if (arg.event.extendedProps.type === "schedule") {
      scheduleEvents.select(arg.event.id)
    }
  }

  const onDateRangeChange = (arg: DatesSetArg) => {
    dateRange.update(arg.start, arg.end)
  }

  $effect(() => {
    const { from, to } = dateRange.value
    scheduleEvents.fetch(from, to)
  })

  $effect(() => {
    const years = dateRange.visibleYears
    holidays.fetch(years)
    semesterPlan.fetch(years)
  })

  let options: CalendarOptions = $derived.by(() => {
    let events: EventInput[] = []
    if (eventSourceList.isScheduleSelected) {
      const selectedTu = filter.selectedTeachingUnit
      const selectedSp = filter.selectedStudyProgram
      const selectedSe = filter.selectedSemester
      const selectedMod = filter.selectedModule
      const selectedLec = filter.selectedLecturer
      const selectedR = filter.selectedRoom

      for (const e of scheduleEvents.value) {
        const matchesTeachingUnit =
          selectedTu === undefined ||
          e.studyProgram.some(
            ({ teachingUnitId }) => teachingUnitId === selectedTu.value
          )
        let matchesStudyProgram = false
        if (selectedSp && selectedSe) {
          matchesStudyProgram = e.studyProgram.some(
            ({ id, recommendedSemester }) =>
              id === selectedSp.value &&
              recommendedSemester.includes(parseInt(selectedSe.value, 10))
          )
        } else if (selectedSp && !selectedSe) {
          matchesStudyProgram = e.studyProgram.some(
            ({ id }) => id === selectedSp.value
          )
        } else if (!selectedSp && selectedSe) {
          matchesStudyProgram = e.studyProgram.some(({ recommendedSemester }) =>
            recommendedSemester.includes(parseInt(selectedSe.value, 10))
          )
        } else if (!selectedSp && !selectedSe) {
          matchesStudyProgram = true
        }
        const matchesModule =
          selectedMod === undefined || e.module.id === selectedMod.value
        const matchesSupervisor =
          selectedLec === undefined ||
          e.supervisor.some(({ id }) => id === selectedLec.value)
        const matchesRoom =
          selectedR === undefined ||
          e.rooms.some(({ id }) => id === selectedR.value)

        if (
          matchesStudyProgram &&
          matchesTeachingUnit &&
          matchesModule &&
          matchesSupervisor &&
          matchesRoom
        ) {
          events.push(scheduleEventToFullCalendarEvent(e))
        }
      }
    }
    if (eventSourceList.isHolidaysSelected) {
      for (const holiday of holidays.value) {
        events.push(holidaysToFullCalendarEvent(holiday))
      }
    }
    if (eventSourceList.isSemesterPlanSelected) {
      const selectedTu = filter.selectedTeachingUnit
      const selectedSe = filter.selectedSemester
      for (const entry of semesterPlan.value) {
        if (selectedTu && entry.teachingUnit === selectedTu.value) {
          if (!entry.semester.index) {
            events.push(
              semesterPlanToFullCalendarEvent(entry, selectedSe?.value)
            )
          } else if (!selectedSe) {
            events.push(semesterPlanToFullCalendarEvent(entry))
          } else {
            if (
              selectedSe &&
              entry.semester.index &&
              entry.semester.index.includes(selectedSe.value)
            ) {
              events.push(
                semesterPlanToFullCalendarEvent(entry, selectedSe.value)
              )
            }
          }
        }
      }
    }

    return {
      events,
      eventContent: scheduleEventRenderer,
      datesSet: onDateRangeChange,
      eventClick: onEventClick,
      weekNumbers: true,
      allDayText: "All-day",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
      },
      initialView: "timeGridWeek",
      plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
      height: "100%",
      handleWindowResize: true,
      firstDay: 1,
      fixedWeekCount: false,
      slotEventOverlap: false,
      locale: deLocale,
      slotMinTime: "07:00:00",
      slotMaxTime: "24:00:00",
      slotDuration: "00:15:00",
      slotLabelInterval: { hours: 1 },
      scrollTime: "08:00:00",
      allDaySlot: true,
      hiddenDays: [0],
      expandRows: true,
      nowIndicator: true,
      selectable: true,
      dayMaxEvents: 5,
      views: {
        timeGridSixDays: {
          type: "timeGrid",
          duration: { days: 6 },
          buttonText: "6 day"
        },
        timeGridOneDays: {
          type: "timeGrid",
          duration: { days: 1 },
          buttonText: "1 day"
        }
      },
      weekends: false
    }
  })
</script>

<FullCalendar style="width: 100%" {options} />
