<script lang="ts">
	import { page } from '$app/state';
	import BasePage from '$lib/components/base-page/base-page.svelte';
</script>

<BasePage title="common.protected" description="seo.pages.example.description">
	{JSON.stringify(page.data.user, null, 4)}
</BasePage>
