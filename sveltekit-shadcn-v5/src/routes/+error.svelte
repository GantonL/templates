<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getTitleTemplate } from '$lib/client/configurations/meta-tags';
	import * as Alert from '$lib/components/ui/alert';
	import Button from '$lib/components/ui/button/button.svelte';
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

	function goBack() {
		window.history.back();
	}

	function goHome() {
		goto('/');
	}
</script>

<div class="flex h-svh items-center justify-center">
	{#if page?.error}
		<div class="flex flex-col gap-2">
			<Alert.Root variant="destructive" class="border-destructive/50">
				<CircleAlert />
				<Alert.Title>{errorNumberMessage}</Alert.Title>
				<Alert.Description>
					<p>{$t(`common.status_code_error.${page.status}.description`)}</p>
				</Alert.Description>
			</Alert.Root>
			<section class="flex w-full flex-row gap-2">
				<Button class="grow" variant="outline" onclick={goHome}>
					{$t('common.home')}
				</Button>
				<Button class="grow" variant="outline" onclick={goBack}>
					{$t('common.back')}
				</Button>
			</section>
		</div>
	{/if}
</div>
