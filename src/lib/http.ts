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