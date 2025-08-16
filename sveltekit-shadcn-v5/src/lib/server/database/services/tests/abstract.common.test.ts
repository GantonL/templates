import { describe, it, expect, afterEach, beforeAll, afterAll } from 'vitest';
import { sql, eq, like, gt, lt } from 'drizzle-orm';
import { testDb, checkTestConnection } from './test-client';
import { testUsers, type TestUser, type TestUserInsert } from './test-schema';
import { AbstractService } from '../abstract';

describe('AbstractService - Common Methods', () => {
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

	describe('count', () => {
		it('should count all records when no conditions provided', async () => {
			// Arrange
			await service.createMany([
				{ name: 'User One', email: 'user1@example.com' },
				{ name: 'User Two', email: 'user2@example.com' },
				{ name: 'User Three', email: 'user3@example.com' }
			]);

			// Act
			const result = await service.count();

			// Assert
			expect(result).toBe(3);
		});

		it('should return 0 when no records exist', async () => {
			// Act
			const result = await service.count();

			// Assert
			expect(result).toBe(0);
		});

		it('should count records matching single SQL condition', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Admin User', email: 'admin@example.com' },
				{ name: 'Regular User', email: 'user@example.com' },
				{ name: 'Admin Manager', email: 'manager@example.com' }
			]);

			// Act
			const result = await service.count(like(testUsers.name, 'Admin%'));

			// Assert
			expect(result).toBe(2);
		});

		it('should count records matching multiple conditions', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Test Admin', email: 'testadmin@example.com' },
				{ name: 'Test User', email: 'testuser@example.com' },
				{ name: 'Other Admin', email: 'otheradmin@example.com' },
				{ name: 'Other User', email: 'otheruser@example.com' }
			]);

			// Act
			const result = await service.count([
				like(testUsers.name, 'Test%'),
				like(testUsers.name, '%Admin%')
			]);

			// Assert
			expect(result).toBe(1);
		});

		it('should return 0 when no records match conditions', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Alice', email: 'alice@example.com' },
				{ name: 'Bob', email: 'bob@example.com' }
			]);

			// Act
			const result = await service.count(eq(testUsers.name, 'NonExistent'));

			// Assert
			expect(result).toBe(0);
		});

		it('should handle empty conditions array', async () => {
			// Arrange
			await service.createMany([
				{ name: 'User One', email: 'user1@example.com' },
				{ name: 'User Two', email: 'user2@example.com' }
			]);

			// Act
			const result = await service.count([]);

			// Assert
			expect(result).toBe(2);
		});
	});

	describe('exists', () => {
		it('should return true when records exist matching single SQL condition', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Admin User', email: 'admin@example.com' },
				{ name: 'Regular User', email: 'user@example.com' }
			]);

			// Act
			const result = await service.exists(like(testUsers.name, 'Admin%'));

			// Assert
			expect(result).toBe(true);
		});

		it('should return false when no records match condition', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Alice', email: 'alice@example.com' },
				{ name: 'Bob', email: 'bob@example.com' }
			]);

			// Act
			const result = await service.exists(eq(testUsers.name, 'NonExistent'));

			// Assert
			expect(result).toBe(false);
		});

		it('should return false when no records exist at all', async () => {
			// Act
			const result = await service.exists(eq(testUsers.name, 'AnyName'));

			// Assert
			expect(result).toBe(false);
		});

		it('should return true when records exist matching multiple conditions', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Test Admin', email: 'testadmin@example.com' },
				{ name: 'Test User', email: 'testuser@example.com' },
				{ name: 'Other Admin', email: 'otheradmin@example.com' }
			]);

			// Act
			const result = await service.exists([
				like(testUsers.name, 'Test%'),
				like(testUsers.name, '%Admin%')
			]);

			// Assert
			expect(result).toBe(true);
		});

		it('should return false when no records match multiple conditions', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Test User', email: 'testuser@example.com' },
				{ name: 'Other Admin', email: 'otheradmin@example.com' }
			]);

			// Act
			const result = await service.exists([
				like(testUsers.name, 'Test%'),
				like(testUsers.name, '%Admin%')
			]);

			// Assert
			expect(result).toBe(false);
		});

		it('should return true when records exist with empty conditions array', async () => {
			// Arrange
			await service.createMany([{ name: 'User One', email: 'user1@example.com' }]);

			// Act
			const result = await service.exists([]);

			// Assert
			expect(result).toBe(true);
		});

		it('should return false when no records exist with empty conditions array', async () => {
			// Act
			const result = await service.exists([]);

			// Assert
			expect(result).toBe(false);
		});
	});

	describe('Edge Cases', () => {
		it('should handle complex query conditions for count', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'Alpha User', email: 'alpha@example.com' },
				{ name: 'Beta User', email: 'beta@example.com' },
				{ name: 'Gamma User', email: 'gamma@example.com' },
				{ name: 'Delta User', email: 'delta@example.com' }
			]);

			// Act
			const result = await service.count([
				gt(testUsers.id, users[0].id),
				lt(testUsers.id, users[3].id)
			]);

			// Assert
			expect(result).toBe(2);
		});

		it('should handle complex query conditions for exists', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'Alpha User', email: 'alpha@example.com' },
				{ name: 'Beta User', email: 'beta@example.com' },
				{ name: 'Gamma User', email: 'gamma@example.com' }
			]);

			// Act
			const result = await service.exists([
				gt(testUsers.id, users[0].id),
				like(testUsers.email, '%beta%')
			]);

			// Assert
			expect(result).toBe(true);
		});

		it('should verify count and exists consistency', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Consistent Test', email: 'consistent1@example.com' },
				{ name: 'Another Test', email: 'consistent2@example.com' }
			]);

			const condition = like(testUsers.name, '%Test%');

			// Act
			const count = await service.count(condition);
			const exists = await service.exists(condition);

			// Assert
			expect(count).toBe(2);
			expect(exists).toBe(true);
			expect(count > 0).toBe(exists);
		});

		it('should verify count and exists consistency when no matches', async () => {
			// Arrange
			await service.createMany([
				{ name: 'User One', email: 'user1@example.com' },
				{ name: 'User Two', email: 'user2@example.com' }
			]);

			const condition = like(testUsers.name, 'NonExistent%');

			// Act
			const count = await service.count(condition);
			const exists = await service.exists(condition);

			// Assert
			expect(count).toBe(0);
			expect(exists).toBe(false);
			expect(count > 0).toBe(exists);
		});
	});
});
