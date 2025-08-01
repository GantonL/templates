<script lang="ts">
	import { locale } from '$lib/i18n';
	import { type Component } from 'svelte';
	let { path }: { path: string } = $props();
	let readyToRender = $state(false);
	let Content: Component | undefined = $state();

	$effect.pre(() => {
		setContent();
		locale.subscribe(setContent);
	});

	async function setContent() {
		Content = (await import(`$lib/resources/markdown/${locale.get()}/${path}.md`)).default;
		readyToRender = true;
	}
</script>

<article
	class="prose prose-strong:text-secondary-foreground prose-a:text-secondary-foreground prose-headings:text-secondary-foreground text-secondary-foreground text-justify"
>
	{#if readyToRender}
		<Content />
	{/if}
</article>
