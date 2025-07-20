import { Themes } from '$lib/enums/theme';

export const themeStorageKey = 'theme';
export const themes = [
	{ label: 'common.default', value: Themes.Default },
	{ label: 'common.dirty', value: Themes.Dirty },
	{ label: 'common.vivid', value: Themes.Vivid }
];
