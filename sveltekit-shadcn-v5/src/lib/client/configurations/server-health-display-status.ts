import type { ServerHealthDisplayStatus } from '$lib/models/server-health-display-status';
import { Server, ServerOff, Zap, ZapOff } from '@lucide/svelte';

export const displayStatusConfiguration: ServerHealthDisplayStatus[] = [
	{
		key: 'apiHealthStatus',
		message: {
			success: 'common.api_healthy',
			error: 'common.api_unhealthy'
		},
		description: 'common.api_helath_description',
		icon: {
			success: Zap,
			error: ZapOff
		}
	},
	{
		key: 'dbHealthStatus',
		message: {
			success: 'common.db_healthy',
			error: 'common.db_unhealthy'
		},
		description: 'common.db_helath_description',
		icon: {
			success: Server,
			error: ServerOff
		}
	}
];
