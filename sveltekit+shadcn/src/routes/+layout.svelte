<script>
	import { page } from '$app/stores';
	import Shell from '$lib/components/shell/shell.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	$: pageTitle = $page?.data?.seo?.title;
  $: pageDescription = $page?.data?.seo?.description;
</script>

<ModeWatcher defaultMode='dark'/>
<div class="bg-background w-full h-full p-1 font-mono overflow-hidden">
  <div class="border rounded-lg h-full overflow-hidden">
		<Shell navigationPath={$page.url.pathname}>
			<slot />
		</Shell>
	</div>
</div>
