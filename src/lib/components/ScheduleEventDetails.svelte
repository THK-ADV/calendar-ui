<script lang="ts">
  import { _ } from "svelte-i18n"
  import IconButton from "@smui/icon-button"
  import Dialog, { Content, Header, Title } from "@smui/dialog"
  import { buildLecturersLabel, buildRoomsLabel } from "$lib/utils"
  import environment from "$lib/environment"
  import { scheduleEvents } from "$lib/store.svelte"

  const moduleUrl = environment.modulesBaseUrl

  // eslint-disable-next-line no-undef
  const close = (e: CustomEvent<{ action: string }>) => {
    if (e.detail.action === "close") {
      scheduleEvents.deselect()
    }
  }
</script>

{#if scheduleEvents.selected}
  <Dialog
    fullscreen
    open={true}
    onSMUIDialogClosed={close}
    aria-labelledby="schedule-event-title"
    aria-describedby="schedule-event-content"
  >
    <Header>
      <Title id="fullscreen-title"
        >{scheduleEvents.selected.module.label} ({scheduleEvents.selected
          .courseLabel})</Title
      >
      <IconButton action="close" class="material-icons">close</IconButton>
    </Header>
    <Content id="fullscreen-content">
      <div
        title={scheduleEvents.selected.module.label}
        style="display: flex; flex-direction: column; height: 100%; padding: 1em; gap: 1em; overflow: hidden;"
      >
        <div style="display: flex; flex-direction: column;">
          <span
            style="display: flex; flex-direction: row; align-items: center; gap: .5em;"
            ><span class="material-icons" style="font-size: 1.5em;">room</span
            >{buildRoomsLabel(scheduleEvents.selected.rooms)}</span
          >
          <span
            style="display: flex; flex-direction: row; align-items: start; gap: .5em;"
            ><span class="material-icons" style="font-size: 1.5em;">person</span
            >{buildLecturersLabel(scheduleEvents.selected.supervisor)}</span
          >
          <span
            style="display: flex; flex-direction: row; align-items: start; gap: .5em;"
            ><span class="material-icons" style="font-size: 1.5em;"
              >open_in_new</span
            ><a
              href={`${moduleUrl}/modules/${scheduleEvents.selected.module.id}`}
              target="_blank">{$_("module-details")}</a
            ></span
          >
          <span
            style="display: flex; flex-direction: row; align-items: start; gap: .5em;"
            ><span class="material-icons" style="font-size: 1.5em;">people</span
            >
            <ul style="list-style: none;">
              {#each scheduleEvents.selected.studyProgram as studyProgram}
                <li>{studyProgram.label}</li>
              {/each}
            </ul>
          </span>
        </div>
      </div>
    </Content>
  </Dialog>
{/if}
