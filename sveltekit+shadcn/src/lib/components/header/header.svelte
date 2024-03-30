<script lang="ts">
	import { Menu, MenuSquare } from "lucide-svelte";
  import ThemeSwitcher from "../ui/theme-switcher/theme-switcher.svelte";
	import Button from "../ui/button/button.svelte";
	import { createEventDispatcher, onMount } from "svelte";
	import { CustomEvents } from "$lib/enums/custom-events";
	import { AppName } from "$lib/consts";
  const dispath = createEventDispatcher();
  let open = true;
  function dispatchMenuToggled() {
    open = !open;
    dispath(CustomEvents.MenuToggled, open);
  }
  onMount(() => {
    dispath(CustomEvents.MenuToggled, open);
  });
</script>
<header class="flex flex-row items-center justify-between p-2 border-b">
  <div class="flex flex-row items-center gap-4">
    <Button variant="ghost" size="icon" class="aspect-square" on:click={dispatchMenuToggled}>
      {#if open}
        <MenuSquare />
      {:else}
        <Menu />
      {/if}
    </Button>
    <a href="/" class="text-2xl font-extrabold self-center">{AppName}</a>
  </div>
  <span class="flex flex-row gap-2">
    <ThemeSwitcher />
  </span>
</header>