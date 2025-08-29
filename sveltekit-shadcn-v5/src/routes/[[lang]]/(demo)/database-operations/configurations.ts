import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import { Trash2, TableOfContents } from '@lucide/svelte';
import type { TableConfiguration } from '$lib/models/table';
import type { User } from '$lib/server/database/schema';
import Avatar from '$lib/components/avatar/avatar.svelte';
import { locale } from '$lib/i18n';
import { Checkbox } from '$lib/components/ui/checkbox';

export type TableUsers = User;

export const columns: ColumnDef<TableUsers>[] = [
	{
		id: 'select',
		header: ({ table }) =>
			renderComponent(Checkbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				controlledChecked: true,
				'aria-label': 'Select all'
			}),
		cell: ({ row }) =>
			renderComponent(Checkbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				controlledChecked: true,
				'aria-label': 'Select row'
			}),
		enableSorting: false,
		enableHiding: false
	},
	{
		id: 'avatar',
		cell: ({ row }) =>
			renderComponent(Avatar, {
				id: String(row.original.id)
			}),
		enableSorting: false
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
		label: 'common.actions',
		hideLabelOnSmallScreen: true,
		buttonVariant: 'default',
		trigger: TableOfContents,
		groups: [
			{
				items: [
					{
						title: 'common.delete',
						event: 'delete',
						icon: Trash2,
						class: 'bg-destructive/12 text-destructive',
						iconClass: 'not:group-hover/item:text-destructive'
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
