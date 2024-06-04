import {semesters} from './filter-options';
import type {
  Holiday,
  Module,
  Person,
  Room,
  ScheduleEvent,
  SemesterPlan,
  StudyProgram,
  TeachingUnit
} from './types';
import environment from '$lib/environment';

export async function getScheduleEvents(from?: string, to?: string) {
  const baseUrl = `${environment.scheduleBaseUrl}/scheduleEntries?extend=true`;
  const fromPart = from ? `&from=${from}` : '';
  const toPart = to ? `&to=${to}` : '';
  const requestUrl = baseUrl + fromPart + toPart;
  const response = await fetch(requestUrl);
  const data: Array<ScheduleEvent> = await response.json();
  return data;
}

export async function getTeachingUnits() {
  const url = `${environment.scheduleBaseUrl}/teachingUnits`;
  const response = await fetch(url);
  const data: Array<TeachingUnit> = await response.json();
  return data;
}

export async function getStudyPrograms() {
  const url = `${environment.scheduleBaseUrl}/studyPrograms?extend=true`;
  const response = await fetch(url);
  const data: Array<StudyProgram> = await response.json();
  return data;
}

export async function getSemesters() {
  return semesters;
}

export async function getModules() {
  const url = `${environment.scheduleBaseUrl}/modules?extend=true`;
  const response = await fetch(url);
  const data: Array<Module> = await response.json();
  return data;
}

export async function getLecturer() {
  const url = `${environment.scheduleBaseUrl}/people?kind=person`;
  const response = await fetch(url);
  const data: Array<Person> = await response.json();
  return data;
}

export async function getRooms() {
  const url = `${environment.scheduleBaseUrl}/rooms`;
  const response = await fetch(url);
  const data: Array<Room> = await response.json();
  return data;
}

export async function getHolidays(from?: string, to?: string) {
  const baseUrl = `${environment.scheduleBaseUrl}/holidays`;
  const fromPart = from ? `?from=${from}` : '';
  const toPart = to ? `&to=${to}` : '';
  const requestUrl = baseUrl + fromPart + toPart;
  const response = await fetch(requestUrl);
  const data: Array<Holiday> = await response.json();
  return data;
}

export async function getSemesterPlan(today: string) {
  const requestUrl = `${environment.scheduleBaseUrl}/semesterPlan?today=${today}`;
  const response = await fetch(requestUrl);
  const data: Array<SemesterPlan> = await response.json();
  return data;
}
