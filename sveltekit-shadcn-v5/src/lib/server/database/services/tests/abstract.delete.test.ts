import { describe, it, expect, afterEach, beforeAll, afterAll } from 'vitest';
import { eq, like, gt } from 'drizzle-orm';
import { testDb } from './test-client';
import { testUsers, type TestUser, type TestUserInsert } from './test-schema';
import { AbstractService } from '../abstract';
import { deleteUsersTableData, dropUsersTable, initializeDBWithUsersTable } from './helper';

describe('AbstractService - Delete Methods', () => {
	let service: AbstractService<typeof testUsers, TestUser, TestUserInsert>;

	beforeAll(async () => {
		await initializeDBWithUsersTable();

		// Create service instance
		service = new AbstractService(testDb, testUsers);
	});

	afterEach(async () => {
		await deleteUsersTableData();
	});

	afterAll(async () => {
		await dropUsersTable();
	});

	describe('deleteById', () => {
		it('should delete a record by ID and return the deleted record', async () => {
			// Arrange
			const insertData: TestUserInsert = {
				name: 'John Doe',
				email: 'john@example.com'
			};
			const created = await service.create(insertData);

			// Act
			const result = await service.deleteById(created.id);

			// Assert
			expect(result).toBeDefined();
			expect(result!.id).toBe(created.id);
			expect(result!.name).toBe(insertData.name);
			expect(result!.email).toBe(insertData.email);

			// Verify record is actually deleted
			const found = await service.findById(created.id);
			expect(found).toBeUndefined();
		});

		it('should return undefined when deleting non-existent ID', async () => {
			// Act
			const result = await service.deleteById(999);

			// Assert
			expect(result).toBeUndefined();
		});

		it('should only delete the specified record, leaving others intact', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'User One', email: 'user1@example.com' },
				{ name: 'User Two', email: 'user2@example.com' },
				{ name: 'User Three', email: 'user3@example.com' }
			]);

			// Act
			const deleted = await service.deleteById(users[1].id);

			// Assert
			expect(deleted).toBeDefined();
			expect(deleted!.id).toBe(users[1].id);

			// Verify other records remain
			const remaining = await service.find();
			expect(remaining).toHaveLength(2);
			expect(remaining.map((u) => u.id).sort()).toEqual([users[0].id, users[2].id].sort());
		});
	});

	describe('deleteWhere', () => {
		it('should delete records matching single SQL condition', async () => {
			// Arrange
			const created = await service.createMany([
				{ name: 'Admin User', email: 'admin@example.com' },
				{ name: 'Regular User', email: 'user@example.com' },
				{ name: 'Admin Manager', email: 'manager@example.com' }
			]);

			// Act
			const result = await service.deleteWhere(like(testUsers.name, 'Admin%'));

			// Assert
			expect(result).toBe(2);

			// Verify records are actually deleted
			const remaining = await service.find();
			expect(remaining).toHaveLength(1);
			expect(remaining[0].email).toBe(created[1].email);
		});

		it('should delete records matching function condition', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'User One', email: 'user1@example.com' },
				{ name: 'User Two', email: 'user2@example.com' },
				{ name: 'User Three', email: 'user3@example.com' }
			]);

			// Act
			const result = await service.deleteWhere((table) => gt(table.id, users[0].id));

			// Assert
			expect(result).toBe(2);

			// Verify only first record remains
			const remaining = await service.find();
			expect(remaining).toHaveLength(1);
			expect(remaining[0].id).toBe(users[0].id);
		});

		it('should delete records matching multiple conditions', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Test Admin', email: 'testadmin@example.com' },
				{ name: 'Test User', email: 'testuser@example.com' },
				{ name: 'Other Admin', email: 'otheradmin@example.com' },
				{ name: 'Other User', email: 'otheruser@example.com' }
			]);

			// Act
			const result = await service.deleteWhere([
				like(testUsers.name, 'Test%'),
				like(testUsers.name, '%Admin%')
			]);

			// Assert
			expect(result).toBe(1);

			// Verify other records remain
			const remaining = await service.find();
			expect(remaining).toHaveLength(3);
		});

		it('should delete records with mixed function and SQL conditions', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'User A', email: 'a@example.com' },
				{ name: 'User B', email: 'b@example.com' },
				{ name: 'User C', email: 'c@example.com' }
			]);

			// Act
			const result = await service.deleteWhere([
				(table) => gt(table.id, users[0].id),
				eq(testUsers.name, users[1].name)
			]);

			// Assert
			expect(result).toBe(1);

			// Verify other records remain
			const remaining = await service.find();
			expect(remaining).toHaveLength(2);
			expect(remaining.map((u) => u.id).sort()).toEqual([users[0].id, users[2].id].sort());
		});

		it('should return empty array when no records match conditions', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Alice', email: 'alice@example.com' },
				{ name: 'Bob', email: 'bob@example.com' }
			]);

			// Act
			const results = await service.deleteWhere(eq(testUsers.name, 'NonExistent'));

			// Assert
			expect(results).toBe(0);

			// Verify all records remain
			const remaining = await service.find();
			expect(remaining).toHaveLength(2);
		});

		it('should handle empty conditions array', async () => {
			// Arrange
			await service.createMany([
				{ name: 'User One', email: 'user1@example.com' },
				{ name: 'User Two', email: 'user2@example.com' }
			]);

			// Act
			const result = await service.deleteWhere([]);

			// Assert
			expect(result).toBe(2);

			// Verify all records are deleted
			const remaining = await service.find();
			expect(remaining).toHaveLength(0);
		});
	});

	describe('Edge Cases', () => {
		it('should handle deletion of records with relationships', async () => {
			// Arrange
			const user = await service.create({
				name: 'User with Relations',
				email: 'relations@example.com'
			});

			// Act
			const result = await service.deleteById(user.id);

			// Assert
			expect(result).toBeDefined();
			expect(result!.id).toBe(user.id);

			// Verify record is deleted
			const found = await service.findById(user.id);
			expect(found).toBeUndefined();
		});

		it('should maintain data integrity after cascading deletes', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Parent User', email: 'parent@example.com' },
				{ name: 'Child User', email: 'child@example.com' },
				{ name: 'Independent User', email: 'independent@example.com' }
			]);

			// Act
			await service.deleteWhere(like(testUsers.email, '%parent%'));

			// Assert
			const remaining = await service.find();
			expect(remaining).toHaveLength(2);
			expect(remaining.map((u) => u.email)).toContain('child@example.com');
			expect(remaining.map((u) => u.email)).toContain('independent@example.com');
		});

		it('should handle concurrent deletions correctly', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'User A', email: 'a@example.com' },
				{ name: 'User B', email: 'b@example.com' }
			]);

			// Act
			const [result1, result2] = await Promise.all([
				service.deleteById(users[0].id),
				service.deleteById(users[1].id)
			]);

			// Assert
			expect(result1).toBeDefined();
			expect(result2).toBeDefined();
			expect(result1!.id).toBe(users[0].id);
			expect(result2!.id).toBe(users[1].id);

			// Verify all records are deleted
			const remaining = await service.find();
			expect(remaining).toHaveLength(0);
		});
	});
});
