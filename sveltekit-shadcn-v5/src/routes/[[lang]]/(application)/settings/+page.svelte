<script lang="ts">
	import { getTitleTemplate } from '$lib/client/configurations/meta-tags';
	import ThemeSettings from '$lib/components/settings/theme/theme.svelte';
	import { locale, t } from '$lib/i18n';
	import { metaTags } from '$lib/stores';
	import { onMount } from 'svelte';
	import type { MetaTagsProps } from 'svelte-meta-tags';

	function setPageMetaTags() {
		const title = t.get('common.settings');
		const description = t.get('seo.pages.settings.description');
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

<ThemeSettings />
