<script lang="ts">
  import "$lib/i18n"
  import ThKoelnBar from "$lib/components/ThKoelnBar.svelte"
  import AppRail from "$lib/components/AppRail.svelte"

  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()
</script>

<div class="app">
  <ThKoelnBar></ThKoelnBar>
  <div class="h-layout">
    <AppRail />
    {@render children?.()}
  </div>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>
