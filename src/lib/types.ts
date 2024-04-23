// To be defined

export enum DataSources {
  SCHEDULE = 'Stundenplanung'
}

export type DateRange = {
  from: string,
  to: string,
}

export type ChoiceOption = {
  label: string,
  value: string,
}

export type GlobalFilter = {
  lehreinheitFilter?: ChoiceOption,
  studyProgramFilter?: ChoiceOption,
  poFilter?: ChoiceOption,
  semesterFilter?: ChoiceOption,
  moduleFilter?: ChoiceOption,
  dozentenFilter?: ChoiceOption,
  roomFilter?: ChoiceOption,
}

// Data representation

export type Semester = {
  id: number,
  label: string,
}

export type TeachingUnit = {
  id: string,
  faculty: string,
  deLabel: string,
  enLabel: string,
}

export type Person = {
  id: string, 
  kind: string,
  firstname: string,
  lastname: string,
  title: string,
  abbreviation?: string,
  campusId?: string,
}


export type Room = {
  id: string,
  identifier: string,
  campusId: string,
  campusLabel: string,
  label: string,
}

export type Module = {
  id: string,
  label: string,
  abbrev: string,
  language?: string,
  season?: string,
  parts?: string[],
}

export type StudyProgram = {
  id: string,
  deLabel: string,
  enLabel: string,
  poId: string,
  poNumber: number,
  degreeId: string,
  degreeLabel?: string,
  degree?: string,
  teachingUnit?: string,
  teachingUnitId?: string,
  teachingUnitDeLabel?: string,
  teachingUnitEnLabel?: string,
  mandatory: boolean,
  isFocus: boolean
}

export type ScheduleEvent = {
  id: string,
  date: string,
  start: string,
  end: string,
  coursePart: string,
  room: Room,
  module: Module,
  supervisor: Array<Person>,
  studyProgram: Array<StudyProgram>
}