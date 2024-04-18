<script lang="ts">
import { Icon } from '@smui/common';

type CopsAppRailLink = {
  type: 'LINK',
  text: string,
  icon?: string,
  image?: string,
  url: string,
  disabled: boolean
  active?: boolean
};

type CopsAppRailDivider = {
  type: 'DIVIDER',
};

type CopsAppRailSpacer = {
  type: 'SPACER',
};

type CopsAppRailItem = CopsAppRailLink | CopsAppRailDivider | CopsAppRailSpacer;


export let railItems: CopsAppRailItem[] = []
</script>

<div class="app-rail">
  <ul>
    {#each railItems as railItem}
      {#if railItem.type === 'DIVIDER'}<hr>{/if}
      {#if railItem.type === 'SPACER'}<div class="spacer"></div>{/if}
      {#if railItem.type === 'LINK'}
      <li class:disabled={railItem.disabled}  class:active={railItem.active}>
        <a href={railItem.url}>
          {#if railItem.icon}<Icon class="material-icons">{railItem.icon}</Icon>{/if}
          {#if railItem.image}<img src={railItem.image} alt={'icon of' + railItem.text}>{/if}
          <span>{railItem.text}</span>
        </a>
      </li>
      {/if}
    {/each}
  </ul>
</div>

<style>
.app-rail {
  min-width: 7.5em;
  font-size: .9em;
  padding: .5em;
  background-color: #e0e0e0;
  color: rgba(0, 0, 0, 0.87);
  height: 100%;
  & ul {
    display: flex;
    gap: 1em;
    flex-direction: column;
    width: 100%;
    height: 100%;
    list-style-type: none;
    padding: 0;
    & hr {
      margin: 0;
      border-width: 1px;
      background-color: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.1);
    }
    & div.spacer {
      height: 100%;
    }
  }
  & li {
    transition: all .1s ease-in-out;
    &.disabled {
      opacity: .3;
      pointer-events: none;
      background-color: transparent;
    }

    &.active {
      background-color: #efefef;
      border-radius: 10px;
    }

    &:hover {
      background-color: #efefef;
      border-radius: 5px;
    }

    & a {
      color: inherit;
      user-select: none;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      list-style-type: none;
      height: 6em;
      align-items: center;
      justify-content: center;
    }

    & span {
      margin-bottom: -7px;
    }
    & img {
      width: 2.2em;
      margin-bottom: .5em;
    }
  }
}
</style>