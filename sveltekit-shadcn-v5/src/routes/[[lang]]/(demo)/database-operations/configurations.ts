import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import { Trash2, TableOfContents } from '@lucide/svelte';
import type { TableConfiguration } from '$lib/models/table';
import type { User } from '$lib/server/database/schema';
import Avatar from '$lib/components/avatar/avatar.svelte';
import { locale } from '$lib/i18n';

export type TableUsers = User;

export const columns: ColumnDef<TableUsers>[] = [
	{
		id: 'avatar',
		cell: ({ row }) =>
			renderComponent(Avatar, {
				id: String(row.original.id)
			})
	},
	{
		accessorKey: 'name',
		header: 'common.name'
	},
	{
		accessorKey: 'email',
		header: 'common.email'
	},
	{
		accessorKey: 'createdAt',
		header: 'common.created_at',
		cell: ({ row }) => {
			const createdAt = row.original.createdAt;
			if (!createdAt) return;
			return Intl.DateTimeFormat(locale.get()).format(new Date(createdAt));
		}
	}
];

export const tableConfiguration: TableConfiguration<TableUsers> = {
	bulkActions: {
		label: 'Actions',
		buttonVariant: 'default',
		trigger: TableOfContents,
		groups: [
			{
				items: [
					{
						title: 'common.delete',
						event: 'delete',
						icon: Trash2,
						class: 'bg-destructive/5 text-destructive'
					}
				]
			}
		]
	},
	onRowClick: {
		event: 'navigate',
		ignoreColumns: ['select']
	},
	serverSide: {
		enabled: true,
		manualPagination: true
	},
	pageSize: 10
};
