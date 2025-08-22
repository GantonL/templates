import type { PageServerLoad } from './$types';
import { Demo } from '../../../api';

const baseUrl = `${Demo}/users`;
const countUrl = `${Demo}/count/users`;
export const load: PageServerLoad = async ({ fetch }) => {
	const limit = 10;
	const orderBy = '-createdAt';
	const usersRes = await fetch(`${baseUrl}?limit=${limit}&orderBy=${orderBy}`);
	const users = await usersRes.json();
	const totalRes = await fetch(countUrl);
	const total = await totalRes.json();
	return { users, total };
};
