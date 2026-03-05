import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/dropdown';
import type { DropdownItem } from '../src/shared/components/dropdown';

type DropdownArgs = {
  label: string;
  items: DropdownItem[];
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
};

const defaultItems: DropdownItem[] = [
  { id: 'create', label: 'Create a recording' },
  { id: 'upload', label: 'Upload a recording' }
];

const meta: Meta<DropdownArgs> = {
  title: 'Components/Dropdown',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text'
    },
    items: {
      description: 'Array of menu items'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Trigger size'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the dropdown'
    }
  },
  args: {
    label: 'Record',
    items: defaultItems,
    size: 'md',
    disabled: false
  }
};

export default meta;
type Story = StoryObj<DropdownArgs>;

export const Playground: Story = {
  render: ({ label, items, size, disabled }) => html`
    <div style="padding: 2rem;">
      <ui-dropdown
        label=${label}
        .items=${items}
        size=${size}
        ?disabled=${disabled}
        @dropdown-select=${(e: any) => {
          console.log('Selected:', e.detail);
        }}
      ></ui-dropdown>
    </div>
  `
};

export const RecordMenu: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Record"
        size="md"
        .items=${[
          { id: 'create', label: 'Create a recording' },
          { id: 'upload', label: 'Upload a recording' }
        ]}
        @dropdown-select=${(e: any) => {
          console.log('Selected:', e.detail);
        }}
      ></ui-dropdown>
    </div>
  `
};

export const MoreOptions: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="More"
        size="md"
        .items=${[
          { id: 'edit', label: 'Edit' },
          { id: 'duplicate', label: 'Duplicate' },
          { id: 'delete', label: 'Delete', disabled: true },
          { id: 'export', label: 'Export' }
        ]}
        @dropdown-select=${(e: any) => {
          console.log('Selected:', e.detail);
        }}
      ></ui-dropdown>
    </div>
  `
};

export const Disabled: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Disabled"
        size="md"
        .items=${defaultItems}
        disabled
      ></ui-dropdown>
    </div>
  `
};

export const ManyItems: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Actions"
        size="md"
        .items=${[
          { id: 'new', label: 'New Document' },
          { id: 'open', label: 'Open' },
          { id: 'save', label: 'Save' },
          { id: 'saveas', label: 'Save As...' },
          { id: 'print', label: 'Print' },
          { id: 'export', label: 'Export' },
          { id: 'close', label: 'Close' }
        ]}
        @dropdown-select=${(e: any) => {
          console.log('Selected:', e.detail);
        }}
      ></ui-dropdown>
    </div>
  `
};

export const Empty: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Empty Menu"
        size="md"
        .items=${[]}
      ></ui-dropdown>
    </div>
  `
};
