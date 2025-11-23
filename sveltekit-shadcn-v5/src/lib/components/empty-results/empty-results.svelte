<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { t } from '$lib/i18n';
	import { type EmptyResultsConfiguration } from '$lib/models/common';
	import { CircleOff } from '@lucide/svelte';
	import { untrack } from 'svelte';

	const baseConfiguration: EmptyResultsConfiguration = {
		label: 'common.no_results',
		icon: CircleOff
	};
	let {
		action,
		configuration
	}: {
		action?: (event: string) => void;
		configuration?: EmptyResultsConfiguration;
	} = $props();
	$effect.pre(() => {
		untrack(() => {
			configuration = {
				...baseConfiguration,
				...configuration
			};
		});
	});
</script>

<div
	class="flex flex-col items-center justify-center gap-2 rounded-md border p-4 {configuration?.class ??
		''}"
>
	<div class="text-muted-foreground flex flex-col items-center justify-center gap-2">
		{#if configuration?.icon}
			<configuration.icon />
		{/if}
		<span>{$t(configuration?.label ?? '')}</span>
	</div>
	{#if configuration?.action}
		<Button
			variant="secondary"
			onclick={() => configuration?.action && action && action(configuration.action.event)}
		>
			{$t(configuration.action.label)}
		</Button>
	{/if}
</div>
