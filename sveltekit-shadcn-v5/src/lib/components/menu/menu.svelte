<script lang="ts" generics="TMenuData">
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { MenuConfiguration } from '$lib/models/menu';
	import { t } from '$lib/i18n';
	import { useSidebar } from '../ui/sidebar';
	import { direction } from '$lib/stores';

	let {
		rawData,
		configuration,
		disabled,
		event
	}: {
		rawData: TMenuData;
		configuration: MenuConfiguration<TMenuData>;
		disabled?: boolean;
		event: (e: { type: string; data: TMenuData }) => void;
	} = $props();

	const dir = $derived($direction === 'rl' ? 'rtl' : 'ltr');

	const sidebar = useSidebar();
</script>

<DropdownMenu.Root {dir}>
	<DropdownMenu.Trigger {disabled}>
		{#snippet child({ props })}
			<Button
				{disabled}
				{...props}
				variant={configuration.buttonVariant ?? 'ghost'}
				size={configuration.label ? 'default' : (configuration.triggerSize ?? 'icon')}
				class="item-center relative flex flex-row gap-2 {configuration.triggerParentClass}"
			>
				<span class="sr-only">Open menu</span>
				{#if configuration.trigger}
					<configuration.trigger class={configuration.triggerClass} />
				{:else}
					<Ellipsis class="size-4 rotate-90" />
				{/if}
				{#if configuration.label && configuration.hideLabelOnSmallScreen && !sidebar.isMobile}
					<span>{$t(configuration.label)}</span>
				{/if}
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		{#each configuration.groups as group, index (group)}
			<DropdownMenu.Group>
				{#if group.header}
					<DropdownMenu.GroupHeading>{$t(group.header)}</DropdownMenu.GroupHeading>
				{/if}
				{#each group.items as item (item)}
					<DropdownMenu.Item
						class="group/item {item.class}"
						disabled={item.disableIf && item.disableIf(rawData)}
						onclick={() => event({ type: item.event, data: $state.snapshot(rawData) as TMenuData })}
					>
						<div class="flex flex-row items-center gap-2">
							{#if item.icon}
								<item.icon size="16" class={item.iconClass} />
							{/if}
							{item.noTranlationRequired ? item.title : $t(item.title)}
						</div>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Group>
			{#if index < configuration.groups.length - 1}
				<DropdownMenu.Separator />
			{/if}
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
