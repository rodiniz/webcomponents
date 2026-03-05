import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/spinner';

type SpinnerArgs = {
  size: 'sm' | 'md' | 'lg';
  variant: 'primary' | 'secondary' | 'success' | 'danger';
  label: string;
  showLabel: boolean;
};

const meta: Meta<SpinnerArgs> = {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger'],
      description: 'Spinner color variant'
    },
    label: {
      control: 'text',
      description: 'Loading label text'
    },
    showLabel: {
      control: 'boolean',
      description: 'Show label below spinner'
    }
  },
  args: {
    size: 'md',
    variant: 'primary',
    label: 'Loading...',
    showLabel: true
  }
};

export default meta;
type Story = StoryObj<SpinnerArgs>;

export const Playground: Story = {
  render: ({ size, variant, label, showLabel }) => html`
    <ui-spinner
      size=${size}
      variant=${variant}
      label=${label}
      ?showLabel=${showLabel}
    ></ui-spinner>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center; justify-content: center;">
      <div style="text-align: center;">
        <ui-spinner size="sm" label="Small" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner size="md" label="Medium" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner size="lg" label="Large" showLabel></ui-spinner>
      </div>
    </div>
  `
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center; justify-content: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <ui-spinner variant="primary" label="Primary" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner variant="secondary" label="Secondary" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner variant="success" label="Success" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner variant="danger" label="Danger" showLabel></ui-spinner>
      </div>
    </div>
  `
};

export const WithoutLabel: Story = {
  render: () => html`
    <ui-spinner size="md" variant="primary" ?showLabel=${false}></ui-spinner>
  `
};

export const Custom: Story = {
  render: () => html`
    <div style="display: flex; gap: 3rem; align-items: center; justify-content: center;">
      <div style="text-align: center;">
        <ui-spinner size="lg" variant="success" label="Saving..." showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner size="md" variant="danger" label="Processing..." showLabel></ui-spinner>
      </div>
    </div>
  `
};
