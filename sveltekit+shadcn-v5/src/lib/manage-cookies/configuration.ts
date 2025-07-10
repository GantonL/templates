import { AppName } from '$lib/api/configurations/common';
import { t } from '$lib/i18n';
import type { ManageCookiesConfiguration } from '$lib/models/manage-cookies-configuration';

export const CookieManagerConfiguration: ManageCookiesConfiguration = {
	'user-preference-cookie-name': `${AppName.split(' ').join('-')}-user-preferences`,
	'show-manage-cookies-banner': true,
	'user-preference-cookies-expiry-days': 365,
	'cookies-categories': [
		{
			name: 'essential',
			optional: false,
			accepted: true,
			description: 'common.essential_cookies_description',
			cookies: ['essential-cookie']
		},
		{
			name: 'analytics',
			optional: true,
			accepted: true,
			description: 'common.analytics_cookies_description',
			cookies: ['_ga', '_gtm']
		},
		{
			name: 'advertising',
			optional: true,
			accepted: true,
			description: 'common.advertising_cookies_description',
			cookies: ['advertising-cookie']
		}
	]
};
