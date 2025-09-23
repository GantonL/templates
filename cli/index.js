#!/usr/bin/env node
import { Command } from "commander";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs-extra";
import updateNotifier from "update-notifier";
import { typography, spacing } from "./utils/theme.js";
import { loadCommands } from "./utils/command-loader.js";
import { setupErrorHandling } from "./utils/error-handler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"),
);

setupErrorHandling();

const notifier = updateNotifier({ pkg: packageJson });
if (notifier.update) {
  notifier.notify({
    defer: false,
    message: `Update available ${typography.muted("{currentVersion}")} → ${typography.success("{latestVersion}")}\nRun ${typography.highlight("bun i -g {name}")} to update`,
  });
}

const program = new Command();

program
  .name("@gantonl/templates")
  .description(packageJson.description)
  .version(packageJson.version, "-v, --version", "display version number")
  .helpOption("-h, --help", "display help for command");

await loadCommands(program);

program.parse();
