import type { PageLoad } from "./$types"

export const load: PageLoad = () => {
  return {
    seo: {
      title: 'Settings',
      description: 'Settings page description',
    }
  }
}
