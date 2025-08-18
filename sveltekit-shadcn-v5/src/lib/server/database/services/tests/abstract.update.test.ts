import { describe, it, expect, afterEach, beforeAll, afterAll } from 'vitest';
import { eq, like, gt } from 'drizzle-orm';
import { testDb } from './test-client';
import { testUsers, type TestUser, type TestUserInsert } from './test-schema';
import { AbstractService } from '../abstract';
import { deleteUsersTableData, dropUsersTable, initializeDBWithUsersTable } from './helper';

describe('AbstractService - Update Methods', () => {
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

	describe('updateById', () => {
		it('should update a record by ID and return the updated record', async () => {
			// Arrange
			const insertData: TestUserInsert = {
				name: 'John Doe',
				email: 'john@example.com'
			};
			const created = await service.create(insertData);
			const updateData = { name: 'John Updated' };

			// Act
			const result = await service.updateById(created.id, updateData);

			// Assert
			expect(result).toBeDefined();
			expect(result!.id).toBe(created.id);
			expect(result!.name).toBe(updateData.name);
			expect(result!.email).toBe(insertData.email);
		});

		it('should update multiple fields at once', async () => {
			// Arrange
			const insertData: TestUserInsert = {
				name: 'Jane Smith',
				email: 'jane@example.com'
			};
			const created = await service.create(insertData);
			const updateData = {
				name: 'Jane Updated',
				email: 'jane.updated@example.com'
			};

			// Act
			const result = await service.updateById(created.id, updateData);

			// Assert
			expect(result).toBeDefined();
			expect(result!.id).toBe(created.id);
			expect(result!.name).toBe(updateData.name);
			expect(result!.email).toBe(updateData.email);
		});

		it('should return undefined when updating non-existent ID', async () => {
			// Arrange
			const updateData = { name: 'Non Existent' };

			// Act
			const result = await service.updateById(999, updateData);

			// Assert
			expect(result).toBeUndefined();
		});

		it('should throw error when trying to update with empty update data object', async () => {
			// Arrange
			const insertData: TestUserInsert = {
				name: 'Test User',
				email: 'test@example.com'
			};
			const created = await service.create(insertData);

			// Act
			const resultPromise = service.updateById(created.id, {});

			// Asserts
			await expect(resultPromise).rejects.toThrow();
		});

		it('should throw error for duplicate email constraint', async () => {
			// Arrange
			const existingUser = await service.create({
				name: 'Existing User',
				email: 'existing@example.com'
			});
			const userToUpdate = await service.create({
				name: 'User To Update',
				email: 'update@example.com'
			});

			// Act & Assert
			await expect(
				service.updateById(userToUpdate.id, { email: existingUser.email })
			).rejects.toThrow();
		});
	});

	describe('updateWhere', () => {
		it('should update records matching single SQL condition', async () => {
			// Arrange
			const created = await service.createMany([
				{ name: 'Admin User', email: 'admin@example.com' },
				{ name: 'Regular User', email: 'user@example.com' },
				{ name: 'Admin Manager', email: 'manager@example.com' }
			]);
			const updateData = { name: 'Updated Admin' };

			// Act
			const results = await service.updateWhere(like(testUsers.name, 'Admin%'), updateData);

			// Assert
			expect(results).toHaveLength(2);
			expect(results.every((r) => r.name === updateData.name)).toBe(true);
			expect(results.map((r) => r.email).sort()).toEqual([created[0].email, created[2].email]);
		});

		it('should update records matching function condition', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'User One', email: 'user1@example.com' },
				{ name: 'User Two', email: 'user2@example.com' },
				{ name: 'User Three', email: 'user3@example.com' }
			]);
			const updateData = { name: 'Updated User' };

			// Act
			const results = await service.updateWhere((table) => gt(table.id, users[0].id), updateData);

			// Assert
			expect(results).toHaveLength(2);
			expect(results.every((r) => r.name === updateData.name)).toBe(true);
		});

		it('should update records matching multiple conditions', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'Test Admin', email: 'testadmin@example.com' },
				{ name: 'Test User', email: 'testuser@example.com' },
				{ name: 'Other Admin', email: 'otheradmin@example.com' },
				{ name: 'Other User', email: 'otheruser@example.com' }
			]);
			const updateData = { name: 'Updated Test Admin' };

			// Act
			const results = await service.updateWhere(
				[like(testUsers.name, 'Test%'), like(testUsers.name, '%Admin%')],
				updateData
			);

			// Assert
			expect(results).toHaveLength(1);
			expect(results[0].name).toBe(updateData.name);
			expect(results[0].email).toBe(users[0].email);
		});

		it('should update records with mixed function and SQL conditions', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'User A', email: 'a@example.com' },
				{ name: 'User B', email: 'b@example.com' },
				{ name: 'User C', email: 'c@example.com' }
			]);
			const updateData = { email: 'updated@example.com' };

			// Act
			const results = await service.updateWhere(
				[(table) => gt(table.id, users[0].id), eq(testUsers.name, [users[1].name])],
				updateData
			);

			// Assert
			expect(results).toHaveLength(1);
			expect(results[0].name).toBe(users[1].name);
			expect(results[0].email).toBe(updateData.email);
		});

		it('should return empty array when no records match conditions', async () => {
			// Arrange
			await service.createMany([
				{ name: 'Alice', email: 'alice@example.com' },
				{ name: 'Bob', email: 'bob@example.com' }
			]);
			const updateData = { name: 'Updated' };

			// Act
			const results = await service.updateWhere(eq(testUsers.name, 'NonExistent'), updateData);

			// Assert
			expect(results).toHaveLength(0);
		});

		it('should handle empty conditions array', async () => {
			// Arrange
			await service.create({ name: 'Test User', email: 'test@example.com' });
			const updateData = { name: 'Updated User' };

			// Act
			const results = await service.updateWhere([], updateData);

			// Assert
			expect(results).toHaveLength(1);
			expect(results[0].name).toBe(updateData.name);
		});

		it('should throw error for duplicate email constraint', async () => {
			// Arrange
			const created = await service.createMany([
				{ name: 'User One', email: 'user1@example.com' },
				{ name: 'User Two', email: 'user2@example.com' }
			]);

			// Act & Assert
			await expect(
				service.updateWhere(eq(testUsers.name, created[1].name), { email: created[0].email })
			).rejects.toThrow();
		});
	});

	describe('Edge Cases', () => {
		it('should handle partial updates without affecting other fields', async () => {
			// Arrange
			const insertData: TestUserInsert = {
				name: 'Original Name',
				email: 'original@example.com'
			};
			const created = await service.create(insertData);

			// Act
			const updateData = { name: 'New Name' };
			const result = await service.updateById(created.id, updateData);

			// Assert
			expect(result).toBeDefined();
			expect(result!.name).toBe(updateData.name);
			expect(result!.email).toBe(created.email);
			expect(result!.createdAt).toEqual(created.createdAt);
		});

		it('should maintain referential integrity across updates', async () => {
			// Arrange
			const users = await service.createMany([
				{ name: 'User A', email: 'a@example.com' },
				{ name: 'User B', email: 'b@example.com' }
			]);

			// Act
			const updateData = { name: 'Updated A' };
			await service.updateById(users[0].id, updateData);
			const foundUser = await service.findById(users[0].id);
			const untouchedUser = await service.findById(users[1].id);

			// Assert
			expect(foundUser!.name).toBe(updateData.name);
			expect(untouchedUser!.name).toBe(users[1].name);
		});

		it('should handle concurrent updates correctly', async () => {
			// Arrange
			const user = await service.create({
				name: 'Concurrent Test',
				email: 'concurrent@example.com'
			});

			// Act
			const [result1, result2] = await Promise.all([
				service.updateById(user.id, { name: 'Update 1' }),
				service.updateById(user.id, { name: 'Update 2' })
			]);

			// Assert
			expect(result1).toBeDefined();
			expect(result2).toBeDefined();
			// One of the updates should succeed
			expect([result1!.name, result2!.name]).toContain('Update 1');
		});
	});
});
