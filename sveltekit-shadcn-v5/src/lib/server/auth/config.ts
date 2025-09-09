import { db } from '$lib/server/database/client';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { account, session, user, verification } from '../database/schemas/auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

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
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		}
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
