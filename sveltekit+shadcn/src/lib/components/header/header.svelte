<script lang="ts">
	import ThemeSwitcher from "../ui/theme-switcher/theme-switcher.svelte";
</script>
<header class="flex flex-row justify-between px-4 pt-4">
  <span>
    <a href="/" class="text-2xl font-extrabold max-md:text-xl">My brand</a>
  </span>
  <span class="flex flex-row gap-2">
    <ThemeSwitcher />
  </span>
</header>