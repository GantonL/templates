<script lang="ts">
  import ThemeSwitcher from "../ui/theme-switcher/theme-switcher.svelte";
	import { AppName } from "$lib/consts";
</script>
<header class="flex flex-row items-center justify-between p-2 border-b">
  <div class="flex flex-row items-center gap-4">
    <!-- Optional brand logo -->
    <a href="/" class="text-2xl font-extrabold self-center">{AppName}</a>
  </div>
  <span class="flex flex-row gap-2">
    <ThemeSwitcher />
  </span>
</header>