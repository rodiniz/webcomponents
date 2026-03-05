import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/toggle-switch';

type ToggleSwitchArgs = {
  label: string;
  checked: boolean;
  disabled: boolean;
  size: 'sm' | 'md' | 'lg';
  name: string;
};

const meta: Meta<ToggleSwitchArgs> = {
  title: 'Components/Toggle Switch',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    name: { control: 'text' }
  },
  args: {
    label: 'Enable notifications',
    checked: true,
    disabled: false,
    size: 'md',
    name: 'notifications'
  }
};

export default meta;

type Story = StoryObj<ToggleSwitchArgs>;

export const Playground: Story = {
  render: ({ label, checked, disabled, size, name }) => html`
    <ui-toggle-switch
      label=${label}
      ?checked=${checked}
      ?disabled=${disabled}
      size=${size}
      name=${name}
    ></ui-toggle-switch>
  `
};

export const WithoutLabel: Story = {
  args: {
    label: '',
    checked: false,
    size: 'md'
  },
  render: ({ checked, disabled, size, name }) => html`
    <ui-toggle-switch
      ?checked=${checked}
      ?disabled=${disabled}
      size=${size}
      name=${name}
    ></ui-toggle-switch>
  `
};
