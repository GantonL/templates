import boxen from "boxen";
import pc from "picocolors";
import { logger, icons, formatHighlight } from "../utils/logger.js";
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
        `${pc.bold("Name:")} ${templateInfo.name}`,
        `${pc.bold("Key:")} ${templateName}`,
        `${pc.bold("Version:")} ${templateInfo.version || "N/A"}`,
        `${pc.bold("Description:")} ${templateInfo.description}`,
        `${pc.bold("Package Manager:")} ${templateInfo.packageManager || "npm"}`,
      ].join("\n"),
      {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "blue",
      },
    );

    console.log(infoBox);

    if (templateInfo.tags && templateInfo.tags.length > 0) {
      logger.step("Tags:");
      const tags = templateInfo.tags
        .map((tag) => pc.bgCyan(pc.black(` ${tag} `)))
        .join(" ");
      logger.log(`  ${tags}`);
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
        logger.log(`  ${pc.yellow(`${index + 1}.`)} ${step}`);
      });
      logger.newline();
    }

    const usageBox = boxen(
      `${formatHighlight("Create project:")} templates create my-project -t ${templateName}\n${formatHighlight("With options:")} templates create my-project -t ${templateName} --force --skip-install`,
      {
        padding: 1,
        margin: 1,
        title: "💡 Usage",
        titleAlignment: "left",
        borderStyle: "round",
        borderColor: "yellow",
      },
    );

    console.log(usageBox);
  } catch (error) {
    handleError(error);
  }
}
