
	import { error, json, type RequestHandler } from '@sveltejs/kit';

	export const GET: RequestHandler = async (event) => {
    error(405, "Not implemented yet");
    return json({});
  }

  export const POST: RequestHandler = async (event) => {
    error(405, "Not implemented yet");
    return json({});
  }

  export const PUT: RequestHandler = async (event) => {
    error(405, "Not implemented yet");
    return json({});
  }

	export const DELETE: RequestHandler = async (event) => {
    error(405, "Not implemented yet");
    return json({});
  }
  