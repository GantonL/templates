import prompts from "prompts";
import path from "path";
import fs from "fs-extra";
import { execSync } from "child_process";
import boxen from "boxen";
import pc from "picocolors";
import {
  logger,
  icons,
  formatCommand,
  formatHighlight,
  formatSuccess,
} from "../utils/logger.js";
import { CLIError, handleError } from "../utils/error-handler.js";
import {
  getAvailableTemplates,
  getTemplateInfo,
  copyTemplate,
  validateProjectName,
} from "../utils/template-utils.js";
import { processTemplateFiles } from "../utils/template-processor.js";

export default async function createCommand(projectName, options) {
  try {
    logger.title(`${icons.rocket} Create New Project`);

    let targetDir = projectName;
    let templateName = options.template;

    const availableTemplates = await getAvailableTemplates();

    if (!targetDir) {
      const response = await prompts({
        type: "text",
        name: "projectName",
        message: `${icons.folder} Project name:`,
        initial: "my-awesome-app",
        validate: (value) => {
          try {
            validateProjectName(value);
            return true;
          } catch (error) {
            return error.message;
          }
        },
      });

      if (!response.projectName) {
        logger.error("Operation cancelled");
        process.exit(0);
      }

      targetDir = response.projectName;
    }

    validateProjectName(targetDir);

    if (!templateName) {
      const templateChoices = await Promise.all(
        availableTemplates.map(async (name) => {
          const info = await getTemplateInfo(name);
          return {
            title: `${info.name}`,
            description: info.description,
            value: name,
          };
        }),
      );

      const response = await prompts({
        type: "select",
        name: "template",
        message: `${icons.package} Choose a template:`,
        choices: templateChoices,
        hint: "Use arrow keys to navigate",
      });

      if (!response.template) {
        logger.error("Operation cancelled");
        process.exit(0);
      }

      templateName = response.template;
    }

    if (!availableTemplates.includes(templateName)) {
      throw new CLIError(
        `Template "${templateName}" not found. Available: ${availableTemplates.join(", ")}`,
      );
    }

    const templateInfo = await getTemplateInfo(templateName);
    const targetPath = path.resolve(targetDir);

    if (await fs.pathExists(targetPath)) {
      if (!options.force) {
        const response = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `${icons.warning} Directory "${targetDir}" already exists. Overwrite?`,
          initial: false,
        });

        if (!response.overwrite) {
          logger.error("Operation cancelled");
          process.exit(0);
        }
      }

      await fs.remove(targetPath);
    }

    logger.newline();
    logger.info(`Template: ${formatHighlight(templateInfo.name)}`);
    logger.info(`Description: ${templateInfo.description}`);
    logger.newline();

    const copySpinner = logger.spinner(`Copying template files...`);
    copySpinner.start();

    try {
      await copyTemplate(templateName, targetPath, { force: options.force });
      await processTemplateFiles(targetPath, targetDir, templateInfo);
      copySpinner.succeed(`Template files copied`);
    } catch (error) {
      copySpinner.fail(`Failed to copy template`);
      throw error;
    }

    if (!options.skipGit) {
      const gitSpinner = logger.spinner(`Initializing git repository...`);
      gitSpinner.start();

      try {
        process.chdir(targetPath);
        execSync("git init", { stdio: "ignore" });
        execSync("git add .", { stdio: "ignore" });
        execSync('git commit -m "Initial commit from template"', {
          stdio: "ignore",
        });
        gitSpinner.succeed(`Git repository initialized`);
      } catch (error) {
        gitSpinner.warn(`Git initialization skipped`);
      }
    }

    if (!options.skipInstall) {
      const packageManager = templateInfo.packageManager || "npm";
      const installSpinner = logger.spinner(
        `${icons.gear} Installing dependencies with ${packageManager}...`,
      );
      installSpinner.start();

      try {
        const installCmd = `${packageManager} install`;
        execSync(installCmd, { stdio: "ignore", cwd: targetPath });
        installSpinner.succeed(`${icons.checkmark} Dependencies installed`);
      } catch (error) {
        installSpinner.fail(`${icons.cross} Failed to install dependencies`);
        logger.warning(
          `Please run ${formatCommand(`cd ${targetDir} && ${packageManager} install`)} manually`,
        );
      }
    }

    logger.newline();
    logger.success("Project created successfully!");

    const nextSteps = [
      `${formatCommand(`cd ${targetDir}`)}`,
      ...(options.skipInstall
        ? [
            `${formatCommand(`${templateInfo.packageManager || "npm"} install`)}`,
          ]
        : []),
      `${formatCommand(`${templateInfo.packageManager || "npm"} run dev`)}`,
    ];

    const postInstallInfo = templateInfo.postInstallSteps
      ? `\n\n${pc.dim("Additional setup steps:")}\n${templateInfo.postInstallSteps.map((step) => `  ${icons.bullet} ${step}`).join("\n")}`
      : "";

    const successBox = boxen(
      `${formatSuccess(`${icons.party} Ready to go!`)}\n\nNext steps:\n${nextSteps.map((step) => `  ${icons.arrow} ${step}`).join("\n")}${postInstallInfo}`,
      {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "green",
      },
    );

    console.log(successBox);
  } catch (error) {
    handleError(error);
  }
}
