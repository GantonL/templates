import type { ServerLoadEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getUserCookiesPreferences } from "$lib/manage-cookies/manager";

export const load: PageServerLoad = (event: ServerLoadEvent) => {
  return {
    preferences: getUserCookiesPreferences(event),
    seo: {
      title: 'Manage cookies',
      description: 'Manage cookies page description',
    }
  }
}
