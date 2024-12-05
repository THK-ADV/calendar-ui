<script lang="ts">
  import { _ } from "svelte-i18n"
  import List, { Graphic, Item, Label } from "@smui/list"
  import Checkbox from "@smui/checkbox"
  import { eventSourceList, filter } from "$lib/store.svelte"

  let isSemesterPlanDisabled = $derived(
    filter.selectedTeachingUnit === undefined
  )

  $effect(() => {
    if (isSemesterPlanDisabled) {
      eventSourceList.isSemesterPlanSelected = false
    }
  })
</script>

<div>
  <h1>{$_("data-sources")}</h1>
  <List checkList>
    <Item>
      <Graphic>
        <Checkbox bind:checked={eventSourceList.isScheduleSelected} />
      </Graphic>
      <Label>{$_("data-sources-translations.schedule")}</Label>
    </Item>
    <Item disabled={isSemesterPlanDisabled}>
      <Graphic>
        <Checkbox
          bind:checked={eventSourceList.isSemesterPlanSelected}
          disabled={isSemesterPlanDisabled}
        />
      </Graphic>
      <Label>{$_("data-sources-translations.semester")}</Label>
    </Item>
    <Item>
      <Graphic>
        <Checkbox bind:checked={eventSourceList.isHolidaysSelected} />
      </Graphic>
      <Label>{$_("data-sources-translations.holidays")}</Label>
    </Item>
    <!--        <Item disabled>-->
    <!--            <Graphic>-->
    <!--                <Checkbox bind:group={$selectedDataSources} value="exams" disabled/>-->
    <!--            </Graphic>-->
    <!--            <Label>{$_('data-sources-translations.exams')}</Label>-->
    <!--        </Item>-->
    <!--        <Item disabled>-->
    <!--            <Graphic>-->
    <!--                <Checkbox bind:group={$selectedDataSources} value="campus-events" disabled/>-->
    <!--            </Graphic>-->
    <!--            <Label>{$_('data-sources-translations.campus-events')}</Label>-->
    <!--        </Item>-->
  </List>
</div>

<style>
  div {
    padding: 1em;
  }
</style>
