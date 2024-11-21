<script lang="ts">
  import EventSourceList from "$lib/components/event-source-list.svelte"
  import Calendar from "$lib/components/calendar.svelte"
  import GlobalFilters from "$lib/components/global-filters.svelte"
  import ScheduleEventDetails from "$lib/components/schedule-event-details.svelte"
  import { selectedScheduleEvent, selectedScheduleEventId } from "$lib/store"

  let open = false

  selectedScheduleEventId.subscribe((id) => {
    open = id !== undefined
  })

  const deselectScheduleEvent = () => {
    selectedScheduleEventId.set(undefined)
  }
</script>

<div class="h-layout">
  <nav>
    <GlobalFilters></GlobalFilters>
    <EventSourceList></EventSourceList>
    <div style="flex-grow: 1"></div>
  </nav>
  <main>
    <Calendar></Calendar>
  </main>
  <ScheduleEventDetails
    {open}
    scheduleEvent={$selectedScheduleEvent}
    on:closed={deselectScheduleEvent}
  ></ScheduleEventDetails>
</div>

<style>
  nav {
    min-width: 300px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #c9c9c9;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em;
    flex-grow: 1;
  }
</style>
