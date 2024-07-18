<script lang="ts">
  import {_} from 'svelte-i18n';
  import Autocomplete from '@smui-extra/autocomplete';
  import Button from '@smui/button';
  import {
    lecturer,
    lecturerAsChoiceOptions,
    modules,
    modulesAsChoiceOptions,
    rooms,
    roomsAsChoiceOptions,
    selectedLecturer,
    selectedModule,
    selectedRoom,
    selectedSemester,
    selectedStudyProgram,
    selectedTeachingUnit,
    semesters,
    semestersAsChoiceOptions,
    studyPrograms,
    studyProgramsAsChoiceOptions,
    teachingUnits,
    teachingUnitsAsChoiceOptions
  } from '$lib/store';
  import type {ChoiceOption} from '$lib/types';
  import {onMount} from 'svelte';
  import {getLecturer, getModules, getRooms, getSemesters, getStudyPrograms, getTeachingUnits} from '$lib/http';
  import {getOptionLabel, getOptionValue} from '$lib/utils';

  onMount(async () => {
    teachingUnits.set(await getTeachingUnits());
    studyPrograms.set(await getStudyPrograms());
    semesters.set(await getSemesters());
    modules.set(await getModules());
    lecturer.set(await getLecturer());
    rooms.set(await getRooms());
  });

  const resetFilters = () => {
    selectedTeachingUnit.set(undefined);
    selectedLecturer.set(undefined);
    selectedModule.set(undefined);
    selectedRoom.set(undefined);
    selectedSemester.set(undefined);
    selectedStudyProgram.set(undefined);
  };
</script>

<div>
    <h1>{$_('filters')}</h1>
    <Autocomplete
            options={$teachingUnitsAsChoiceOptions}
            {getOptionLabel}
            label={$_('teaching-unit')}
            textfield$variant="outlined"
            textfield$style="width: 100%;"
            bind:value={$selectedTeachingUnit}
    ></Autocomplete>
    <Autocomplete
            options={$studyProgramsAsChoiceOptions}
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
            options={$modulesAsChoiceOptions}
            {getOptionLabel}
            label={$_('module')}
            textfield$variant="outlined"
            textfield$style="width: 100%;"
            bind:value={$selectedModule}
    ></Autocomplete>
    <Autocomplete
            options={$lecturerAsChoiceOptions}
            {getOptionLabel}
            label={$_('lecturer')}
            textfield$variant="outlined"
            textfield$style="width: 100%;"
            bind:value={$selectedLecturer}
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
