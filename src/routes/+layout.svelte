<script lang="ts">
  import "$lib/i18n"
  import ThKoelnBar from "$lib/components/th-koeln-bar.svelte"
  import CopsAppRail from "$lib/components/cops-app-rail.svelte"
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
