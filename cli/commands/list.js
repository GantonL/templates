import pc from 'picocolors';
import { logger, icons, formatHighlight } from '../utils/logger.js';
import { getTemplatesConfig } from '../utils/template-utils.js';
import { handleError } from '../utils/error-handler.js';

export default async function listCommand() {
  try {
    logger.title(`${icons.sparkle} Available Templates`);

    const config = await getTemplatesConfig();
    const templates = config.templates;

    if (Object.keys(templates).length === 0) {
      logger.warning('No templates available');
      return;
    }

    logger.newline();

    for (const [key, template] of Object.entries(templates)) {
      logger.log(`${formatHighlight('●')} ${pc.bold(template.name)} ${pc.dim(`(${key})`)}`);
      logger.log(`  ${pc.dim(template.description)}`);
      
      if (template.tags && template.tags.length > 0) {
        const tags = template.tags.map(tag => pc.bgBlue(pc.white(` ${tag} `))).join(' ');
        logger.log(`  ${tags}`);
      }
      
      if (template.features && template.features.length > 0) {
        logger.log(`  ${pc.dim('Features:')}`);
        template.features.slice(0, 3).forEach(feature => {
          logger.bullet(pc.dim(feature));
        });
        
        if (template.features.length > 3) {
          logger.bullet(pc.dim(`... and ${template.features.length - 3} more`));
        }
      }
      
      logger.newline();
    }

    logger.info(`Use ${formatHighlight('templates create')} to scaffold a new project`);
    logger.info(`Use ${formatHighlight('templates info <template-name>')} for detailed information`);

  } catch (error) {
    handleError(error);
  }
}