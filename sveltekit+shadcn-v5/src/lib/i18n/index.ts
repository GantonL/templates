import i18n, { type Config } from 'sveltekit-i18n';
import { Locale } from '../../routes/api';
import { defaultLocale } from '$lib/api/configurations/common';

interface Params {
	year: string;
}

/** @type {import('sveltekit-i18n').Config} */
const config: Config<Params> = {
	loaders: [
		{
			locale: 'he',
			key: 'common',
			loader: async () => (await import('./he/common.json')).default
		},
		{
			locale: 'he',
			key: 'seo',
			loader: async () => (await import('./he/seo.json')).default
		},
		{
			locale: 'en-US',
			key: 'common',
			loader: async () => (await import('./en-US/common.json')).default
		},
		{
			locale: 'en-US',
			key: 'seo',
			loader: async () => (await import('./en-US/seo.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations, initialized } = new i18n(config);

export const changeLocale = (newLocale: string) => {
	locale.set(newLocale);
	const formData = new FormData();
	formData.append('locale', newLocale);
	fetch(Locale, { method: 'POST', body: formData });
};

export const property = <T = string>(propertyName: keyof T): keyof T | string => {
	const currentLocal = locale.get();
	const extention = `${currentLocal === defaultLocale ? '' : `_${currentLocal}`}`;
	return `${String(propertyName)}${extention}`;
};
