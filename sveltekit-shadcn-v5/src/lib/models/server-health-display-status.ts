import type { TranslatableString } from '$lib/types/i18n';
import type { Component } from 'svelte';

export interface ServerHealthDisplayStatus {
	key: string;
	path: string;
	title: TranslatableString;
	icon: Component;
	descriptionResourcePath: string;
	status: {
		message: {
			success: TranslatableString;
			error: TranslatableString;
		};
		icon: {
			success: Component;
			error: Component;
		};
	};
}
