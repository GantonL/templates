import { type Icon, Home, Banana, Settings } from "lucide-svelte";
import type { ComponentType } from 'svelte';

export interface NavigationItem {
  label: string;
  link: string;
  icon?: ComponentType<Icon>;
}
export const NavigationItemsConfiguration: NavigationItem[] = [
  { label: 'Home', icon: Home, link: '/' },
  { label: 'Example', icon: Banana, link: '/example' },
];

export const MoreNavigationItems: NavigationItem[] = [
  { label: 'Settings', icon: Settings, link: '/settings' },
];
