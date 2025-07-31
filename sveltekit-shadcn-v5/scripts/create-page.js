import { logError, logSuccess } from './utils';

const args = process.argv.slice(2);
const defaultPrefix = 'src/routes/[[lang]]';
const inputPath = args[0];
if (!inputPath) {
	logError('You must define a path for your page');
	process.exit(1);
}
const pagePath = `${inputPath}/+page.svelte`;
const path = `${defaultPrefix}/${pagePath}`;
await Bun.write(
	path,
	`
  <script lang="ts">
    import BasePage from '$lib/components/base-page/base-page.svelte';
  </script>

  <BasePage title="common.brand.name" description="seo.description">
  </BasePage>
  `
);
logSuccess('Page created successfuly at', path);
