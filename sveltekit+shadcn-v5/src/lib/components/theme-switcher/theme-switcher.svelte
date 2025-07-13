<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Moon, Sun } from '@lucide/svelte';
	import { toggleMode } from 'mode-watcher';
</script>

<Button onclick={toggleMode} variant="outline" size="icon" class="aspect-square">
	<Sun
		class="h-[1.2rem] w-[1.2rem] scale-0 rotate-0 transition-all dark:scale-100 dark:-rotate-90"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
