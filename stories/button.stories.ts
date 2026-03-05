import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/button';

type ButtonArgs = {
  label: string;
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  icon: string;
  iconPosition: 'left' | 'right';
  disabled: boolean;
};

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    icon: { control: 'text' },
    iconPosition: { control: 'select', options: ['left', 'right'] },
    disabled: { control: 'boolean' }
  },
  args: {
    label: 'Click me',
    variant: 'primary',
    size: 'md',
    icon: '',
    iconPosition: 'left',
    disabled: false
  }
};

export default meta;

type Story = StoryObj<ButtonArgs>;

export const Playground: Story = {
  render: ({ label, variant, size, icon, iconPosition, disabled }) => html`
    <ui-button
      variant=${variant}
      size=${size}
      icon=${icon}
      icon-position=${iconPosition}
      ?disabled=${disabled}
    >${label}</ui-button>
  `
};

export const IconOnly: Story = {
  args: {
    label: '',
    variant: 'primary',
    size: 'md',
    icon: 'settings',
    iconPosition: 'left',
    disabled: false
  },
  render: ({ variant, size, icon, disabled }) => html`
    <ui-button variant=${variant} size=${size} icon=${icon} ?disabled=${disabled}></ui-button>
  `
};
