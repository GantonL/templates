<script lang="ts">
	import Shell from '$lib/components/shell/shell.svelte';

	let { children } = $props();
</script>

<Shell>
	{@render children?.()}
</Shell>
