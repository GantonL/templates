<script lang="ts">
	import type { NavigationLink } from "$lib/models/navigation-link";
	import type { Layout } from "$lib/types/layout";

  export let navLink: NavigationLink;
  export let active: boolean;
  export let expanded: boolean;
  export let layout: Layout = 'vertical-left';

  let layoutClasses: string;
  $: layoutClasses = layout === 'vertical-left' ? 'w-full' : 'w-fit';
  
</script>
<a href={navLink.link} class="flex flex-row items-center gap-2 rounded-md px-4 py-2 hover:bg-secondary {layoutClasses}" class:bg-primary-foreground={!active} class:bg-secondary={active}>
  {#if navLink.icon}
    <svelte:component this={navLink.icon} size=16/>
  {/if}
  <span class:hidden={!expanded} class="leading-none">{navLink.label}</span>
</a>