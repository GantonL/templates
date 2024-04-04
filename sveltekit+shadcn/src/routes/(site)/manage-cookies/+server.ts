import { json, type RequestEvent } from "@sveltejs/kit";

export async function POST(event: RequestEvent) {
  const body = await event.request.formData();
  body.forEach((value, key) => {
    if (value === 'undefined') {
      event.cookies.delete(key, { path: '/' })
    } else {
      event.cookies.set(key, value.toString(), { path: '/' });
    }
  });
  return json({ success: true });
}
