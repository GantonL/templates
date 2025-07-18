import { BaseUrl } from '$lib/api/configurations/common';
import { AvailableLocals } from '$lib/enums/available-locales';

interface SiteMapRoute {
	path: string;
	priority: `${1 | 0}.${number}`;
	changefreq: 'daily' | 'monthly' | 'yearly';
}
export async function GET() {
	const baseUrl = BaseUrl;
	const routes: SiteMapRoute[] = [
		{ path: '', priority: '1.0', changefreq: 'daily' },
		{ path: 'policies/cookies', priority: '0.8', changefreq: 'monthly' },
		{ path: 'policies/privacy', priority: '0.8', changefreq: 'monthly' },
		{ path: 'policies/terms', priority: '0.8', changefreq: 'monthly' },
		{ path: 'accessibility-statement', priority: '0.7', changefreq: 'monthly' },
		{ path: 'manage-cookies', priority: '0.6', changefreq: 'yearly' }
	];
	const sitemapUrls = routes
		.map((route) => {
			const englishUrl = route.path ? `${baseUrl}/${route.path}` : baseUrl;
			const hebrewUrl = route.path
				? `${baseUrl}/${AvailableLocals.Hebrew}/${route.path}`
				: `${baseUrl}/${AvailableLocals.Hebrew}`;
			return `
      <url>
        <loc>${englishUrl}</loc>
        <xhtml:link
          rel="alternate"
          hreflang="${AvailableLocals.English_US}"
          href="${englishUrl}"/>
        <xhtml:link
          rel="alternate"
          hreflang="${AvailableLocals.Hebrew}"
          href="${hebrewUrl}"/>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
      </url>`;
		})
		.join('');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${sitemapUrls}
    </urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
