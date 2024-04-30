<script lang="ts">
  import '$lib/i18n'
  import ThKoelnBar from '$lib/components/th-koeln-bar.svelte'
  import CopsAppRail from '$lib/components/cops-app-rail.svelte'
  import { browser } from '$app/environment'
  import { locale, waitLocale } from 'svelte-i18n'

  export const load = async () => {
    if (browser) locale.set(window.navigator.language)
    await waitLocale()
  }
</script>

<div class="app">
  <ThKoelnBar></ThKoelnBar>
  <div class="h-layout">
    <CopsAppRail></CopsAppRail>
    <slot></slot>
  </div>
</div>


<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>