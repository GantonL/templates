import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from './config';
import { building } from '$app/environment';

export async function handle({ event, resolve }): Promise<Response> {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}
	return svelteKitHandler({ event, resolve, auth, building });
}
