<script lang="ts">
    import { onMount } from 'svelte';
    import Checkbox from '@smui/checkbox';
    import IconButton from '@smui/icon-button';
    import List, { Item, Meta, Label } from '@smui/list';
    import MenuSurface from '@smui/menu-surface';
    import Textfield from '@smui/textfield';
	import type { ChoiceOption } from '$lib/types';
    import Chip, { Set, TrailingAction, Text } from '@smui/chips';

    export let data, namePlural, selected = [], getOptionLabel: (co: ChoiceOption) => string, getOptionValue: (co: ChoiceOption) => string;

    let menu,
        searching = false,
        textBoxValue = "",
        visible = [];

    const debounce = (cb, interval, immediate) => {
        var timeout;

        return function() {
            var context = this, args = arguments;
            var later = function() {
            timeout = null;
            if (!immediate) cb.apply(context, args);
            };          

            var callNow = immediate && !timeout;

            clearTimeout(timeout);
            timeout = setTimeout(later, interval);

            if (callNow) cb.apply(context, args);
        };
    }

    const handleSelectAll = (e) => {
        selected = e.target.checked ? data.map(c => c.id) : [];
    }

    const handleTextChange = (e) => {
        // reset search when text is blank or Esc key pressed
        if (textBoxValue === "" || e.keyCode == 27) {
            textBoxValue = "";
            searching = false;
            visible = data.map(d => d.id);
        } else {
            searching = true;
            visible = data.filter(d => d.name.toLowerCase().includes(textBoxValue.toLowerCase())).map(d => d.id);
        }
    }

    $: allSelected = selected.length === data.length;

    onMount(() => {
        visible = data.map(d => getOptionValue(d));
    });
</script>

<div class="multi_select_menu">
    <Textfield 
        variant="outlined" 
        label="{selected.length > 0 ? selected.length + ' ' + namePlural + ' selected' : 'Select ' + namePlural}"
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
            <Set chips={[{ k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, { k: 1, v: 'Apple' }, ]} let:chip key={(chip) => chip.k} input>
                <Chip {chip}>
                    <Text>{chip.k}</Text>
                    <TrailingAction icon$class="material-icons">cancel</TrailingAction>
                </Chip>
            </Set>
        
    </Textfield>
    <MenuSurface bind:this={menu} anchorCorner="BOTTOM_LEFT">
        <List checkList>
            {#if !searching}
                <Item>
                    <Label>{ allSelected === true ? "Unselect All" : "Select All" }</Label>
                    <Meta>
                      <Checkbox bind:checked={allSelected} on:click="{handleSelectAll}" />
                    </Meta>
                </Item>
            {/if}
            {#each data as option}
                {#if visible.includes(getOptionValue(option))}
                    <Item>
                      <Label>{getOptionLabel(option)}</Label>
                      <Meta>
                        <Checkbox bind:group={selected} value={getOptionValue(option)} />
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