import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/tabs';

const meta: Meta = {
  title: 'Components/Tabs',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: () => html`
    <ui-tabs active="overview">
      <button slot="tab" data-tab="overview">Overview</button>
      <button slot="tab" data-tab="usage">Usage</button>
      <button slot="tab" data-tab="api">API</button>

      <div slot="panel" data-tab="overview">Overview content</div>
      <div slot="panel" data-tab="usage">Usage content</div>
      <div slot="panel" data-tab="api">API content</div>
    </ui-tabs>
  `
};
