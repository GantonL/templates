<script lang="ts">
	import authClient from '$lib/client/auth/client';
	import { LogIn, LogOut, Signature, User } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import Menu from '$lib/components/menu/menu.svelte';
	import type { MenuActionItem, MenuConfiguration } from '$lib/models/menu';
	import UserMenuTrigger from './user-menu-trigger.svelte';
	const session = authClient.useSession();
	const user = $derived($session?.data?.user);
	const showIfUser = (currentUser: typeof user) => {
		return currentUser?.id;
	};
	const authUserItems: MenuActionItem<typeof user>[] = [
		{
			title: 'common.user',
			icon: User,
			event: 'user'
		},
		{
			title: 'common.signout',
			icon: LogOut,
			event: 'signout'
		}
	];
	const noAuthUserItems: MenuActionItem<typeof user>[] = [
		{
			title: 'common.signin',
			icon: LogIn,
			event: 'signin'
		},
		{
			title: 'common.signup',
			icon: Signature,
			event: 'signup'
		}
	];
	const configuration: MenuConfiguration<typeof user> = $derived({
		trigger: UserMenuTrigger,
		triggerSize: 'default',
		triggerParentClass: 'w-full py-0 px-1 h-12',
		groups: [
			{
				items: showIfUser(user) ? authUserItems : noAuthUserItems
			}
		]
	});

	function onItemClick(event: string) {
		switch (event) {
			case 'signout': {
				authClient.signOut();
				break;
			}
			case 'signin': {
				goto('/signin');
				break;
			}
			case 'signup': {
				goto('/signup');
				break;
			}
			case 'user': {
				goto('/user');
				break;
			}
		}
	}
</script>

<Menu {configuration} rawData={user} event={(e) => onItemClick(e.type)} />
