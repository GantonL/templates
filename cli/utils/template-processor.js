import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function processTemplateFiles(targetDir, projectName, templateInfo) {
  // Generate README from template
  const readmeTemplatePath = path.join(__dirname, '../templates/README.template.md');
  const readmePath = path.join(targetDir, 'README.md');

  if (await fs.pathExists(readmeTemplatePath)) {
    let readmeContent = await fs.readFile(readmeTemplatePath, 'utf8');
    
    // Replace template variables
    readmeContent = readmeContent
      .replace(/\{\{PROJECT_NAME\}\}/g, projectName)
      .replace(/\{\{TEMPLATE_NAME\}\}/g, templateInfo.name)
      .replace(/\{\{PACKAGE_MANAGER\}\}/g, templateInfo.packageManager || 'npm');

    await fs.writeFile(readmePath, readmeContent);
  }

  // Update package.json name if it exists
  const packageJsonPath = path.join(targetDir, 'package.json');
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  }
}