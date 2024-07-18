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
    </Textfield>
    {#if selected.length > 0}
    <Accordion>
        <Panel style="background-color: none;">
            <Header>{selected.length} {label} selected</Header>
            <Content>
                <Set chips={data.filter((d) => selected.indexOf(getOptionValue(d)) >= 0).map((d) => ({k: getOptionLabel(d), v: getOptionValue(d)}))} let:chip input>
                    <Chip on:MDCChip:removal={() => deselectOption(chip.v)} {chip} on:remove={() => alert('Test')} title={chip.k}>
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
                    <Item on:click={() => resetSearch()} title={getOptionLabel(option)}>
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
        /* width: 100%;
        overflow: scroll; */
    }

    :global(.mdc-menu-surface) {
        width: 100%;
    }
</style>