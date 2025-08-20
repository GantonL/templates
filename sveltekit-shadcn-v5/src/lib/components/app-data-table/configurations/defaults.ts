import type { ComboboxConfiguration } from '$lib/models/combobox';

export const pageSizeOptionsConfiguration: ComboboxConfiguration = {
	options: [
		{ label: '10', value: '10' },
		{ label: '25', value: '25' },
		{ label: '50', value: '50' },
		{ label: '75', value: '75' },
		{ label: '100', value: '100' }
	],
	event: 'page_size'
};
