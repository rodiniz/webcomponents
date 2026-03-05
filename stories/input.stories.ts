import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/input';

type InputArgs = {
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  icon: string;
  iconPosition: 'left' | 'right';
  required: boolean;
  disabled: boolean;
};

const meta: Meta<InputArgs> = {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url'] },
    icon: { control: 'text' },
    iconPosition: { control: 'select', options: ['left', 'right'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  args: {
    label: 'Email',
    placeholder: 'name@company.com',
    type: 'email',
    icon: 'mail',
    iconPosition: 'left',
    required: true,
    disabled: false
  }
};

export default meta;

type Story = StoryObj<InputArgs>;

export const Playground: Story = {
  render: ({ label, placeholder, type, icon, iconPosition, required, disabled }) => html`
    <ui-input
      label=${label}
      placeholder=${placeholder}
      type=${type}
      icon=${icon}
      icon-position=${iconPosition}
      ?required=${required}
      ?disabled=${disabled}
      name="storybook-input"
    ></ui-input>
  `
};
