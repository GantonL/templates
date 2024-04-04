import type { ServerLoadEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { CookieManagerConfiguration } from "$lib/manage-cookies/configuration";

export const load: PageServerLoad = (event: ServerLoadEvent) => {
  const preferencesCookie = event.cookies.get(CookieManagerConfiguration['user-preference-cookie-name']);
  let preferences = {};
  if (preferencesCookie) {
    preferences = JSON.parse(preferencesCookie);
  }
  if (!Object.keys(preferences).length) {
    preferences = getCookiesPreferences();
  }
  return {
    preferences,
    seo: {
      title: 'Manage cookies',
      description: 'Manage cookies page description',
    }
  }
}

function getCookiesPreferences() {
  const preferences: { [key: string]: boolean } = {};
  CookieManagerConfiguration["cookies-categories"].forEach(category => {
    if (category.optional) {
      preferences[category.name] = category.accepted; 
    }
  });
  return preferences;
}