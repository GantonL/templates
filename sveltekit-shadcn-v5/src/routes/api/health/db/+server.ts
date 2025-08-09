import { checkConnection } from '$lib/server/database/client';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	try {
		await checkConnection();
		return response();
	} catch (error) {
		console.error('Health check failed:', error);
		return response(500, { status: 'error', message: (error as Error)?.message });
	}
};

const response = (
	status: number = 200,
	data: { status: string; message?: string } = { status: 'ok' }
) => {
	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' },
		status
	});
};
