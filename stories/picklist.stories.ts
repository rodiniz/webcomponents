import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/picklist';

const availableItems = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
  { value: 'go', label: 'Go' }
];

const selectedItems = [{ value: 'rust', label: 'Rust' }];

const meta: Meta = {
  title: 'Components/Picklist',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: () => html`
    <ui-picklist
      available-items=${JSON.stringify(availableItems)}
      selected-items=${JSON.stringify(selectedItems)}
    ></ui-picklist>
  `
};
