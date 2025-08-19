import type { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';
import { MAX_FIND_LIMIT, type QueryOptions, type WhereCondition } from './abstract';
import { ilike, desc, asc, inArray, type SQL, Column } from 'drizzle-orm';

export const DEFAULT_LIMIT = 20;

export const getUrlFiltersUtil = <T>(
	url: URL,
	configuration: { searchColumns: Column[] }
): WhereCondition<T>[] => {
	const searchParams = url.searchParams;
	const query = searchParams.get('q');

	if (query === null || !configuration?.searchColumns) {
		return [];
	}

	const conditions: WhereCondition<T>[] = [];
	configuration.searchColumns.forEach((searchColumn) => {
		conditions.push(ilike(searchColumn, `%${query}%`));
	});
	return conditions;
};

export const getUrlOptionsUtil = <T extends TableConfig>(
	url: URL,
	table: PgTableWithColumns<T>
): QueryOptions => {
	const searchParams = url.searchParams;

	const options: QueryOptions = {
		limit: getLimitFromSearchParams(searchParams),
		offset: getOffsetFromSearchParams(searchParams),
		orderBy: getOrderByFromSearchParams<T>(searchParams, table)
	};
	return options;
};

const getLimitFromSearchParams = (searchParams: URL['searchParams']): QueryOptions['limit'] => {
	const limitParam = searchParams.get('limit');
	if (limitParam === null) return DEFAULT_LIMIT;
	const limit = Number(limitParam);
	if (limit > 0 && limit <= MAX_FIND_LIMIT) {
		return limit;
	}
	return DEFAULT_LIMIT;
};

const getOffsetFromSearchParams = (searchParams: URL['searchParams']): QueryOptions['offset'] => {
	const offsetParam = searchParams.get('offset');
	if (offsetParam === null) return;
	const offset = Number(offsetParam);
	if (offset >= 0) {
		return offset;
	}
};

const getOrderByFromSearchParams = <T extends TableConfig>(
	searchParams: URL['searchParams'],
	table: PgTableWithColumns<T>
): QueryOptions['orderBy'] => {
	const orderBy = searchParams.get('orderBy');
	if (orderBy === null) return;

	const orderByFields = orderBy.split(',');

	const orderByClauses: SQL[] = [];

	for (const field of orderByFields) {
		const trimmedField = field.trim();
		if (!trimmedField) continue;

		const isDescending = trimmedField.startsWith('-');
		const columnName = isDescending ? trimmedField.slice(1) : trimmedField;

		if (!table[columnName]) {
			console.warn(`Column '${columnName}' not found in table, skipping`);
			continue;
		}

		orderByClauses.push(isDescending ? desc(table[columnName]) : asc(table[columnName]));
	}

	return orderByClauses.length === 1 ? orderByClauses[0] : orderByClauses;
};

export interface BodyFiltersUtil {
	ids: number[];
}
export const getBodyFiltersUtil = <T, F extends BodyFiltersUtil>(
	filters: F,
	configuration: Record<keyof F, Column>
): WhereCondition<T>[] => {
	const conditions: WhereCondition<T>[] = [];
	for (const key of Object.keys(filters)) {
		const typedKey = key as keyof BodyFiltersUtil;
		const value = filters[typedKey];
		const column = configuration[typedKey];
		if (!column) continue;
		switch (key) {
			case 'ids': {
				conditions.push(inArray(column, value));
			}
		}
	}
	return conditions;
};
