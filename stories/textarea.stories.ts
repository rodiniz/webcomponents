import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/textarea';

type TextareaArgs = {
  label: string;
  placeholder: string;
  rows: number;
  required: boolean;
  disabled: boolean;
  maxlength?: number;
  value: string;
};

const meta: Meta<TextareaArgs> = {
  title: 'Components/Textarea',
  tags: ['autodocs'],
  argTypes: {
    rows: { control: { type: 'number', min: 2, max: 12, step: 1 } },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    maxlength: { control: { type: 'number', min: 1, max: 500, step: 1 } },
    value: { control: 'text' }
  },
  args: {
    label: 'Description',
    placeholder: 'Write your message...',
    rows: 4,
    required: false,
    disabled: false,
    maxlength: 120,
    value: ''
  }
};

export default meta;

type Story = StoryObj<TextareaArgs>;

export const Playground: Story = {
  render: ({ label, placeholder, rows, required, disabled, maxlength, value }) => html`
    <ui-textarea
      label=${label}
      placeholder=${placeholder}
      rows=${rows}
      ?required=${required}
      ?disabled=${disabled}
      .maxlength=${maxlength ?? null}
      .value=${value}
      name="storybook-textarea"
    ></ui-textarea>
  `
};

export const WithMaxLength: Story = {
  args: {
    label: 'Short Bio',
    placeholder: 'Max 50 characters',
    rows: 3,
    required: false,
    disabled: false,
    maxlength: 50,
    value: ''
  },
  render: ({ label, placeholder, rows, required, disabled, maxlength, value }) => html`
    <ui-textarea
      label=${label}
      placeholder=${placeholder}
      rows=${rows}
      ?required=${required}
      ?disabled=${disabled}
      .maxlength=${maxlength ?? null}
      .value=${value}
      name="storybook-textarea-maxlength"
    ></ui-textarea>
  `
};
