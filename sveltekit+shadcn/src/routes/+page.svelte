<script>
	import { page } from "$app/stores";


	import LayoutSwitcher from "$lib/components/layout-switcher/layout-switcher.svelte";
	import { Label } from "$lib/components/ui/label";
	import Switch from "$lib/components/ui/switch/switch.svelte";
	
	$: cookiePreferencesToggled = $page.data.cookieBannerOpen;

	function onCookiePreferences() {
		cookiePreferencesToggled = !cookiePreferencesToggled;
		const body = new FormData();
		body.append('show-manage-cookies-banner', cookiePreferencesToggled || undefined);
		fetch('/manage-cookies', {
			method: 'POST',
			body,
		});
	}
</script>
<h1>Welcome to a SvelteKit+Shadcn template</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>Visit <a href="https://www.shadcn-svelte.com/docs">shadcn-svelte/docs</a> to read the documentation</p>

<LayoutSwitcher />
<div class="flex flex-row gap-2 items-center">
	<Switch id="cookie-preferences-banner" on:click={onCookiePreferences} checked={cookiePreferencesToggled}/>
	<Label for="cookie-preferences-banner">Toggle cookie preferences banner</Label>
</div>