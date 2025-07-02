import { writable } from 'svelte/store';
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
