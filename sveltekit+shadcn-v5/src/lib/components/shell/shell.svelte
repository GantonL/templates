<script lang="ts">
	import * as Sidebar from '../ui/sidebar';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import AppSidebar from './sidebar/sidebar.svelte';
	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<div class="flex h-svh w-full flex-col overflow-hidden">
		<Header />
		<div class="relative flex grow flex-col overflow-x-hidden overflow-y-auto">
			<main class="m-auto flex flex-auto grow flex-col items-center gap-8 p-4">
				{@render children?.()}
			</main>
			<Footer />
		</div>
	</div>
</Sidebar.Provider>
