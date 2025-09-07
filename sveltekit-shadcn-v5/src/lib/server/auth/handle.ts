import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from './config';
import { building } from '$app/environment';

export async function handle({ event, resolve }): Promise<Response> {
	return svelteKitHandler({ event, resolve, auth, building });
}
