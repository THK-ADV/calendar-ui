import type {
  ChoiceOption,
  DateRange,
  Holiday,
  Module,
  Person,
  Room,
  ScheduleEvent,
  Semester,
  SemesterPlan,
  StudyProgram
} from "$lib/types"
import {
  getHolidays,
  getLecturer,
  getModules,
  getRooms,
  getScheduleEvents,
  getSemesterPlan,
  getSemesters,
  getStudyPrograms,
  getTeachingUnits
} from "$lib/http"

function dateStr(date: Date): string {
  return date.toISOString().split("T")[0]
}

function createGlobalFilter() {
  let teachingUnits = $state.raw(new Array<StudyProgram>())
  let selectedTeachingUnit: ChoiceOption | undefined = $state.raw(undefined)
  let studyPrograms = $state.raw(new Array<StudyProgram>())
  let selectedStudyProgram: ChoiceOption | undefined = $state.raw(undefined)
  let semesters = $state.raw(new Array<Semester>())
  let selectedSemester: ChoiceOption | undefined = $state.raw(undefined)
  let modules = $state.raw(new Array<Module>())
  let selectedModule: ChoiceOption | undefined = $state.raw(undefined)
  let lecturer = $state.raw(new Array<Person>())
  let selectedLecturer: ChoiceOption | undefined = $state.raw(undefined)
  let rooms = $state.raw(new Array<Room>())
  let selectedRoom: ChoiceOption | undefined = $state.raw(undefined)

  return {
    get teachingUnits() {
      return teachingUnits
    },
    get selectedTeachingUnit() {
      return selectedTeachingUnit
    },
    set selectedTeachingUnit(x: ChoiceOption | undefined) {
      selectedTeachingUnit = x
    },
    get studyPrograms() {
      return studyPrograms
    },
    get selectedStudyProgram() {
      return selectedStudyProgram
    },
    set selectedStudyProgram(x: ChoiceOption | undefined) {
      selectedStudyProgram = x
    },
    get semesters() {
      return semesters
    },
    get selectedSemester() {
      return selectedSemester
    },
    set selectedSemester(x: ChoiceOption | undefined) {
      selectedSemester = x
    },
    get modules() {
      return modules
    },
    get selectedModule() {
      return selectedModule
    },
    set selectedModule(x: ChoiceOption | undefined) {
      selectedModule = x
    },
    get lecturer() {
      return lecturer
    },
    get selectedLecturer() {
      return selectedLecturer
    },
    set selectedLecturer(x: ChoiceOption | undefined) {
      selectedLecturer = x
    },
    get rooms() {
      return rooms
    },
    get selectedRoom() {
      return selectedRoom
    },
    set selectedRoom(x: ChoiceOption | undefined) {
      selectedRoom = x
    },
    async init() {
      const res = await Promise.all([
        getTeachingUnits(),
        getStudyPrograms(),
        getSemesters(),
        getModules(),
        getLecturer(),
        getRooms()
      ])
      teachingUnits = res[0]
      studyPrograms = res[1]
      semesters = res[2]
      modules = res[3]
      lecturer = res[4]
      rooms = res[5]
    },
    clear() {
      selectedTeachingUnit = undefined
      selectedStudyProgram = undefined
      selectedSemester = undefined
      selectedModule = undefined
      selectedLecturer = undefined
      selectedRoom = undefined
    }
  }
}

function createEventSourceList() {
  const eventSourceList = $state({
    isScheduleSelected: true,
    isSemesterPlanSelected: false,
    isHolidaysSelected: false
  })
  return eventSourceList
}

function createScheduleEvents() {
  let scheduleEvents = $state.raw(new Array<ScheduleEvent>())
  let selected = $state.raw<ScheduleEvent>()

  return {
    get value() {
      return scheduleEvents
    },
    get selected() {
      return selected
    },
    select(id: string) {
      selected = scheduleEvents.find((s) => s.id === id)
    },
    deselect() {
      selected = undefined
    },
    clear() {
      scheduleEvents = []
    },
    async fetch(from: string, to: string) {
      scheduleEvents = await getScheduleEvents(from, to)
    }
  }
}

export function createDateRange() {
  let dateRange = $state.raw<DateRange>()
  const visibleYears = $state<number[]>([])

  return {
    get value() {
      return dateRange
    },
    get visibleYears() {
      return visibleYears
    },
    update(from: Date, to: Date) {
      // onDateRangeChange is called every time events are set. Prevent endless loop by checking if the value actual changed.
      const fromStr = dateStr(from)
      const toStr = dateStr(to)
      if (dateRange === undefined) {
        dateRange = { from: fromStr, to: toStr }
      } else if (dateRange.from !== fromStr || dateRange.to !== toStr) {
        dateRange = { from: fromStr, to: toStr }
      }
      const fromYear = from.getFullYear()
      const toYear = to.getFullYear()
      if (!visibleYears.includes(fromYear)) {
        visibleYears.push(fromYear)
      }
      if (!visibleYears.includes(toYear)) {
        visibleYears.push(toYear)
      }
    }
  }
}

export function createHolidays() {
  let holidays = $state.raw(new Array<Holiday>())

  return {
    get value() {
      return holidays
    },
    async fetch(visibleYears: number[]) {
      console.assert(
        visibleYears.length !== 0,
        "visible years should not be empty"
      )
      const years = visibleYears.toSorted()
      const start = `${years[0]}-01-01`
      const end = `${years[years.length - 1]}-12-31`
      holidays = await getHolidays(start, end)
    }
  }
}

export function createSemesterPlan() {
  let semesterPlanEntries = $state.raw(new Array<SemesterPlan>())

  return {
    get value() {
      return semesterPlanEntries
    },
    async fetch(visibleYears: number[]) {
      console.assert(
        visibleYears.length !== 0,
        "visible years should not be empty"
      )
      const years = visibleYears.toSorted()
      const start = `${years[0]}-01-01`
      const end = `${years[years.length - 1]}-12-31`
      semesterPlanEntries = await getSemesterPlan(start, end)
    }
  }
}

export const filter = createGlobalFilter()

export const eventSourceList = createEventSourceList()

export const scheduleEvents = createScheduleEvents()
