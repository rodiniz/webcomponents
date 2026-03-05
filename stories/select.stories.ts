import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/select';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'lit', label: 'Lit' }
];

type SelectArgs = {
  label: string;
  placeholder: string;
  searchable: boolean;
  disabled: boolean;
  value: string;
};

const meta: Meta<SelectArgs> = {
  title: 'Components/Select',
  tags: ['autodocs'],
  argTypes: {
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text' }
  },
  args: {
    label: 'Framework',
    placeholder: 'Select framework...',
    searchable: true,
    disabled: false,
    value: ''
  }
};

export default meta;

type Story = StoryObj<SelectArgs>;

export const Playground: Story = {
  render: ({ label, placeholder, searchable, disabled, value }) => html`
    <ui-select
      label=${label}
      placeholder=${placeholder}
      ?searchable=${searchable}
      ?disabled=${disabled}
      value=${value}
      .options=${options}
    ></ui-select>
  `
};
