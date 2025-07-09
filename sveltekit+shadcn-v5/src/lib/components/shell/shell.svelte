<script lang="ts">
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	let { children } = $props();
</script>

<div class="flex h-svh flex-col overflow-hidden">
	<Header />
	<div class="relative flex grow flex-col overflow-x-hidden overflow-y-auto">
		<main class="m-auto flex flex-auto grow flex-col items-center gap-8 p-4">
			{@render children?.()}
		</main>
		<Footer />
	</div>
</div>
