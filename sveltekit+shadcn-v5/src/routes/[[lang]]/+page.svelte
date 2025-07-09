<script lang="ts">
	import ResourceMarkdown from '$lib/components/resource-markdown/resource-markdown.svelte';
	import { title } from '$lib/stores';

	title.clear();
</script>

<ResourceMarkdown path="homepage" />
