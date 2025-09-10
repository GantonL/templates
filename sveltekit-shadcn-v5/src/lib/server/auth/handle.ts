import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from './config';
import { building } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { AppRoutes } from '$lib/client/configurations/routes';

export async function handle({ event, resolve }): Promise<Response> {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});
	const requestedPath = event.url.pathname;
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	} else if (isRouteRequiresAuthentication(requestedPath)) {
		redirect(302, `/signin?ref=${requestedPath}`);
	}
	return svelteKitHandler({ event, resolve, auth, building });
}

function isRouteRequiresAuthentication(path: string): boolean {
	if (pathIsHome(path)) return false;
	return !!AppRoutes.find((group) => {
		return group.children.find((child) => {
			return (
				(child.path.includes(path) || path.includes(child.path)) &&
				child.authenticationRequired !== false
			);
		});
	});
}

function pathIsHome(path: string): boolean {
	return path === '' || path === '/';
}
