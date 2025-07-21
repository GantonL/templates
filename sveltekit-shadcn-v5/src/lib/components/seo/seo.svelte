<script lang="ts">
	import { BaseUrl } from '$lib/api/configurations/common';
	import { locale, t } from '$lib/i18n';
	import { title, pageDescription, article, pageImage, squareImage, slug } from '$lib/stores';
</script>

<svelte:head>
	<title>{$title}</title>
	<link rel="canonical" href={`${BaseUrl}${$slug}`} />
	<link rel="alternate" href={`${BaseUrl}${$slug}`} hreflang="en" />
	<link rel="alternate" href={`${BaseUrl}/he${$slug}`} hreflang="he" />
	<link rel="alternate" href={`${BaseUrl}${$slug}`} hreflang="x-default" />
	<link rel="icon" href="/images/logo.png" />
	{#if $pageDescription}
		<meta name="description" content={$pageDescription} />
		<meta property="og:description" content={$pageDescription} />
	{/if}

	<!-- <meta property="og:site_name" content={$t('common.brand.name')} /> -->
	<meta property="og:locale" content={$locale} />
	<meta property="og:url" content={`${BaseUrl}${$slug}`} />
	<meta property="og:type" content={$article?.author ? 'article' : 'website'} />

	{#if $pageImage?.url}
		<meta property="og:image" content={$pageImage.url} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="627" />
		<meta property="og:image:alt" content={$pageImage.alt} />
	{/if}
	{#if $squareImage?.url}
		<meta property="og:image" content={$squareImage.url} />
		<meta property="og:image:width" content="400" />
		<meta property="og:image:height" content="400" />
		<meta property="og:image:alt" content={$squareImage.alt} />
	{/if}
	{#if $article?.author}
		<meta property="article:author" content={$article.author} />
	{/if}
</svelte:head>
