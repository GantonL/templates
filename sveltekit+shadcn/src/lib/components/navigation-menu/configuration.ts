import type { NavigationLink } from "$lib/models/navigation-link";
import {Home, Banana, Settings } from "lucide-svelte";

export const NavigationItemsConfiguration: NavigationLink[] = [
  { label: 'Home', icon: Home, link: '/' },
  { label: 'Example', icon: Banana, link: '/example' },
];

export const MoreNavigationItems: NavigationLink[] = [
  { label: 'Settings', icon: Settings, link: '/settings' },
];
