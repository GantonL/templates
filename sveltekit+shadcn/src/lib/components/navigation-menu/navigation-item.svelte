<script lang="ts">
	import type { NavigationItem } from "./configuration";
  export let navItem: NavigationItem;
  export let active: boolean;
</script>
<a href={navItem.link} class="flex flex-row items-center gap-2 rounded-md px-2 py-1 w-full hover:bg-secondary" class:bg-primary-foreground={!active} class:bg-secondary={active}>
  {#if navItem.icon}
    <svelte:component this={navItem.icon} size=16/>
  {/if}
  <span class="max-lg:hidden">{navItem.label}</span>
</a>