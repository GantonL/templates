import { writable } from 'svelte/store';
import { t } from './i18n';
import { AppName, BaseUrl } from './api/configurations/common';

export const direction = writable<DirectionSetting>('rl');
function createTitle() {
	const brand = t.get('common.brand.name');
	const { subscribe, set } = writable(brand);
	return {
		subscribe,
		set: (value: string) => {
			set(`${value} • ${brand}`);
		},
		clear: () => {
			set(brand);
		}
	};
}

export const title = createTitle();
export const pageDescription = writable<string>('');
export const article = writable<{ author?: string }>();
export const pageImage = writable<{ url: string; alt: string }>();
export const slug = writable<`/${string}`>('/');
export const squareImage = writable<{ url?: string; alt?: string }>({
	url: `${BaseUrl}/images/logo.png`,
	alt: `${AppName} logo`
});
