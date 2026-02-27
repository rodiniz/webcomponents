import { cpSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcStyles = resolve(rootDir, 'src/styles/theme.css');
const distStyles = resolve(rootDir, 'dist/style.css');

cpSync(srcStyles, distStyles);
console.log('Copied theme.css to dist/');

const srcReadme = resolve(rootDir, 'README.md');
const distReadme = resolve(rootDir, 'dist/README.md');

try {
  cpSync(srcReadme, distReadme);
  console.log('Copied README.md to dist/');
} catch {
  console.log('No README.md found, skipping');
}

const distTypes = resolve(rootDir, 'dist/index.d.ts');
const typesStub = "export * from './lib/index';\n";

try {
  writeFileSync(distTypes, typesStub, 'utf8');
  console.log('Wrote index.d.ts to dist/');
} catch {
  console.log('Failed to write index.d.ts');
}
