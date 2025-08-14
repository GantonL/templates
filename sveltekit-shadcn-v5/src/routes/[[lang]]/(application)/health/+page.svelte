<script lang="ts">
	import BasePage from '$lib/components/base-page/base-page.svelte';
	import { displayStatusConfiguration } from '$lib/client/configurations/server-health-display-status';
	import * as Card from '$lib/components/ui/card';
	import { t } from '$lib/i18n';
	import { page } from '$app/state';
	import type { ServerHealthDisplayStatus } from '$lib/models/server-health-display-status';
	import ResourceMarkdown from '$lib/components/resource-markdown/resource-markdown.svelte';

	const states = $state(page.data);
</script>

<BasePage title="common.server_health" description="seo.description">
	<div class="flex w-full flex-row flex-wrap gap-4">
		{#each displayStatusConfiguration as item (item)}
			<Card.Root class="min-w-96 grow">
				<Card.Header>
					<Card.Title>{@render title(item)}</Card.Title>
					<Card.Description>
						<ResourceMarkdown path={item.descriptionResourcePath} />
					</Card.Description>
				</Card.Header>
			</Card.Root>
		{/each}
	</div>
</BasePage>

{#snippet title(item: ServerHealthDisplayStatus)}
	{@const isOK = states[item.key].status === 'ok'}
	{@const successKey = isOK ? 'success' : 'error'}
	<div class="flex flex-row items-center justify-between gap-4">
		<div class="flex flex-row items-center gap-4">
			{#if item.icon}
				<div class="flex items-center justify-center rounded-full p-2">
					<item.icon />
				</div>
			{/if}
			<span>{$t(item.title)}</span>
			<div
				class="flex flex-row items-center gap-2 rounded-sm border px-1.5 py-1 {isOK
					? 'border-green-500 bg-green-500/20 text-green-500'
					: 'bg-destructive/20 border-destructive text-destructive'}"
				class:bg-destructive={!isOK}
				class:border-destructive={!isOK}
			>
				{#if isOK}
					<item.status.icon.success size={12} />
				{:else}
					<item.status.icon.error size={12} />
				{/if}
				<span class="text-xs">{$t(item.status.message[successKey])}</span>
			</div>
		</div>
	</div>
{/snippet}
