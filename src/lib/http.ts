import { dozenten, modules, pos, rooms, semesters, studyPrograms, teachningUnits } from "./filter-options";
import type { ScheduleEvent } from "./types";

export async function getScheduleEvents(from?: string, to?: string) {
  const baseUrl = 'http://lwivs49.gm.fh-koeln.de:9000/scheduleEntries?extend=true'
  const fromPart = from ? `&from=${from}` : ''
  const toPart = to ? `&to=${to}` : ''
  const requestUrl = baseUrl + fromPart + toPart;

  const response = await fetch(requestUrl);
  const data: Array<ScheduleEvent> = await response.json();
  return data;
}

export async function getTeachningUnits() {
  return teachningUnits
}

export async function getStudyPrograms() {
  return studyPrograms
}

export async function getPos() {
  return pos
}

export async function getSemesters() {
  return semesters
}

export async function getModules() {
  return modules
}

export async function getDozenten() {
  return dozenten
}

export async function getRooms() {
  return rooms
}
