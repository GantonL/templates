import type { Layout } from "$lib/types/layout";
import { writable } from "svelte/store";

export const mainContentScrollEvent = writable<Event>();
export const LayoutMode = writable<Layout>('vertical-left');