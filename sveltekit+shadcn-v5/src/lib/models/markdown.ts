export interface MarkdownResource {
	file: Record<string, { default: Promise<unknown>; metadata: Promise<unknown> }>;
	path: string;
}
