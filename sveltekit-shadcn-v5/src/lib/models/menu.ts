import type { ButtonVariant } from '$lib/components/ui/button';
import type { Component } from 'svelte';

export interface MenuActionItem<T = void> {
	title: string;
	event: string;
	icon: Component;
	class?: string;
	disableIf?: (data: T) => boolean;
	variant?: ButtonVariant;
	noTranlationRequired?: boolean;
}

export interface MenuActionItemGroup<T = void> {
	items: MenuActionItem<T>[];
	header?: string;
}

export interface MenuConfiguration<T = void> {
	groups: MenuActionItemGroup<T>[];
	label?: string;
	hideLabelOnSmallScreen?: boolean;
	buttonVariant?: ButtonVariant;
	trigger?: Component;
	triggerClass?: string;
}
