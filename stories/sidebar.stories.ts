import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/sidebar';

const items = [
  { icon: 'home', label: 'Home', href: '#' },
  { icon: 'layers', label: 'Components', href: '#' },
  { icon: 'settings', label: 'Settings', href: '#' }
];

const footerItems = [{ icon: 'github', label: 'GitHub', href: 'https://github.com/rodiniz/webcomponents' }];

const meta: Meta = {
  title: 'Components/Sidebar',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: () => html`
    <div style="height: 360px; max-width: 260px; border-radius: 12px; overflow: hidden; border: 1px solid hsl(var(--border));">
      <ui-sidebar
        brand="Web Components"
        version="v1.0"
        .items=${items}
        .footerItems=${footerItems}
      ></ui-sidebar>
    </div>
  `
};
