import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/modal';
import '../src/shared/components/button';

type ModalArgs = {
  title: string;
  size: 'sm' | 'md' | 'lg';
};

const meta: Meta<ModalArgs> = {
  title: 'Components/Modal',
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] }
  },
  args: {
    title: 'Example modal',
    size: 'md'
  }
};

export default meta;

type Story = StoryObj<ModalArgs>;

export const Open: Story = {
  render: ({ title, size }) => html`
    <ui-modal open title=${title} size=${size}>
      This is a preview of modal content in Storybook.
      <div slot="footer">
        <ui-button variant="ghost">Cancel</ui-button>
        <ui-button variant="primary">Confirm</ui-button>
      </div>
    </ui-modal>
  `
};
