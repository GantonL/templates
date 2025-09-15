<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { LoaderCircle } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import authClient from '$lib/client/auth/client';
	import { t } from '$lib/i18n';
	const session = authClient.useSession();
	let isLoading = $derived($session?.isPending);

	async function signin() {
		authClient.signIn.social({
			provider: 'google',
			fetchOptions: {
				onError: () => {
					toast.error('Sign in failed');
				}
			}
		});
	}
</script>

<Button variant="outline" class="h-11 w-full gap-3" onclick={signin} disabled={isLoading}>
	{#if isLoading}
		<LoaderCircle class="animate-spin" size={18} />
	{:else}
		<img src="images/google_icon.svg" alt="Google icon" width="24" height="24" />
	{/if}
	{$t('common.continue_with_google')}
</Button>
