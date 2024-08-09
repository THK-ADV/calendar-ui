<script lang="ts">
	import { onMount } from 'svelte';
	import Checkbox from '@smui/checkbox';
	import IconButton from '@smui/icon-button';
	import List, { Item, Meta, Label } from '@smui/list';
	import MenuSurface from '@smui/menu-surface';
	import Textfield from '@smui/textfield';
	import type { ChoiceOption } from '$lib/types';
	import Chip, { Set, TrailingAction, Text } from '@smui/chips';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import { _ } from 'svelte-i18n';

	export let label: string;
	export let pluralLabel: string;
	export let data: Array<ChoiceOption>;
	export let selected: Array<ChoiceOption> = [];
	export let getOptionLabel: (co: ChoiceOption) => string;
	export let getOptionValue: (co: ChoiceOption) => string;

	let menu: MenuSurface;
	let searching = false;
	let textBoxValue = '';
	let visible: Array<string> = [];

	function debounce<T extends (...args: any[]) => void>(
		cb: T,
		interval: number,
		immediate: boolean = false
	) {
		let timeout: ReturnType<typeof setTimeout> | null;

		return function <U>(this: U, ...args: Parameters<typeof cb>) {
			const context = this;
			let later = () => {
				timeout = null;
				if (!immediate) cb.apply(context, args);
			};

			const callNow = immediate && !timeout;

			if (typeof timeout === 'number') clearTimeout(timeout);
			timeout = setTimeout(later, interval);

			if (callNow) cb.apply(context, args);
		};
	}

	const handleTextChange = (e?: KeyboardEvent) => {
		// reset search when text is blank or Esc key pressed
		if (textBoxValue === '' || e?.keyCode == 27) {
			textBoxValue = '';
			searching = false;
			visible = data.map((d) => getOptionValue(d));
		} else {
			searching = true;
			visible = data
				.filter((d) => getOptionLabel(d).toLowerCase().includes(textBoxValue.toLowerCase()))
				.map((d) => getOptionValue(d));
		}
	};

	const resetSearch = () => {
		textBoxValue = '';
		visible = data.map((d) => getOptionValue(d));
	};

	const deselectOption = (id: string) => {
		selected = selected.filter(({ value }) => value !== id);
	};

	onMount(() => {
		visible = data.map((d) => getOptionValue(d));
	});
</script>

<div class="multi_select_menu">
	<Textfield
		variant="outlined"
		{label}
		style="width: 100%;"
		bind:value={textBoxValue}
		on:keydown={debounce((args) => handleTextChange(args), 100)}
		on:click={() => {
			handleTextChange()
			menu.setOpen(true);
		}}
	></Textfield>
	{#if selected.length > 0}
		<Accordion>
			<Panel style="background-color: none;">
				<Header>{selected.length} {selected.length === 1 ? label : pluralLabel} {$_('selected')}</Header>
				<Content>
					<Set
						chips={selected.map((d) => ({ k: getOptionLabel(d), v: getOptionValue(d) }))}
						let:chip
						input
					>
						<Chip
							on:MDCChip:removal={() => deselectOption(chip.v)}
							{chip}
							on:remove={() => alert(chip.v)}
							title={chip.k}
						>
							<Text>{chip.k}</Text>
							<TrailingAction icon$class="material-icons">cancel</TrailingAction>
						</Chip>
					</Set>
				</Content>
			</Panel>
		</Accordion>
	{/if}
	<MenuSurface bind:this={menu} anchorCorner="BOTTOM_LEFT">
		<List checkList>
			{#each data as option}
				{#if visible.includes(getOptionValue(option))}
					<Item on:click={() => resetSearch()} title={getOptionLabel(option)}>
						<Label>{getOptionLabel(option)}</Label>
						<Meta>
							<Checkbox bind:group={selected} value={option} />
						</Meta>
					</Item>
				{/if}
			{/each}
		</List>
	</MenuSurface>
</div>

<style>
	* :global(.textfield-button) {
		margin: auto 1px;
	}

	:global(.smui-paper.smui-paper--unelevated) {
		background-color: transparent;
		border: none;
	}

	:global(.smui-paper.smui-paper--unelevated::before) {
		box-shadow: none !important;
	}

	:global(.smui-paper__content) {
		padding: 0 !important;
	}

	:global(.mdc-chip__text) {
		max-width: 200px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: inline-block;
		padding-top: 3px;
	}

	:global(.mdc-menu-surface) {
		width: 100%;
	}
</style>
