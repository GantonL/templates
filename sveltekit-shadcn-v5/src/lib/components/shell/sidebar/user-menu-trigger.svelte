<script>
	import Avatar from '$lib/components/avatar/avatar.svelte';
	import authClient from '$lib/client/auth/client';
	import { t } from '$lib/i18n';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { useSidebar } from '$lib/components/ui/sidebar';
	const session = authClient.useSession();
	const user = $derived($session?.data?.user);
	const image = $derived(user?.image ?? undefined);
	const name = $derived(user?.name ?? $t('common.user'));
	const sidebar = useSidebar();
</script>

<div class="flex w-full items-center justify-start gap-2 p-1">
	<Avatar styleClass="w-6 h-6" id={user?.id} src={image} />
	{#if sidebar.open}
		<section class="flex flex-col items-start">
			<Tooltip.Root>
				<Tooltip.Trigger>
					<span class="text-sm text-ellipsis">{name}</span>
				</Tooltip.Trigger>
				<Tooltip.Content>
					{name}
				</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<span class="text-xs font-light text-ellipsis">{user?.email}</span>
				</Tooltip.Trigger>
				<Tooltip.Content>
					{user?.email}
				</Tooltip.Content>
			</Tooltip.Root>
		</section>
	{/if}
</div>
