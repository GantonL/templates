import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';

const TEST_DATABASE_URL = 'postgresql://test_user:test_password@localhost:5433/test_db';

export const testClient = postgres(TEST_DATABASE_URL, { 
	prepare: false,
	max: 1,
	idle_timeout: 20,
	connect_timeout: 10
});

export const testDb = drizzle(testClient);

export const checkTestConnection = async () => {
	return await testDb.execute(sql`SELECT 1 as test`);
};

export const cleanupTestDb = async () => {
	await testClient.end();
};