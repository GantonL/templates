<script lang="ts">
	import { onMount } from 'svelte';
	import '../../app.css';
	import { locale } from '$lib/i18n';
	import type { AvailableLocals } from '$lib/enums/available-locales';
	import { direction, title } from '$lib/stores';
	import { directionMap } from '$lib/api/configurations/common';
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

<svelte:head>
	<title>{$title}</title>
</svelte:head>
{@render children?.()}
