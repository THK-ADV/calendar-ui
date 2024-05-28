<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import IconButton from '@smui/icon-button';
	// import Drawer, { AppContent, Content, Header, Title, Subtitle } from '@smui/drawer';
	import Dialog, { Content, Header, Title } from '@smui/dialog';
	import type { ScheduleEvent } from '$lib/types';
	import { buildLecturersLabel, buildRoomsLabel } from '$lib/utils';
	export let open: boolean;
	export let scheduleEvent: ScheduleEvent | undefined;
	const dispatch = createEventDispatcher();

	const close = () => {
	  dispatch('closed');
	};
</script>

<Dialog
	{open}
	fullscreen
	on:SMUIDialog:closed={close}
	aria-labelledby="schedule-event-title"
	aria-describedby="schedule-event-content"
>
	<Header>
		<Title id="fullscreen-title"
			>{scheduleEvent?.module.label} ({$_(`course-parts.${scheduleEvent?.courseLabel}`)})</Title
		>
		<IconButton action="close" class="material-icons">close</IconButton>
	</Header>
	<Content id="fullscreen-content">
		<div
			title={scheduleEvent?.module.label}
			style="display: flex; flex-direction: column; height: 100%; padding: 1em; gap: 1em; overflow: hidden;"
		>
			<div style="display: flex; flex-direction: column;">
				<span style="display: flex; flex-direction: row; align-items: center; gap: .5em;"
					><span class="material-icons" style="font-size: 1.5em;">room</span>{scheduleEvent
					  ? buildRoomsLabel(scheduleEvent.rooms)
					  : ''}</span
				>
				<span style="display: flex; flex-direction: row; align-items: start; gap: .5em;"
					><span class="material-icons" style="font-size: 1.5em;">person</span>{scheduleEvent
					  ? buildLecturersLabel(scheduleEvent.supervisor)
					  : ''}</span
				>
				<span style="display: flex; flex-direction: row; align-items: start; gap: .5em;"
					><span class="material-icons" style="font-size: 1.5em;">open_in_new</span><a
						href={'http://lwivs49.gm.fh-koeln.de:8081/modules/' + scheduleEvent?.module.id}
						>{$_('module-details')}</a
					></span
				>
				<span style="display: flex; flex-direction: row; align-items: start; gap: .5em;"
					><span class="material-icons" style="font-size: 1.5em;">people</span>
					<ul style="list-style: none;">
						{#if scheduleEvent}
							{#each scheduleEvent.studyProgram as studyProgram}
								<li>{studyProgram.label}</li>
							{/each}
						{/if}
					</ul>
				</span>
			</div>
		</div>
	</Content>
</Dialog>
