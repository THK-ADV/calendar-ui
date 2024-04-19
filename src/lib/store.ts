import { derived, writable, type Readable, type Writable } from 'svelte/store'
import type { ChoiceOption, GlobalFilter, ScheduleEvent } from './types'
import { filterScheduleEvents, scheduleEventToFullCalendarEvent } from './utils'

// Reference data (soon to be) requested by API
export const teachningUnits: Writable<Array<ChoiceOption>> = writable([])
export const studyPrograms: Writable<Array<ChoiceOption>> = writable([])
export const pos: Writable<Array<ChoiceOption>> = writable([])
export const semesters: Writable<Array<ChoiceOption>> = writable([])
export const modules: Writable<Array<ChoiceOption>> = writable([])
export const dozenten: Writable<Array<ChoiceOption>> = writable([])
export const rooms: Writable<Array<ChoiceOption>> = writable([])

// Events from data sources
export const scheduleEvents: Writable<Array<ScheduleEvent>> = writable([])

// Filters
export const lehreinheitFilter: Writable<ChoiceOption | undefined> = writable()
export const studyProgramFilter: Writable<ChoiceOption | undefined> = writable()
export const poFilter: Writable<ChoiceOption | undefined> = writable()
export const semesterFilter: Writable<ChoiceOption | undefined> = writable()
export const moduleFilter: Writable<ChoiceOption | undefined> = writable()
export const dozentenFilter: Writable<ChoiceOption | undefined> = writable()
export const roomFilter: Writable<ChoiceOption | undefined> = writable()

export const filters: Readable<GlobalFilter> = derived(
  [
    lehreinheitFilter,
    studyProgramFilter,
    poFilter,
    semesterFilter,
    moduleFilter,
    dozentenFilter,
    roomFilter
  ],
  ([
    $lehreinheitFilter,
    $studyProgramFilter,
    $poFilter,
    $semesterFilter,
    $moduleFilter,
    $dozentenFilter,
    $roomFilter
  ]) => ({
    lehreinheitFilter: $lehreinheitFilter,
    studyProgramFilter: $studyProgramFilter,
    poFilter: $poFilter,
    semesterFilter: $semesterFilter,
    moduleFilter: $moduleFilter,
    dozentenFilter: $dozentenFilter,
    roomFilter: $roomFilter,
  })
)

export const events = derived([scheduleEvents, filters], ([$scheduleEvents, $filters]) => {
  const filteredScheduleEvents = filterScheduleEvents($scheduleEvents, $filters).map(scheduleEventToFullCalendarEvent);
  return filteredScheduleEvents
})
