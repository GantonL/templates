<script lang="ts">
	import Avatar from '$lib/components/avatar/avatar.svelte';
	import * as Card from '$lib/components/ui/card';
	import { t } from '$lib/i18n';
	import { CircleCheck, CircleX } from '@lucide/svelte';

	let { user } = $props();
</script>

<Card.Root class="w-full max-w-lg">
	<Card.Header class="flex flex-col items-center text-center">
		<Avatar styleClass="h-18 w-18" src={user.image} size={120} />
		<Card.Title class="text-2xl">{user.name}</Card.Title>
		<Card.Description class="">{user.email}</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-4">
		<div class="flex justify-between">
			<span class="font-semibold">{$t('common.email_verified')}</span>
			{#if user.emailVerified}
				<CircleCheck class="text-green-500" />
			{:else}
				<CircleX class="text-destructive" />
			{/if}
		</div>
		<div class="flex justify-between">
			<span class="font-semibold">{$t('common.created_at')}</span>
			<span>{new Date(user.createdAt).toLocaleDateString()}</span>
		</div>
		<div class="flex justify-between">
			<span class="font-semibold">{$t('common.last_updated')}</span>
			<span>{new Date(user.updatedAt).toLocaleDateString()}</span>
		</div>
	</Card.Content>
</Card.Root>
