<script lang="ts">
	import authClient from '$lib/client/auth/client';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { t } from '$lib/i18n';
	import * as Alert from '../ui/alert';
	import EmailAndPassword from './providers/email-and-password.svelte';
	import Google from './providers/google.svelte';

	const session = authClient.useSession();
</script>

<div class="flex items-center justify-center p-4">
	{#if $session.data}
		<Alert.Root>
			<Alert.Title>{$t('common.already_signed_in')}</Alert.Title>
			<Alert.Description
				>{$t('common.as_x', {
					user: $session.data.user.name || $session.data.user.email
				})}</Alert.Description
			>
		</Alert.Root>
	{:else}
		<Card.Root>
			<Card.Header>
				<Card.Title>{$t('common.signin_title')}</Card.Title>
				<Card.Description>{$t('common.signin_description')}</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				<Google />
				{@render OR()}
				<EmailAndPassword />
			</Card.Content>
		</Card.Root>
	{/if}
</div>

{#snippet OR()}
	<div class="flex items-center gap-3">
		<Separator class="flex-1" />
		<span class="text-muted-foreground text-xs uppercase">{$t('common.or')}</span>
		<Separator class="flex-1" />
	</div>
{/snippet}
