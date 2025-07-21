import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';
import { BaseUrl } from '$lib/api/configurations/common';
import { AvailableLocals } from '$lib/enums/available-locales';

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: BaseUrl,
		lang: {
			default: AvailableLocals.English_US,
			alternates: [AvailableLocals.Hebrew]
		}
	});
};
