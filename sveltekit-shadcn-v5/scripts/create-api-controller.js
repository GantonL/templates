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
