<script lang="ts">
  import type { CalendarOptions } from "svelte-fullcalendar"
  import FullCalendar from "svelte-fullcalendar"
  import deLocale from "@fullcalendar/core/locales/de"
  import timeGridPlugin from "@fullcalendar/timegrid"
  import dayGridPlugin from "@fullcalendar/daygrid"
  import interactionPlugin from "@fullcalendar/interaction"

  export let options: CalendarOptions

  let baseOptions: CalendarOptions = {
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
    ...options
  }
  let calendarOptions = { ...baseOptions, ...options }
  $: calendarOptions = { ...baseOptions, ...options }
</script>

<FullCalendar style="width: 100%" options={calendarOptions} />
