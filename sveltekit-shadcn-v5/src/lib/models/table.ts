import type { SortingState } from '@tanstack/table-core';
import type { MenuConfiguration } from './menu';

export interface TableConfiguration<T> {
	bulkActions?: MenuConfiguration<T>;
	onRowClick?: { event: string; ignoreColumns?: string[] };
	pageSize?: number;
	pageIndex?: number;
	sortingState?: SortingState;
	dateFilter?: {
		path: string;
		enabled?: boolean;
		initialState?: { start: Date; end?: Date };
	};
	serverSide?: {
		enabled: boolean;
		totalItems?: number;
		manualPagination?: boolean;
	};
}
