// import { BaseUrl } from '$lib/api/configurations/common';
import { createAuthClient } from 'better-auth/svelte';

const client = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	// baseURL: BaseUrl
});

export type AuthErrorTypes = keyof typeof client.$ERROR_CODES;

export default client;
