import '../src/styles/theme.css';
import '../src/styles/theme-shadcn.css';
import type { Preview } from '@storybook/web-components-vite';
import { applyTheme, THEME_LIST, type Theme } from '../src/core/theme-service';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for all stories',
      defaultValue: 'shadcn',
      toolbar: {
        icon: 'paintbrush',
        items: THEME_LIST.map(theme => ({
          value: theme.value,
          title: theme.label
        })),
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    theme: 'shadcn'
  },
  decorators: [
    (story, context) => {
      const theme = (context.globals.theme ?? 'shadcn') as Theme;
      applyTheme(theme);
      document.documentElement.dataset.theme = theme;
      return story();
    }
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
