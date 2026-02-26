import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'WebComponents',
      formats: ['es', 'umd'],
      fileName: (format) => `webcomponents.${format}.js`
    },
    rollupOptions: {
      external: ['feather-icons'],
      output: {
        globals: {
          'feather-icons': 'feather'
        }
      }
    },
    minify: 'esbuild',
    cssCodeSplit: false
  }
});
