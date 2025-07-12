import type { RequestEvent } from '@sveltejs/kit';
import { CookieManagerConfiguration } from './configuration';
import type { CookieCategory } from '$lib/models/manage-cookies-configuration';
import { ManageCookies } from '../../routes/api';

export function getUserCookiesPreferences(event: RequestEvent) {
	const preferencesCookie = event.cookies.get(
		CookieManagerConfiguration['user-preference-cookie-name']
	);
	if (preferencesCookie) {
		return JSON.parse(preferencesCookie);
	}
	return getDefaultCookiesPreferences();
}

function getDefaultCookiesPreferences() {
	const preferences: { [key: string]: boolean } = {};
	CookieManagerConfiguration['cookies-categories'].forEach((category) => {
		if (category.optional) {
			preferences[category.name] = category.accepted;
		}
	});
	return preferences;
}

export function setCookie(
	event: RequestEvent,
	cookieCategory: CookieCategory['name'],
	cookie: { [key: string]: string }
) {
	const currentPreferences = getUserCookiesPreferences(event);
	if (!currentPreferences[cookieCategory]) {
		return;
	}
	return cookieSetRequest(cookie);
}

export function cookieSetRequest(cookie: { [key: string]: string }) {
	const body = new FormData();
	Object.keys(cookie).forEach((key) => {
		body.append(key, cookie[key]);
	});
	return fetch(ManageCookies, {
		method: 'POST',
		body
	});
}

export function getCookie(
	event: RequestEvent,
	cookieCategory: CookieCategory['name'],
	cookieName: string
): string | undefined {
	const currentPreferences = getUserCookiesPreferences(event);
	if (!currentPreferences[cookieCategory]) {
		return;
	}
	return event.cookies.get(cookieName);
}
