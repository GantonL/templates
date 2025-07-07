import type { Component } from 'svelte';

export interface MarkdownResource {
	file: Record<string, { default: Promise<unknown>; metadata: Promise<unknown> }>;
	path: string;
}

export interface ArticleMarkdownProps {
	title: string;
	content: Component;
}
