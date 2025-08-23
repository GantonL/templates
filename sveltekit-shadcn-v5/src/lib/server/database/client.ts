import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';

export const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client);

export const checkConnection = async () => {
	return await db.execute(sql`SELECT version()`);
};
