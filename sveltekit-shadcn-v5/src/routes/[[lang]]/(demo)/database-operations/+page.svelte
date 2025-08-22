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
			const response = await fetch(`${Demo}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					data: [randomUser]
				})
			});

			if (response.ok) {
				const result = await response.json();
				// Add the created user(s) to the local state
				if (result.created && result.created.length > 0) {
					users = [...result.created, ...users];
					total = total + result.created.length;
				}
				console.log('User created successfully:', result);
			} else {
				console.error('Failed to create user:', response.statusText);
			}
		} catch (error) {
			console.error('Error creating user:', error);
		}
	}
	async function onReset() {
		try {
			const response = await fetch(`${Demo}/users`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					filters: []
				})
			});

			if (response.ok) {
				users = [];
				total = 0;
				console.log('Users reset');
			} else {
				console.error('Failed reset users:', response.statusText);
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
