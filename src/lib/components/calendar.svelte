<script lang="ts">
  import { onMount } from 'svelte'
	import BaseCalendar from './base-calendar.svelte'
	import type { CalendarOptions } from 'svelte-fullcalendar'
  import { scheduleEvents, events, selectedDateRange, selectedScheduleEventId } from '$lib/store'
	import { getScheduleEvents } from '$lib/http'
	import { scheduleEventRenderer } from '$lib/utils'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher();

  onMount(async() => {
    selectedDateRange.subscribe(async (newRange) => {
      if(!newRange) return;
      scheduleEvents.set(await getScheduleEvents(newRange.from, newRange.to))
    })
  })

  let options: CalendarOptions = {
    events: [],
		eventContent: scheduleEventRenderer,
    datesSet: (arg) => {
      const newRange = {from: arg.startStr.split('T')[0], to: arg.endStr.split('T')[0]}
      selectedDateRange.set(newRange)
      dispatch('dateRangeChanged', newRange)
    },
    eventClick: (arg) => {
      selectedScheduleEventId.set(arg.event.id);
    },
    // dateClick: (_arg) => {
    //   selectedScheduleEventId.set(undefined);
    // },
  }

  events.subscribe((events) => options = {...options, events: events})
</script>

<BaseCalendar { options }></BaseCalendar>