<script lang="ts">
	import { BaseDemoUrl } from '$lib/api/configurations/common';
	import { JsonLd, MetaTags, type MetaTagsProps } from 'svelte-meta-tags';
	let { data }: { data: MetaTagsProps } = $props();
</script>

<MetaTags {...data} />
<JsonLd
	schema={{
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: `${BaseDemoUrl}`
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Example',
				item: `${BaseDemoUrl}/example`
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: 'Settings',
				item: `${BaseDemoUrl}/settings`
			}
		]
	}}
/>
