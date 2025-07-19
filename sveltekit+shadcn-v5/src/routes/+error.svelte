<script lang="ts">
	import { page } from '$app/state';
	import * as Alert from '$lib/components/ui/alert';
	import { t } from '$lib/i18n';
	import { title } from '$lib/stores';
	import { CircleAlert } from '@lucide/svelte';

	const errorNumberMessage = t.get('common.error_number', { number: page?.status ?? 500 });
	title.set(errorNumberMessage);
</script>

<div class="flex h-80 items-center justify-center">
	{#if page?.error}
		<div class="flex flex-col">
			<Alert.Root variant="destructive" class="border-destructive/50">
				<CircleAlert />
				<Alert.Title>{errorNumberMessage}</Alert.Title>
				<Alert.Description>
					<p>{$t(`common.status_code_error.${page.status}.description`)}</p>
				</Alert.Description>
			</Alert.Root>
		</div>
	{/if}
</div>
