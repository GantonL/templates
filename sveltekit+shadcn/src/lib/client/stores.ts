import type { Layout } from "$lib/types/layout";
import { writable } from "svelte/store";

export const LayoutMode = writable<Layout>('vertical-left');