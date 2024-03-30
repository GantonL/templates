import type { NavigationLink } from "$lib/models/navigation-link";
import { Cookie, Handshake, ShieldCheck } from "lucide-svelte";

export const PoliciesLinksConfiguration: NavigationLink[] = [
  { label: 'Terms & Conditions', link: '/policies/terms-and-conditions', icon: Handshake },
  { label: 'Privacy', link: '/policies/privacy', icon: ShieldCheck },
  { label: 'Manage Cookies', link: '/manage-cookies', icon: Cookie },
];

