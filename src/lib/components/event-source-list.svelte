<script lang="ts">
  import List, { Item, Label, Graphic } from '@smui/list'
  import Checkbox from '@smui/checkbox'

  let selected: Array<string> = ['Stundenplanung'];
  let changeEvent: CustomEvent<{ changedIndices: number[] }> | null;
 
  let clicked = 'nothing yet';
</script>

<div>
  <h1>Quellen</h1>
  <List
  class="demo-list"
  checkList
  on:SMUIList:selectionChange={(event) => (changeEvent = event)}
  >
    <Item>
      <Graphic>
        <Checkbox bind:group={selected} value="Stundenplanung" />
      </Graphic>
      <Label>Stundenplan</Label>
    </Item>
    <Item>
      <Graphic>
        <Checkbox bind:group={selected} value="Prüfungsplan" />
      </Graphic>
      <Label>Prüfungsplan</Label>
    </Item>
    <Item>
      <Graphic>
        <Checkbox bind:group={selected} value="Campus Events" />
      </Graphic>
      <Label>Campus Events</Label>
    </Item>
    <Item>
      <Graphic>
        <Checkbox bind:group={selected} value="Feiertage" />
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