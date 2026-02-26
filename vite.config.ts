import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => ({
  base: command === 'build' ? '/webcomponents/' : '/',
  server: {
    open: true
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['feather-icons']
        }
      }
    }
  }
}));
