<script lang="ts">
	import { t } from '$lib/i18n';
	import { Palette } from '@lucide/svelte';
	import * as Card from '../../ui/card';
	import * as Select from '../../ui/select';
	import { theme } from '$lib/stores';
	import { changeTheme } from '$lib/theme/manager';
	import { themes, themeStorageKey } from '$lib/client/configurations/theme';
	import type { Themes } from '$lib/enums/theme';

	function onChangeTheme(newTheme: string) {
		localStorage.setItem(themeStorageKey, newTheme);
		changeTheme(newTheme as Themes);
	}
	const currentTheme = $derived(themes.find((t) => t.value === $theme));
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>
			<div class="flex flex-row items-center gap-2">
				<Palette size="18" />
				<span>{$t('common.theme')}</span>
			</div>
		</Card.Title>
		<Card.Description>{$t('common.theme_settings_description')}</Card.Description>
	</Card.Header>
	<div class="px-4 pb-4">
		<Select.Root type="single" onValueChange={onChangeTheme}>
			<Select.Trigger>{$t(currentTheme!.label)}</Select.Trigger>
			<Select.Content>
				{#each themes as option (option.value)}
					<Select.Item value={option.value}>{$t(option.label)}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
</Card.Root>
