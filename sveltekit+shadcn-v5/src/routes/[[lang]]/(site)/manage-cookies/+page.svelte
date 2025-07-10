<script>
	import { CookieManagerConfiguration } from '$lib/manage-cookies/configuration';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { page } from '$app/state';
	import { cookieSetRequest } from '$lib/manage-cookies/manager';
	import { toast } from 'svelte-sonner';
	import { t } from '$lib/i18n';
	import ResourceMarkdown from '$lib/components/resource-markdown/resource-markdown.svelte';
	import { title } from '$lib/stores';
	title.set(t.get('common.manage_cookies_preferences'));
	function saveChanges() {
		cookieSetRequest({
			[CookieManagerConfiguration['user-preference-cookie-name']]: JSON.stringify(preferences)
		});
		toast.success(t.get('common.changes_saved'));
	}

	function rejectAll() {
		Object.keys(preferences).forEach((key) => {
			preferences[key] = false;
		});
		cookieSetRequest({
			[CookieManagerConfiguration['user-preference-cookie-name']]: JSON.stringify(preferences)
		});
		toast.success(t.get('common.optional_cookies_rejected'));
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
		<span class="flex flex-row items-center gap-2">{$t('common.cookie_policy')}</span>
	</a>
</div>
