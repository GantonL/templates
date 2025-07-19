import type { Link } from '$lib/models/link';
import { Banana, BookLock, Cookie, Handshake, PersonStanding, AlertTriangle } from '@lucide/svelte';

interface GroupedRoutes {
	title: string;
	children: Link[];
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
				label: 'common.error_boundary',
				path: '/error-boundary',
				icon: AlertTriangle
			}
		]
	},
	{
		title: 'common.site',
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
