import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { StepperStep } from '../src/shared/components/stepper';
import '../src/shared/components/stepper';

const steps: StepperStep[] = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Complete profile details' },
  { title: 'Finish', description: 'Review and submit' }
];

type StepperArgs = {
  active: number;
  orientation: 'horizontal' | 'vertical';
  size: 'sm' | 'md' | 'lg';
};

const meta: Meta<StepperArgs> = {
  title: 'Components/Stepper',
  tags: ['autodocs'],
  argTypes: {
    active: { control: { type: 'number', min: 1, max: 3, step: 1 } },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] }
  },
  args: {
    active: 2,
    orientation: 'horizontal',
    size: 'md'
  }
};

export default meta;

type Story = StoryObj<StepperArgs>;

export const Playground: Story = {
  render: ({ active, orientation, size }) => html`
    <ui-stepper .steps=${steps} .active=${active} orientation=${orientation} size=${size}></ui-stepper>
  `
};
