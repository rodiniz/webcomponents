import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/toast';
import '../src/shared/components/button';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem;">
      <ui-button @click=${() => (document.getElementById('story-toast') as any)?.success('Saved', 'Changes saved successfully')}>Success</ui-button>
      <ui-button variant="danger" @click=${() => (document.getElementById('story-toast') as any)?.error('Error', 'Something went wrong')}>Error</ui-button>
    </div>
    <ui-toast id="story-toast" position="top-right"></ui-toast>
  `
};
