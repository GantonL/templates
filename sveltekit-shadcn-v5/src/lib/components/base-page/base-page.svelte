<script lang="ts">
	import { getTitleTemplate } from '$lib/client/configurations/meta-tags';
	import { locale, t } from '$lib/i18n';
	import type { BasePageProps } from '$lib/models/base-page';
	import { metaTags } from '$lib/stores';
	import { onMount } from 'svelte';
	import type { MetaTagsProps } from 'svelte-meta-tags';
	import type { Snippet } from 'svelte';

	let { title, description, children }: BasePageProps & { children?: Snippet } = $props();

	function setPageMetaTags() {
		const pageTitle = t.get(title);
		const pageDescription = t.get(description);
		const metaTagsObject = Object.freeze({
			title: pageTitle,
			titleTemplate: getTitleTemplate(),
			description: pageDescription,
			openGraph: {
				title: pageTitle,
				description: pageDescription
			}
		}) satisfies MetaTagsProps;
		metaTags.set(metaTagsObject);
	}

	onMount(() => {
		locale.subscribe(setPageMetaTags);
	});
</script>

{@render children?.()}
