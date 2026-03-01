/**
 * HTML to lit-html Template Converter
 * 
 * This script converts HTML files to lit-html template strings.
 * Run with: npx ts-node scripts/convert-html-to-lit.ts
 * Or compile first: tsc scripts/convert-html-to-lit.ts && node scripts/convert-html-to-lit.js
 */

import * as fs from 'fs';
import * as path from 'path';

interface ConversionOptions {
  inputDir: string;
  outputDir: string;
  templatePrefix?: string;
  cssDir?: string;
  cssOutputDir?: string;
}

interface ConvertedFile {
  templateName: string;
  templateContent: string;
  cssName?: string;
  cssContent?: string;
}

/**
 * Convert HTML content to lit-html template string
 */
function htmlToLitHtml(htmlContent: string, indent: number = 2): string {
  const spaces = ' '.repeat(indent);
  
  // Remove doctype and html/head/body tags for lit-html
  let content = htmlContent
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>|<\/html>/gi, '')
    .replace(/<head>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>|<\/body>/gi, '')
    .trim();
  
  // Convert self-closing tags to void elements
  content = content.replace(/<(\w+)([^>]*)\/>/g, '<$1$2>');
  
  // Convert double quotes to single quotes in attributes
  content = content.replace(/"/g, "'");
  
  // Handle interpolation placeholders - convert {{variable}} to ${variable}
  content = content.replace(/\{\{(\w+)\}\}/g, '${this.$1}');
  
  // Convert class attributes to classMap if needed
  // This is a simplified version - more complex logic can be added
  
  // Split into lines and format
  const lines = content.split('\n').map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    return spaces + trimmed;
  }).filter(line => line.length > 0);
  
  // Join lines and wrap with html tag
  const template = lines.join('\n');
  
  return `html\`
${template}
\``;
}

/**
 * Convert CSS to css template string
 */
function cssToLitCss(cssContent: string, indent: number = 2): string {
  const spaces = ' '.repeat(indent);
  
  // Basic formatting - could be enhanced
  const lines = cssContent
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      return spaces + trimmed;
    })
    .filter(line => line.length > 0);
  
  const template = lines.join('\n');
  
  return `css\`
${template}
\``;
}

/**
 * Process a single HTML file and optionally its corresponding CSS file
 */
function processFile(htmlFilePath: string, options: ConversionOptions): ConvertedFile | null {
  try {
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    const baseName = path.basename(htmlFilePath, '.html');
    const dirName = path.dirname(htmlFilePath);
    
    // Check for corresponding CSS file
    const cssFilePath = path.join(dirName, `${baseName}.css`);
    let cssName: string | undefined;
    let cssContent: string | undefined;
    
    if (fs.existsSync(cssFilePath)) {
      cssContent = fs.readFileSync(cssFilePath, 'utf-8');
      cssName = `${baseName}Styles`;
    }
    
    // Convert HTML to lit-html
    const templateContent = htmlToLitHtml(htmlContent);
    const templateName = `${baseName}Template`;
    
    return {
      templateName,
      templateContent,
      cssName,
      cssContent
    };
  } catch (error) {
    console.error(`Error processing ${htmlFilePath}:`, error);
    return null;
  }
}

/**
 * Generate TypeScript file content
 */
function generateTypeScript(converted: ConvertedFile, componentName: string): string {
  let output = `// Auto-generated from HTML template\n`;
  output += `import { html, css } from 'lit';\n\n`;
  
  // Export template
  output += `export const ${converted.templateName} = ${converted.templateContent};\n\n`;
  
  // Export CSS if present
  if (converted.cssName && converted.cssContent) {
    output += `export const ${converted.cssName} = ${cssToLitCss(converted.cssContent)};\n`;
  }
  
  return output;
}

/**
 * Main conversion function
 */
function convertHtmlToLit(options: ConversionOptions): void {
  const { inputDir, outputDir } = options;
  
  console.log(`Converting HTML files from ${inputDir} to ${outputDir}`);
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Find all HTML files
  const htmlFiles = fs.readdirSync(inputDir).filter(file => file.endsWith('.html'));
  
  console.log(`Found ${htmlFiles.length} HTML files to convert`);
  
  let convertedCount = 0;
  
  for (const htmlFile of htmlFiles) {
    const htmlFilePath = path.join(inputDir, htmlFile);
    const converted = processFile(htmlFilePath, options);
    
    if (converted) {
      // Extract component name from filename
      const componentName = htmlFile.replace('.html', '');
      const tsContent = generateTypeScript(converted, componentName);
      
      // Write TypeScript file
      const outputFilePath = path.join(outputDir, `${componentName}.ts`);
      fs.writeFileSync(outputFilePath, tsContent);
      
      convertedCount++;
      console.log(`✓ Converted: ${htmlFile} -> ${componentName}.ts`);
    }
  }
  
  console.log(`\n✅ Conversion complete! ${convertedCount} files converted.`);
}

// Export functions for programmatic use
export { htmlToLitHtml, cssToLitCss, convertHtmlToLit };

// CLI execution
const args = process.argv.slice(2);
if (args.length > 0) {
  const inputDir = args[0];
  const outputDir = args[1] || inputDir;
  
  convertHtmlToLit({
    inputDir,
    outputDir
  });
}
