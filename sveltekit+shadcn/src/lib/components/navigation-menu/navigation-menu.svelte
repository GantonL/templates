<script lang="ts">
	import { ChevronsLeft, ChevronsRight } from "lucide-svelte";
  import Button from "../ui/button/button.svelte";
  import { Separator } from "../ui/separator";
  import { NavigationItemsConfiguration, MoreNavigationItems } from "./configuration";
	import NavigationItem from "./navigation-item.svelte";
	import type { Layout } from "$lib/types/layout";
  export let currentPath: string;
  export let expanded: boolean = true;
  export let layout: Layout = 'vertical-left';

  function getLayoutClasses(layout: Layout) {
    switch (layout) {
      case 'vertical-left':
        return 'items-start border-r flex-col h-full gap-2 p-2';
      case 'horizontal-bottom':
        return 'flex-row border bg-primary-foreground rounded-md gap-1 p-1';
      case 'horizontal-top':
        return 'flex-row border rounded-md gap-1 p-1';
      default:
        return '';
    }
  }
  let layoutClasses: string;
  $: layoutClasses = getLayoutClasses(layout);
</script>
<nav class="flex {layoutClasses}">
  {#key expanded}
    {#key currentPath}
      {#each NavigationItemsConfiguration as navItem}
        <NavigationItem navLink={navItem} active={navItem.link === currentPath} {expanded}/>
      {/each}
      {#if layout === 'vertical-left'}
        <div class="flex-grow"></div>
        <Button variant="outline" class="w-full" on:click={() => expanded = !expanded}>
          {#if expanded}
            <ChevronsLeft size=16/>
          {:else}
            <ChevronsRight size=16/>
          {/if}
        </Button>
        <Separator />
        {#each MoreNavigationItems as navItem}
          <NavigationItem navLink={navItem} active={navItem.link === currentPath} {expanded}/>
        {/each}
      {/if}
    {/key}
  {/key}
</nav>