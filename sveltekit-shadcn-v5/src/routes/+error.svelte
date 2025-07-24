<script lang="ts">
	import { page } from '$app/state';
	import { getTitleTemplate } from '$lib/client/configurations/meta-tags';
	import * as Alert from '$lib/components/ui/alert';
	import { locale, t } from '$lib/i18n';
	import { metaTags } from '$lib/stores';
	import { CircleAlert } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import type { MetaTagsProps } from 'svelte-meta-tags';

	const errorNumberMessage = t.get('common.error_number', { number: page?.status ?? 500 });

	function setPageMetaTags() {
		const title = errorNumberMessage;
		const metaTagsObject = Object.freeze({
			title,
			titleTemplate: getTitleTemplate()
		}) satisfies MetaTagsProps;
		metaTags.set(metaTagsObject);
	}

	onMount(() => {
		locale.subscribe(setPageMetaTags);
	});
</script>

<div class="flex h-80 items-center justify-center">
	{#if page?.error}
		<div class="flex flex-col">
			<Alert.Root variant="destructive" class="border-destructive/50">
				<CircleAlert />
				<Alert.Title>{errorNumberMessage}</Alert.Title>
				<Alert.Description>
					<p>{$t(`common.status_code_error.${page.status}.description`)}</p>
				</Alert.Description>
			</Alert.Root>
		</div>
	{/if}
</div>
