import type { PageLoad } from "./$types"

export const load: PageLoad = () => {
  return {
    seo: {
      description: 'Free template for your next awesome SvelteKit app with Shadcn UI',
    }
  }
}
