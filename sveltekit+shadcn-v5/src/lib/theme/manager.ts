import { theme } from '$lib/stores';
import { themes, themeStorageKey } from '$lib/client/configurations/theme';
import { Themes } from '$lib/enums/theme';

function getThemeClass(theme: Themes): `theme-${Themes}` {
	return `theme-${theme}`;
}

export const changeTheme = (newTheme: Themes) => {
	theme.set(newTheme);
	document.documentElement.classList.add(getThemeClass(newTheme));
	themes.forEach((t) => {
		if (t.value !== newTheme) {
			document.documentElement.classList.remove(getThemeClass(t.value));
		}
	});
};

export const getTheme = (): Themes => {
	return (localStorage.getItem(themeStorageKey) as Themes) ?? Themes.Default;
};
