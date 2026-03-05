import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/layout';

type LayoutArgs = {
  direction: 'auto' | 'horizontal' | 'vertical';
};

const meta: Meta<LayoutArgs> = {
  title: 'Components/Layout',
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['auto', 'horizontal', 'vertical'] }
  },
  args: {
    direction: 'vertical'
  }
};

export default meta;

type Story = StoryObj<LayoutArgs>;

export const Playground: Story = {
  render: ({ direction }) => html`
    <ui-layout direction=${direction} style="height: 360px; border: 1px solid hsl(var(--border)); border-radius: 8px; overflow: hidden;">
      <ui-layout-header>Header</ui-layout-header>
      <ui-layout direction="horizontal" style="flex: 1;">
        <ui-layout-sidebar style="width: 180px;">Sidebar</ui-layout-sidebar>
        <ui-layout-main style="padding: 16px;">Main content</ui-layout-main>
      </ui-layout>
      <ui-layout-footer>Footer</ui-layout-footer>
    </ui-layout>
  `
};
