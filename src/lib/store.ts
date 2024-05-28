import { derived, get, type Readable, writable, type Writable } from 'svelte/store';
import {
  type ChoiceOption,
  DataSources,
  type DateRange,
  type GlobalFilter,
  type Module,
  type Person,
  type Room,
  type ScheduleEvent,
  type Semester,
  type StudyProgram,
  type TeachingUnit
} from './types';
import {
  filterModules,
  filterScheduleEvents,
  moduleToChoiceOption,
  personToChoiceOption,
  roomToChoiceOption,
  scheduleEventToFullCalendarEvent,
  semesterToChoiceOption,
  studyProgramToChoiceOption,
  teachingUnitToChoiceOption
} from './utils';

// Reference data (soon to be) requested by API
export const teachningUnits: Writable<Array<TeachingUnit>> = writable([]);
export const studyPrograms: Writable<Array<StudyProgram>> = writable([]);
export const semesters: Writable<Array<Semester>> = writable([]);
export const modules: Writable<Array<Module>> = writable([]);
export const dozenten: Writable<Array<Person>> = writable([]);
export const rooms: Writable<Array<Room>> = writable([]);

export const teachinUnitsAsChoiceOptions = derived([teachningUnits], ([$teachningUnits]) =>
  $teachningUnits.map(teachingUnitToChoiceOption)
);
export const studyProgramsAsChoiceOptions = derived([studyPrograms], ([$studyPrograms]) =>
  $studyPrograms.map(studyProgramToChoiceOption)
);
export const semestersAsChoiceOptions = derived([semesters], ([$semesters]) =>
  $semesters.map(semesterToChoiceOption)
);
export const modulesAsChoiceOptions = derived([modules], ([$modules]) =>
  $modules.map(moduleToChoiceOption)
);
export const dozentenAsChoiceOptions = derived([dozenten], ([$dozenten]) =>
  $dozenten.filter((person) => person.kind === 'person').map(personToChoiceOption)
);
export const roomsAsChoiceOptions = derived([rooms], ([$rooms]) => $rooms.map(roomToChoiceOption));

// Filters

export const selectedTeachingUnit: Writable<ChoiceOption | undefined> = writable();
export const selectedStudyProgram: Writable<ChoiceOption | undefined> = writable();
export const selectedSemester: Writable<ChoiceOption | undefined> = writable();
export const selectedModule: Writable<ChoiceOption | undefined> = writable();
export const selectedDozent: Writable<ChoiceOption | undefined> = writable();
export const selectedRoom: Writable<ChoiceOption | undefined> = writable();

export const filteredStudyPrograms = derived(
  [studyPrograms, selectedTeachingUnit],
  ([$studyPrograms, $selectedTeachingUnit]) =>
    $selectedTeachingUnit === undefined
      ? $studyPrograms
      : $studyPrograms.filter((sp) => sp.teachingUnit === $selectedTeachingUnit?.value)
);
export const filteredStudyProgramsAsChoiceOptions = derived(
  [filteredStudyPrograms],
  ([$filteredStudyPrograms]) => $filteredStudyPrograms.map(studyProgramToChoiceOption)
);

// @Alex, please add TechingUnit to StudyProgram reference in modules?extend endpoint. Thanks!
export const filteredModulesAsChoiceOptions = derived(
  [modules, selectedTeachingUnit, selectedStudyProgram, filteredStudyPrograms],
  ([$modules, $selectedTeachingUnit, $selectedStudyProgram, $filteredStudyPrograms]) =>
    filterModules(
      $modules,
      { lehreinheitFilter: $selectedTeachingUnit, studyProgramFilter: $selectedStudyProgram },
      $filteredStudyPrograms
    ).map(moduleToChoiceOption)
);

export const filters: Readable<GlobalFilter> = derived(
  [
    selectedTeachingUnit,
    selectedStudyProgram,
    selectedSemester,
    selectedModule,
    selectedDozent,
    selectedRoom
  ],
  ([
    $lehreinheitFilter,
    $studyProgramFilter,
    $semesterFilter,
    $moduleFilter,
    $dozentenFilter,
    $roomFilter
  ]) => ({
    lehreinheitFilter: $lehreinheitFilter,
    studyProgramFilter: $studyProgramFilter,
    semesterFilter: $semesterFilter,
    moduleFilter: $moduleFilter,
    dozentenFilter: $dozentenFilter,
    roomFilter: $roomFilter
  })
);

// Events from data sources

export const selectedDateRange: Writable<DateRange | undefined> = writable();
export const selectedDataSources: Writable<Array<string>> = writable([DataSources.SCHEDULE]);

export const scheduleEvents: Writable<Array<ScheduleEvent>> = writable([]);

export const events = derived(
  [scheduleEvents, filters, selectedDataSources],
  ([$scheduleEvents, $filters, $selectedDataSources]) => {
    // eslint-disable-next-line no-shadow
    const scheduleEvents = $selectedDataSources.includes(DataSources.SCHEDULE)
      ? filterScheduleEvents($scheduleEvents, $filters).map(scheduleEventToFullCalendarEvent)
      : [];
    return [...scheduleEvents];
  }
);

// Selection (click) on schedule event
export const selectedScheduleEventId: Writable<string | undefined> = writable();

export const selectedScheduleEvent: Writable<ScheduleEvent | undefined> = writable();

selectedScheduleEventId.subscribe((id) => {
  selectedScheduleEvent.set(get(scheduleEvents).find((scheduleEvent) => scheduleEvent.id === id));
});

export const selectedScheduleEventAlt = derived(
  [scheduleEvents, selectedScheduleEventId],
  ([$scheduleEvents, $selectedScheduleEventId]) => {
    return $scheduleEvents.find((scheduleEvent) => scheduleEvent.id === $selectedScheduleEventId);
  }
);
