<script lang="ts">
	import { page } from '$app/state';
	import AppDataTable from '$lib/components/app-data-table/app-data-table.svelte';
	import BasePage from '$lib/components/base-page/base-page.svelte';
	import { type User } from '$lib/server/database/schema';
	import { Demo } from '../../../api';
	import { columns, tableConfiguration } from './configurations';

	let users = $state<User[]>(page.data.users ?? []);
	let total = $state<number>(page.data.total ?? 0);

	$effect.pre(() => {
		tableConfiguration.serverSide!.totalItems = total;
	});

	const firstNames = [
		'Alice',
		'Bob',
		'Charlie',
		'Diana',
		'Eve',
		'Frank',
		'Grace',
		'Henry',
		'Ivy',
		'Jack',
		'Kate',
		'Liam',
		'Mia',
		'Noah',
		'Olivia',
		'Paul',
		'Quinn',
		'Ruby',
		'Sam',
		'Tara',
		'Uma',
		'Victor',
		'Wendy',
		'Xander',
		'Yara',
		'Zoe',
		'Alex',
		'Blake',
		'Casey',
		'Drew'
	];

	// Array of sample last names
	const lastNames = [
		'Anderson',
		'Brown',
		'Clark',
		'Davis',
		'Evans',
		'Fisher',
		'Garcia',
		'Harris',
		'Johnson',
		'King',
		'Lee',
		'Miller',
		'Nelson',
		"O'Connor",
		'Parker',
		'Quinn',
		'Roberts',
		'Smith',
		'Taylor',
		'Underwood',
		'Valdez',
		'Wilson',
		'Young',
		'Zhang',
		'Adams',
		'Bennett',
		'Cooper'
	];

	function generateRandomUser() {
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
		const name = `${firstName} ${lastName}`;
		const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

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
			console.log(response);

			if (response.ok) {
				const result = await response.json();
				// Add the created user(s) to the local state
				if (result.created && result.created.length > 0) {
					users = [...result.created, ...users];
					total = users.length;
					tableConfiguration.serverSide!.totalItems = total;
				}
				console.log('User created successfully:', result);
			} else {
				console.error('Failed to create user:', response.statusText);
			}
		} catch (error) {
			console.error('Error creating user:', error);
		}
	}
</script>

<BasePage title="common.database_operations" description="seo.description">
	<AppDataTable data={users} {columns} configuration={tableConfiguration} addData={onAddData} />
</BasePage>
