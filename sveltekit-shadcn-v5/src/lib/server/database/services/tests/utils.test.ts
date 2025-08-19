import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { testUsers } from './test-schema';
import { initializeDBWithUsersTable, dropUsersTable } from './helper';
import {
	getUrlFiltersUtil,
	getUrlOptionsUtil,
	getBodyFiltersUtil,
	DEFAULT_LIMIT,
	type BodyFiltersUtil
} from '../utils';
import { MAX_FIND_LIMIT } from '../abstract';
import type { Column } from 'drizzle-orm';

describe('Utils', () => {
	beforeAll(async () => {
		await initializeDBWithUsersTable();
	});

	afterAll(async () => {
		await dropUsersTable();
	});

	describe('getUrlFiltersUtil', () => {
		it('should return empty array when no query parameter', () => {
			const url = new URL('https://example.com');
			const config = { searchColumns: [testUsers.name, testUsers.email] };

			const result = getUrlFiltersUtil(url, config);

			expect(result).toEqual([]);
		});

		it('should return empty array when query parameter is empty', () => {
			const url = new URL('https://example.com?q=');
			const config = { searchColumns: [testUsers.name, testUsers.email] };

			const result = getUrlFiltersUtil(url, config);

			expect(result).toEqual([]);
		});

		it('should return empty array when no search columns provided', () => {
			const url = new URL('https://example.com?q=test');
			const config = { searchColumns: [] };

			const result = getUrlFiltersUtil(url, config);

			expect(result).toEqual([]);
		});

		it('should create ilike conditions for each search column', () => {
			const url = new URL('https://example.com?q=john');
			const config = { searchColumns: [testUsers.name, testUsers.email] };

			const result = getUrlFiltersUtil(url, config);

			expect(result).toHaveLength(2);
		});

		it('should handle special characters in query', () => {
			const url = new URL('https://example.com?q=john%40example.com');
			const config = { searchColumns: [testUsers.email] };

			const result = getUrlFiltersUtil(url, config);

			expect(result).toHaveLength(1);
		});

		it('should handle multiple search columns with single query', () => {
			const url = new URL('https://example.com?q=search');
			const config = { searchColumns: [testUsers.name, testUsers.email] };

			const result = getUrlFiltersUtil(url, config);

			expect(result).toHaveLength(2);
		});
	});

	describe('getUrlOptionsUtil', () => {
		it('should return default options when no query parameters', () => {
			const url = new URL('https://example.com');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result).toEqual({
				limit: DEFAULT_LIMIT,
				offset: undefined,
				orderBy: undefined
			});
		});

		it('should parse limit parameter correctly', () => {
			const url = new URL('https://example.com?limit=10');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.limit).toBe(10);
		});

		it('should use default limit when limit is invalid', () => {
			const url = new URL('https://example.com?limit=invalid');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.limit).toBe(DEFAULT_LIMIT);
		});

		it('should use default limit when limit is zero', () => {
			const url = new URL('https://example.com?limit=0');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.limit).toBe(DEFAULT_LIMIT);
		});

		it('should use default limit when limit exceeds maximum', () => {
			const url = new URL(`https://example.com?limit=${MAX_FIND_LIMIT + 1}`);

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.limit).toBe(DEFAULT_LIMIT);
		});

		it('should accept valid limit within range', () => {
			const url = new URL('https://example.com?limit=50');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.limit).toBe(50);
		});

		it('should parse offset parameter correctly', () => {
			const url = new URL('https://example.com?offset=20');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.offset).toBe(20);
		});

		it('should handle offset of zero', () => {
			const url = new URL('https://example.com?offset=0');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.offset).toBe(0);
		});

		it('should ignore negative offset', () => {
			const url = new URL('https://example.com?offset=-10');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.offset).toBeUndefined();
		});

		it('should ignore invalid offset', () => {
			const url = new URL('https://example.com?offset=invalid');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.offset).toBeUndefined();
		});

		it('should parse single orderBy field ascending', () => {
			const url = new URL('https://example.com?orderBy=name');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.orderBy).toBeDefined();
		});

		it('should parse single orderBy field descending', () => {
			const url = new URL('https://example.com?orderBy=-name');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.orderBy).toBeDefined();
		});

		it('should parse multiple orderBy fields', () => {
			const url = new URL('https://example.com?orderBy=name,-email');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(Array.isArray(result.orderBy)).toBe(true);
			expect((result.orderBy as unknown[]).length).toBe(2);
		});

		it('should skip invalid column names in orderBy', () => {
			const url = new URL('https://example.com?orderBy=name,invalidColumn');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.orderBy).toBeDefined();
		});

		it('should handle empty orderBy fields', () => {
			const url = new URL('https://example.com?orderBy=name,,email');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(Array.isArray(result.orderBy)).toBe(true);
			expect((result.orderBy as unknown[]).length).toBe(2);
		});

		it('should handle whitespace in orderBy fields', () => {
			const url = new URL('https://example.com?orderBy= name , -email ');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(Array.isArray(result.orderBy)).toBe(true);
			expect((result.orderBy as unknown[]).length).toBe(2);
		});

		it('should return empty array orderBy when no valid columns', () => {
			const url = new URL('https://example.com?orderBy=invalidColumn');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.orderBy).toStrictEqual([]);
		});

		it('should combine all query parameters correctly', () => {
			const url = new URL('https://example.com?limit=25&offset=50&orderBy=-name,email');

			const result = getUrlOptionsUtil(url, testUsers);

			expect(result.limit).toBe(25);
			expect(result.offset).toBe(50);
			expect(Array.isArray(result.orderBy)).toBe(true);
		});
	});

	describe('getBodyFiltersUtil', () => {
		it('should return empty array when no filters provided', () => {
			const filters = {} as BodyFiltersUtil;
			const config = { ids: testUsers.id };

			const result = getBodyFiltersUtil(filters, config);

			expect(result).toEqual([]);
		});

		it('should create inArray condition for ids filter', () => {
			const filters: BodyFiltersUtil = { ids: [1, 2, 3] };
			const config = { ids: testUsers.id };

			const result = getBodyFiltersUtil(filters, config);

			expect(result).toHaveLength(1);
		});

		it('should handle empty ids array', () => {
			const filters: BodyFiltersUtil = { ids: [] };
			const config = { ids: testUsers.id };

			const result = getBodyFiltersUtil(filters, config);

			expect(result).toHaveLength(1);
		});

		it('should skip filters without corresponding column configuration', () => {
			const filters: BodyFiltersUtil = { ids: [1, 2, 3] };
			const config = {} as Record<keyof BodyFiltersUtil, Column>;

			const result = getBodyFiltersUtil(filters, config);

			expect(result).toEqual([]);
		});

		it('should handle single id in array', () => {
			const filters: BodyFiltersUtil = { ids: [42] };
			const config = { ids: testUsers.id };

			const result = getBodyFiltersUtil(filters, config);

			expect(result).toHaveLength(1);
		});
	});

	describe('integration scenarios', () => {
		it('should work together for typical API endpoint usage', () => {
			const url = new URL('https://example.com/api/users?q=john&limit=10&offset=20&orderBy=-name');
			const filters: BodyFiltersUtil = { ids: [1, 2, 3] };

			const urlFilters = getUrlFiltersUtil(url, {
				searchColumns: [testUsers.name, testUsers.email]
			});
			const urlOptions = getUrlOptionsUtil(url, testUsers);
			const bodyFilters = getBodyFiltersUtil(filters, { ids: testUsers.id });

			expect(urlFilters).toHaveLength(2);
			expect(urlOptions.limit).toBe(10);
			expect(urlOptions.offset).toBe(20);
			expect(urlOptions.orderBy).toBeDefined();
			expect(bodyFilters).toHaveLength(1);
		});

		it('should handle minimal query parameters', () => {
			const url = new URL('https://example.com/api/users');
			const filters: BodyFiltersUtil = { ids: [] };

			const urlFilters = getUrlFiltersUtil(url, { searchColumns: [testUsers.name] });
			const urlOptions = getUrlOptionsUtil(url, testUsers);
			const bodyFilters = getBodyFiltersUtil(filters, { ids: testUsers.id });

			expect(urlFilters).toEqual([]);
			expect(urlOptions.limit).toBe(DEFAULT_LIMIT);
			expect(urlOptions.offset).toBeUndefined();
			expect(urlOptions.orderBy).toBeUndefined();
			expect(bodyFilters).toHaveLength(1);
		});
	});
});
