<script lang="ts">
	import { Breadcrumbs, FAQ } from './configurations/structured-data';
	import { JsonLd, MetaTags, type MetaTagsProps } from 'svelte-meta-tags';
	let { data }: { data: MetaTagsProps } = $props();
</script>

<MetaTags {...data} />
<JsonLd
	schema={{
		'@graph': [Breadcrumbs, FAQ]
	}}
/>
