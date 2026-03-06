import type { StorybookConfig } from '@storybook/web-components-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },

  async viteFinal(baseConfig) {
    return mergeConfig(baseConfig, {
      resolve: {
        dedupe: ['lit', 'lit-html', 'lit-element', '@lit/reactive-element']
      }
    });
  }
};

export default config;
