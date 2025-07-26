import { BaseDemoUrl } from '$lib/api/configurations/common';

export const Breadcrumbs = {
	'@type': 'BreadcrumbList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			item: `${BaseDemoUrl}`
		},
		{
			'@type': 'ListItem',
			position: 2,
			name: 'Example',
			item: `${BaseDemoUrl}/example`
		},
		{
			'@type': 'ListItem',
			position: 3,
			name: 'Settings',
			item: `${BaseDemoUrl}/settings`
		}
	]
};

export const FAQ = {
	'@type': 'FAQPage',
	mainEntity: [
		{
			'@type': 'Question',
			name: 'Does this template include internationalization (i18n) support?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Yes, the template includes full i18n support with route-based locale detection and RTL/LTR direction handling.'
			}
		},
		{
			'@type': 'Question',
			name: 'Are shadcn-svelte components integrated?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Yes, shadcn-svelte components are fully integrated with Tailwind CSS v4 for modern UI development.'
			}
		},
		{
			'@type': 'Question',
			name: 'Does the template support SEO and structured data?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Yes, it includes store-based SEO metadata management and structured data configurations with examples.'
			}
		},
		{
			'@type': 'Question',
			name: 'Is there built-in state management?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Yes, the template uses centralized Svelte stores for global state management with TypeScript support.'
			}
		},
		{
			'@type': 'Question',
			name: 'Are authentication and database abstraction features included?',
			acceptedAnswer: {
				'@type': 'Answer',
				text: 'Coming soon - these features are planned for the roadmap.'
			}
		}
	]
};
