<script lang="ts">
  import ThemeSwitcher from "../ui/theme-switcher/theme-switcher.svelte";
	import { AppName } from "$lib/consts";
	import UserMenu from "../user-menu/user-menu.svelte";
	import type { Layout } from "$lib/types/layout";
	import NavigationMenu from "../navigation-menu/navigation-menu.svelte";

  export let currentPath = '';
  export let layout: Layout | undefined;
</script>
<header class="grid w-full p-2 border-b" class:grid-cols-3={layout === 'horizontal-top'}  class:grid-cols-2={layout !== 'horizontal-top'}>
  <div class="flex flex-row items-center gap-4">
    <!-- Optional brand logo -->
    <a href="/" class="text-2xl font-extrabold self-center">{AppName}</a>
  </div>
  {#if layout === 'horizontal-top'}
    <div class="flex flex-row justify-center">
      <NavigationMenu {currentPath} layout='horizontal-top'/>
    </div>
  {/if}
  <div class="flex flex-row justify-end gap-2">
    <ThemeSwitcher />
    <UserMenu />
  </div>
</header>