import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/link';

type LinkArgs = {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  href: string;
  target: string;
  underline: boolean;
  disabled: boolean;
};

const meta: Meta<LinkArgs> = {
  title: 'Components/Link',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Link style variant'
    },
    href: {
      control: 'text',
      description: 'Link destination URL'
    },
    target: {
      control: 'select',
      options: ['', '_blank', '_self', '_parent', '_top'],
      description: 'Link target (empty = _self)'
    },
    underline: {
      control: 'boolean',
      description: 'Show underline on link'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the link'
    }
  },
  args: {
    variant: 'primary',
    href: '#',
    target: '',
    underline: false,
    disabled: false
  }
};

export default meta;
type Story = StoryObj<LinkArgs>;

export const Playground: Story = {
  render: ({ variant, href, target, underline, disabled }) => html`
    <ui-link
      variant=${variant}
      href=${href}
      target=${target}
      ?underline=${underline}
      ?disabled=${disabled}
    >
      Click me
    </ui-link>
  `
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <ui-link variant="primary" href="#">Primary Link</ui-link>
      <ui-link variant="secondary" href="#">Secondary Link</ui-link>
      <ui-link variant="ghost" href="#">Ghost Link</ui-link>
      <ui-link variant="danger" href="#">Danger Link</ui-link>
    </div>
  `
};

export const Underlined: Story = {
  render: () => html`
    <ui-link href="#" underline>Underlined Link</ui-link>
  `
};

export const External: Story = {
  render: () => html`
    <ui-link href="https://github.com" target="_blank" rel="noopener noreferrer">
      Open in new tab
    </ui-link>
  `
};

export const Disabled: Story = {
  render: () => html`
    <ui-link href="#" disabled>Disabled Link</ui-link>
  `
};
