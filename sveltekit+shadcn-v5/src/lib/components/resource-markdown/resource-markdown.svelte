<script lang="ts">
	import { locale } from '$lib/i18n';
	import { onMount, type Component } from 'svelte';
	let { path }: { path: string } = $props();
	let readyToRender = $state(false);
	let Content: Component | undefined = $state();
	onMount(async () => {
		Content = (await import(`$lib/resources/markdown/${locale.get()}/${path}.md`)).default;
		readyToRender = true;
	});
</script>

<article class="prose text-secondary-foreground text-justify">
	{#if readyToRender}
		<Content />
	{/if}
</article>
