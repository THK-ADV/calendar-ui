import { type EventInput } from "svelte-fullcalendar"
import type {
  Holiday,
  Person,
  Room,
  ScheduleEvent,
  SemesterPlan,
  StudyProgram
} from "./types"
import { _ } from "svelte-i18n"
import { get } from "svelte/store"

export type EventType = "schedule" | "semesterPlan" | "holiday"

export function buildRoomsLabel(rooms: Array<Room>): string {
  return rooms.map((room) => room.identifier).join(", ")
}

export function buildLecturerLabel(lecturer: Person): string {
  return `${lecturer.firstname} ${lecturer.lastname}`
}

export function buildLecturersLabel(lecturers: Array<Person>): string {
  return lecturers.map(buildLecturerLabel).join(", ")
}

export function buildStudyProgramLabel(studyProgram: StudyProgram): string {
  const degreePart = studyProgram.degree ? `${studyProgram.degree.label} ` : ""
  const studyProgramLabel = studyProgram.label
  const specializationPart = studyProgram.specialization
    ? ` - ${studyProgram.specialization.label}`
    : ""
  const poPart = ` (PO${studyProgram.poNumber})`
  return degreePart + studyProgramLabel + specializationPart + poPart
}

export function scheduleEventToFullCalendarEvent(
  scheduleEvent: ScheduleEvent
): EventInput {
  const supervisor = scheduleEvent.supervisor[0]
  return {
    id: scheduleEvent.id,
    title: scheduleEvent.module.label,
    start: scheduleEvent.start,
    end: scheduleEvent.end,
    extendedProps: {
      type: "schedule",
      courseType: scheduleEvent.courseLabel[0],
      abbrev: scheduleEvent.module.abbrev,
      lecturer: {
        name: `${supervisor.firstname} ${supervisor.lastname}`,
        img: `https://ui-avatars.com/api/?name=${supervisor.firstname}+${supervisor.lastname}`
      },
      location: {
        name: buildRoomsLabel(scheduleEvent.rooms),
        identifier: buildRoomsLabel(scheduleEvent.rooms)
      }
    }
  }
}

export function holidaysToFullCalendarEvent(holidayEvent: Holiday): EventInput {
  return {
    id: holidayEvent.label + holidayEvent.date,
    title: holidayEvent.label,
    start: holidayEvent.date,
    allDay: true,
    backgroundColor: "#FF55AA",
    extendedProps: {
      type: "holiday"
    }
  }
}

export function semesterPlanToFullCalendarEvent(
  semesterPlan: SemesterPlan,
  selectedSemester?: string
): EventInput {
  const semesterLabel = get(_)("semester")
  const title =
    semesterPlan.semester.index && !selectedSemester
      ? `${semesterPlan.type.label} (${semesterLabel} ${semesterPlan.semester.index.replaceAll(",", ", ")})`
      : semesterPlan.type.label
  return {
    id: semesterPlan.id,
    title,
    start: semesterPlan.start,
    end: semesterPlan.end,
    allDay: true,
    backgroundColor: "#FFCCAA",
    extendedProps: {
      type: "semesterPlan"
    }
  }
}
