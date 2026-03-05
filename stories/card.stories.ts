import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/card';
import '../src/shared/components/button';

type CardArgs = {
  variant: 'default' | 'elevated' | 'bordered' | 'ghost' | 'glass';
  shadow: boolean;
  rounded: boolean;
};

const meta: Meta<CardArgs> = {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'elevated', 'bordered', 'ghost', 'glass'] },
    shadow: { control: 'boolean' },
    rounded: { control: 'boolean' }
  },
  args: {
    variant: 'default',
    shadow: true,
    rounded: true
  }
};

export default meta;

type Story = StoryObj<CardArgs>;

export const Playground: Story = {
  render: ({ variant, shadow, rounded }) => html`
    <ui-card variant=${variant} ?shadow=${shadow} ?rounded=${rounded} elevation="sm">
      <div slot="header"><strong>Release summary</strong></div>
      <div slot="content">Track updates from the component library.</div>
      <div slot="footer">
        <ui-button variant="ghost" size="sm">Cancel</ui-button>
        <ui-button variant="primary" size="sm">Open</ui-button>
      </div>
    </ui-card>
  `
};
