import { type EventContentArg, type EventInput } from 'svelte-fullcalendar';
import type { ChoiceOption, GlobalFilter, Holiday, Module, Person, Room, ScheduleEvent, SemesterPlan, StudyProgram } from './types';
import { _ } from 'svelte-i18n';
import { get } from "svelte/store";

export const filterScheduleEvents = (
  scheduleEvents: ScheduleEvent[],
  filters: GlobalFilter
): ScheduleEvent[] =>
  scheduleEvents.filter((event: ScheduleEvent) => {
    const matchesTeachingUnit =
      filters.lehreinheitFilter.length === 0 ||
      event.studyProgram.some(({ teachingUnitId }) => filters.lehreinheitFilter.some(({ value }) => value === teachingUnitId));

    const matchesStudyProgram =
      filters.studyProgramFilter.length === 0 ||
      event.studyProgram.some(({ id }) => filters.studyProgramFilter.some(({ value }) => value === id));

    const matchesSemester =
      filters.semesterFilter.length === 0 ||
      event.studyProgram.some(({ recommendedSemester }) => filters.semesterFilter.some(({ value }) => recommendedSemester.includes(parseInt(value, 10))));

    const matchesModule =
      filters.moduleFilter.length === 0 ||
      filters.moduleFilter.some(({ value }) => value === event.module.id);

    const matchesSupervisor =
      filters.dozentenFilter.length === 0 ||
      event.supervisor.some(({ id }) => filters.dozentenFilter.some(({ value }) => value === id));

    const matchesRoom =
      filters.roomFilter.length === 0 ||
      event.rooms.some(({ id }) => filters.roomFilter.some(({ value }) => value === id));

    return (
      matchesTeachingUnit &&
      matchesStudyProgram &&
      matchesSemester &&
      matchesModule &&
      matchesSupervisor &&
      matchesRoom
    );
  });

export const filterModules = (
  modules: Module[],
  {
    lehreinheitFilter,
    studyProgramFilter
  }: Pick<GlobalFilter, 'lehreinheitFilter' | 'studyProgramFilter'>
): Module[] =>
  modules.filter(({ studyPrograms }) => {
    const matchesTeachingUnit =
      lehreinheitFilter.length === 0 ||
      studyPrograms.some(({ teachingUnit }) => lehreinheitFilter.some(({ value }) => teachingUnit === value));
    const matchesStudyProgram =
      studyProgramFilter.length === 0 ||
      studyPrograms.some(({ id }) => studyProgramFilter.some(({ value }) => value === id));
    return matchesTeachingUnit && matchesStudyProgram;
  });

export const buildRoomsLabel = (rooms: Array<Room>) =>
  rooms.map((room) => room.identifier).join(', ');

export const buildLecturerLabel = (lecturer: Person) =>
  `${lecturer.lastname}, ${lecturer.firstname}`;

export const buildLecturersLabel = (lecturers: Array<Person>) =>
  lecturers.map(buildLecturerLabel).join('; ');

export const buildStudyProgramLabel = (studyProgram: StudyProgram) => {
  const studyProgramLabel = studyProgram.label;
  const specializationPart = studyProgram.specialization
    ? ` - ${studyProgram.specialization.label}`
    : '';
  const degreePart = studyProgram.degree ? `${studyProgram.degree.label} ` : '';
  const poPart = `PO${studyProgram.poNumber}`;
  return studyProgramLabel + specializationPart + ' (' + degreePart + ' ' + poPart + ')';
};

export const alphabeticalChoiceOptionSort = (a: ChoiceOption, b: ChoiceOption, languageCode: string = 'de') => a.label.localeCompare(b.label, languageCode)

export const getOptionLabel = (option: ChoiceOption) =>
  option ? option.label : '';

export const getOptionValue = (option: ChoiceOption) =>
  option ? option.value : '';

export const scheduleEventToFullCalendarEvent = (scheduleEvent: ScheduleEvent): EventInput => {
  const supervisor = scheduleEvent.supervisor[0];
  return {
    id: scheduleEvent.id,
    title: scheduleEvent.module.label,
    start: scheduleEvent.start,
    end: scheduleEvent.end,
    extendedProps: {
      type: scheduleEvent.courseLabel[0],
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
  };
};

export const holidaysToFullCalendarEvent = (holidayEvent: Holiday): EventInput => {
  return {
    id: holidayEvent.label + holidayEvent.date,
    title: holidayEvent.label,
    start: holidayEvent.date,
    allDay: true,
    backgroundColor: '#FF55AA',
    display: 'background',
  };
};

export const semesterPlanToFullCalendarEvent = (semesterPlan: SemesterPlan, selectedSemester: boolean): EventInput => {
  const semesterLabel = get(_)('semester')
  const title = semesterPlan.semester.index && !selectedSemester
    ? `${semesterPlan.type.label} (${semesterLabel} ${semesterPlan.semester.index.replaceAll(',', ', ')})`
    : semesterPlan.type.label
  return {
    id: semesterPlan.id,
    title,
    start: semesterPlan.start,
    end: semesterPlan.end,
    allDay: true,
    backgroundColor: '#FFCCAA',
  };
};

export const scheduleEventRenderer = (arg: EventContentArg) => {
  if (arg.event.allDay) {
    return {
      html: `<div title="${arg.event.title}" style="display: flex; flex-direction: column; margin: 1em; gap: 1em; overflow: hidden;">${arg.event.title}</div>`
    };
  }

  if (arg.view.type === 'timeGridWeek' || arg.view.type === 'timeGridDay') {
    return {
      html: `
    <div title="${arg.event.title}" style="display: flex; flex-direction: column; height: 100%; padding: 1em; gap: 1em; overflow: hidden;">
      <span style="font-weight: 600; display: flex; align-items: center; flex-direction: row; gap: .5em;"><img title="${arg.event.extendedProps.lecturer?.name}" style="height: 20px; width: 20px; border-radius: 300px;" src="${arg.event.extendedProps.lecturer?.img ? arg.event.extendedProps.lecturer?.img : ''}" alt="lecturer">${arg.event.extendedProps.abbrev} (${arg.event.extendedProps.type})</span>
      <div style="display: flex; flex-direction: column;">
        <span style="display: flex; flex-direction: row; align-items: center; gap: .5em;"><span class="material-icons" style="font-size: 1.5em;">room</span>${arg.event.extendedProps.location?.identifier}</span>
        <span style="display: flex; flex-direction: row; align-items: start; gap: .5em;"><span class="material-icons" style="font-size: 1.5em;">person</span>${arg.event.extendedProps.lecturer?.name}</span>
      </div>
    </div>
  `
    };
  }

  if (arg.view.type === 'dayGridMonth') {
    return {
      html: `
  <div title="${arg.event.title}" style="display: flex; flex-direction: row; margin: 1em; gap: 1em; overflow: hidden; width: 100%;">
    <img style="height: 20px; border-radius: 300px;" src="${arg.event.extendedProps.lecturer?.img ? arg.event.extendedProps.lecturer?.img : ''}" alt="lecturer">
    <span style="font-weight: 600; display: flex; align-items: center; flex-direction: row; gap: .5em;">${arg.event.extendedProps.abbrev} (${arg.event.extendedProps.type})</span>
    <span style="flex-grow: 1; display: flex; align-items: center; justify-content: center;"><hr style="width: 100%; background-color: #00000022; border: none; height: 1px;"></span>
    <span style="display: flex; flex-direction: row; align-items: center; gap: .5em;"><span class="material-icons" style="font-size: 1.8em;">room</span>${arg.event.extendedProps.location?.identifier}</span>
  </div>
  `
    };
  }

  return '';
};
