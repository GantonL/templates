import type { PageLoad } from "./$types"

export const load: PageLoad = () => {
  return {
    seo: {
      title: 'Example',
      description: 'Example page description',
    }
  }
}
