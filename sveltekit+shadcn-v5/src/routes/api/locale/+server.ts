import { defaultLocale, localeCookieName } from '$lib/api/configurations/common';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	const data = await event.request.formData();
	const newLocal = data.get(localeCookieName)?.toString();
	if (newLocal) {
		event.cookies.set(localeCookieName, newLocal, { path: '/' });
	}
	return json({ success: true });
};

export const GET: RequestHandler = async (event) => {
	const locale = event.cookies.get(localeCookieName) || defaultLocale;
	return json({ locale });
};
