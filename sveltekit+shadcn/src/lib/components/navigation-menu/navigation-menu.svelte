<script lang="ts">
	import { Separator } from "../ui/separator";
  import { NavigationItemsConfiguration, MoreNavigationItems } from "./configuration";
	import NavigationItem from "./navigation-item.svelte";
  export let currentPath: string;
  export let expanded: boolean;

</script>
<nav class="border-r flex flex-col items-start gap-2 h-full p-2">
  {#key expanded}
    {#key currentPath}
      {#each NavigationItemsConfiguration as navItem}
        <NavigationItem navLink={navItem} active={navItem.link === currentPath} {expanded}/>
      {/each}
      <div class="flex-grow"></div>
      <Separator />
      {#each MoreNavigationItems as navItem}
        <NavigationItem navLink={navItem} active={navItem.link === currentPath} {expanded}/>
      {/each}
    {/key}
  {/key}
</nav>