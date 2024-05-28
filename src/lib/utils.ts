import { type EventContentArg, type EventInput } from 'svelte-fullcalendar';
import type {
  ChoiceOption,
  GlobalFilter,
  Module,
  Person,
  Room,
  ScheduleEvent,
  Semester,
  StudyProgram,
  TeachingUnit
} from './types';

export const filterScheduleEvents = (
  scheduleEvents: ScheduleEvent[],
  filters: GlobalFilter
): ScheduleEvent[] =>
  scheduleEvents.filter((event: ScheduleEvent) => {
    const matchesTeachingUnit =
			filters.lehreinheitFilter === undefined ||
			event.studyProgram.some(
			  (studyProgram) => studyProgram.teachingUnitId === filters.lehreinheitFilter?.value
			);
    const matchesStudyProgram =
			filters.studyProgramFilter === undefined ||
			event.studyProgram.some(
			  (studyProgram) => studyProgram.id === filters.studyProgramFilter?.value
			);
    const matchesPo =
			filters.poFilter === undefined ||
			event.studyProgram.some((studyProgram) => studyProgram.poId === filters.poFilter?.value);
    const matchesSemester =
			filters.semesterFilter === undefined ||
			event.studyProgram.some((sp) =>
			  sp.recommendedSemester.includes(parseInt(filters.semesterFilter!.value, 10))
			);
    const matchesModule =
			filters.moduleFilter === undefined || event.module.id === filters.moduleFilter?.value;
    const matchesSupervisor =
			filters.dozentenFilter === undefined ||
			event.supervisor.some((supervisor) => supervisor.id === filters.dozentenFilter!.value);
    const matchesRoom =
			filters.roomFilter === undefined ||
			event.rooms.some((room) => room.id === filters.roomFilter!.value);

    return (
      matchesStudyProgram &&
			matchesTeachingUnit &&
			matchesPo &&
			matchesSemester &&
			matchesModule &&
			matchesSupervisor &&
			matchesRoom
    );
  });

// TODO: remove allStudyProgramsInTeachingUnit after Alex added teachingUnit to endpoint
export const filterModules = (
  modules: Module[],
  filters: Partial<GlobalFilter>,
  allStudyProgramsInTeachingUnit: Array<StudyProgram>
): Module[] =>
  modules.filter((module) => {
    const matchesTeachingUnit =
			filters.lehreinheitFilter === undefined ||
			module.studyPrograms.some((studyProgram) =>
			  allStudyProgramsInTeachingUnit.map((spInTu) => spInTu.id).includes(studyProgram.id)
			);
    const matchesStudyProgram =
			filters.studyProgramFilter === undefined ||
			module.studyPrograms.some(
			  (studyProgram) => studyProgram.id === filters.studyProgramFilter?.value
			);
    return matchesTeachingUnit && matchesStudyProgram;
  });

export const buildRoomsLabel = (rooms: Array<Room>) =>
  rooms.map((room) => room.identifier).join(', ');

export const buildLecturerLabel = (lecturer: Person) =>
  `${lecturer.firstname} ${lecturer.lastname}`;

export const buildLecturersLabel = (lecturers: Array<Person>) =>
  lecturers.map(buildLecturerLabel).join(', ');

export const buildStudyProgramLabel = (studyProgram: StudyProgram) => {
  const degreePart = studyProgram.degree ? `${studyProgram.degree.label} ` : '';
  const studyProgramLabel = studyProgram.label;
  const specializationPart = studyProgram.specialization
    ? ` - ${studyProgram.specialization.label}`
    : '';
  const poPart = ` (PO${studyProgram.poNumber})`;
  return degreePart + studyProgramLabel + specializationPart + poPart;
};

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

export const teachingUnitToChoiceOption = (teachingUnit: TeachingUnit): ChoiceOption => ({
  label: teachingUnit.deLabel,
  value: teachingUnit.id
});

export const studyProgramToChoiceOption = (studyProgram: StudyProgram): ChoiceOption => ({
  label: buildStudyProgramLabel(studyProgram),
  value: studyProgram.id
});

export const moduleToChoiceOption = (module: Module): ChoiceOption => ({
  label: `${module.label} (${module.abbrev})`,
  value: module.id
});

export const personToChoiceOption = (person: Person): ChoiceOption => ({
  label: `${person.firstname} ${person.lastname}`,
  value: person.id
});

export const roomToChoiceOption = (room: Room): ChoiceOption => ({
  label: `${room.identifier} (${room.label})`,
  value: room.id
});

export const semesterToChoiceOption = (semester: Semester) => ({
  label: `${semester.label}. Semester`,
  value: semester.id
});

export const scheduleEventRenderer = (arg: EventContentArg) => {
  if (arg.event.allDay)
    return {
      html: `
  <div title="${arg.event.title}" style="display: flex; flex-direction: column; margin: 1em; gap: 1em; overflow: hidden;">
    ${arg.event.title}
  </div>
  `
    };

  if (arg.view.type === 'timeGridWeek' || arg.view.type === 'timeGridDay')
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

  if (arg.view.type === 'dayGridMonth')
    return {
      html: `
  <div title="${arg.event.title}" style="display: flex; flex-direction: column; margin: 1em; gap: 1em; overflow: hidden; width: 100%;">
    <img style="height: 20px; border-radius: 300px;" src="${arg.event.extendedProps.lecturer?.img ? arg.event.extendedProps.lecturer?.img : ''}" alt="lecturer">
    <span style="font-weight: 600; display: flex; align-items: center; flex-direction: row; gap: .5em;">${arg.event.extendedProps.abbrev} (${arg.event.extendedProps.type})</span>
    <span style="flex-grow: 1; display: flex; align-items: center; justify-content: center;"><hr style="width: 100%; background-color: #00000022; border: none; height: 1px;"></span>
    <span style="display: flex; flex-direction: row; align-items: center; gap: .5em;"><span class="material-icons" style="font-size: 1.8em;">room</span>${arg.event.extendedProps.location?.identifier}</span>
  </div>
  `
    };
  return '';
};
