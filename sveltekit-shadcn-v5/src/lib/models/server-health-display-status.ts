import type { TranslatableString } from '$lib/types/i18n';
import type { Component } from 'svelte';

export interface ServerHealthDisplayStatus {
	key: string;
	message: {
		success: TranslatableString;
		error: TranslatableString;
	};
	description: TranslatableString;
	inProgress?: boolean;
	status?: 'ok' | 'error';
	icon?: {
		success: Component;
		error: Component;
	};
}
