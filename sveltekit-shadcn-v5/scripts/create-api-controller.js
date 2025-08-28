import { appendFile } from 'node:fs/promises';
import { logError, logSuccess } from './utils';

const args = process.argv.slice(2);
const defaultPrefix = 'src/routes/api';
const inputPath = args[0];
if (!inputPath) {
	logError('You must define a path for your endpoint');
	process.exit(1);
}
const pagePath = `${inputPath}/+server.ts`;
const path = `${defaultPrefix}/${pagePath}`;
await Bun.write(
	path,
	`
	import {
		NewOrExistingService as service,
		getUrlFilters,
		getUrlOptions,
		buildCreateCandidates,
		buildUpdateData,
		getBodyFilters
	} from '$lib/server/database/services/new-or-existing';
	import { json, type RequestHandler } from '@sveltejs/kit';

	export const GET: RequestHandler = async ({ url }) => {
	  const filters = getUrlFilters(url);
		const options = getUrlOptions(url);
		const items = await service.find(filters, options);
    return json(items);
  }

  export const POST: RequestHandler = async ({ request }) => {
  	const { data } = await request.json();
  	const itemsToCreate = buildCreateCandidates(data);
  	const created = await service.createMany(itemsToCreate);
  	return json({ created });
  };

  export const PUT: RequestHandler = async ({ url, request }) => {
  	const { data, filters } = await request.json();
  	const urlFilters = getUrlFilters(url);
  	const bodyFilters = getBodyFilters(filters);
  	const updateData = buildUpdateData(data);
  	const updated = await service.updateWhere([...urlFilters, ...bodyFilters], updateData);
  	return json({ updated });
  };

  export const DELETE: RequestHandler = async ({ url, request }) => {
  	const { filters } = await request.json();
  	const urlFilters = getUrlFilters(url);
  	const bodyFilters = getBodyFilters(filters ?? []);
  	const deleted = await service.deleteWhere([...urlFilters, ...bodyFilters]);
  	return json({ deleted });
  };
  `
);

const buildRouteConstName = (path) => {
	return path
		.split('/')
		.pop()
		.split('-')
		.map((word) => {
			return word
				.split('')
				.map((letter, index) => {
					if (index === 0) {
						return letter.toUpperCase();
					}
					return letter;
				})
				.join('');
		})
		.join('');
};

await appendFile(
	`${defaultPrefix}/index.ts`,
	`export const ${buildRouteConstName(inputPath)} = \`\${CONTROLLER}/${inputPath}\`;\n`
);

logSuccess(`Endpoint created successfuly at ${path}`);
