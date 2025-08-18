import { describe, it, expect, afterEach, beforeAll, afterAll } from 'vitest';
import { testDb } from './test-client';
import { testUsers, type TestUser, type TestUserInsert } from './test-schema';
import { AbstractService } from '../abstract';
import { deleteUsersTableData, dropUsersTable, initializeDBWithUsersTable } from './helper';

describe('AbstractService', () => {
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

		describe('createMany', () => {
			it('should create multiple records and return them', async () => {
				// Arrange
				const insertData: TestUserInsert[] = [
					{ name: 'User One', email: 'user1@example.com' },
					{ name: 'User Two', email: 'user2@example.com' },
					{ name: 'User Three', email: 'user3@example.com' }
				];

				// Act
				const results = await service.createMany(insertData);

				// Assert
				expect(results).toHaveLength(3);
				expect(results[0].name).toBe('User One');
				expect(results[1].name).toBe('User Two');
				expect(results[2].name).toBe('User Three');
				expect(results.every((user) => typeof user.id === 'number')).toBe(true);
			});

			it('should throw error when trying to insert empty array', async () => {
				// Arrange
				const insertData: TestUserInsert[] = [];

				// Act & Assert
				await expect(service.createMany(insertData)).rejects.toThrow();
			});

			it('should throw error for duplicate emails in batch', async () => {
				// Arrange
				const insertData: TestUserInsert[] = [
					{ name: 'User One', email: 'duplicate@example.com' },
					{ name: 'User Two', email: 'duplicate@example.com' }
				];

				// Act & Assert
				await expect(service.createMany(insertData)).rejects.toThrow();
			});

			it('should throw error when exceeding MAX_INSERT_LIMIT', async () => {
				// Arrange
				const insertData: TestUserInsert[] = Array.from({ length: 101 }, (_, i) => ({
					name: `User ${i + 1}`,
					email: `user${i + 1}@example.com`
				}));

				// Act & Assert
				await expect(service.createMany(insertData)).rejects.toThrow(
					'Maximum insert data length is 100'
				);
			});

			it('should successfully create exactly 100 records (at limit)', async () => {
				// Arrange
				const insertData: TestUserInsert[] = Array.from({ length: 100 }, (_, i) => ({
					name: `User ${i + 1}`,
					email: `user${i + 1}@example.com`
				}));

				// Act
				const results = await service.createMany(insertData);

				// Assert
				expect(results).toHaveLength(100);
				expect(results[0].name).toBe('User 1');
				expect(results[99].name).toBe('User 100');
			});
		});
	});
});
