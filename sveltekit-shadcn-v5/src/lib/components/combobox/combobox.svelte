<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import type { ComboboxConfiguration } from '$lib/models/combobox';
	import { LoaderCircle } from '@lucide/svelte';
	import { t } from '$lib/i18n';

	let {
		configuration,
		selectedOption,
		event,
		disabled,
		inProgress
	}: {
		configuration: ComboboxConfiguration;
		selectedOption?: string;
		event: (e: { type: string; data: string }) => void;
		disabled?: boolean;
		inProgress?: boolean;
	} = $props();

	let open = $state(false);
	let value = $state(selectedOption);
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(configuration.options.find((f) => f.value === value));

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef} {disabled}>
		{#snippet child({ props })}
			<div class="flex flex-col gap-2">
				<Button
					disabled={disabled || inProgress}
					variant="outline"
					class="w-fit"
					{...props}
					role="combobox"
					aria-expanded={open}
				>
					{selectedValue?.noTranslationRequired
						? (selectedValue?.label ?? $t(configuration.placeholder ?? 'common.select_an_option'))
						: $t(selectedValue?.label ?? configuration.placeholder ?? 'common.select_an_option')}
					{#if inProgress}
						<LoaderCircle size="14" class="animate-spin" />
					{:else}
						<ChevronsUpDown class="opacity-50" />
					{/if}
				</Button>
				{#if selectedValue?.description}
					<span class="text-muted-foreground flex flex-row text-sm italic">
						{selectedValue.description}
					</span>
				{/if}
			</div>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder={$t(configuration.search?.placeholder ?? 'common.search')} />
			<Command.List>
				<Command.Empty
					>{$t(configuration.search?.emptyState ?? 'common.no_option_found')}</Command.Empty
				>
				<Command.Group>
					{#each configuration.options as option (option.value)}
						<Command.Item
							value={option.value}
							disabled={option.disabledIf && option.disabledIf(option.disabledIfArgs)}
							onSelect={() => {
								value = option.value;
								event({ type: configuration.event ?? 'option_selecetd', data: value });
								closeAndFocusTrigger();
							}}
						>
							<Check class={cn(value !== option.value && 'text-transparent')} />
							{option.noTranslationRequired ? option.label : $t(option.label)}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
