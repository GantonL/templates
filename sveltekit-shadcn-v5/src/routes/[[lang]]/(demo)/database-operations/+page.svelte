<script lang="ts">
	import { page } from '$app/state';
	import AppDataTable from '$lib/components/app-data-table/app-data-table.svelte';
	import BasePage from '$lib/components/base-page/base-page.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { t } from '$lib/i18n';
	import { type User } from '$lib/server/database/schema';
	import { CircleAlert, Info } from '@lucide/svelte';
	import { Demo } from '../../../api';
	import { columns, tableConfiguration } from './configurations';
	import { Button } from '$lib/components/ui/button';
	import { DELETE, GET, POST } from '$lib/api/helpers/request';
	import { type TableConfiguration } from '$lib/models/table';

	let users = $state<User[]>(page.data.users ?? []);
	let total = $state<number>(page.data.total ?? 0);
	let isDB = $state<number>(page.data.dbAvailable ?? false);
	let fetchInProgress = $state(false);
	let configuration = $derived<TableConfiguration<User>>({
		...tableConfiguration,
		serverSide: {
			...tableConfiguration.serverSide,
			totalItems: total
		} as TableConfiguration<User>['serverSide']
	});

	function generateRandomUser() {
		const firstName = t.get('common.user');
		const lastName = Math.floor(Math.random() * 1000000000);
		const name = `${firstName} ${lastName}`;
		const email = `${firstName.toLowerCase()}.${lastName}@example.com`;
		return { name, email };
	}
	async function onAddData() {
		try {
			const randomUser = generateRandomUser();
			const response = await POST<[typeof randomUser], { created: [User] }>(`${Demo}/users`, [
				randomUser
			]);
			const newUsers = response?.created ?? [];
			if (!newUsers || (newUsers as User[]).length === 0) {
				return;
			}
			if (configuration.serverSide?.enabled && users.length + 1 > tableConfiguration.pageSize!) {
				users.pop();
			}
			users = [...newUsers, ...users];
			total = total + 1;
		} catch (error) {
			console.error('Error creating user:', error);
		}
	}
	async function onPageIndexChanged(newIndex: number) {
		fetchInProgress = true;
		const limit = 10;
		const offset = newIndex === 0 ? newIndex : newIndex * limit;
		const response = await GET<User[]>(`${Demo}/users`, { limit, offset });
		users = response;
		fetchInProgress = false;
	}
	async function onReset() {
		try {
			const response = await DELETE<[], { deleted: number }>(`${Demo}/users`, []);
			const deleted = response?.deleted ?? 0;
			if (!deleted) {
				return;
			}
			if (deleted === total) {
				users = [];
				total = 0;
			}
		} catch (error) {
			console.error('Error reseting users:', error);
		}
	}
	function onBulkActions(e: { type: string; data: User[] }) {
		switch (e?.type) {
			case 'delete':
				onDelete(e.data);
				break;
			default:
				break;
		}
	}
	async function onDelete(usersToDelete: User[]) {
		const response = await DELETE<{ ids: number[] }, { deleted: number }>(`${Demo}/users`, {
			ids: usersToDelete.map((u) => u.id)
		});
		const deleted = response?.deleted ?? 0;
		if (!deleted) {
			return;
		}
		if (deleted === total) {
			users = [];
			total = 0;
			return;
		}
		if (deleted === usersToDelete.length) {
			const idsToDelete = usersToDelete.map((u) => u.id);
			users = users.filter((u) => !idsToDelete.includes(u.id));
			total = total - deleted;
			if (users.length === 0) {
				onPageIndexChanged(0);
			}
		}
	}
</script>

<BasePage title="common.database_operations" description="seo.description">
	{#if !isDB}
		<Alert.Root variant="destructive" class="border-destructive/50">
			<Info />
			<Alert.Title>{$t('common.database_unavailable')}</Alert.Title>
			<Alert.Description class="py-2">
				{$t('common.database_unavailable_demo_description')}
			</Alert.Description>
		</Alert.Root>
	{/if}
	{#key total}
		<AppDataTable
			data={users}
			{columns}
			{configuration}
			addData={onAddData}
			pageIndexChanged={onPageIndexChanged}
			disabled={fetchInProgress}
			isLoading={fetchInProgress}
			bulkActions={onBulkActions}
		/>
	{/key}
	{#if isDB}
		<Alert.Root variant="destructive" class="border-destructive/50">
			<CircleAlert />
			<Alert.Title>{$t('common.danger_zone')}</Alert.Title>
			<Alert.Description class="py-2">
				<Button variant="destructive" size="lg" onclick={onReset} disabled={total === 0}>
					{$t('common.reset_data')}
				</Button>
			</Alert.Description>
		</Alert.Root>
	{/if}
</BasePage>
