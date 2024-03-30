<script lang="ts">
	import { AppName, BaseUrl } from "$lib/consts";

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
  
  {#if description}
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
  {/if}
  
  <meta property="og:title" content={title ? `${title} | ${AppName}`: AppName} />
  <meta property="og:site_name" content={AppName} />
  <meta property="og:locale" content={'en'} />
  <meta property="og:url" content={`${BaseUrl}${slug}`} />
  <meta property="og:type" content={'website'} />

  {#if image?.url}
    <meta property="og:image" content={image.url} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="627" />
    <meta property="og:image:alt" content={image.alt} />
  {/if}

  {#if squareImage?.url}
    <meta property="og:image" content={squareImage.url} />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta property="og:image:alt" content={squareImage.alt} />
  {/if}
</svelte:head>