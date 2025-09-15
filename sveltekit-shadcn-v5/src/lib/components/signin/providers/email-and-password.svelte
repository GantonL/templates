<script lang="ts">
	import authClient from '$lib/client/auth/client';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { t } from '$lib/i18n';
	import { LoaderCircle } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	const session = authClient.useSession();
	let email = $state('');
	let password = $state('');
	let isLoading = $derived($session?.isPending);
	async function signin(event: Event) {
		event.preventDefault();
		authClient.signIn.email({
			email,
			password,
			fetchOptions: {
				onError: () => {
					toast.error('Sign in failed');
				}
			}
		});
	}
</script>

<form onsubmit={signin} class="space-y-4">
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
		{$t('common.sign_in')}
	</Button>
</form>
