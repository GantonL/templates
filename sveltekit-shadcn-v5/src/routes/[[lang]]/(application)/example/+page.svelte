<script lang="ts">
	import { getTitleTemplate } from '$lib/client/configurations/meta-tags';
	import ResourceMarkdown from '$lib/components/resource-markdown/resource-markdown.svelte';
	import { locale, t } from '$lib/i18n';
	import type { MetaTagsProps } from 'svelte-meta-tags';
	import { metaTags } from '$lib/stores';
	import { onMount } from 'svelte';

	function setPageMetaTags() {
		const title = t.get('common.example');
		const description = t.get('seo.pages.example.description');
		const metaTagsObject = Object.freeze({
			title,
			titleTemplate: getTitleTemplate(),
			description,
			openGraph: {
				title,
				description
			}
		}) satisfies MetaTagsProps;
		metaTags.set(metaTagsObject);
	}

	onMount(() => {
		locale.subscribe(setPageMetaTags);
	});
</script>

{#each Array.from({ length: 10 })}
	<ResourceMarkdown path="lorem-ipsum" />
{/each}
