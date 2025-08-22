import type { RequestHandler } from './$types';
import { UsersService as service, getUrlFilters } from '$lib/server/database/services/users';
import { json } from '@sveltejs/kit';
export const GET: RequestHandler = async ({ url }) => {
	const filters = getUrlFilters(url);
	const users = await service.count(filters);
	return json(users);
};
