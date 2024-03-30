import type { PageLoad } from "./$types"

export const load: PageLoad = () => {
  return {
    seo: {
      title: 'Terms & Conditions',
      description: 'Terms & Conditions page description',
    }
  }
}
