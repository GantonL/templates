<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/state';
	import { useSidebar } from '$lib/components/ui/sidebar';
	import { AppRoutes } from '$lib/client/configurations/routes';
	import { locale, t } from '$lib/i18n';
	import { directionMap } from '$lib/api/configurations/common';
	import { direction } from '$lib/stores';
	import type { AvailableLocals } from '$lib/enums/available-locales';
	import { onMount } from 'svelte';

	let side = $state<'right' | 'left'>('left');
	onMount(() => {
		locale.subscribe((seletedLocale) => {
			updateSide(seletedLocale as AvailableLocals);
		});
	});
	function updateSide(locale: AvailableLocals) {
		if (!locale) {
			return;
		}
		if (document) {
			const dir = directionMap[locale] ?? $direction;
			side = dir === 'lr' ? 'left' : 'right';
		}
	}
	let currentPath = $derived(page.url.pathname);
	const sidebar = useSidebar();

	function onSidebarLink() {
		if (!sidebar.isMobile) {
			return;
		}
		sidebar.toggle();
	}
</script>

<Sidebar.Root collapsible="icon" {side}>
	<Sidebar.Content>
		{#each AppRoutes as group (group.title)}
			<Sidebar.Group>
				<Sidebar.GroupLabel>
					{$t(group.title)}
				</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.children as item (item.label)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={currentPath.startsWith(item.path)}>
									{#snippet child({ props })}
										<a href={item.path} {...props} onclick={onSidebarLink}>
											<item.icon />
											<span>{$t(item.label)}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
