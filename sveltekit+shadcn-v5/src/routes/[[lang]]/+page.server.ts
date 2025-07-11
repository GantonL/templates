import { getUserCookiesPreferences } from '$lib/manage-cookies/manager';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	const showManageCookiesPreferences = event.cookies.get('show-manage-cookies-banner');
	const cookieBannerOpen =
		showManageCookiesPreferences === 'true' || showManageCookiesPreferences === undefined;
	return {
		cookieBannerOpen,
		cookiePreferences: getUserCookiesPreferences(event)
	};
};
