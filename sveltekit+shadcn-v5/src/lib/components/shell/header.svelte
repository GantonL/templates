<script lang="ts">
	import { AppName } from '$lib/api/configurations/common';
	import ThemeSwitcher from '../theme-switcher/theme-switcher.svelte';
</script>

<header class="grid w-full grid-cols-2 border-b p-2">
	<div class="flex flex-row items-center gap-4">
		<a href="/" class="self-center text-2xl font-extrabold">{AppName}</a>
	</div>
	<div class="flex flex-row justify-end gap-2">
		<ThemeSwitcher />
	</div>
</header>
