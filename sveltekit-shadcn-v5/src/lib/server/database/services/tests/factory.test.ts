import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { sql } from 'drizzle-orm';
import { testDb } from './test-client';
import { testUsers } from './test-schema';
import { ServiceFactory } from '../factory';
import { AbstractService } from '../abstract';
import { dropUsersTable, initializeDBWithUsersTable } from './helper';

describe('ServiceFactory', () => {
	let factory: ServiceFactory;

	beforeAll(async () => {
		await initializeDBWithUsersTable();

		factory = new ServiceFactory(testDb);
	});

	afterAll(async () => {
		await dropUsersTable();
	});

	afterEach(async () => {
		factory.clearCache();
	});

	describe('constructor', () => {
		it('should create a ServiceFactory instance with database', () => {
			expect(factory).toBeInstanceOf(ServiceFactory);
			expect(factory.getDatabase()).toBe(testDb);
		});

		it('should initialize with empty service cache', () => {
			const service1 = factory.getService(testUsers);
			const service2 = factory.getService(testUsers);

			// Should return the same cached instance
			expect(service1).toBe(service2);
		});
	});

	describe('getService', () => {
		it('should create a service instance for a given table', () => {
			const service = factory.getService(testUsers);

			expect(service).toBeInstanceOf(AbstractService);
		});

		it('should return the same service instance for the same table (caching)', () => {
			const service1 = factory.getService(testUsers);
			const service2 = factory.getService(testUsers);

			expect(service1).toBe(service2);
		});

		it('should cache services by table name', () => {
			const service = factory.getService(testUsers);

			// Clear and recreate factory, but get service again
			const newFactory = new ServiceFactory(testDb);
			const newService = newFactory.getService(testUsers);

			// Should be different instances (different factory)
			expect(service).not.toBe(newService);
		});

		it('should create service with correct database and table references', () => {
			const service = factory.getService(testUsers);

			// The service should have access to the database
			expect(service).toHaveProperty('db');
			expect(service).toHaveProperty('table');
		});
	});

	describe('clearCache', () => {
		it('should clear the service cache', () => {
			// Get a service to populate cache
			const service1 = factory.getService(testUsers);

			// Clear cache
			factory.clearCache();

			// Get service again - should be a new instance
			const service2 = factory.getService(testUsers);

			expect(service1).not.toBe(service2);
		});

		it('should allow new services to be cached after clearing', () => {
			// Populate cache
			factory.getService(testUsers);

			// Clear cache
			factory.clearCache();

			// Get services again
			const service1 = factory.getService(testUsers);
			const service2 = factory.getService(testUsers);

			// Should be cached again
			expect(service1).toBe(service2);
		});
	});

	describe('getDatabase', () => {
		it('should return the database instance passed to constructor', () => {
			const database = factory.getDatabase();

			expect(database).toBe(testDb);
		});

		it('should provide access to the same database instance across multiple calls', () => {
			const db1 = factory.getDatabase();
			const db2 = factory.getDatabase();

			expect(db1).toBe(db2);
		});
	});

	describe('integration with AbstractService', () => {
		it('should create functional services that can perform database operations', async () => {
			const service = factory.getService(testUsers);

			// Test that the service can perform basic operations
			const user = await service.create({
				name: 'Test User',
				email: 'test@example.com'
			});

			expect(user).toHaveProperty('id');
			expect(user.name).toBe('Test User');
			expect(user.email).toBe('test@example.com');

			// Clean up
			await testDb.execute(sql`DELETE FROM test_users`);
		});

		it('should maintain service state across multiple operations', async () => {
			const service = factory.getService(testUsers);

			// Create some test data
			await service.createMany([
				{ name: 'User One', email: 'user1@example.com' },
				{ name: 'User Two', email: 'user2@example.com' }
			]);

			// Use the same service instance to count
			const count = await service.count();
			expect(count).toBe(2);

			// Verify it's the same cached instance
			const sameService = factory.getService(testUsers);
			expect(service).toBe(sameService);

			// Clean up
			await testDb.execute(sql`DELETE FROM test_users`);
		});
	});

	describe('memory management', () => {
		it('should not leak memory when creating many service instances', () => {
			const initialCacheSize = factory.getCacheSize();

			// Get the same service multiple times
			for (let i = 0; i < 100; i++) {
				factory.getService(testUsers);
			}

			// Cache should still only have one entry
			expect(factory.getCacheSize()).toBe(initialCacheSize + 1);
		});

		it('should properly clean up when cache is cleared', () => {
			// Populate cache
			factory.getService(testUsers);
			expect(factory.getCacheSize()).toBe(1);

			// Clear cache
			factory.clearCache();
			expect(factory.getCacheSize()).toBe(0);
		});
	});

	describe('error handling', () => {
		it('should handle invalid database gracefully', () => {
			const invalidDb = null;
			const factoryWithInvalidDb = new ServiceFactory(invalidDb as never);

			// Should not throw during construction
			expect(factoryWithInvalidDb).toBeInstanceOf(ServiceFactory);

			// Should return the invalid db when requested
			expect(factoryWithInvalidDb.getDatabase()).toBe(invalidDb);
		});

		it('should throw an error in service creation with invalid table', () => {
			const invalidTable = null;

			expect(() => factory.getService(invalidTable as never)).toThrow();
		});
	});

	describe('concurrent access', () => {
		it('should handle concurrent service requests for same table', async () => {
			const promises = Array.from({ length: 10 }, () =>
				Promise.resolve(factory.getService(testUsers))
			);

			const services = await Promise.all(promises);

			// All should be the same instance
			const firstService = services[0];
			services.forEach((service) => {
				expect(service).toBe(firstService);
			});
		});

		it('should handle concurrent cache operations', async () => {
			const operations = [
				() => factory.getService(testUsers),
				() => factory.clearCache(),
				() => factory.getService(testUsers),
				() => factory.getDatabase()
			];

			// Should not throw errors when operations run concurrently
			await expect(
				Promise.all(operations.map((op) => Promise.resolve(op())))
			).resolves.toBeDefined();
		});
	});
});
