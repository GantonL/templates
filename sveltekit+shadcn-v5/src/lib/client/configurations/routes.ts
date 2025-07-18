import type { Link } from '$lib/models/link';
import { Banana, BookLock, Cookie, Handshake, PersonStanding, AlertTriangle, Settings } from '@lucide/svelte';

export interface GroupedRoutes {
	title: string;
	children: Link[];
	excludeFromMainMenu?: boolean;
}
export const AppRoutes: GroupedRoutes[] = [
	{
		title: 'common.application',
		children: [
			{
				label: 'common.example',
				path: '/example',
				icon: Banana
			},
			{
				label: 'common.settings',
				path: '/settings',
				icon: Settings
			},
			{
				label: 'common.error_boundary',
				path: '/error-boundary',
				icon: AlertTriangle
			}
		]
	},
	{
		title: 'common.site',
		excludeFromMainMenu: true,
		children: [
			{
				label: 'common.cookie_policy',
				path: '/policies/cookies',
				icon: Cookie
			},
			{
				label: 'common.privacy_policy',
				path: '/policies/privacy',
				icon: BookLock
			},
			{
				label: 'common.terms_of_service',
				path: '/policies/terms',
				icon: Handshake
			},
			{
				label: 'common.accessibility_statement',
				path: '/accessibility-statement',
				icon: PersonStanding
			}
		]
	}
];
