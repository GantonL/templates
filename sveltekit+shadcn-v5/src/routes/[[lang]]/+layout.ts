import { defaultLocale, getDirection } from '$lib/api/configurations/common';
import type { AvailableLocals } from '$lib/enums/available-locales';
import { Locale } from '../api';
import type { LayoutLoad } from './$types';
import { loadTranslations, locale, locales } from '$lib/i18n';
import { direction } from '$lib/stores';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const localeRes: { locale: AvailableLocals } = await (await fetch(Locale)).json();
	const localeFromCookie = localeRes.locale;
	const localeFromRoute = params['lang'];
	let choosenLocale = localeFromRoute || localeFromCookie;
	if (choosenLocale && !locales.get().includes(choosenLocale)) {
		choosenLocale = defaultLocale;
	}
	locale.set(choosenLocale);
	const newDirection = getDirection(locale.get() as AvailableLocals);
	direction.set(newDirection);
	await loadTranslations(choosenLocale);
	return {
		locale: choosenLocale
	};
};
