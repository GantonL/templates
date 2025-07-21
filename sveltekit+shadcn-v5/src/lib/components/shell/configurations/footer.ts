import { AvailableLocals } from '$lib/enums/available-locales';
import type { ComboboxConfiguration } from '$lib/models/combobox';

export const LanguageSelectorConfiguration: ComboboxConfiguration = {
	options: [
		{
			value: AvailableLocals.Hebrew,
			label: `common.locales.${AvailableLocals.Hebrew}`
		},
		{
			value: AvailableLocals.English_US,
			label: `common.locales.${AvailableLocals.English_US}`
		}
	],
	placeholder: 'common.select_language',
	event: 'language_changed'
};
