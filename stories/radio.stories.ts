import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/radio';

type RadioArgs = {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  disabled: boolean;
  size: 'sm' | 'md' | 'lg';
};

const meta: Meta<RadioArgs> = {
  title: 'Components/Radio',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] }
  },
  args: {
    label: 'Option A',
    value: 'a',
    name: 'example',
    checked: true,
    disabled: false,
    size: 'md'
  }
};

export default meta;

type Story = StoryObj<RadioArgs>;

export const Playground: Story = {
  render: ({ label, value, name, checked, disabled, size }) => html`
    <ui-radio
      label=${label}
      value=${value}
      name=${name}
      ?checked=${checked}
      ?disabled=${disabled}
      size=${size}
    ></ui-radio>
  `
};
