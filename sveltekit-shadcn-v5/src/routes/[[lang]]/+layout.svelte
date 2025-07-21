<script lang="ts">
	import Shell from '$lib/components/shell/shell.svelte';
	import CookiesPreferencesBanner from '$lib/components/cookies-preferences-banner/cookies-preferences-banner.svelte';

	let { children } = $props();
</script>

<CookiesPreferencesBanner />
<Shell>
	{@render children?.()}
</Shell>
