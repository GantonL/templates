import type { PageLoad } from "./$types"

export const load: PageLoad = () => {
  return {
    seo: {
      title: 'Cookies Policy',
      description: 'Cookies policy page description',
    }
  }
}
