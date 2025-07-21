import { AvailableLocals } from '$lib/enums/available-locales';

export const localeCookieName = 'locale';
export const defaultLocale = AvailableLocals.English_US;
export const directionMap: Partial<Record<AvailableLocals, DirectionSetting>> = {
	[AvailableLocals.Hebrew]: 'rl',
	[AvailableLocals.English_US]: 'lr'
};
export const getDirection = (locale: AvailableLocals): DirectionSetting => {
	const directionSelection = directionMap[locale] ?? directionMap[defaultLocale]!;
	return directionSelection;
};
export const AppName: string = 'My Brand';
export const SupportEmail: string = 'support@my-brand.com';
export const BaseUrl: string = 'https://my-brand.com';
export const Author: string = 'Guy Lahav';
export const TwitterUsername: string = '@myusername';
export const TwitterSitename: string = '@mysitename';
