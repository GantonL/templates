<script lang="ts">
	import { t } from '$lib/i18n';
	import { Github } from '@lucide/svelte';
	import ThemeSwitcher from '../theme-switcher/theme-switcher.svelte';
	import Button from '../ui/button/button.svelte';
	import SidebarTrigger from '../ui/sidebar/sidebar-trigger.svelte';
	import * as Tooltip from '../ui/tooltip';
</script>

<header class="grid w-full grid-cols-2 border-b p-2">
	<div class="flex flex-row items-center gap-4">
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<SidebarTrigger />
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>{$t('common.toggle_menu')}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
		<h1 class="flex flex-row items-center gap-3 text-xl">
			<a href="/">{$t('common.brand.name')}</a>
		</h1>
	</div>
	<div class="flex flex-row items-center justify-end gap-2">
		<a href="https://github.com/GantonL/templates/tree/main/sveltekit-shadcn-v5" target="_blank">
			<Button variant="outline" size="icon">
				<Github />
			</Button>
		</a>
		<ThemeSwitcher></ThemeSwitcher>
	</div>
</header>
