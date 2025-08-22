/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SQL } from 'drizzle-orm';
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { type PgTable } from 'drizzle-orm/pg-core';
import { eq, and, count } from 'drizzle-orm';

export const MAX_FIND_LIMIT = 100;
export const MAX_INSERT_LIMIT = 100;
export const MAX_DELETE_LIMIT = 100;

export interface DeleteQueryOptions {
	limit: number;
}
export interface QueryOptions extends DeleteQueryOptions {
	offset?: number;
	orderBy?: SQL | SQL[];
}

export type WhereCondition<T> = SQL<unknown> | ((table: T) => SQL<unknown>);

export class AbstractService<
	TTable extends PgTable,
	TSelect = TTable['$inferSelect'],
	TInsert = TTable['$inferInsert']
> {
	constructor(
		private db: PostgresJsDatabase,
		private table: TTable
	) {}

	/**
	 * Create a new record
	 */
	async create(data: TInsert): Promise<TSelect> {
		const result = await this.db
			.insert(this.table)
			.values(data as any)
			.returning();
		return result[0] as TSelect;
	}

	/**
	 * Create multiple records
	 */
	async createMany(data: TInsert[]): Promise<TSelect[]> {
		if (data.length > MAX_INSERT_LIMIT) {
			throw Error(`Maximum insert data length is ${MAX_INSERT_LIMIT}`);
		}
		const result = await this.db
			.insert(this.table)
			.values(data as any)
			.returning();
		return result as TSelect[];
	}

	/**
	 * Find a record by ID
	 */
	async findById(id: string | number): Promise<TSelect | undefined> {
		const result = await this.db
			.select()
			.from(this.table as any)
			.where(eq((this.table as any).id, id))
			.limit(1);
		return result[0] as TSelect | undefined;
	}

	/**
	 * Find records with conditions
	 */
	async find(
		where?: WhereCondition<TTable> | WhereCondition<TTable>[],
		options?: QueryOptions
	): Promise<TSelect[]> {
		let baseQuery = this.db.select().from(this.table as any);

		// Apply WHERE conditions
		if (where) {
			baseQuery = this.buildWhereQueries(baseQuery, where);
		}

		// Apply ordering
		if (options?.orderBy) {
			if (Array.isArray(options.orderBy)) {
				baseQuery = (baseQuery as any).orderBy(...options.orderBy);
			} else {
				baseQuery = (baseQuery as any).orderBy(options.orderBy);
			}
		}

		// Apply pagination
		if (options?.limit !== undefined) {
			this.handleLimitOptions(options.limit, 'find');
			baseQuery = (baseQuery as any).limit(options.limit);
		}
		if (options?.offset) {
			baseQuery = (baseQuery as any).offset(options.offset);
		}

		return (await baseQuery) as TSelect[];
	}

	/**
	 * Find all records
	 */
	async findAll(options: Required<QueryOptions>): Promise<TSelect[]> {
		this.handleLimitOptions(options.limit, 'find');
		return this.find(undefined, options);
	}

	/**
	 * Find one record
	 */
	async findOne(
		where?: WhereCondition<TTable> | WhereCondition<TTable>[]
	): Promise<TSelect | undefined> {
		const results = await this.find(where, { limit: 1 });
		return results[0];
	}

	/**
	 * Update a record by ID
	 */
	async updateById(id: string | number, data: Partial<TInsert>): Promise<TSelect | undefined> {
		const result = await this.db
			.update(this.table)
			.set(data as any)
			.where(eq((this.table as any).id, id))
			.returning();
		return result[0] as TSelect | undefined;
	}

	/**
	 * Update records matching conditions
	 */
	async updateWhere(
		where: WhereCondition<TTable> | WhereCondition<TTable>[],
		data: Partial<TInsert>
	): Promise<TSelect[]> {
		let baseQuery = this.db.update(this.table).set(data as any);

		if (where) {
			baseQuery = this.buildWhereQueries(baseQuery, where);
		}

		return (await (baseQuery as any).returning()) as TSelect[];
	}

	/**
	 * Delete a record by ID
	 */
	async deleteById(id: string | number): Promise<TSelect | undefined> {
		const result = await this.db
			.delete(this.table)
			.where(eq((this.table as any).id, id))
			.returning();
		return result[0] as TSelect | undefined;
	}

	/**
	 * Delete records matching conditions
	 */
	async deleteWhere(
		where: WhereCondition<TTable> | WhereCondition<TTable>[],
		options?: DeleteQueryOptions
	): Promise<number> {
		let baseQuery = this.db.delete(this.table);

		if (where) {
			baseQuery = this.buildWhereQueries(baseQuery, where);
		}

		if (options?.limit !== undefined) {
			this.handleLimitOptions(options.limit, 'delete');
			baseQuery = (baseQuery as any).limit(options.limit);
		}

		return (await (baseQuery as any).returning())?.length ?? (0 as number);
	}

	/**
	 * Count records
	 */
	async count(where?: WhereCondition<TTable> | WhereCondition<TTable>[]): Promise<number> {
		let baseQuery = this.db.select({ count: count() }).from(this.table as any);
		if (where) {
			baseQuery = this.buildWhereQueries(baseQuery, where);
		}

		const result = await baseQuery;
		return (result ?? [{ count: 0 }])[0].count ?? 0;
	}

	/**
	 * Check if records exist
	 */
	async exists(where?: WhereCondition<TTable> | WhereCondition<TTable>[]): Promise<boolean> {
		const count = await this.count(where);
		return count > 0;
	}

	private handleLimitOptions(limit: number, method: 'find' | 'delete') {
		if (limit === 0) {
			throw Error('Limit must be greater than 0');
		}
		const max = method === 'find' ? MAX_FIND_LIMIT : MAX_DELETE_LIMIT;
		if (limit > max) {
			throw Error(`Limit must be less than or equal to ${max}`);
		}
	}

	private buildWhereQueries<T>(
		baseQuery: T,
		where: WhereCondition<TTable> | WhereCondition<TTable>[]
	) {
		if (Array.isArray(where)) {
			const conditions = where.map((condition) =>
				typeof condition === 'function' ? condition(this.table) : condition
			);
			baseQuery = conditions?.length > 0 ? (baseQuery as any).where(and(...conditions)) : baseQuery;
		} else {
			const condition = typeof where === 'function' ? where(this.table) : where;
			baseQuery = condition ? (baseQuery as any).where(condition) : baseQuery;
		}
		return baseQuery;
	}
}
