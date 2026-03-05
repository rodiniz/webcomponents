import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/radio-group';

const options = [
  { value: 'starter', label: 'Starter', description: 'For simple use cases' },
  { value: 'pro', label: 'Pro', description: 'For growing products' },
  { value: 'enterprise', label: 'Enterprise', description: 'For large teams' }
];

type RadioGroupArgs = {
  label: string;
  value: string;
  orientation: 'vertical' | 'horizontal';
  variant: 'default' | 'card';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
};

const meta: Meta<RadioGroupArgs> = {
  title: 'Components/Radio Group',
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    variant: { control: 'select', options: ['default', 'card'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' }
  },
  args: {
    label: 'Choose plan',
    value: 'pro',
    orientation: 'vertical',
    variant: 'default',
    size: 'md',
    disabled: false
  }
};

export default meta;

type Story = StoryObj<RadioGroupArgs>;

export const Playground: Story = {
  render: ({ label, value, orientation, variant, size, disabled }) => html`
    <ui-radio-group
      label=${label}
      name="plan"
      value=${value}
      orientation=${orientation}
      variant=${variant}
      size=${size}
      ?disabled=${disabled}
      .options=${options}
    ></ui-radio-group>
  `
};
