<script lang="ts">
  import { onMount } from 'svelte';
	import BaseCalendar from './base-calendar.svelte';
	import type { CalendarOptions } from 'svelte-fullcalendar';
  import { scheduleEvents, events } from '$lib/store'
	import { getScheduleEvents } from '$lib/http';
	import { scheduleEventRenderer } from '$lib/utils';

  onMount(async() => {
    scheduleEvents.set(await getScheduleEvents())
  })

  let options: CalendarOptions = {
    events: [],
		eventContent: scheduleEventRenderer
  }

  events.subscribe((events) => options = {...options, events: events})
</script>

<BaseCalendar { options }></BaseCalendar>