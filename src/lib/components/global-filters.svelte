<script lang="ts">
  import Autocomplete from '@smui-extra/autocomplete'
  import Button from '@smui/button'
  import {
    lehreinheitFilter,
    dozentenFilter,
    moduleFilter,
    poFilter,
    roomFilter,
    semesterFilter,
    studyProgramFilter,
    scheduleEvents,
    teachningUnits,
    studyPrograms,
    pos,
    semesters,
    modules,
    dozenten,
    rooms,
  } from '$lib/store'
	import type { ChoiceOption } from '$lib/types'
	import { onMount } from 'svelte'
	import { getDozenten, getModules, getPos, getRooms, getScheduleEvents, getSemesters, getStudyPrograms, getTeachningUnits } from '$lib/http';
  
  onMount(async() => {
    scheduleEvents.set(await getScheduleEvents())
    teachningUnits.set(await getTeachningUnits())
    studyPrograms.set(await getStudyPrograms())
    pos.set(await getPos())
    semesters.set(await getSemesters())
    modules.set(await getModules())
    dozenten.set(await getDozenten())
    rooms.set(await getRooms())
  })

  const getOptionLabel = (option: ChoiceOption) => option ? option.label : '';
  const resetFilters = () => {
    lehreinheitFilter.set(undefined)
    dozentenFilter.set(undefined)
    moduleFilter.set(undefined)
    poFilter.set(undefined)
    roomFilter.set(undefined)
    semesterFilter.set(undefined)
    studyProgramFilter.set(undefined)
  }
</script>

<div>
  <h1>Filter</h1>
  <Autocomplete
    options={$teachningUnits}
    { getOptionLabel }
    label="Lehreinheit"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$lehreinheitFilter}
  ></Autocomplete>
  <Autocomplete
    options={$studyPrograms}
    { getOptionLabel }
    label="Studiengang"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$studyProgramFilter}
  ></Autocomplete>
  <Autocomplete
    options={$pos}
    { getOptionLabel }
    label="Prüfungsordnung"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$poFilter}
  ></Autocomplete>
  <Autocomplete
    options={$semesters}
    { getOptionLabel }
    label="Semester"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$semesterFilter}
  ></Autocomplete>
  <Autocomplete
    options={$modules}
    { getOptionLabel }
    label="Modul"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$moduleFilter}
  ></Autocomplete>
  <Autocomplete
    options={$dozenten}
    { getOptionLabel }
    label="Dozent:in"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$dozentenFilter}
  ></Autocomplete>
  <Autocomplete
    options={$rooms}
    { getOptionLabel }
    label="Raum"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$roomFilter}
  ></Autocomplete>
  <Button variant="outlined" on:click={ resetFilters }>Clear filters</Button>
</div>

<style>
  div {
    padding: 1em;
    gap: 1em;
    display: flex;
    flex-direction: column;
  }
</style>