<script lang="ts">
	import type { ArticleMarkdownProps } from '$lib/models/markdown';

	let { title, content: Content }: ArticleMarkdownProps = $props();
</script>

<h1 class="text-2xl">{title}</h1>
<article class="prose text-secondary-foreground text-justify">
	<Content />
</article>
