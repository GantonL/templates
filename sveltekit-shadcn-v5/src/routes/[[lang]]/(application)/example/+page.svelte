<script lang="ts">
	import BasePage from '$lib/components/base-page/base-page.svelte';
	import ResourceMarkdown from '$lib/components/resource-markdown/resource-markdown.svelte';
</script>

<BasePage title="common.example" description="seo.pages.example.description">
	{#each Array.from({ length: 10 })}
		<ResourceMarkdown path="lorem-ipsum" />
	{/each}
</BasePage>
