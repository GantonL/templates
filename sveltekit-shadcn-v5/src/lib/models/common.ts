import type { Component } from 'svelte';

export interface EmptyResultsConfiguration {
	label: string;
	icon?: Component;
	action?: {
		label: string;
		event: string;
	};
	class?: string;
}

export interface AppCustomEvent<Data = void> {
	type: string;
	data?: Data;
}
