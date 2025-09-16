import type { Link } from '$lib/models/link';
import {
	Banana,
	BookLock,
	Cookie,
	Handshake,
	PersonStanding,
	AlertTriangle,
	Settings,
	Server,
	DatabaseZap,
	LogIn,
	Signature,
	Shield
} from '@lucide/svelte';

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
			},
			{
				label: 'common.manage_cookies',
				path: '/manage-cookies',
				icon: Cookie,
				authenticationRequired: false
			},
			{
				label: 'common.server_health',
				path: '/health',
				icon: Server,
				authenticationRequired: false
			},
			{
				label: 'common.auth_protected',
				path: '/user',
				icon: Shield
			}
		]
	},
	{
		title: 'common.site',
		excludeFromMainMenu: true,
		children: [
			{
				label: 'common.cookies_policy',
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
	},
	{
		title: 'common.demos',
		children: [
			{
				label: 'common.database_operations',
				path: '/database-operations',
				icon: DatabaseZap,
				authenticationRequired: false
			}
		]
	},
	{
		title: 'common.authentication',
		excludeFromMainMenu: true,
		children: [
			{
				label: 'common.signin',
				path: '/signin',
				icon: LogIn,
				authenticationRequired: false
			},
			{
				label: 'common.signup',
				path: '/signup',
				icon: Signature,
				authenticationRequired: false
			}
		]
	}
];
