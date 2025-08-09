<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { locale } from '$lib/i18n';
	import type { AvailableLocals } from '$lib/enums/available-locales';
	import { direction, metaTags } from '$lib/stores';
	import { directionMap } from '$lib/api/configurations/common';
	import SEO from '$lib/components/seo/seo.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { deepMerge } from 'svelte-meta-tags';
	import { page } from '$app/state';

	let { children, data } = $props();
	let mergedMetaTags = $derived(
		deepMerge(data.baseMetaTags, deepMerge(page.data.pageMetaTags, $metaTags))
	);

	onMount(() => {
		locale.subscribe((seletedLocale) => {
			updateDirection(seletedLocale as AvailableLocals);
		});
	});

	function updateDirection(locale: AvailableLocals) {
		if (!locale) {
			return;
		}
		if (document) {
			const dir = directionMap[locale] ?? $direction;
			document.dir = dir === 'lr' ? 'ltr' : 'rtl';
			direction.set(dir);
		}
	}
</script>

<Toaster expand={true} richColors={true} dir={$direction === 'lr' ? 'ltr' : 'rtl'} />
<SEO data={mergedMetaTags} />
<ModeWatcher />
{@render children?.()}
