import boxen from "boxen";
import { logger, icons, formatHighlight } from "../utils/logger.js";
import { boxStyles, tags, typography, spacing } from "../utils/theme.js";
import { getTemplateInfo, validateTemplate } from "../utils/template-utils.js";
import { handleError } from "../utils/error-handler.js";

export default async function infoCommand(templateName) {
  try {
    if (!templateName) {
      logger.error("Template name is required");
      logger.info(
        `Use ${formatHighlight("templates list")} to see available templates`,
      );
      process.exit(1);
    }

    await validateTemplate(templateName);
    const templateInfo = await getTemplateInfo(templateName);

    logger.title(`${icons.info} Template Information`);

    const infoBox = boxen(
      [
        `${typography.bold("Name:")} ${templateInfo.name}`,
        `${typography.bold("Key:")} ${templateName}`,
        `${typography.bold("Version:")} ${templateInfo.version || "N/A"}`,
        `${typography.bold("Description:")} ${templateInfo.description}`,
        `${typography.bold("Package Manager:")} ${templateInfo.packageManager || "npm"}`,
      ].join("\n"),
      boxStyles.info,
    );

    console.log(infoBox);

    if (templateInfo.tags && templateInfo.tags.length > 0) {
      logger.step("Tags:");
      const templateTags = templateInfo.tags
        .map((tag) => tags.primary(tag))
        .join(" ");
      logger.log(`${spacing.indent}${templateTags}`);
      logger.newline();
    }

    if (templateInfo.features && templateInfo.features.length > 0) {
      logger.step("Features:");
      templateInfo.features.forEach((feature) => {
        logger.bullet(feature);
      });
      logger.newline();
    }

    if (
      templateInfo.postInstallSteps &&
      templateInfo.postInstallSteps.length > 0
    ) {
      logger.step("Post-installation steps:");
      templateInfo.postInstallSteps.forEach((step, index) => {
        logger.log(`${spacing.indent}${typography.warning(`${index + 1}.`)} ${step}`);
      });
      logger.newline();
    }

    const usageBox = boxen(
      `${formatHighlight("Create project:")} templates create my-project -t ${templateName}\n${formatHighlight("With options:")} templates create my-project -t ${templateName} --force --skip-install`,
      {
        ...boxStyles.warning,
        title: `${icons.sparkle} Usage`,
        titleAlignment: "left",
      },
    );

    console.log(usageBox);
  } catch (error) {
    handleError(error);
  }
}
