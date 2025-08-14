import type { ServerHealthDisplayStatus } from '$lib/models/server-health-display-status';
import { CircleCheckBig, CircleX, Database, Server } from '@lucide/svelte';
import { DbHealth, Health } from '../../../routes/api';

export const displayStatusConfiguration: ServerHealthDisplayStatus[] = [
	{
		key: 'apiHealthStatus',
		path: Health,
		title: 'common.api',
		icon: Server,
		descriptionResourcePath: 'api-health-description',
		status: {
			message: {
				success: 'common.healthy',
				error: 'common.unavailable'
			},
			icon: {
				success: CircleCheckBig,
				error: CircleX
			}
		}
	},
	{
		key: 'dbHealthStatus',
		path: DbHealth,
		title: 'common.database',
		icon: Database,
		descriptionResourcePath: 'db-health-description',
		status: {
			message: {
				success: 'common.healthy',
				error: 'common.unavailable'
			},
			icon: {
				success: CircleCheckBig,
				error: CircleX
			}
		}
	}
];
