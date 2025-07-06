import { writable } from 'svelte/store';
import { AppName, BaseUrl } from './api/configurations/common';
import { t } from './i18n';

export const direction = writable<DirectionSetting>('rl');
function createTitle() {
	const { subscribe, set } = writable('');
	return {
		subscribe,
		set: (value: string) => {
			set(`${value} • ${t.get('common.brand.name')}`);
		},
		clear: () => {
			set(t.get('common.brand.name'));
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
