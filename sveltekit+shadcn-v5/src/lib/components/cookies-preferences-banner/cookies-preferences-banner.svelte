<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import Button from '../ui/button/button.svelte';
	import { CookieManagerConfiguration } from '$lib/manage-cookies/configuration';
	import { cookieSetRequest } from '$lib/manage-cookies/manager';
	import { toast } from 'svelte-sonner';
	import { Cookie } from '@lucide/svelte';
	import { t } from '$lib/i18n';
	import { page } from '$app/state';

	const preferences = page.data.cookiePreferences;
	let open = page.data.cookieBannerOpen;

	function setCookiesPreferences(acceptAll: boolean) {
		Object.keys(preferences).forEach((key) => {
			preferences[key] = acceptAll;
		});
		cookieSetRequest({
			[CookieManagerConfiguration['user-preference-cookie-name']]: JSON.stringify(preferences)
		});
		toast.success('Cookie preferences saved');
		removeBanner();
	}

	function removeBanner() {
		open = false;
		cookieSetRequest({ ['show-manage-cookies-banner']: JSON.stringify(false) });
	}
</script>

<Card.Root class="fixed bottom-6 left-6 z-50 mr-6 max-w-[420px] p-4 {!open ? 'hidden' : ''}">
	<Card.Header>
		<Card.Title>
			<div class="flex flex-row items-center gap-4">
				<Cookie />
				{$t('common.manage_cookies_preferences')}
			</div>
		</Card.Title>
		<Card.Description>
			By clicking “Accept all cookies”, you agree My Brand can store cookies on your device and
			disclose information in accordance with our
			<a href="/policies/cookies" class="inderline-offset-2 text-muted-foreground underline"
				>Cookie Policy.</a
			>
		</Card.Description>
	</Card.Header>
	<Card.Footer>
		<div class="flex flex-col gap-2">
			<div class="flex flex-row flex-wrap gap-2">
				<Button class="flex-grow" onclick={() => setCookiesPreferences(true)}
					>{$t('common.accept_all_cookies')}</Button
				>
				<Button class="flex-grow" onclick={() => setCookiesPreferences(false)}
					>{$t('common.necessary_cookies_only')}</Button
				>
			</div>
			<Button
				variant="secondary"
				onclick={() => {
					goto('/manage-cookies');
					open = false;
				}}>{$t('common.manage_preferences')}</Button
			>
		</div>
	</Card.Footer>
</Card.Root>
