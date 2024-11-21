<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import BaseCalendar from "./base-calendar.svelte"
  import type { CalendarOptions } from "svelte-fullcalendar"
  import {
    filteredEvents,
    selectedDateRange,
    selectedScheduleEventId
  } from "$lib/store"
  import { scheduleEventRenderer } from "$lib/utils"

  const dispatch = createEventDispatcher()

  let options: CalendarOptions = {
    events: [],
    eventContent: scheduleEventRenderer,
    datesSet: (arg) => {
      const newRange = {
        from: arg.startStr.split("T")[0],
        to: arg.endStr.split("T")[0]
      }
      selectedDateRange.set(newRange)
      dispatch("dateRangeChanged", newRange)
    },
    eventClick: (arg) => {
      selectedScheduleEventId.set(arg.event.id)
    }
    // dateClick: (_arg) => {
    //   selectedScheduleEventId.set(undefined);
    // },
  }

  filteredEvents.subscribe((events) => {
    options = { ...options, events }
  })
</script>

<BaseCalendar {options}></BaseCalendar>
