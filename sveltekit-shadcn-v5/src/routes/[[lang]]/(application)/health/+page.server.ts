import { GET } from '$lib/api/helpers/request';
import { DbHealth, Health } from '../../../api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const apiHealthStatus = await GET(Health, { fetch }).catch(() => false);
	const dbHealthStatus = await GET(DbHealth, { fetch }).catch(() => false);
	return {
		apiHealthStatus,
		dbHealthStatus
	};
};
