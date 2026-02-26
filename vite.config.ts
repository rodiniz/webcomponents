import { defineConfig } from 'vite';

export default defineConfig({
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
});
