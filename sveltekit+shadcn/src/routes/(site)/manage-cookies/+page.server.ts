import type { ServerLoadEvent } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = (event: ServerLoadEvent) => {
  
  return {
    seo: {
      title: 'Manage cookies',
      description: 'Manage cookies page description',
    }
  }
}
