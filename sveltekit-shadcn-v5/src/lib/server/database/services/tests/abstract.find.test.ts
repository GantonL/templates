import { describe, it, expect, afterEach, beforeAll, afterAll, beforeEach } from 'vitest';
import { sql, eq, gt, like, asc, desc } from 'drizzle-orm';
import { testDb, checkTestConnection } from './test-client';
import { testUsers, type TestUser, type TestUserInsert } from './test-schema';
import { AbstractService } from '../abstract';

describe('AbstractService - Find Methods', () => {
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

	describe('find', () => {
		it('should return all records when no conditions are provided', async () => {
			// Arrange
			const testData: TestUserInsert[] = [
				{ name: 'User One', email: 'user1@example.com' },
				{ name: 'User Two', email: 'user2@example.com' },
				{ name: 'User Three', email: 'user3@example.com' }
			];
			await service.createMany(testData);

			// Act
			const results = await service.find();

			// Assert
			expect(results).toHaveLength(3);
			expect(results.map((r) => r.name).sort()).toEqual(['User One', 'User Three', 'User Two']);
		});

		it('should return empty array when no records exist', async () => {
			// Act
			const results = await service.find();

			// Assert
			expect(results).toEqual([]);
		});

		it('should filter records with single SQL condition', async () => {
			// Arrange
			await service.createMany([
				{ name: 'John Doe', email: 'john@example.com' },
				{ name: 'Jane Smith', email: 'jane@example.com' },
				{ name: 'Bob Johnson', email: 'bob@example.com' }
			]);

			// Act
			const results = await service.find(eq(testUsers.name, 'John Doe'));

			// Assert
			expect(results).toHaveLength(1);
			expect(results[0].name).toBe('John Doe');
			expect(results[0].email).toBe('john@example.com');
		});

		it('should filter records with function condition', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Alice Admin', email: 'alice@example.com' },
				{ name: 'Bob User', email: 'bob@example.com' },
				{ name: 'Charlie Admin', email: 'charlie@example.com' }
			]);

			// Act
			const results = await service.find((table) => like(table.name, '%Admin%'));

			// Assert
			expect(results).toHaveLength(2);
			expect(results.map((r) => r.name).sort()).toEqual(['Alice Admin', 'Charlie Admin']);
		});

		it('should handle multiple WHERE conditions with AND logic', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'John Admin', email: 'john@example.com' },
				{ name: 'Jane Admin', email: 'jane@example.com' },
				{ name: 'Bob User', email: 'bob@example.com' }
			]);

			// Act
			const results = await service.find([
				like(testUsers.name, '%Admin%'),
				gt(testUsers.id, users[0].id)
			]);

			// Assert
			expect(results).toHaveLength(1);
			expect(results[0].name).toBe('Jane Admin');
		});

		it('should handle mixed function and SQL conditions', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'Test User 1', email: 'test1@example.com' },
				{ name: 'Test User 2', email: 'test2@example.com' },
				{ name: 'Other User', email: 'other@example.com' }
			]);

			// Act
			const results = await service.find([
				(table) => like(table.name, 'Test%'),
				gt(testUsers.id, users[0].id)
			]);

			// Assert
			expect(results).toHaveLength(1);
			expect(results[0].name).toBe('Test User 2');
		});
	});

	describe('find with QueryOptions', () => {
		beforeEach(async () => {
			// Create test data for pagination and sorting tests
			await service.createMany([
				{ name: 'Alice', email: 'alice@example.com' },
				{ name: 'Bob', email: 'bob@example.com' },
				{ name: 'Charlie', email: 'charlie@example.com' },
				{ name: 'David', email: 'david@example.com' },
				{ name: 'Eve', email: 'eve@example.com' }
			]);
		});

		it('should limit results when limit option is provided', async () => {
			// Act
			const results = await service.find(undefined, { limit: 3 });

			// Assert
			expect(results).toHaveLength(3);
		});

		it('should offset results when offset option is provided', async () => {
			// Act
			const allResults = await service.find();
			const offsetResults = await service.find(undefined, { offset: 2 });

			// Assert
			expect(offsetResults).toHaveLength(3);
			expect(offsetResults[0].id).toBe(allResults[2].id);
		});

		it('should combine limit and offset', async () => {
			// Act
			const results = await service.find(undefined, { limit: 2, offset: 1 });

			// Assert
			expect(results).toHaveLength(2);
		});

		it('should sort results with single orderBy', async () => {
			// Act
			const results = await service.find(undefined, {
				orderBy: asc(testUsers.name)
			});

			// Assert
			expect(results).toHaveLength(5);
			expect(results[0].name).toBe('Alice');
			expect(results[4].name).toBe('Eve');
		});

		it('should sort results with descending order', async () => {
			// Act
			const results = await service.find(undefined, {
				orderBy: desc(testUsers.name)
			});

			// Assert
			expect(results).toHaveLength(5);
			expect(results[0].name).toBe('Eve');
			expect(results[4].name).toBe('Alice');
		});

		it('should sort results with multiple orderBy criteria', async () => {
			// Arrange - Create users with same names to test secondary sort
			await testDb.execute(sql`DELETE FROM test_users`);
			await service.createMany([
				{ name: 'John', email: 'john1@example.com' },
				{ name: 'Alice', email: 'alice1@example.com' },
				{ name: 'John', email: 'john2@example.com' },
				{ name: 'Alice', email: 'alice2@example.com' }
			]);

			// Act
			const results = await service.find(undefined, {
				orderBy: [asc(testUsers.name), desc(testUsers.email)]
			});

			// Assert
			expect(results).toHaveLength(4);
			expect(results[0].name).toBe('Alice');
			expect(results[0].email).toBe('alice2@example.com');
			expect(results[1].name).toBe('Alice');
			expect(results[1].email).toBe('alice1@example.com');
		});

		it('should combine all query options', async () => {
			// Act
			const results = await service.find(undefined, {
				orderBy: asc(testUsers.name),
				limit: 2,
				offset: 1
			});

			// Assert
			expect(results).toHaveLength(2);
			expect(results[0].name).toBe('Bob');
			expect(results[1].name).toBe('Charlie');
		});

		it('should combine conditions with query options', async () => {
			// Act
			const results = await service.find(
				(table) => like(table.name, '%e%'), // Names containing 'e'
				{
					orderBy: desc(testUsers.name),
					limit: 2
				}
			);

			// Assert
			expect(results).toHaveLength(2);
			expect(results[0].name).toBe('Eve');
			expect(results[1].name).toBe('Charlie');
		});
	});

	describe('findAll', () => {
		it('should find all records with required query options', async () => {
			// Arrange
			await service.createMany([
				{ name: 'User A', email: 'a@example.com' },
				{ name: 'User B', email: 'b@example.com' },
				{ name: 'User C', email: 'c@example.com' }
			]);

			// Act
			const results = await service.findAll({
				limit: 10,
				offset: 0,
				orderBy: asc(testUsers.name)
			});

			// Assert
			expect(results).toHaveLength(3);
			expect(results[0].name).toBe('User A');
			expect(results[2].name).toBe('User C');
		});

		it('should respect limit in findAll', async () => {
			// Arrange
			await service.createMany([
				{ name: 'User 1', email: 'user1@example.com' },
				{ name: 'User 2', email: 'user2@example.com' },
				{ name: 'User 3', email: 'user3@example.com' }
			]);

			// Act
			const results = await service.findAll({
				limit: 2,
				offset: 0,
				orderBy: asc(testUsers.id)
			});

			// Assert
			expect(results).toHaveLength(2);
		});

		it('should throw error when findAll limit exceeds MAX_FIND_LIMIT', async () => {
			// Arrange
			await service.create({ name: 'Test User', email: 'test@example.com' });

			// Act & Assert
			await expect(service.findAll({
				limit: 101,
				offset: 0,
				orderBy: asc(testUsers.id)
			})).rejects.toThrow('Limit must be less than or equal to 100');
		});

		it('should successfully use findAll with limit at MAX_FIND_LIMIT', async () => {
			// Arrange
			await service.create({ name: 'Test User', email: 'test@example.com' });

			// Act
			const results = await service.findAll({
				limit: 100,
				offset: 0,
				orderBy: asc(testUsers.id)
			});

			// Assert
			expect(results).toHaveLength(1);
			expect(results[0].name).toBe('Test User');
		});
	});

	describe('findOne', () => {
		it('should return first matching record', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Alice Test', email: 'alice@example.com' },
				{ name: 'Bob Test', email: 'bob@example.com' },
				{ name: 'Charlie Other', email: 'charlie@example.com' }
			]);

			// Act
			const result = await service.findOne((table) => like(table.name, '%Test%'));

			// Assert
			expect(result).toBeDefined();
			expect(result!.name).toMatch(/Test$/);
		});

		it('should return undefined when no match found', async () => {
			// Arrange
			await service.create({ name: 'Test User', email: 'test@example.com' });

			// Act
			const result = await service.findOne(eq(testUsers.name, 'Non Existent'));

			// Assert
			expect(result).toBeUndefined();
		});

		it('should return undefined when table is empty', async () => {
			// Act
			const result = await service.findOne();

			// Assert
			expect(result).toBeUndefined();
		});

		it('should work with multiple conditions', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'Admin User', email: 'admin@example.com' },
				{ name: 'Regular User', email: 'user@example.com' },
				{ name: 'Admin Manager', email: 'manager@example.com' }
			]);

			// Act
			const result = await service.findOne([
				like(testUsers.name, 'Admin%'),
				gt(testUsers.id, users[0].id)
			]);

			// Assert
			expect(result).toBeDefined();
			expect(result!.name).toBe('Admin Manager');
		});
	});

	describe('Edge Cases', () => {
		it('should handle empty conditions array', async () => {
			// Arrange
			await service.create({ name: 'Test User', email: 'test@example.com' });

			// Act
			const results = await service.find([]);

			// Assert
			expect(results).toHaveLength(1);
		});

		it('should handle limit of 0', async () => {
			// Arrange
			await service.create({ name: 'Test User', email: 'test@example.com' });

			// Act & Assert
			await expect(service.find(undefined, { limit: 0 })).rejects.toThrow();
		});

		it('should throw error when limit exceeds MAX_FIND_LIMIT', async () => {
			// Arrange
			await service.create({ name: 'Test User', email: 'test@example.com' });

			// Act & Assert
			await expect(service.find(undefined, { limit: 101 })).rejects.toThrow('Limit must be less than or equal to 100');
		});

		it('should successfully find with limit exactly at MAX_FIND_LIMIT', async () => {
			// Arrange
			await service.create({ name: 'Test User', email: 'test@example.com' });

			// Act
			const results = await service.find(undefined, { limit: 100 });

			// Assert
			expect(results).toHaveLength(1);
			expect(results[0].name).toBe('Test User');
		});

		it('should handle offset larger than result set', async () => {
			// Arrange
			await service.create({ name: 'Test User', email: 'test@example.com' });

			// Act
			const results = await service.find(undefined, { offset: 100 });

			// Assert
			expect(results).toHaveLength(0);
		});

		it('should handle conditions that match no records', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Alice', email: 'alice@example.com' },
				{ name: 'Bob', email: 'bob@example.com' }
			]);

			// Act
			const results = await service.find(eq(testUsers.name, 'NonExistent'));

			// Assert
			expect(results).toHaveLength(0);
		});
	});
});
