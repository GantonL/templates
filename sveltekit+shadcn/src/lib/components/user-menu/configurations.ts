import type { UserMenuItem } from "$lib/models/menu-item";
import { LogIn, UserPlus } from "lucide-svelte";
 
export const LoggedOutUserMenuConfiguration: UserMenuItem[] = [
  {
    group: [
      { label: 'Login', icon: LogIn, link: '/login' },
      { label: 'Sign in', icon: UserPlus, link: '/sign-in' },
    ]
  }
];
