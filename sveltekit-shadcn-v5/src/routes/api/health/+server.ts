import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify({ status: 'ok' }), {
		headers: { 'Content-Type': 'application/json' },
		status: 200
	});
};
