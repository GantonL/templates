import { CookieManagerConfiguration } from "$lib/manage-cookies/configuration";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function POST(event: RequestEvent) {
  const body = await event.request.formData();
  body.forEach((value, key) => {
    if (value === 'undefined') {
      event.cookies.delete(key, { path: '/' })
    } else {
      event.cookies.set(key, value.toString(), {
        maxAge: 60 * 60 * 24 * CookieManagerConfiguration['user-preference-cookies-expiry-days'],
        path: '/' 
      });
    }
  });
  return json({ success: true });
}

export async function DELETE(event: RequestEvent) {
  CookieManagerConfiguration['cookies-categories'].forEach(category => {
    category?.cookies?.forEach(cookie => {
      if (category.optional) {
        event.cookies.delete(cookie, { path: '/' });
      }
    });
  });
  const preferencesCookieName = CookieManagerConfiguration['user-preference-cookie-name'];
  event.cookies.delete(preferencesCookieName, { path: '/' });
  return json({ success: true });
}
