<script lang="ts">
	import authClient from '$lib/client/auth/client';
	import * as Card from '$lib/components/ui/card';
	import { t } from '$lib/i18n';
	import { LoaderCircle } from '@lucide/svelte';
	import * as Alert from '../ui/alert';
	import Button from '../ui/button/button.svelte';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';
	import { toast } from 'svelte-sonner';
	const session = authClient.useSession();

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);

	async function signup() {
		isLoading = true;
		const { error } = await authClient.signUp.email({
			name,
			email,
			password,
			callbackURL: '/'
		});
		if (error) {
			toast.error(t.get(`common.auth_errors.${error.code}`));
		}
		isLoading = false;
	}
</script>

<div class="flex items-center justify-center p-4">
	{#if $session.data}
		<Alert.Root>
			<Alert.Title>{$t('common.signed_up_successfuly')}</Alert.Title>
			<Alert.Description
				>{$t('common.as_x', {
					user: $session.data.user.name || $session.data.user.email
				})}</Alert.Description
			>
		</Alert.Root>
	{:else}
		<Card.Root>
			<Card.Header>
				<Card.Title>{$t('common.signup_title')}</Card.Title>
				<Card.Description>{$t('common.signup_description')}</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				<form onsubmit={signup} class="space-y-4">
					<div class="space-y-2">
						<Label for="email">{$t('common.email')}</Label>
						<Input
							id="email"
							type="email"
							placeholder={t.get('common.enter_email')}
							bind:value={email}
							required
							disabled={isLoading}
						/>
					</div>

					<div class="space-y-2">
						<Label for="name">{$t('common.name')}</Label>
						<Input
							id="name"
							type="name"
							placeholder={t.get('common.enter_name')}
							bind:value={name}
							required
							disabled={isLoading}
						/>
					</div>

					<div class="space-y-2">
						<Label for="password">{$t('common.password')}</Label>
						<Input
							id="password"
							type="password"
							placeholder={t.get('common.enter_password')}
							bind:value={password}
							required
							disabled={isLoading}
						/>
					</div>

					<Button type="submit" class="w-full" disabled={isLoading}>
						{#if isLoading}
							<LoaderCircle class="animate-spin" size={18} />
						{/if}
						{$t('common.signup')}
					</Button>
				</form>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
