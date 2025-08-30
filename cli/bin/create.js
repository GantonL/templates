#!/usr/bin/env node
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import minimist from "minimist";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// go one level up (repo root), because cli/ is sibling of templates
const templatesDir = path.resolve(__dirname, "../..");

async function main() {
  const argv = minimist(process.argv.slice(2), {
    alias: { n: "name" },
    string: ["n", "name"],
  });

  const targetDir = argv._[0] || "my-app-template";
  let chosenTemplate = argv.name;

  const availableTemplates = ["sveltekit-shadcn-v5"];

  if (!chosenTemplate) {
    const { template } = await prompts({
      type: "select",
      name: "template",
      message: "Which template would you like to use?",
      choices: availableTemplates.map((t) => ({ title: t, value: t })),
    });
    chosenTemplate = template;
  }

  if (!chosenTemplate || !availableTemplates.includes(chosenTemplate)) {
    console.error(
      `❌ Invalid template. Available: ${availableTemplates.join(", ")}`,
    );
    process.exit(1);
  }

  const templateDir = path.join(templatesDir, chosenTemplate);

  console.log(
    `\n📦 Creating project "${targetDir}" from template "${chosenTemplate}"...`,
  );

  await fs.copy(templateDir, targetDir, {
    filter: (src) => {
      return (
        !src.includes("node_modules") ||
        !src.includes("README") ||
        !src.includes(".lock") ||
        !src.includes("LICENCE") ||
        !src.includes("CONTRIBUTING.md") ||
        !src.includes(".svelte-kit") ||
        !src.includes(".wrangler") ||
        !src.includes(".env") ||
        !src.includes("dist")
      );
    },
  });

  console.log("\n✅ Done!");
  console.log(`\nNext steps:\n  cd ${targetDir}\n  bun install\n  bun run dev`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
