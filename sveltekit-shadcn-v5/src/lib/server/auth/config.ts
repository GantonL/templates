import { db } from '$lib/server/database/client';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { account, session, user, verification } from '../database/schemas/auth';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			user,
			session,
			account,
			verification
		}
	}),
	emailAndPassword: {
		enabled: true
	}
});
