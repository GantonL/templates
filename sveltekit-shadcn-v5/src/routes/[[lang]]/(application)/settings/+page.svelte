<script lang="ts">
	import { t } from '$lib/i18n';
	import { title } from '$lib/stores';
	import ThemeSettings from '$lib/components/settings/theme/theme.svelte';

	title.set(t.get('common.settings'));
</script>

<ThemeSettings />
