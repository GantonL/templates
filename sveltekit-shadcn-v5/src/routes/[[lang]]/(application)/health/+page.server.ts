import { DbHealth, Health } from '../../../api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const apiHealthyRes = await fetch(Health);
	const apiHealthStatus = await apiHealthyRes.json();
	const dbHealthyRes = await fetch(DbHealth);
	const dbHealthStatus = await dbHealthyRes.json();
	return {
		apiHealthStatus,
		dbHealthStatus
	};
};
