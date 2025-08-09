<script lang="ts">
	import BasePage from '$lib/components/base-page/base-page.svelte';
	import { displayStatusConfiguration } from '$lib/client/configurations/server-health-display-status';
	import * as Card from '$lib/components/ui/card';
	import { t } from '$lib/i18n';
	import { page } from '$app/state';
</script>

<BasePage title="common.server_health" description="seo.description">
	<div class="flex w-full flex-row flex-wrap gap-4">
		{#each displayStatusConfiguration as item (item)}
			<Card.Root class="min-w-96 grow">
				<Card.Header>
					<Card.Title>
						<div class="flex flex-row items-center gap-4">
							{#if item.icon}
								<div class="bg-accent flex items-center justify-center rounded-full p-2">
									{#if page.data[item.key].status === 'ok'}
										<item.icon.success />
									{:else}
										<item.icon.error />
									{/if}
								</div>
							{/if}
							{t.get(
								page.data[item.key].status === 'ok' ? item.message.success : item.message.error
							)}
						</div>
					</Card.Title>
					<Card.Description>{t.get(item.description)}</Card.Description>
				</Card.Header>
			</Card.Root>
		{/each}
	</div>
</BasePage>
