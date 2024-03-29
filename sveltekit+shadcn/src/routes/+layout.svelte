<script>
	import { page } from '$app/stores';
	import Shell from '$lib/components/shell/shell.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import SEO from '$lib/components/seo/seo.svelte';

	$: pageTitle = $page?.data?.seo?.title;
  $: pageDescription = $page?.data?.seo?.description;
	$: path = $page.url.pathname;
</script>

<ModeWatcher defaultMode='dark'/>
<SEO title={pageTitle} description={pageDescription} slug={path}/>
<div class="bg-background w-full h-full p-1 font-mono overflow-hidden">
  <div class="border rounded-lg h-full overflow-hidden">
		<Shell navigationPath={path}>
			<slot />
		</Shell>
	</div>
</div>
