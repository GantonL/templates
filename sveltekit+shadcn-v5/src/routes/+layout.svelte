<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { locale } from '$lib/i18n';
	import type { AvailableLocals } from '$lib/enums/available-locales';
	import { direction } from '$lib/stores';
	import { directionMap } from '$lib/api/configurations/common';
	import SEO from '$lib/components/seo/seo.svelte';
	let { children } = $props();

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

<SEO />
{@render children?.()}
