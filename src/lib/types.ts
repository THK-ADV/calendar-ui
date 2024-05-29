// To be defined

export enum DataSources {
  SCHEDULE = 'schedule'
}

export type DateRange = {
  from: string;
  to: string;
};

export type ChoiceOption = {
  label: string;
  value: string;
};

export type GlobalFilter = {
  lehreinheitFilter?: ChoiceOption;
  studyProgramFilter?: ChoiceOption;
  poFilter?: ChoiceOption;
  semesterFilter?: ChoiceOption;
  moduleFilter?: ChoiceOption;
  dozentenFilter?: ChoiceOption;
  roomFilter?: ChoiceOption;
};

// Data representation

export type Semester = {
  id: number;
  label: string;
};

export type TeachingUnit = {
  id: string;
  faculty: string;
  label: string;
};

export type Person = {
  id: string;
  kind: string;
  firstname: string;
  lastname: string;
  title: string;
  abbreviation?: string;
  campusId?: string;
};

export type Room = {
  id: string;
  identifier: string;
  campusId: string;
  campusLabel: string;
  label: string;
};

export type Specialization = {
  id: string;
  label: string;
};

export type Degree = {
  id: string;
  label: string;
};

export type StudyProgram = {
  id: string;
  label: string;
  poId: string;
  poNumber: number;
  degree: Degree;
  teachingUnit: string;
  specialization?: Specialization;
};

export type Module = {
  id: string;
  label: string;
  abbrev: string;
  language: string;
  season: string;
  studyPrograms: Array<Pick<StudyProgram, 'id' | 'teachingUnit'> & {
    mandatory: boolean,
    focus: boolean
  }>;
};

export type ScheduleEvent = {
  id: string;
  start: string;
  end: string;
  courseLabel: string;
  rooms: Array<Room>;
  module: Module;
  supervisor: Array<Person>;
  studyProgram: Array<Pick<StudyProgram, 'id' | 'poId' | 'poNumber' | 'label'> & {
    degreeId: string,
    degreeLabel: string,
    teachingUnitId: string,
    teachingUnitLabel: string,
    mandatory: boolean,
    isFocus: boolean,
    recommendedSemester: Array<number>
  }>;
};

export type Event = {
  label: string;
  start: string;
  end: string;
};

export type HolidayEvent = Event;

export type SemesterEvent = Event & {
  context?: {
    teachingUnit: string;
    semesterIndex: number;
  };
};
