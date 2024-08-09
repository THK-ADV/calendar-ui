<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Button from '@smui/button';
	import {
		lecturer,
		lecturerAsChoiceOptions,
		modules,
		modulesAsChoiceOptions,
		rooms,
		roomsAsChoiceOptions,
		selectedLecturers,
		selectedModules,
		selectedRooms,
		selectedSemesters,
		selectedStudyPrograms,
		selectedTeachingUnits,
		semesters,
		semestersAsChoiceOptions,
		studyPrograms,
		studyProgramsAsChoiceOptions,
		teachingUnits,
		teachingUnitsAsChoiceOptions
	} from '$lib/store';
	import { onMount } from 'svelte';
	import {
		getLecturer,
		getModules,
		getRooms,
		getSemesters,
		getStudyPrograms,
		getTeachingUnits
	} from '$lib/http';
	import { getOptionLabel, getOptionValue } from '$lib/utils';
	import MultiSelect from './multi-select.svelte';

	onMount(async () => {
		teachingUnits.set(await getTeachingUnits());
		studyPrograms.set(await getStudyPrograms());
		semesters.set(await getSemesters());
		modules.set(await getModules());
		lecturer.set(await getLecturer());
		rooms.set(await getRooms());
	});

	const resetFilters = () => {
		selectedTeachingUnits.set([]);
		selectedLecturers.set([]);
		selectedModules.set([]);
		selectedRooms.set([]);
		selectedSemesters.set([]);
		selectedStudyPrograms.set([]);
	};

	let selected: Array<string> = [];
</script>

<div>
	<h1>{$_('filters')}</h1>
	<MultiSelect
		label={$_('teaching-unit')}
		pluralLabel={$_('teaching-units')}
		data={$teachingUnitsAsChoiceOptions}
		{getOptionLabel}
		{getOptionValue}
		bind:selected={$selectedTeachingUnits}
	></MultiSelect>
	<MultiSelect
		label={$_('study-program')}
		pluralLabel={$_('study-programs')}
		data={$studyProgramsAsChoiceOptions}
		{getOptionLabel}
		{getOptionValue}
		bind:selected={$selectedStudyPrograms}
	></MultiSelect>
	<MultiSelect
		label={$_('semester')}
		pluralLabel={$_('semesters')}
		data={$semestersAsChoiceOptions}
		{getOptionLabel}
		{getOptionValue}
		bind:selected={$selectedSemesters}
	></MultiSelect>
	<MultiSelect
		label={$_('module')}
		pluralLabel={$_('modules')}
		data={$modulesAsChoiceOptions}
		{getOptionLabel}
		{getOptionValue}
		bind:selected={$selectedModules}
	></MultiSelect>
	<MultiSelect
		label={$_('lecturer')}
		pluralLabel={$_('lecturers')}
		data={$lecturerAsChoiceOptions}
		{getOptionLabel}
		{getOptionValue}
		bind:selected={$selectedLecturers}
	></MultiSelect>
	<MultiSelect
		label={$_('room')}
		pluralLabel={$_('rooms')}
		data={$roomsAsChoiceOptions}
		{getOptionLabel}
		{getOptionValue}
		bind:selected={$selectedRooms}
	></MultiSelect>
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
