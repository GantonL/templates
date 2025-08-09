import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type { PgTable } from 'drizzle-orm/pg-core';
import { AbstractService } from './abstract';

export class ServiceFactory {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	private services: Map<string, AbstractService<any>> = new Map();

	constructor(private db: PostgresJsDatabase) {}

	/**
	 * Get a service for a specific table
	 */
	getService<TTable extends PgTable>(table: TTable): AbstractService<TTable> {
		const cacheKey = table._.name;

		if (!this.services.has(cacheKey)) {
			this.services.set(cacheKey, new AbstractService<TTable>(this.db, table));
		}

		return this.services.get(cacheKey)!;
	}

	/**
	 * Clear service cache
	 */
	clearCache(): void {
		this.services.clear();
	}

	/**
	 * Get database instance for custom queries
	 */
	getDatabase(): PostgresJsDatabase {
		return this.db;
	}
}
