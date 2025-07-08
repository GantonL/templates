<script lang="ts">
	import ResourceMarkdown from '$lib/components/resource-markdown/resource-markdown.svelte';
	import { t } from '$lib/i18n';
	import { title } from '$lib/stores';
	title.set(t.get('common.privacy_policy'));
</script>

<ResourceMarkdown path="privacy-policy" />
