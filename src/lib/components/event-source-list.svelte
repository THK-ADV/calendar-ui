<script lang="ts">
	import { _ } from 'svelte-i18n';
	import List, { Item, Label, Graphic } from '@smui/list';
	import Checkbox from '@smui/checkbox';
	import { selectedDataSources } from '$lib/store';
</script>

<div>
	<h1>{$_('data-sources')}</h1>
	<List class="demo-list" checkList>
		<Item>
			<Graphic>
				<Checkbox bind:group={$selectedDataSources} value="schedule" />
			</Graphic>
			<Label>{$_('data-sources-translations.schedule')}</Label>
		</Item>
		<Item>
			<Graphic>
				<Checkbox bind:group={$selectedDataSources} value="semester" />
			</Graphic>
			<Label>{$_('data-sources-translations.semester')}</Label>
		</Item>
		<Item>
			<Graphic>
				<Checkbox bind:group={$selectedDataSources} value="holidays" />
			</Graphic>
			<Label>{$_('data-sources-translations.holidays')}</Label>
		</Item>
		<Item disabled>
			<Graphic>
				<Checkbox bind:group={$selectedDataSources} value="exams" disabled />
			</Graphic>
			<Label>{$_('data-sources-translations.exams')}</Label>
		</Item>
		<Item disabled>
			<Graphic>
				<Checkbox bind:group={$selectedDataSources} value="campus-events" disabled />
			</Graphic>
			<Label>{$_('data-sources-translations.campus-events')}</Label>
		</Item>
	</List>
</div>

<style>
	div {
		padding: 1em;
	}
</style>
