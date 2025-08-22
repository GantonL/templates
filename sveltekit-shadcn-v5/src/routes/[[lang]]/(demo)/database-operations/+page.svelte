<script lang="ts">
	import { page } from '$app/state';
	import AppDataTable from '$lib/components/app-data-table/app-data-table.svelte';
	import BasePage from '$lib/components/base-page/base-page.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { t } from '$lib/i18n';
	import { type User } from '$lib/server/database/schema';
	import { CircleAlert } from '@lucide/svelte';
	import { Demo } from '../../../api';
	import { columns, tableConfiguration } from './configurations';
	import { Button } from '$lib/components/ui/button';
	import { DELETE, POST } from '$lib/api/helpers/request';

	let users = $state<User[]>(page.data.users ?? []);
	let total = $state<number>(page.data.total ?? 0);

	$effect.pre(() => {
		tableConfiguration.serverSide!.totalItems = total;
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
			users = [...newUsers, ...users];
			total = total + 1;
		} catch (error) {
			console.error('Error creating user:', error);
		}
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
</script>

<BasePage title="common.database_operations" description="seo.description">
	<AppDataTable data={users} {columns} configuration={tableConfiguration} addData={onAddData} />
	<Alert.Root variant="destructive" class="border-destructive/50">
		<CircleAlert />
		<Alert.Title>{$t('common.danger_zone')}</Alert.Title>
		<Alert.Description class="py-2">
			<Button variant="destructive" size="lg" onclick={onReset} disabled={total === 0}>
				{$t('common.reset_data')}
			</Button>
		</Alert.Description>
	</Alert.Root>
</BasePage>
