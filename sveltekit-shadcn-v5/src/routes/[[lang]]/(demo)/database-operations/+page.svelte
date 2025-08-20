<script lang="ts">
	import { page } from '$app/state';
	import AppDataTable from '$lib/components/app-data-table/app-data-table.svelte';
	import BasePage from '$lib/components/base-page/base-page.svelte';
	import { type User } from '$lib/server/database/schema';
	import { Demo } from '../../../api';
	import { columns, tableConfiguration } from './configurations';

	let users = $state<User[]>(page.data.users ?? []);

	function onAddData() {
		const body = new FormData();
		fetch(`${Demo}/users`, { method: 'POST', body });
	}
</script>

<BasePage title="common.database_operations" description="seo.description">
	<AppDataTable data={users} {columns} configuration={tableConfiguration} addData={onAddData} />
</BasePage>
