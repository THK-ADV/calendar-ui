// To be defined

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

export type Supervisor = {
  id: string, 
  kind: string,
  firstname: string,
  lastname: string,
  title: string,
}


export type Room = {
  id: string,
  identifier: string,
  campusId: string,
  campusLabel: string,
}

export type Module = {
  id: string,
  label: string,
  abbrev: string,
  language: string,
}

export type StudyProgram = {
  id: string,
  deLabel: string,
  enLabel: string,
  poId: string,
  poNumber: number,
  degreeId: string,
  degreeLabel: string,
  teachingUnitId: string,
  teachingUnitDeLabel: string,
  teachingUnitEnLabel: string,
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
  supervisor: Array<Supervisor>,
  studyProgram: Array<StudyProgram>
}