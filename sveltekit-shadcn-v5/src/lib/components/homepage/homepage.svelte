<script lang="ts">
	import { t } from '$lib/i18n';
	import Card from '$lib/components/ui/card/card.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { homepageConfig, type HomepageConfig } from './configurations/homepage.js';

	interface Props {
		config?: HomepageConfig;
	}

	let { config = homepageConfig }: Props = $props();
</script>

<div class="container mx-auto max-w-6xl px-4 py-8">
	<div class="mb-16 text-center">
		<h1
			class="from-primary to-primary/60 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
		>
			{$t(config.hero.title)}
		</h1>
		<p class="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl md:text-2xl">
			{$t(config.hero.description)}
		</p>
	</div>

	<div class="mb-16">
		<h2 class="mb-8 text-center text-3xl font-bold">
			{$t(config.techStack.title)}
		</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{#each config.techStack.items as item, index (item.title)}
				<Card
					class="fade-in text-center transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
					style="animation-delay: {index * 100}ms"
				>
					<CardHeader>
						<div
							class="bg-primary/10 hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 hover:scale-110"
						>
							<item.icon
								class="text-primary h-6 w-6 transition-transform duration-300 hover:rotate-6"
							/>
						</div>
						<CardTitle class="hover:text-primary text-lg transition-colors duration-300">
							{$t(item.title)}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription class="transition-colors duration-300">
							{$t(item.description)}
						</CardDescription>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>

	<div class="mb-16">
		<h2 class="mb-8 text-center text-3xl font-bold">
			{$t(config.features.title)}
		</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each config.features.items as feature, index (feature.title)}
				<Card
					class="fade-in transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg"
					style="animation-delay: {index * 150}ms"
				>
					<CardHeader>
						<CardTitle
							class="hover:text-primary flex items-center gap-2 transition-colors duration-300"
						>
							<feature.icon
								class="text-primary h-5 w-5 transition-transform duration-300 hover:scale-110 hover:rotate-12"
							/>
							{$t(feature.title)}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription class="hover:text-foreground/80 transition-all duration-300">
							{$t(feature.description)}
						</CardDescription>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>

	<Separator class="my-12" />

	<div class="mb-16">
		<h2 class="mb-8 text-center text-3xl font-bold">
			{$t(config.development.title)}
		</h2>
		<Card class="mx-auto max-w-4xl">
			<CardHeader>
				<CardTitle>
					{$t(config.development.subtitle)}
				</CardTitle>
				<CardDescription>
					{$t(config.development.description)}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					{#each config.development.commands as command (command.command)}
						<div>
							<code class="bg-muted block rounded px-3 py-2 text-sm">{command.command}</code>
							<p class="text-muted-foreground mt-1 text-sm">
								{$t(command.description)}
							</p>
						</div>
					{/each}
				</div>
			</CardContent>
		</Card>
	</div>

	<div class="mb-16">
		<h2 class="mb-8 text-center text-3xl font-bold">
			{$t(config.roadmap.title)}
		</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each config.roadmap.items as item, index (item.title)}
				<Card
					class="fade-in border-dashed transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg"
					style="animation-delay: {index * 150}ms"
				>
					<CardHeader>
						<CardTitle
							class="hover:text-primary flex items-center gap-2 transition-colors duration-300"
						>
							<item.icon
								class="text-primary h-5 w-5 transition-transform duration-300 hover:scale-110 hover:rotate-12"
							/>
							{$t(item.title)}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription class="hover:text-foreground/80 transition-all duration-300">
							{$t(item.description)}
						</CardDescription>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
</div>
