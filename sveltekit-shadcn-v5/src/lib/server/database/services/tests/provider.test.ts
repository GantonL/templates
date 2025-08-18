import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { sql } from 'drizzle-orm';
import { testDb } from './test-client';
import { testUsers } from './test-schema';
import { ServiceProvider, provider } from '../provider';
import { ServiceFactory } from '../factory';
import { dropUsersTable, initializeDBWithUsersTable } from './helper';

describe('serviceProvider', () => {
	beforeAll(async () => {
		await initializeDBWithUsersTable();
	});

	afterAll(async () => {
		await dropUsersTable();
	});

	beforeEach(() => {
		// Reset singleton instance for clean tests
		ServiceProvider.clearInstance();
	});

	describe('getInstance', () => {
		it('should return a serviceProvider instance', () => {
			const instance = ServiceProvider.getInstance(testDb);

			expect(instance).toBeInstanceOf(ServiceProvider);
		});

		it('should return the same instance on multiple calls (singleton pattern)', () => {
			const instance1 = ServiceProvider.getInstance(testDb);
			const instance2 = ServiceProvider.getInstance(testDb);

			expect(instance1).toBe(instance2);
		});

		it('should create only one instance even with concurrent calls', async () => {
			const promises = Array.from({ length: 10 }, () =>
				Promise.resolve(ServiceProvider.getInstance(testDb))
			);

			const instances = await Promise.all(promises);

			const firstInstance = instances[0];
			instances.forEach((instance) => {
				expect(instance).toBe(firstInstance);
			});
		});
	});

	describe('getFactory', () => {
		it('should return a ServiceFactory instance', () => {
			const provider = ServiceProvider.getInstance(testDb);
			const factory = provider.getFactory();

			expect(factory).toBeInstanceOf(ServiceFactory);
		});

		it('should return the same factory instance on multiple calls', () => {
			const provider = ServiceProvider.getInstance(testDb);
			const factory1 = provider.getFactory();
			const factory2 = provider.getFactory();

			expect(factory1).toBe(factory2);
		});

		it('should provide factory with database access', () => {
			const provider = ServiceProvider.getInstance(testDb);
			const factory = provider.getFactory();
			const database = factory.getDatabase();

			expect(database).toBeDefined();
		});
	});

	describe('singleton behavior', () => {
		it('should maintain state across different access points', () => {
			const provider1 = ServiceProvider.getInstance(testDb);
			const factory1 = provider1.getFactory();

			const provider2 = ServiceProvider.getInstance(testDb);
			const factory2 = provider2.getFactory();

			expect(provider1).toBe(provider2);
			expect(factory1).toBe(factory2);
		});

		it('should persist factory state between provider calls', async () => {
			const provider1 = ServiceProvider.getInstance(testDb);
			const factory1 = provider1.getFactory();

			// Create and cache a service
			const service1 = factory1.getService(testUsers);

			const provider2 = ServiceProvider.getInstance(testDb);
			const factory2 = provider2.getFactory();
			const service2 = factory2.getService(testUsers);

			// Should be the same cached service
			expect(service1).toBe(service2);
		});
	});

	describe('integration with ServiceFactory', () => {
		it('should provide functional factory that can create services', () => {
			const provider = ServiceProvider.getInstance(testDb);
			const factory = provider.getFactory();
			const service = factory.getService(testUsers);

			expect(service).toBeDefined();
			expect(service).toHaveProperty('db');
			expect(service).toHaveProperty('table');
		});

		it('should support factory cache operations', () => {
			const provider = ServiceProvider.getInstance(testDb);
			const factory = provider.getFactory();

			// Get service to populate cache
			const service1 = factory.getService(testUsers);

			// Clear cache
			factory.clearCache();

			// Get service again - should be new instance
			const service2 = factory.getService(testUsers);

			expect(service1).not.toBe(service2);
		});

		it('should allow database operations through factory services', async () => {
			const provider = ServiceProvider.getInstance(testDb);
			const factory = provider.getFactory();
			const service = factory.getService(testUsers);

			// Test basic database operation
			const user = await service.create({
				name: 'Provider Test User',
				email: 'provider@example.com'
			});

			expect(user).toHaveProperty('id');
			expect(user.name).toBe('Provider Test User');
			expect(user.email).toBe('provider@example.com');

			// Clean up
			await testDb.execute(sql`DELETE FROM test_users`);
		});
	});

	describe('exported serviceProvider instance', () => {
		it('should be a serviceProvider instance', () => {
			expect(provider).toBeInstanceOf(ServiceProvider);
		});

		it('should provide access to factory through exported instance', () => {
			const factory = provider.getFactory();

			expect(factory).toBeInstanceOf(ServiceFactory);
		});
	});

	describe('memory management', () => {
		beforeEach(() => {
			ServiceProvider.clearInstance();
		});
		it('should not create multiple provider instances', () => {
			const instances: ServiceProvider[] = [];

			// Create multiple instances
			for (let i = 0; i < 50; i++) {
				instances.push(ServiceProvider.getInstance(testDb));
			}

			// All should be the same instance
			const firstInstance = instances[0];
			instances.forEach((instance) => {
				expect(instance).toBe(firstInstance);
			});
		});

		it('should properly manage factory lifecycle', () => {
			const provider = ServiceProvider.getInstance(testDb);
			const factory1 = provider.getFactory();
			const factory2 = provider.getFactory();

			// Should reuse the same factory instance
			expect(factory1).toBe(factory2);
		});
	});

	describe('error handling', () => {
		it('should handle factory errors gracefully', () => {
			const provider = ServiceProvider.getInstance(testDb);
			const factory = provider.getFactory();

			// Should handle invalid table gracefully (let factory handle the error)
			expect(() => factory.getService(null as never)).toThrow();
		});

		it('should maintain singleton integrity even after errors', () => {
			const provider1 = ServiceProvider.getInstance(testDb);

			// Try to cause an error
			try {
				const factory = provider1.getFactory();
				factory.getService(null as never);
			} catch {
				// Expected error
			}

			// provider should still work normally
			const provider2 = ServiceProvider.getInstance(testDb);
			expect(provider1).toBe(provider2);

			const factory = provider2.getFactory();
			expect(factory).toBeInstanceOf(ServiceFactory);
		});
	});

	describe('initialization', () => {
		it('should initialize with a factory instance', () => {
			const provider = ServiceProvider.getInstance(testDb);
			const factory = provider.getFactory();

			expect(factory).toBeInstanceOf(ServiceFactory);
			expect(factory).toBeDefined();
		});

		it('should initialize factory with database connection', () => {
			const provider = ServiceProvider.getInstance(testDb);
			const factory = provider.getFactory();
			const database = factory.getDatabase();

			expect(database).toBeDefined();
		});
	});
});
