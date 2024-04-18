<script lang="ts">
  import List, { Item, Meta, Separator, Label, Text, Graphic } from '@smui/list'
  import Checkbox from '@smui/checkbox'

  let selected: Array<string> = [];
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
        <Checkbox bind:group={selected} value="Tom Hanks" />
      </Graphic>
      <Label>Prüfungsplan</Label>
    </Item>
    <Item>
      <Graphic>
        <Checkbox bind:group={selected} value="Jack Nicholson" />
      </Graphic>
      <Label>Campus Events</Label>
    </Item>
    <Item>
      <Graphic>
        <Checkbox bind:group={selected} value="Leonardo DiCaprio" />
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