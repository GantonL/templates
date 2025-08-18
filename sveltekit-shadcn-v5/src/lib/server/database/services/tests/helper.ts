import { sql } from 'drizzle-orm';
import { checkTestConnection, testDb } from './test-client';

export const initializeDBWithUsersTable = async () => {
	// Verify database connection
	await checkTestConnection();

	// Create the test table
	await testDb.execute(sql`
		CREATE TABLE IF NOT EXISTS test_users (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			email TEXT NOT NULL UNIQUE,
			created_at TIMESTAMP DEFAULT NOW()
		);
	`);
};

export const deleteUsersTableData = async () => {
	// Clean up test data
	await testDb.execute(sql`DELETE FROM test_users`);
};

export const dropUsersTable = async () => {
	// Clean up test table
	await testDb.execute(sql`DROP TABLE test_users`);
};
