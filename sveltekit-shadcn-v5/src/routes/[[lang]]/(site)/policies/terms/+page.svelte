<script lang="ts">
	import ResourceMarkdown from '$lib/components/resource-markdown/resource-markdown.svelte';
	import { locale, t } from '$lib/i18n';
	import { metaTags } from '$lib/stores';
	import { onMount } from 'svelte';
	import { getTitleTemplate } from '$lib/client/configurations/meta-tags';
	import type { MetaTagsProps } from 'svelte-meta-tags';

	function setPageMetaTags() {
		const title = t.get('common.terms_of_service');
		const description = t.get('seo.pages.terms_of_service.description');
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

<ResourceMarkdown path="site-terms" />
