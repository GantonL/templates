export interface CookieCategory {
	name: 'essential' | 'analytics' | 'advertising';
	optional: boolean;
	description: string;
	accepted: boolean;
	cookies?: string[];
}

export interface ManageCookiesConfiguration {
	'user-preference-cookie-name': `${string}-user-preferences`;
	'user-preference-cookies-expiry-days': number;
	'show-manage-cookies-banner': boolean;
	'cookies-categories': CookieCategory[];
}
