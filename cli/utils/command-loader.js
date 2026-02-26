import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import fs from "fs-extra";
import { CLIError } from "./error-handler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function loadCommands(program) {
  const configPath = path.join(__dirname, "../config/commands.json");

  if (!(await fs.pathExists(configPath))) {
    throw new CLIError("Commands configuration file not found");
  }

  const config = await fs.readJson(configPath);

  for (const commandConfig of config.commands) {
    await loadCommand(program, commandConfig);
  }
}

async function loadCommand(program, config) {
  const commandsDir = path.join(__dirname, "../commands");
  const commandPath = path.join(commandsDir, config.file);

  if (!(await fs.pathExists(commandPath))) {
    throw new CLIError(`Command file not found: ${config.file}`);
  }

  const commandModule = await import(pathToFileURL(commandPath).href);

  if (!commandModule.default || typeof commandModule.default !== "function") {
    throw new CLIError(`Invalid command module: ${config.file}`);
  }

  const command = program.command(config.name).description(config.description);

  if (config.alias && config.alias.length > 0) {
    command.aliases(config.alias);
  }

  if (config.args) {
    config.args.forEach((arg) => {
      const argSyntax = arg.required ? `<${arg.name}>` : `[${arg.name}]`;
      command.argument(argSyntax, arg.description);
    });
  }

  if (config.options) {
    config.options.forEach((option) => {
      command.option(option.flags, option.description);
    });
  }

  command.action(commandModule.default);
}
