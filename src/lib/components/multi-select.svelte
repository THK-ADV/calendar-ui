<script lang="ts">
    import { onMount } from 'svelte';
    import Checkbox from '@smui/checkbox';
    import IconButton from '@smui/icon-button';
    import List, { Item, Meta, Label } from '@smui/list';
    import MenuSurface from '@smui/menu-surface';
    import Textfield from '@smui/textfield';
	import type { ChoiceOption } from '$lib/types';
    import Chip, { Set, TrailingAction, Text } from '@smui/chips';

    export let label: string;
    export let data: Array<ChoiceOption>
    export let selected: Array<string> = []
    export let getOptionLabel: (co: ChoiceOption) => string
    export let getOptionValue: (co: ChoiceOption) => string

    let menu: MenuSurface
    let searching = false
    let textBoxValue = ""
    let visible: Array<string> = []

    const debounce = (cb: ()=>void, interval: number, immediate: boolean = false) => {
        var timeout: number | null;

        return function() {
            let context = this
            let later = function() {
            timeout = null;
            if (!immediate) cb.apply(context, []);
            };          

            let callNow = immediate && !timeout;

            if(timeout) clearTimeout(timeout);
            timeout = setTimeout(later, interval);

            if (callNow) cb.apply(context, []);
        };
    }

    const handleSelectAll = (e: Event) => {
        allSelected = !allSelected
        selected = allSelected ? data.map(c => getOptionValue(c)) : [];
    }

    const handleTextChange = (e?: KeyboardEvent) => {
        // reset search when text is blank or Esc key pressed
        if (textBoxValue === "" || e?.keyCode == 27) {
            textBoxValue = "";
            searching = false;
            visible = data.map(d => getOptionValue(d));
        } else {
            searching = true;
            visible = data.filter(d => getOptionLabel(d).toLowerCase().includes(textBoxValue.toLowerCase())).map(d => getOptionValue(d));
        }
    }

    const resetSearch = () => {
        textBoxValue = ""
        visible = data.map(d => getOptionValue(d));
    }

    const deselectOption = (id: string) => {
        selected = selected.filter((item) => item != id)
    }

    $: allSelected = selected ? selected.length === data.length : false;

    onMount(() => {
        visible = data.map(d => getOptionValue(d));
    });
</script>

<div class="multi_select_menu">
    <Textfield 
        variant="outlined" 
        {label}
        style="width: 100%;"
        bind:value={textBoxValue} 
        on:keydown={debounce(handleTextChange, 100)}
        on:click={() => {menu.setOpen(true)}}>
        <IconButton 
            class="material-icons textfield-button {textBoxValue !== '' ? 'has-value' : ''}" 
            slot="leadingIcon" 
            on:click={() => {if(searching) {textBoxValue = ""; handleTextChange();}}}>
            {textBoxValue !== '' ? 'close' : 'search'}
        </IconButton>
    </Textfield>
    <Set chips={data.filter((d) => selected.indexOf(getOptionValue(d)) >= 0).map((d) => ({k: getOptionLabel(d), v: getOptionValue(d)}))} let:chip input>
        <Chip on:MDCChip:removal={() => deselectOption(chip.v)} {chip} on:remove={() => alert('Test')}>
            <Text>{chip.k}</Text>
            <TrailingAction icon$class="material-icons">cancel</TrailingAction>
        </Chip>
    </Set>
    {selected.length}
    <MenuSurface bind:this={menu} anchorCorner="BOTTOM_LEFT">
        <List checkList>
            {#if !searching}
                <Item on:click={(e) => handleSelectAll(e)}>
                    <Label>{ allSelected === true ? "Unselect All" : "Select All" }</Label>
                    <Meta>
                      <Checkbox bind:checked={allSelected}/>
                    </Meta>
                </Item>
            {/if}
            {#each data as option}
                {#if visible.includes(getOptionValue(option))}
                    <Item on:click={() => resetSearch()}>
                      <Label>{getOptionLabel(option)}</Label>
                      <Meta>
                        <Checkbox bind:group={selected} value={getOptionValue(option)}/>
                      </Meta>
                    </Item>
                {/if}
            {/each}
        </List>
    </MenuSurface>
</div>

<style>
    .multi_select_menu {
        margin: 15px;
    }
    * :global(.textfield-button) {
        margin: auto 1px;
    }
    * :global(.textfield-button:hover .mdc-icon-button__ripple::before),
    * :global(.textfield-button:hover .mdc-icon-button__ripple::after) {
        background: transparent;
    }
    * :global(.textfield-button.has-value:hover .mdc-icon-button__ripple::before),
    * :global(.textfield-button.has-value:hover .mdc-icon-button__ripple::after) {
        background-color: var(--mdc-ripple-color, #000);
    }
</style>