<script lang="ts">
	import { MetaTags, type MetaTagsProps } from 'svelte-meta-tags';
	let { data }: { data: MetaTagsProps } = $props();
</script>

<MetaTags {...data} />
