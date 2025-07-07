<script lang="ts">
	import { locale } from '$lib/i18n';
	import { onMount, type Component } from 'svelte';
	let readyToRender = false;
	let CookiesPolicy: Component;
	onMount(async () => {
		CookiesPolicy = (await import(`$lib/resources/markdown/${locale.get()}/cookies-policy.md`))
			.default;
		readyToRender = true;
	});
</script>

{#if readyToRender}
	<CookiesPolicy />
{/if}
