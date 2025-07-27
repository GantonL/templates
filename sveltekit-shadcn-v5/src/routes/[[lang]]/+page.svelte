<script lang="ts">
	import ResourceMarkdown from '$lib/components/resource-markdown/resource-markdown.svelte';
	import { locale, t } from '$lib/i18n';
	import { metaTags } from '$lib/stores';
	import { onMount } from 'svelte';
	import type { MetaTagsProps } from 'svelte-meta-tags';

	function setPageMetaTags() {
		const title = t.get('common.brand.name');
		const description = t.get('seo.description');
		const metaTagsObject = Object.freeze({
			title,
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

<ResourceMarkdown path="homepage" />
