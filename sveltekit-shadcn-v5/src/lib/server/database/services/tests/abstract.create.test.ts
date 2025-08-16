import { describe, it, expect, afterEach, beforeAll, afterAll } from 'vitest';
import { sql } from 'drizzle-orm';
import { testDb, checkTestConnection } from './test-client';
import { testUsers, type TestUser, type TestUserInsert } from './test-schema';
import { AbstractService } from '../abstract';

describe('AbstractService', () => {
	let service: AbstractService<typeof testUsers, TestUser, TestUserInsert>;

	beforeAll(async () => {
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

		// Create service instance
		service = new AbstractService(testDb, testUsers);
	});

	afterEach(async () => {
		// Clean up test data
		await testDb.execute(sql`DELETE FROM test_users`);
	});

	afterAll(async () => {
		// Clean up test table
		await testDb.execute(sql`DROP TABLE test_users`);
	});

	describe('create', () => {
		it('should create a new record and return it', async () => {
			// Arrange
			const insertData: TestUserInsert = {
				name: 'John Doe',
				email: 'john@example.com'
			};

			// Act
			const result = await service.create(insertData);

			// Assert
			expect(result).toBeDefined();
			expect(result.id).toBeTypeOf('number');
			expect(result.name).toBe('John Doe');
			expect(result.email).toBe('john@example.com');
			expect(result.createdAt).toBeInstanceOf(Date);
		});

		it('should handle multiple creates correctly', async () => {
			// Arrange
			const insertData1: TestUserInsert = {
				name: 'Jane Smith',
				email: 'jane@example.com'
			};
			const insertData2: TestUserInsert = {
				name: 'Bob Johnson',
				email: 'bob@example.com'
			};

			// Act
			const result1 = await service.create(insertData1);
			const result2 = await service.create(insertData2);

			// Assert
			expect(result1.id).not.toBe(result2.id);
			expect(result1.name).toBe(insertData1.name);
			expect(result2.name).toBe(insertData2.name);
		});

		it('should throw an error for duplicate email', async () => {
			// Arrange
			const insertData1: TestUserInsert = {
				name: 'User One',
				email: 'duplicate@example.com'
			};
			const insertData2: TestUserInsert = {
				name: 'User Two',
				email: 'duplicate@example.com'
			};

			// Act & Assert
			await service.create(insertData1);
			await expect(service.create(insertData2)).rejects.toThrow();
		});

		it('should handle findById correctly', async () => {
			// Arrange
			const insertData: TestUserInsert = {
				name: 'Find Me',
				email: 'findme@example.com'
			};

			// Act
			const created = await service.create(insertData);
			const found = await service.findById(created.id);

			// Assert
			expect(found).toBeDefined();
			expect(found?.id).toBe(created.id);
			expect(found?.name).toBe(insertData.name);
			expect(found?.email).toBe(insertData.email);
		});

		it('should return undefined for non-existent ID', async () => {
			// Act
			const result = await service.findById(999);

			// Assert
			expect(result).toBeUndefined();
		});
	});
});
