<script lang="ts">
	import { AppName, Author, BaseUrl, TwitterSitename, TwitterUsername } from "$lib/consts";

  export let title: string;
  export let description: string;
  export let slug = '';
  export let image: {url?: string; alt?: string} = {};
  export let squareImage: {url?: string; alt?: string} = {
    url: `${BaseUrl}/images/logo.png`,
    alt: AppName,
  };
</script>

<svelte:head>
  <title>{title ? `${title} | `: ''}{AppName}</title>
  <link rel="canonical" href={`${BaseUrl}${slug}`} />
  <meta name="robots" content="index, follow" />
  <meta name="author" content={Author} />
  
  {#if description}
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
  {/if}
  
  <meta property="og:title" content={title ? `${title} | ${AppName}`: AppName} />
  <meta property="og:site_name" content={AppName} />
  <meta property="og:locale" content={'en'} />
  <meta property="og:url" content={`${BaseUrl}${slug}`} />
  <meta property="og:type" content={'website'} />

  <meta name="twitter:card" content={!image && !squareImage ? "summary" : "summary_large_image"} />
  <meta name="twitter:title" content={title ? `${title} | ${AppName}`: AppName} />
  <meta name="twitter:site" content={TwitterSitename} />
  <meta name="twitter:creator" content={TwitterUsername} />

  {#if image?.url}
    <meta property="og:image" content={image.url} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="627" />
    <meta property="og:image:alt" content={image.alt} />
    <meta name="twitter:image" content={image.url} />
    <meta name="twitter:image:alt" content={image.alt} />
  {/if}

  {#if squareImage?.url}
    <meta property="og:image" content={squareImage.url} />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta property="og:image:alt" content={squareImage.alt} />
    <meta name="twitter:image" content={squareImage.url} />
    <meta name="twitter:image:alt" content={squareImage.alt} />
  {/if}


</svelte:head>