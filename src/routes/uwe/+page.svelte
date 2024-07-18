<script lang="ts">
    import MultiSelect from "$lib/components/multi-select.svelte";
    import{
        lecturer,
        lecturerAsChoiceOptions
    } from '$lib/store';
    
    import {getLecturer} from '$lib/http';
    import {onMount} from 'svelte';
    import {getOptionLabel, getOptionValue} from '$lib/utils';

    onMount(async () => {
        lecturer.set(await getLecturer())
        
    })
</script>

<form action="">
    <MultiSelect 
        data={$lecturerAsChoiceOptions} 
        namePlural="Dinge" 
        {getOptionLabel}
        {getOptionValue}
    ></MultiSelect>
    {$lecturerAsChoiceOptions.length}
</form>
