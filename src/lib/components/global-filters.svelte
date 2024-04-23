<script lang="ts">
  import Autocomplete from '@smui-extra/autocomplete'
  import Button from '@smui/button'
  import {
    selectedDozent,
    selectedModule,
    selectedRoom,
    selectedSemester,
    selectedStudyProgram,
    scheduleEvents,
    selectedTeachingUnit,
    teachningUnits,
    teachinUnitsAsChoiceOptions,
    studyPrograms,
    filteredStudyProgramsAsChoiceOptions,
    semesters,
    semestersAsChoiceOptions,
    modules,
    modulesAsChoiceOptions,
    dozenten,
    dozentenAsChoiceOptions,
    rooms,
    roomsAsChoiceOptions,
  } from '$lib/store'
	import type { ChoiceOption } from '$lib/types'
	import { onMount } from 'svelte'
	import { getDozenten, getModules, getRooms, getScheduleEvents, getSemesters, getStudyPrograms, getTeachningUnits } from '$lib/http';
  
  onMount(async() => {
    scheduleEvents.set(await getScheduleEvents())
    teachningUnits.set((await getTeachningUnits()))
    studyPrograms.set((await getStudyPrograms()))
    semesters.set(await getSemesters())
    modules.set((await getModules()))
    dozenten.set((await getDozenten()))
    rooms.set((await getRooms()))
  })

  const getOptionLabel = (option: ChoiceOption) => option ? option.label : '';

  const resetFilters = () => {
    selectedTeachingUnit.set(undefined)
    selectedDozent.set(undefined)
    selectedModule.set(undefined)
    selectedRoom.set(undefined)
    selectedSemester.set(undefined)
    selectedStudyProgram.set(undefined)
  }
</script>

<div>
  <h1>Filter</h1>
  <Autocomplete
    options={$teachinUnitsAsChoiceOptions}
    { getOptionLabel }
    label="Lehreinheit"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$selectedTeachingUnit}
  ></Autocomplete>
  <Autocomplete
    options={$filteredStudyProgramsAsChoiceOptions}
    { getOptionLabel }
    label="Studiengang"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$selectedStudyProgram}
  ></Autocomplete>
  <Autocomplete
    options={$semestersAsChoiceOptions}
    { getOptionLabel }
    label="Semester"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$selectedSemester}
  ></Autocomplete>
  <Autocomplete
    options={$modulesAsChoiceOptions}
    { getOptionLabel }
    label="Modul"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$selectedModule}
  ></Autocomplete>
  <Autocomplete
    options={$dozentenAsChoiceOptions}
    { getOptionLabel }
    label="Dozent:in"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$selectedDozent}
  ></Autocomplete>
  <Autocomplete
    options={$roomsAsChoiceOptions}
    { getOptionLabel }
    label="Raum"
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={$selectedRoom}
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