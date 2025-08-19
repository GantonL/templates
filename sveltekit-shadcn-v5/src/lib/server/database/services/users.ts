import type { Column } from 'drizzle-orm';
import { Users, type UserInsert } from '../schema';
import type { WhereCondition } from './abstract';
import { provider } from './provider';
import {
	getBodyFiltersUtil,
	getUrlFiltersUtil,
	getUrlOptionsUtil,
	type BodyFiltersUtil
} from './utils';

export const UsersService = provider.getFactory().getService(Users);

export const getUrlFilters = (url: URL): WhereCondition<typeof Users>[] => {
	return getUrlFiltersUtil(url, { searchColumns: [Users.name, Users.email] });
};

type UsersFilters = BodyFiltersUtil;
const bodyFiltersConfigurations: Record<keyof UsersFilters, Column> = {
	ids: Users.id
};
export const getBodyFilters = (filters: UsersFilters): WhereCondition<typeof Users>[] => {
	return getBodyFiltersUtil(filters, bodyFiltersConfigurations);
};

export const getUrlOptions = (url: URL) => {
	return getUrlOptionsUtil(url, Users);
};

type NewUser = Pick<UserInsert, 'name' | 'email'>;
export const buildCreateCandidates = (candidates: NewUser[]): NewUser[] => {
	const newUsers: NewUser[] = [];
	candidates.forEach((candidate) => {
		newUsers.push({
			name: candidate.name,
			email: candidate.email
		});
	});
	return newUsers;
};

type UpdateUserData = Pick<UserInsert, 'name' | 'email'>;
export const buildUpdateData = (updateData: UpdateUserData): UpdateUserData => {
	const validatedUpdate: UpdateUserData = {
		name: updateData.name,
		email: updateData.email
	};
	return validatedUpdate;
};
