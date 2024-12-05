<script lang="ts">
  import { _ } from "svelte-i18n"
  import Autocomplete from "@smui-extra/autocomplete"
  import Button from "@smui/button"
  import type { ChoiceOption } from "$lib/types"
  import { filter } from "$lib/store.svelte"
  import { onMount } from "svelte"
  import { buildStudyProgramLabel } from "$lib/utils"

  onMount(async () => {
    await filter.init()
  })

  const getOptionLabel = (option: ChoiceOption) => option?.label ?? ""

  const teachingUnitOptions: ChoiceOption[] = $derived.by(() => {
    return filter.teachingUnits.map((a) => ({ label: a.label, value: a.id }))
  })

  const studyProgramOptions: ChoiceOption[] = $derived.by(() => {
    const selectedTu = filter.selectedTeachingUnit
    const filteredStudyPrograms = selectedTu
      ? filter.studyPrograms.filter(
          ({ teachingUnit }) => teachingUnit === selectedTu.value
        )
      : filter.studyPrograms
    return filteredStudyPrograms.map((a) => ({
      label: buildStudyProgramLabel(a),
      value: a.id
    }))
  })

  const semesterOptions: ChoiceOption[] = $derived.by(() => {
    return filter.semesters.map((a) => ({
      label: `${a.label}. Semester`,
      value: a.id
    }))
  })

  const lecturerOptions: ChoiceOption[] = $derived.by(() => {
    return filter.lecturer.map((a) => ({
      label: `${a.firstname} ${a.lastname}`,
      value: a.id
    }))
  })

  const roomOptions: ChoiceOption[] = $derived.by(() => {
    return filter.rooms.map((a) => ({
      label: `${a.identifier} (${a.label})`,
      value: a.id
    }))
  })

  const moduleOptions: ChoiceOption[] = $derived.by(() => {
    const selectedTu = filter.selectedTeachingUnit
    const selectedSp = filter.selectedStudyProgram
    return filter.modules
      .filter(({ studyPrograms }) => {
        const matchesTeachingUnit =
          selectedTu === undefined ||
          studyPrograms.some(
            ({ teachingUnit }) => teachingUnit === selectedTu.value
          )
        const matchesStudyProgram =
          selectedSp === undefined ||
          studyPrograms.some(({ id }) => id === selectedSp.value)
        return matchesTeachingUnit && matchesStudyProgram
      })
      .map((a) => ({
        label: a.label,
        value: a.id
      }))
  })
</script>

<div>
  <h1>{$_("filters")}</h1>
  <Autocomplete
    options={teachingUnitOptions}
    {getOptionLabel}
    label={$_("teaching-unit")}
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={filter.selectedTeachingUnit}
  ></Autocomplete>
  <Autocomplete
    options={studyProgramOptions}
    {getOptionLabel}
    label={$_("study-program")}
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={filter.selectedStudyProgram}
  ></Autocomplete>
  <Autocomplete
    options={semesterOptions}
    {getOptionLabel}
    label={$_("semester")}
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={filter.selectedSemester}
  ></Autocomplete>
  <Autocomplete
    options={moduleOptions}
    {getOptionLabel}
    label={$_("module")}
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={filter.selectedModule}
  ></Autocomplete>
  <Autocomplete
    options={lecturerOptions}
    {getOptionLabel}
    label={$_("lecturer")}
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={filter.selectedLecturer}
  ></Autocomplete>
  <Autocomplete
    options={roomOptions}
    {getOptionLabel}
    label={$_("room")}
    textfield$variant="outlined"
    textfield$style="width: 100%;"
    bind:value={filter.selectedRoom}
  ></Autocomplete>
  <Button variant="outlined" onclick={filter.clear}
    >{$_("clear-filters")}</Button
  >
</div>

<style>
  div {
    padding: 1em;
    gap: 1em;
    display: flex;
    flex-direction: column;
  }
</style>
