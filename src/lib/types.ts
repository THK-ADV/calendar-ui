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
	deLabel: string;
	enLabel: string;
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
	teachingUnit?: string;
	teachingUnitId?: string;
	teachingUnitDeLabel?: string;
	teachingUnitEnLabel?: string;
	recommendedSemester: Array<number>;
	mandatory: boolean;
	isFocus: boolean;
	specialization?: Specialization;
};

export type Module = {
	id: string;
	label: string;
	abbrev: string;
	language?: string;
	season?: string;
	parts?: Array<string>;
	studyPrograms: Array<StudyProgram>;
};

export type ScheduleEvent = {
	id: string;
	start: string;
	end: string;
	courseLabel: string;
	rooms: Array<Room>;
	module: Module;
	supervisor: Array<Person>;
	studyProgram: Array<StudyProgram>;
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
