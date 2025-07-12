<script lang="ts">
	import { t, changeLocale, locale } from '$lib/i18n';
	import { AppRoutes } from '$lib/client/configurations/routes';
	import Link from '../link/link.svelte';
	import Combobox from '../combobox/combobox.svelte';
	import { SupportEmail } from '$lib/api/configurations/common';
	import { LanguageSelectorConfiguration } from './configurations/footer';

	function handleLanguageChange(event: { type: string; data: string }) {
		if (event.type === 'language_changed') {
			changeLocale(event.data);
		}
	}
</script>

<footer class="bg-background border-border mt-auto border-t">
	<div class="container mx-auto px-6 py-12">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<div class="col-span-1 md:col-span-2">
				<h3 class="text-foreground text-xl font-bold">{$t('common.brand.name')}</h3>
				<p class="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
					{$t('common.brand.description')}
				</p>
				<div class="mt-6">
					<p class="text-foreground text-sm font-medium">{$t('common.contact_information')}</p>
					<p class="text-muted-foreground mt-1 text-sm">{SupportEmail}</p>
				</div>
			</div>
			{#each AppRoutes as group (group.title)}
				<div>
					<h4 class="text-foreground text-sm font-semibold tracking-wider uppercase">
						{$t(group.title)}
					</h4>
					<ul class="mt-4 space-y-3 text-sm">
						{#each group.children as link (link.path)}
							<li>
								<Link {link} />
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="border-border mt-12 border-t pt-8">
			<div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
				<div
					class="text-muted-foreground flex flex-col items-center space-y-2 text-sm md:flex-row md:space-y-0 md:space-x-6"
				>
					<p>{$t('common.copyright', { year: new Date().getFullYear().toString() })}</p>
				</div>
				<div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
					<div class="flex items-center">
						<Combobox
							configuration={LanguageSelectorConfiguration}
							selectedOption={$locale}
							event={handleLanguageChange}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
