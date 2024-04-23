<script lang="ts">
  import List, { Item, Label, Graphic } from '@smui/list'
  import Checkbox from '@smui/checkbox'
  import { selectedDataSources } from '$lib/store'
</script>

<div>
  <h1>Quellen</h1>
  <List
  class="demo-list"
  checkList>
    <Item>
      <Graphic>
        <Checkbox bind:group={$selectedDataSources} value="Stundenplanung" />
      </Graphic>
      <Label>Stundenplan</Label>
    </Item>
    <Item>
      <Graphic>
        <Checkbox bind:group={$selectedDataSources} value="Prüfungsplan" />
      </Graphic>
      <Label>Prüfungsplan</Label>
    </Item>
    <Item>
      <Graphic>
        <Checkbox bind:group={$selectedDataSources} value="Campus Events" />
      </Graphic>
      <Label>Campus Events</Label>
    </Item>
    <Item>
      <Graphic>
        <Checkbox bind:group={$selectedDataSources} value="Feiertage" />
      </Graphic>
      <Label>Feiertage</Label>
    </Item>
  </List>
</div>

<style>
  div {
    padding: 1em;
  }
</style>