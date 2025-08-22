import type { PageServerLoad } from './$types';
import { Demo } from '../../../api';
import { GET } from '$lib/api/helpers/request';
import type { User } from '$lib/server/database/schema';

const usersUrl = `${Demo}/users`;
const countUsersUrl = `${Demo}/count/users`;
export const load: PageServerLoad = async ({ fetch }) => {
	const limit = 10;
	const orderBy = '-createdAt';
	const users = await GET<User>(usersUrl, { fetch, limit, orderBy });
	const total = await GET<number>(countUsersUrl, { fetch });
	return { users, total };
};
