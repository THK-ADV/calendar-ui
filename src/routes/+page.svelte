<script lang="ts">
  import EventSourceList from "$lib/components/EventSouceList.svelte"
  import ScheduleEventDetails from "$lib/components/ScheduleEventDetails.svelte"
  import Calendar from "$lib/components/Calendar.svelte"
  import GlobalFilter from "$lib/components/GlobalFilter.svelte"
</script>

<div class="h-layout">
  <nav>
    <GlobalFilter />
    <EventSourceList />
    <div style="flex-grow: 1"></div>
  </nav>
  <main>
    <Calendar />
  </main>
  <ScheduleEventDetails />
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
