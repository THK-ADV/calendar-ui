<script lang="ts">
  import EventSourceList from '$lib/components/event-source-list.svelte'
	import Calendar from '$lib/components/calendar.svelte'
  import GlobalFilters from '$lib/components/global-filters.svelte';
</script>

<div class="h-layout">
  <nav>
    <div style="flex-grow: 1"></div>
    <GlobalFilters></GlobalFilters>
    <EventSourceList></EventSourceList>
  </nav>
  <main>
    <Calendar></Calendar>
  </main>
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