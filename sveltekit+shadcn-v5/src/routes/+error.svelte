<script lang="ts">
	import { page } from '$app/state';
	import * as Alert from '$lib/components/ui/alert';
	import { t } from '$lib/i18n';
	import { title } from '$lib/stores';
	import { CircleAlert } from '@lucide/svelte';
	title.set(t.get('common.error_number', { number: page?.status ?? 500 }));
</script>

<div class="flex h-80 items-center justify-center">
	{#if page?.error}
		<div
			class="border-destructive/50 bg-accent/50 text-destructive-foreground flex flex-col gap-4 rounded-lg border p-8"
		>
			<h1 class="text-xl">
				Oh no!
				{#if page?.status === 404}
					This page probably doesn't exist.
				{:else}
					Something went wrong.
				{/if}
			</h1>
			<section class="text-destructive-foreground/60">
				{#if page?.status}
					<p>Error Code: {page?.status}</p>
				{/if}
				{#if page?.error?.message}
					<p>Details: {page?.error?.message}</p>
				{/if}
			</section>
		</div>
	{/if}
</div>
<Alert.Root variant="destructive">
	<CircleAlert />
	<Alert.Title>Unable to process your payment.</Alert.Title>
	<Alert.Description>
		<p>Please verify your billing information and try again.</p>
		<ul class="list-inside list-disc text-sm">
			<li>Check your card details</li>
			<li>Ensure sufficient funds</li>
			<li>Verify billing address</li>
		</ul>
	</Alert.Description>
</Alert.Root>
