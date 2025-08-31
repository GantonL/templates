import boxen from 'boxen';
import pc from 'picocolors';
import { logger, icons, formatHighlight, formatPath } from '../utils/logger.js';
import { getTemplateInfo, getTemplateDir, validateTemplate } from '../utils/template-utils.js';
import { handleError } from '../utils/error-handler.js';
import fs from 'fs-extra';

export default async function infoCommand(templateName) {
  try {
    if (!templateName) {
      logger.error('Template name is required');
      logger.info(`Use ${formatHighlight('templates list')} to see available templates`);
      process.exit(1);
    }

    await validateTemplate(templateName);
    const templateInfo = await getTemplateInfo(templateName);
    const templateDir = getTemplateDir(templateName);

    logger.title(`${icons.info} Template Information`);

    // Basic info
    const infoBox = boxen(
      [
        `${pc.bold('Name:')} ${templateInfo.name}`,
        `${pc.bold('Key:')} ${templateName}`,
        `${pc.bold('Version:')} ${templateInfo.version || 'N/A'}`,
        `${pc.bold('Description:')} ${templateInfo.description}`,
        `${pc.bold('Package Manager:')} ${templateInfo.packageManager || 'npm'}`,
        `${pc.bold('Location:')} ${formatPath(templateDir)}`
      ].join('\n'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue'
      }
    );

    console.log(infoBox);

    // Tags
    if (templateInfo.tags && templateInfo.tags.length > 0) {
      logger.step('Tags:');
      const tags = templateInfo.tags.map(tag => pc.bgCyan(pc.black(` ${tag} `))).join(' ');
      logger.log(`  ${tags}`);
      logger.newline();
    }

    // Features
    if (templateInfo.features && templateInfo.features.length > 0) {
      logger.step('Features:');
      templateInfo.features.forEach(feature => {
        logger.bullet(feature);
      });
      logger.newline();
    }

    // File structure preview
    logger.step('Template structure:');
    try {
      const stats = await fs.stat(templateDir);
      if (stats.isDirectory()) {
        const files = await fs.readdir(templateDir);
        const importantFiles = files.filter(file => 
          !file.startsWith('.') && 
          !['node_modules', 'dist', 'build'].includes(file)
        ).slice(0, 8);

        importantFiles.forEach(file => {
          logger.bullet(`${formatPath(file)}`);
        });

        if (files.length > importantFiles.length) {
          logger.bullet(pc.dim(`... and ${files.length - importantFiles.length} more files`));
        }
      }
    } catch (error) {
      logger.bullet(pc.dim('Unable to read template structure'));
    }

    logger.newline();

    // Post-install steps
    if (templateInfo.postInstallSteps && templateInfo.postInstallSteps.length > 0) {
      logger.step('Post-installation steps:');
      templateInfo.postInstallSteps.forEach((step, index) => {
        logger.log(`  ${pc.yellow(`${index + 1}.`)} ${step}`);
      });
      logger.newline();
    }

    // Usage example
    const usageBox = boxen(
      `${formatHighlight('Create project:')} templates create my-project -t ${templateName}\n${formatHighlight('With options:')} templates create my-project -t ${templateName} --force --skip-install`,
      {
        padding: 1,
        margin: 1,
        title: '💡 Usage',
        titleAlignment: 'left',
        borderStyle: 'round',
        borderColor: 'yellow'
      }
    );

    console.log(usageBox);

  } catch (error) {
    handleError(error);
  }
}