import { writable } from 'svelte/store';
import { Themes } from './enums/theme';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const direction = writable<DirectionSetting>('rl');
export const theme = writable(Themes.Default);
export const metaTags = writable<MetaTagsProps>();
