import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';
import { CLIError } from './error-handler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function getTemplatesConfig() {
  const configPath = path.join(__dirname, '../config/templates.json');
  
  if (!await fs.pathExists(configPath)) {
    throw new CLIError('Templates configuration file not found');
  }

  return await fs.readJson(configPath);
}

export async function getAvailableTemplates() {
  const config = await getTemplatesConfig();
  return Object.keys(config.templates);
}

export async function getTemplateInfo(templateName) {
  const config = await getTemplatesConfig();
  
  if (!config.templates[templateName]) {
    throw new CLIError(`Template "${templateName}" not found`);
  }

  return config.templates[templateName];
}

export function getTemplateDir(templateName) {
  const templatesRoot = path.resolve(__dirname, '../../');
  return path.join(templatesRoot, templateName);
}

export async function validateTemplate(templateName) {
  const templateDir = getTemplateDir(templateName);
  
  if (!await fs.pathExists(templateDir)) {
    throw new CLIError(`Template directory not found: ${templateName}`);
  }

  return true;
}

export function shouldExcludeFile(filePath, excludePatterns) {
  return excludePatterns.some(pattern => {
    // Convert glob patterns to regex
    const regexPattern = pattern
      .replace(/\*\*/g, '.*')
      .replace(/\*/g, '[^/]*')
      .replace(/\?/g, '[^/]');
    
    const regex = new RegExp(regexPattern);
    return regex.test(filePath);
  });
}

export async function copyTemplate(templateName, targetDir, options = {}) {
  const templateInfo = await getTemplateInfo(templateName);
  const templateDir = getTemplateDir(templateName);
  
  await validateTemplate(templateName);

  const copyOptions = {
    overwrite: options.force || false,
    filter: (src) => {
      const relativePath = path.relative(templateDir, src);
      
      // Always exclude these patterns
      const defaultExcludes = [
        'node_modules/**',
        '.git/**',
        '**/.DS_Store',
        '**/Thumbs.db'
      ];
      
      const allExcludes = [...defaultExcludes, ...(templateInfo.exclude || [])];
      
      return !shouldExcludeFile(relativePath, allExcludes);
    }
  };

  await fs.copy(templateDir, targetDir, copyOptions);
}

export function validateProjectName(name) {
  if (!name) {
    throw new CLIError('Project name is required');
  }

  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    throw new CLIError('Project name can only contain letters, numbers, hyphens, and underscores');
  }

  if (name.length > 214) {
    throw new CLIError('Project name must be less than 214 characters');
  }

  return true;
}