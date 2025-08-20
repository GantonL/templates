import type { PageServerLoad } from './$types';
import { Demo } from '../../../api';

export const load: PageServerLoad = async ({ fetch }) => {
	const usersRes = await fetch(`${Demo}/users`);
	const users = await usersRes.json();
	return { users };
};
