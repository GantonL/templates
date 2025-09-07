// import { BaseUrl } from '$lib/api/configurations/common';
import { createAuthClient } from 'better-auth/svelte';

export default createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	// baseURL: BaseUrl
});
