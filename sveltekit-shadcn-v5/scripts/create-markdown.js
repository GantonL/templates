import { readdir } from 'fs/promises';
import { logError, logSuccess } from './utils';

const args = process.argv.slice(2);
const inputPath = args[0];
if (!inputPath) {
	logError('You must define a path for your markdown file');
	process.exit(1);
}
const markdownsLocation = 'src/lib/resources/markdown';
const locales = await getSubdirectories(markdownsLocation);
const fileContent = getFileContent();
for await (const locale of locales) {
	const path = `${markdownsLocation}/${locale}/${inputPath}`;
	await Bun.write(path, fileContent);
}
if (locales?.length > 0) {
	logSuccess(`Markdowns created successfuly for locales ${locales.join()}`);
}

function getFileContent() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const fileContent = `---
title: My new markdown file
description: An awesome markdown file.
date: ${year}-${month}-${day}
---

### Headline`;
	return fileContent;
}

async function getSubdirectories(path) {
	const entries = await readdir(path, { withFileTypes: true });
	return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}
