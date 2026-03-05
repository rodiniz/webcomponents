import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/top-bar';
import '../src/shared/components/button';

type TopBarArgs = {
  title: string;
  subtitle: string;
};

const meta: Meta<TopBarArgs> = {
  title: 'Components/Top Bar',
  tags: ['autodocs'],
  args: {
    title: 'Component Library',
    subtitle: 'Storybook preview'
  }
};

export default meta;

type Story = StoryObj<TopBarArgs>;

export const Playground: Story = {
  render: ({ title, subtitle }) => html`
    <ui-top-bar title=${title} subtitle=${subtitle}>
      <ui-button variant="secondary" size="sm">Action</ui-button>
    </ui-top-bar>
  `
};
