import type { ChoiceOption } from '$lib/types'

// ToDo: Replace with http requests and store results in store

export const teachningUnits: Array<ChoiceOption> = [
  {label: 'Informatik', value: '7cdbdc29-f562-42c9-bbcd-6d15bf1ae822'},
  {label: 'Ingenieurwesen', value: '34aaf9b8-c406-466b-b386-164a51e3e317'},
]

export const studyPrograms: Array<ChoiceOption> = [
  {label: 'Digital Sciences', value: '56c67da2-4762-4172-9de5-f4ba72cd311c'},
  {label: 'IT-Management (Informatik)', value: 'ac613c31-f04b-4fe2-9369-3a357fb07400'},
]

export const pos: Array<ChoiceOption> = [
  {label: 'PO 1', value: 'inf_itm1'},
  {label: 'PO 2', value: 'inf_itm2'},
]

export const semesters: Array<ChoiceOption> = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
]

export const modules: Array<ChoiceOption> = [
  {label: 'Identity Management', value: '7bf34ba0-628a-4a2b-9b2a-3900f982b9e9'},
  {label: 'Angewandte Mathematik', value: '315b421f-50fc-44a0-b584-8b38c9f53c87'},
  {label: 'Unternehmensplanspiel', value: '111c8dcf-738f-4870-9851-fb1ef0349b75'},
  {label: 'Optimization', value: '325bcb38-5766-482b-83eb-ac80a5f20fa2'},
]
export const dozenten: Array<ChoiceOption> = [
  {label: 'Prof. Dr. Thomas Bartz-Beielstein', value: 'tbb'},
  {label: 'Prof. Dr. Siegfried Stumpf', value: 'sst'},
  {label: 'Prof. Dr. Torsten Klein', value: 'tkl'},
]
export const rooms: Array<ChoiceOption> = [
  {label: '0502', value: '53297cae-ef63-4357-8954-b7ae02f940a2'},
  {label: '0501', value: 'bfb33b37-2d46-4e0b-af80-dd76a0dde4bd'},
  {label: '3101', value: 'fe7b9d4d-b4c6-46d8-9f38-8e3944fa126f'},
]