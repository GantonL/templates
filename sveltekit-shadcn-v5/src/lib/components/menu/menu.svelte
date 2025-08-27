<script lang="ts">
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { MenuConfiguration } from '$lib/models/menu';
	import { t } from '$lib/i18n';
	import { useSidebar } from '../ui/sidebar';

	let {
		rawData,
		configuration,
		disabled,
		event
	}: {
		rawData: unknown;
		configuration: MenuConfiguration<unknown>;
		disabled?: boolean;
		event: (e: { type: string; data: unknown }) => void;
	} = $props();

	const sidebar = useSidebar();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger {disabled}>
		{#snippet child({ props })}
			<Button
				{disabled}
				{...props}
				variant={configuration.buttonVariant ?? 'ghost'}
				size={configuration.label ? 'default' : 'icon'}
				class="item-center relative flex flex-row gap-2"
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
						class={item.class}
						disabled={item.disableIf && item.disableIf(rawData)}
						onclick={() => event({ type: item.event, data: $state.snapshot(rawData) })}
					>
						<div class="flex flex-row items-center gap-2">
							{#if item.icon}
								<item.icon size="16" />
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
