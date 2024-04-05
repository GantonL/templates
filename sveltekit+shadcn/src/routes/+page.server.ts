import { getUserCookiesPreferences } from "$lib/manage-cookies/manager";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (event) => {
  const cookieBannerOpen = event.cookies.get('show-manage-cookies-banner');
  return {
    cookieBannerOpen,
    cookiePreferences: getUserCookiesPreferences(event),
    seo: {
      description: 'Free template for your next awesome SvelteKit app with Shadcn UI',
    }
  }
}
