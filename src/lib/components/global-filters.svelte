<script lang="ts">
  import {_} from 'svelte-i18n';
  import Autocomplete from '@smui-extra/autocomplete';
  import Button from '@smui/button';
  import {
    dozenten,
    dozentenAsChoiceOptions,
    filteredModulesAsChoiceOptions,
    filteredStudyProgramsAsChoiceOptions,
    modules,
    rooms,
    roomsAsChoiceOptions,
    selectedDozent,
    selectedModule,
    selectedRoom,
    selectedSemester,
    selectedStudyProgram,
    selectedTeachingUnit,
    semesters,
    semestersAsChoiceOptions,
    studyPrograms,
    teachinUnitsAsChoiceOptions,
    teachningUnits
  } from '$lib/store';
  import type {ChoiceOption} from '$lib/types';
  import {onMount} from 'svelte';
  import {getDozenten, getModules, getRooms, getSemesters, getStudyPrograms, getTeachingUnits} from '$lib/http';

  onMount(async () => {
    teachningUnits.set(await getTeachingUnits());
    studyPrograms.set(await getStudyPrograms());
    semesters.set(await getSemesters());
    modules.set(await getModules());
    dozenten.set(await getDozenten());
    rooms.set(await getRooms());
  });

  const getOptionLabel = (option: ChoiceOption) => (option ? option.label : '');

  const resetFilters = () => {
    selectedTeachingUnit.set(undefined);
    selectedDozent.set(undefined);
    selectedModule.set(undefined);
    selectedRoom.set(undefined);
    selectedSemester.set(undefined);
    selectedStudyProgram.set(undefined);
  };
</script>

<div>
    <h1>{$_('filters')}</h1>
    {$filteredModulesAsChoiceOptions.length}
    <Autocomplete
            options={$teachinUnitsAsChoiceOptions}
            {getOptionLabel}
            label={$_('teaching-unit')}
            textfield$variant="outlined"
            textfield$style="width: 100%;"
            bind:value={$selectedTeachingUnit}
    ></Autocomplete>
    <Autocomplete
            options={$filteredStudyProgramsAsChoiceOptions}
            {getOptionLabel}
            label={$_('study-program')}
            textfield$variant="outlined"
            textfield$style="width: 100%;"
            bind:value={$selectedStudyProgram}
    ></Autocomplete>
    <Autocomplete
            options={$semestersAsChoiceOptions}
            {getOptionLabel}
            label={$_('semester')}
            textfield$variant="outlined"
            textfield$style="width: 100%;"
            bind:value={$selectedSemester}
    ></Autocomplete>
    <Autocomplete
            options={$filteredModulesAsChoiceOptions}
            {getOptionLabel}
            label={$_('module')}
            textfield$variant="outlined"
            textfield$style="width: 100%;"
            bind:value={$selectedModule}
    ></Autocomplete>
    <Autocomplete
            options={$dozentenAsChoiceOptions}
            {getOptionLabel}
            label={$_('lecturer')}
            textfield$variant="outlined"
            textfield$style="width: 100%;"
            bind:value={$selectedDozent}
    ></Autocomplete>
    <Autocomplete
            options={$roomsAsChoiceOptions}
            {getOptionLabel}
            label={$_('room')}
            textfield$variant="outlined"
            textfield$style="width: 100%;"
            bind:value={$selectedRoom}
    ></Autocomplete>
    <Button variant="outlined" on:click={resetFilters}>{$_('clear-filters')}</Button>
</div>

<style>
    div {
        padding: 1em;
        gap: 1em;
        display: flex;
        flex-direction: column;
    }
</style>
