<script lang="ts">
	import { CookieManagerConfiguration } from '$lib/manage-cookies/configuration';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { page } from '$app/state';
	import { cookieSetRequest, hideBanner } from '$lib/manage-cookies/manager';
	import { toast } from 'svelte-sonner';
	import ResourceMarkdown from '$lib/components/resource-markdown/resource-markdown.svelte';
	import { locale, t } from '$lib/i18n';
	import { metaTags } from '$lib/stores';
	import { onMount } from 'svelte';
	import { getTitleTemplate } from '$lib/client/configurations/meta-tags';
	import type { MetaTagsProps } from 'svelte-meta-tags';

	function setPageMetaTags() {
		const title = t.get('common.manage_cookies');
		const description = t.get('seo.pages.manage_cookies.description');
		const metaTagsObject = Object.freeze({
			title,
			titleTemplate: getTitleTemplate(),
			description,
			openGraph: {
				title,
				description
			}
		}) satisfies MetaTagsProps;
		metaTags.set(metaTagsObject);
	}

	onMount(() => {
		locale.subscribe(setPageMetaTags);
	});

	function saveChanges() {
		cookieSetRequest({
			[CookieManagerConfiguration['user-preference-cookie-name']]: JSON.stringify(preferences)
		});
		toast.success(t.get('common.changes_saved'));
		hideBanner();
	}

	function rejectAll() {
		Object.keys(preferences).forEach((key) => {
			preferences[key] = false;
		});
		cookieSetRequest({
			[CookieManagerConfiguration['user-preference-cookie-name']]: JSON.stringify(preferences)
		});
		toast.success(t.get('common.optional_cookies_rejected'));
		hideBanner();
	}

	const preferences = page.data.preferences;
</script>

<h1 class="text-2xl">{$t('common.manage_cookies_preferences')}</h1>
<ResourceMarkdown path="cookies-disclaimer" />
<div class="flex flex-col items-center gap-6">
	{#each CookieManagerConfiguration['cookies-categories'] as cookieCategory (cookieCategory.name)}
		<section
			class="prose prose-xl text-primary prose-headings:text-primary rounded-md border p-2 text-justify"
		>
			<section class="flex flex-row items-center justify-between">
				<h2 class="mt-1 text-xl capitalize">{$t(`common.${cookieCategory['name']}`)}</h2>
				<div class="flex items-center space-x-2">
					{#if cookieCategory['optional']}
						<Switch
							id={cookieCategory['name']}
							bind:checked={preferences[cookieCategory['name']]}
						/>
					{:else}
						<Switch id={cookieCategory['name']} disabled checked />
					{/if}
					<Label for={cookieCategory['name']}>{$t('common.accepted')}</Label>
				</div>
			</section>
			<p>{$t(cookieCategory['description'])}</p>
		</section>
	{/each}
	<section class="flex flex-row items-center justify-center gap-4">
		<Button variant="secondary" size="lg" onclick={saveChanges}>{$t('common.save_changes')}</Button>
		<Button variant="destructive" size="lg" onclick={rejectAll}>{$t('common.reject')}</Button>
	</section>
	<a href="/policies/cookies" class="text-center underline underline-offset-2">
		<span class="flex flex-row items-center gap-2">{$t('common.cookies_policy')}</span>
	</a>
</div>
