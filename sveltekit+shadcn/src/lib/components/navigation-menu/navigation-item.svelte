<script lang="ts">
	import type { NavigationLink } from "$lib/models/navigation-link";

  export let navLink: NavigationLink;
  export let active: boolean;
  export let expanded: boolean;
</script>
<a href={navLink.link} class="flex flex-row items-center gap-2 rounded-md px-4 py-2 w-full hover:bg-secondary" class:bg-primary-foreground={!active} class:bg-secondary={active}>
  {#if navLink.icon}
    <svelte:component this={navLink.icon} size=16/>
  {/if}
  <span class:hidden={!expanded} class="leading-none">{navLink.label}</span>
</a>