import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/upload';

type UploadArgs = {
  label: string;
  helper: string;
  accept: string;
  multiple: boolean;
  disabled: boolean;
};

const meta: Meta<UploadArgs> = {
  title: 'Components/Upload',
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  args: {
    label: 'Drag and drop files here',
    helper: 'PNG, JPG, SVG',
    accept: '.png,.jpg,.jpeg,.svg',
    multiple: true,
    disabled: false
  }
};

export default meta;

type Story = StoryObj<UploadArgs>;

export const Playground: Story = {
  render: ({ label, helper, accept, multiple, disabled }) => html`
    <ui-upload
      label=${label}
      helper=${helper}
      accept=${accept}
      ?multiple=${multiple}
      ?disabled=${disabled}
      name="assets"
    ></ui-upload>
  `
};
