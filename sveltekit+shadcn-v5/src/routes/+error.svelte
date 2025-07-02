<script lang="ts">
	import { page } from '$app/state';
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
