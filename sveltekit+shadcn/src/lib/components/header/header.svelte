<script lang="ts">
	import ThemeSwitcher from "../ui/theme-switcher/theme-switcher.svelte";
</script>
<header class="flex flex-row align-center justify-between p-2 border-b">
  <a href="/" class="text-2xl font-extrabold self-center">My Brand</a>
  <span class="flex flex-row gap-2">
    <ThemeSwitcher />
  </span>
</header>