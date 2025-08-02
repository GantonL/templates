import type { Component } from 'svelte';
import {
	Code,
	Palette,
	Globe,
	Zap,
	Settings,
	Layers,
	Brush,
	FileCode2,
	Cookie,
	Menu,
	Database,
	Wrench,
	Table,
	PersonStanding
} from '@lucide/svelte';

export interface HomepageHeroConfig {
	title: string;
	description: string;
}

export interface HomepageTechStackItem {
	title: string;
	description: string;
	icon: Component;
}

export interface HomepageFeatureItem {
	title: string;
	description: string;
	icon: Component;
}

export interface HomepageCommandItem {
	command: string;
	description: string;
}

export interface HomepageDevelopmentConfig {
	title: string;
	subtitle: string;
	description: string;
	commands: HomepageCommandItem[];
}

export interface HomepageRoadmapItem {
	title: string;
	description: string;
	icon: Component;
}

export interface HomepageRoadmapConfig {
	title: string;
	items: HomepageRoadmapItem[];
}

export interface HomepageConfig {
	hero: HomepageHeroConfig;
	techStack: {
		title: string;
		items: HomepageTechStackItem[];
	};
	features: {
		title: string;
		items: HomepageFeatureItem[];
	};
	development: HomepageDevelopmentConfig;
	roadmap: HomepageRoadmapConfig;
}

export const homepageConfig: HomepageConfig = {
	hero: {
		title: 'homepage.hero.title',
		description: 'homepage.hero.description'
	},
	techStack: {
		title: 'homepage.techStack.title',
		items: [
			{
				title: 'homepage.techStack.sveltekit.title',
				description: 'homepage.techStack.sveltekit.description',
				icon: Layers
			},
			{
				title: 'homepage.techStack.shadcn.title',
				description: 'homepage.techStack.shadcn.description',
				icon: Palette
			},
			{
				title: 'homepage.techStack.tailwind.title',
				description: 'homepage.techStack.tailwind.description',
				icon: Brush
			},
			{
				title: 'homepage.techStack.typescript.title',
				description: 'homepage.techStack.typescript.description',
				icon: FileCode2
			}
		]
	},
	features: {
		title: 'homepage.features.title',
		items: [
			{
				title: 'homepage.features.appShell.title',
				description: 'homepage.features.appShell.description',
				icon: Settings
			},
			{
				title: 'homepage.features.theming.title',
				description: 'homepage.features.theming.description',
				icon: Palette
			},
			{
				title: 'homepage.features.i18n.title',
				description: 'homepage.features.i18n.description',
				icon: Globe
			},
			{
				title: 'homepage.features.cookies.title',
				description: 'homepage.features.cookies.description',
				icon: Cookie
			},
			{
				title: 'homepage.features.seo.title',
				description: 'homepage.features.seo.description',
				icon: Zap
			},
			{
				title: 'homepage.features.configuration.title',
				description: 'homepage.features.configuration.description',
				icon: Code
			}
		]
	},
	development: {
		title: 'homepage.development.title',
		subtitle: 'homepage.development.subtitle',
		description: 'homepage.development.description',
		commands: [
			{
				command: 'bun run dev',
				description: 'homepage.development.commands.dev'
			},
			{
				command: 'bun run build',
				description: 'homepage.development.commands.build'
			},
			{
				command: 'bun run test',
				description: 'homepage.development.commands.test'
			},
			{
				command: 'bun run create:page',
				description: 'homepage.development.commands.createPage'
			},
			{
				command: 'bun run create:md',
				description: 'homepage.development.commands.createMd'
			},
			{
				command: 'bun run create:api-controller',
				description: 'homepage.development.commands.createApi'
			}
		]
	},
	roadmap: {
		title: 'homepage.roadmap.title',
		items: [
			{
				title: 'homepage.roadmap.layoutVariants.title',
				description: 'homepage.roadmap.layoutVariants.description',
				icon: Menu
			},
			{
				title: 'homepage.roadmap.database.title',
				description: 'homepage.roadmap.database.description',
				icon: Database
			},
			{
				title: 'homepage.roadmap.cli.title',
				description: 'homepage.roadmap.cli.description',
				icon: Wrench
			},
			{
				title: 'homepage.roadmap.components.title',
				description: 'homepage.roadmap.components.description',
				icon: Table
			},
			{
				title: 'homepage.roadmap.accessibility.title',
				description: 'homepage.roadmap.accessibility.description',
				icon: PersonStanding
			}
		]
	}
};
