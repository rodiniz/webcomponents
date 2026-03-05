import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/checkbox';

type CheckboxArgs = {
  label: string;
  checked: boolean;
  disabled: boolean;
  indeterminate: boolean;
  size: 'sm' | 'md' | 'lg';
};

const meta: Meta<CheckboxArgs> = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] }
  },
  args: {
    label: 'Accept terms',
    checked: false,
    disabled: false,
    indeterminate: false,
    size: 'md'
  }
};

export default meta;

type Story = StoryObj<CheckboxArgs>;

export const Playground: Story = {
  render: ({ label, checked, disabled, indeterminate, size }) => html`
    <ui-checkbox
      label=${label}
      ?checked=${checked}
      ?disabled=${disabled}
      ?indeterminate=${indeterminate}
      size=${size}
    ></ui-checkbox>
  `
};
