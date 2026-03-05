import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/date-picker';

type DatePickerArgs = {
  label: string;
  placeholder: string;
  disabled: boolean;
  value: string;
};

const meta: Meta<DatePickerArgs> = {
  title: 'Components/Date Picker',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    value: { control: 'text' }
  },
  args: {
    label: 'Pick a date',
    placeholder: 'Select date',
    disabled: false,
    value: ''
  }
};

export default meta;

type Story = StoryObj<DatePickerArgs>;

export const Playground: Story = {
  render: ({ label, placeholder, disabled, value }) => html`
    <ui-date-picker
      label=${label}
      placeholder=${placeholder}
      ?disabled=${disabled}
      value=${value}
    ></ui-date-picker>
  `
};
