import { AppName } from '$lib/api/configurations/common';
import { locale, t } from '$lib/i18n';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const getBaseMetaTags = ({ url }: { url: URL }) => {
	const brandName = t.get('common.brand.name');
	const brandDescription = t.get('seo.description');
	return {
		title: brandName,
		description: brandDescription,
		canonical: new URL(url.pathname, url.origin).href,
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: locale.get(),
			title: brandName,
			description: brandDescription,
			siteName: AppName
		}
	} satisfies MetaTagsProps;
};

export const getTitleTemplate = () => {
	return `%s • ${t.get('common.brand.name')}`;
};
