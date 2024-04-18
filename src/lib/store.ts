import { derived, writable, type Readable, type Writable } from 'svelte/store'
import type { ChoiceOption, ScheduleEvent } from './types'
import { scheduleEventToFullCalendarEvent } from './utils'

type GlobalFilter = {
  lehreinheitFilter?: ChoiceOption,
  studyProgramFilter?: ChoiceOption,
  poFilter?: ChoiceOption,
  semesterFilter?: ChoiceOption,
  moduleFilter?: ChoiceOption,
  dozentenFilter?: ChoiceOption,
  roomFilter?: ChoiceOption,
}

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
  return $scheduleEvents.filter((event: ScheduleEvent) => {
    // ToDo: Include further filters in filter logic
    // Mein Kopf schafft das heute nicht mehr. Wenn du magst @Alex ... :)
    const usesModuleFilter = $filters.moduleFilter?.value != undefined;
    const matchesModuleFilter = event.module.id === $filters.moduleFilter?.value
    if($filters.moduleFilter) console.log(event.module.id, $filters.moduleFilter)
    if(usesModuleFilter && matchesModuleFilter) return true;
    if(!usesModuleFilter) return true;
    return false;
  }).map(scheduleEventToFullCalendarEvent)
})
