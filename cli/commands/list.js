import { logger, icons, formatHighlight } from '../utils/logger.js';
import { tags, typography, spacing } from '../utils/theme.js';
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
      logger.log(`${typography.highlight('●')} ${typography.bold(template.name)} ${typography.muted(`(${key})`)}`);
      logger.log(`${spacing.indent}${typography.muted(template.description)}`);

      if (template.tags && template.tags.length > 0) {
        const templateTags = template.tags.map(tag => tags.primary(tag)).join(' ');
        logger.log(`${spacing.indent}${templateTags}`);
      }

      if (template.features && template.features.length > 0) {
        logger.log(`${spacing.indent}${typography.muted('Features:')}`);
        template.features.slice(0, 3).forEach(feature => {
          logger.bullet(typography.muted(feature));
        });

        if (template.features.length > 3) {
          logger.bullet(typography.muted(`... and ${template.features.length - 3} more`));
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