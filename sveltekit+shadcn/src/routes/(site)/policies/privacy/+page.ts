import type { PageLoad } from "./$types"

export const load: PageLoad = () => {
  return {
    seo: {
      title: 'Privacy Policy',
      description: 'Privacy policy page description',
    }
  }
}
