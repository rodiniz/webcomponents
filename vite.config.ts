import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => ({
  base: command === 'build' ? '/webcomponents/' : '/',
  resolve: {
    dedupe: ['lit', 'lit-html', 'lit-element', '@lit/reactive-element']
  },
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
