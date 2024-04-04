import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (event) => {
  const cookieBannerOpen = event.cookies.get('show-manage-cookies-banner');
  return {
    cookieBannerOpen,
    seo: {
      description: 'Free template for your next awesome SvelteKit app with Shadcn UI',
    }
  }
}
