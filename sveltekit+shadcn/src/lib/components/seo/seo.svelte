<script lang="ts">
  const mainTitle = 'My Brand';
  const baseUrl = 'https://my-brand.com';

	export let title: string;
  export let description: string;
  export let ogDescription = '';
  export let slug = '';
  export let image: {url?: string; alt?: string} = {};
  export let squareImage: {url?: string; alt?: string} = {
    url: `${baseUrl}/images/logo.png`,
    alt: mainTitle
  };
</script>

<svelte:head>
  <title>{title ? `${title} | `: ''}{mainTitle}</title>
  <meta property="og:title" content={title ? `${title} | ${mainTitle}`: mainTitle} />
  <link rel="canonical" href={`${baseUrl}${slug}`} />
  {#if description}
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
  {/if}

  <meta property="og:site_name" content={mainTitle} />
  <meta property="og:locale" content={'en'} />
  <meta property="og:url" content={`${baseUrl}${slug}`} />
  <meta property="og:type" content={'website'} />

  {#if ogDescription}
    <meta property="og:description" content={ogDescription}/>
  {/if}

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
    <meta property="og:image:alt" content={image.alt} />
  {/if}
</svelte:head>