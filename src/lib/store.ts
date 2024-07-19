import { derived, get, type Readable, writable, type Writable } from 'svelte/store';
import {
  type ChoiceOption,
  type DateRange,
  type GlobalFilter,
  type Holiday,
  type Module,
  type Person,
  type Room,
  type ScheduleEvent,
  type Semester,
  type SemesterPlan,
  type StudyProgram,
  type TeachingUnit
} from './types';
import {
  alphabeticalChoiceOptionSort,
  buildLecturerLabel,
  buildStudyProgramLabel,
  filterModules,
  filterScheduleEvents,
  holidaysToFullCalendarEvent,
  scheduleEventToFullCalendarEvent,
  semesterPlanToFullCalendarEvent
} from './utils';
import { getHolidays, getScheduleEvents, getSemesterPlan } from "$lib/http";

// Reference data (soon to be) requested by API

export const teachingUnits: Writable<Array<TeachingUnit>> = writable([]);
export const studyPrograms: Writable<Array<StudyProgram>> = writable([]);
export const semesters: Writable<Array<Semester>> = writable([]);
export const modules: Writable<Array<Module>> = writable([]);
export const lecturer: Writable<Array<Person>> = writable([]);
export const rooms: Writable<Array<Room>> = writable([]);

// Filter options

export const teachingUnitsAsChoiceOptions = derived(teachingUnits, ($tu) =>
  $tu.map(teachingUnitToChoiceOption).sort(alphabeticalChoiceOptionSort)
);

export const semestersAsChoiceOptions = derived(semesters, ($semesters) =>
  $semesters.map(semesterToChoiceOption).sort(alphabeticalChoiceOptionSort)
);

export const lecturerAsChoiceOptions = derived(lecturer, ($lecturer) =>
  $lecturer.map(personToChoiceOption).sort(alphabeticalChoiceOptionSort)
);

export const roomsAsChoiceOptions = derived(rooms, ($rooms) =>
  $rooms.map(roomToChoiceOption).sort(alphabeticalChoiceOptionSort)
);

const teachingUnitToChoiceOption = (teachingUnit: TeachingUnit): ChoiceOption => ({
  label: teachingUnit.label,
  value: teachingUnit.id
});

const studyProgramToChoiceOption = (studyProgram: StudyProgram): ChoiceOption => ({
  label: buildStudyProgramLabel(studyProgram),
  value: studyProgram.id
});

const moduleToChoiceOption = (module: Module): ChoiceOption => ({
  label: `${module.label} (${module.abbrev})`,
  value: module.id
});

const personToChoiceOption = (person: Person): ChoiceOption => ({
  label: buildLecturerLabel(person),
  value: person.id
});

const roomToChoiceOption = (room: Room): ChoiceOption => ({
  label: `${room.identifier} (${room.label})`,
  value: room.id
});

const semesterToChoiceOption = (semester: Semester): ChoiceOption => ({
  label: `${semester.label}. Semester`,
  value: `${semester.id}`
});

// Filtered values

export const selectedTeachingUnits: Writable<Array<ChoiceOption>> = writable([]);
export const selectedStudyPrograms: Writable<Array<ChoiceOption>> = writable([]);
export const selectedSemesters: Writable<Array<ChoiceOption>> = writable([]);
export const selectedModules: Writable<Array<ChoiceOption>> = writable([]);
export const selectedLecturers: Writable<Array<ChoiceOption>> = writable([]);
export const selectedRooms: Writable<Array<ChoiceOption>> = writable([]);

export const studyProgramsAsChoiceOptions = derived(
  [studyPrograms, selectedTeachingUnits],
  ([$studyPrograms, $selectedTeachingUnits]) => {
    const filteredStudyPrograms = 
    $selectedTeachingUnits.length === 0 
    ? $studyPrograms
    : $studyPrograms.filter(({ teachingUnit }) => $selectedTeachingUnits.some(stu => stu?.value === teachingUnit))
    return filteredStudyPrograms.map(studyProgramToChoiceOption).sort(alphabeticalChoiceOptionSort)
  }
);

export const modulesAsChoiceOptions = derived(
  [modules, selectedTeachingUnits, selectedStudyPrograms],
  ([$modules, $selectedTeachingUnits, $selectedStudyPrograms]) =>
    filterModules($modules, {
      lehreinheitFilter: $selectedTeachingUnits,
      studyProgramFilter: $selectedStudyPrograms
    }).map(moduleToChoiceOption).sort(alphabeticalChoiceOptionSort)
);

export const filters: Readable<GlobalFilter> = derived(
  [
    selectedTeachingUnits,
    selectedStudyPrograms,
    selectedSemesters,
    selectedModules,
    selectedLecturers,
    selectedRooms
  ],
  ([
    lehreinheitFilter,
    studyProgramFilter,
    semesterFilter,
    moduleFilter,
    dozentenFilter,
    roomFilter
  ]) => ({
    lehreinheitFilter,
    studyProgramFilter,
    semesterFilter,
    moduleFilter,
    dozentenFilter,
    roomFilter
  })
);

// Events from data sources

export const selectedDateRange: Writable<DateRange | undefined> = writable();

export const isScheduleSelected: Writable<boolean> = writable(true);

export const isHolidaysSelected: Writable<boolean> = writable(false);

export const isSemesterPlanSelected: Writable<boolean> = writable(false);

export const scheduleEvents: Writable<Array<ScheduleEvent>> = writable([]);

export const holidayEvents: Writable<Array<Holiday>> = writable([]);

export const semesterPlanEvents: Writable<Array<SemesterPlan>> = writable([]);

const filteredScheduleEvents = derived(
  [scheduleEvents, filters, isScheduleSelected],
  ([$scheduleEvents, $filters, $selectedSchedule]) => {
    console.log("filteredScheduleEvents")
    return $selectedSchedule
      ? filterScheduleEvents($scheduleEvents, $filters)
      : []
  }
);

const filteredSemesterPlan = derived(
  [semesterPlanEvents, selectedTeachingUnits, selectedSemesters],
  ([semesterPlanEvents, selectedTeachingUnits, selectedSemesters]) => {
    //semesterPlanEvents.filter(a => a.teachingUnit === selectedTeachingUnit.value)
  
    const filteredEntries: Array<SemesterPlan> = []
    for (const entry of semesterPlanEvents) {
      if (selectedTeachingUnits.length !== 0 && selectedTeachingUnits.some(({value}) => value === entry.teachingUnit)) {
        if (!entry.semester.index) {
          filteredEntries.push(entry)
        } else if (selectedSemesters.length === 0) {
          filteredEntries.push(entry)
        } else {
          // 1,2,3
          if (selectedSemesters.length !== 0 && entry.semester.index && selectedSemesters.some(({value}) => entry.semester.index?.includes(value))) {
            filteredEntries.push(entry)
          }
        }
      }
    }
    return filteredEntries
  }
)

export const filteredEvents = derived(
  [filteredScheduleEvents, holidayEvents, filteredSemesterPlan, selectedSemesters],
  ([$scheduleEvents, $holidayEvents, $semesterPlanEvents, $selectedSemesters]) => {
    console.log("filteredEvents")
    return [
      ...$scheduleEvents.map(scheduleEventToFullCalendarEvent),
      ...$holidayEvents.map(holidaysToFullCalendarEvent),
      ...$semesterPlanEvents.map(a => semesterPlanToFullCalendarEvent(a, $selectedSemesters.length > 0)),
    ]
  }
);

// Selection (click) on schedule event

export const selectedScheduleEventId: Writable<string | undefined> = writable();

export const selectedScheduleEvent: Writable<ScheduleEvent | undefined> = writable();

// Subscriptions

selectedScheduleEventId.subscribe((id) => {
  selectedScheduleEvent.set(get(scheduleEvents).find((scheduleEvent) => scheduleEvent.id === id));
});

selectedDateRange.subscribe(async (range) => {
  if (!range) return;
  if (get(isScheduleSelected)) {
    scheduleEvents.set(await getScheduleEvents(range.from, range.to));
  }
  if (get(isHolidaysSelected)) {
    holidayEvents.set(await getHolidays(range.from, range.to));
  }
});

isHolidaysSelected.subscribe(async (isSelected) => {
  const range = get(selectedDateRange)
  if (isSelected && range) {
    holidayEvents.set(await getHolidays(range.from, range.to));
  } else {
    holidayEvents.set([]);
  }
});

isSemesterPlanSelected.subscribe(async (isSelected) => {
  if (isSelected) {
    const today = new Date().toISOString().slice(0, 10)
    semesterPlanEvents.set(await getSemesterPlan(today));
  } else {
    semesterPlanEvents.set([]);
  }
});
