import type { IconProps } from '@lucide/svelte';
import type { Component } from 'svelte';

export interface Link {
	label: string;
	path: string;
	icon?: Component<IconProps>;
}
