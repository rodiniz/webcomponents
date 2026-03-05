import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/accordion';
import type { AccordionItem } from '../src/shared/components/accordion';

type AccordionArgs = {
  items: AccordionItem[];
  allowMultiple: boolean;
  openItemId: string;
};

const defaultItems: AccordionItem[] = [
  {
    id: 'item-1',
    title: 'What is this component?',
    content: 'This is an accordion component that allows users to expand and collapse content sections.'
  },
  {
    id: 'item-2',
    title: 'How do I use it?',
    content: 'Simply pass an array of items with id, title, and content properties. You can control which items are open using the openItemId property.'
  },
  {
    id: 'item-3',
    title: 'Can I open multiple items?',
    content: 'Yes! Set the allowMultiple property to true to allow multiple accordion items to be open at the same time.'
  }
];

const meta: Meta<AccordionArgs> = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of accordion items with id, title, and content'
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple items to be open simultaneously'
    },
    openItemId: {
      control: 'text',
      description: 'ID of the item to open by default'
    }
  },
  args: {
    items: defaultItems,
    allowMultiple: false,
    openItemId: 'item-1'
  }
};

export default meta;
type Story = StoryObj<AccordionArgs>;

export const Playground: Story = {
  render: ({ items, allowMultiple, openItemId }) => html`
    <ui-accordion
      .items=${items}
      ?allowMultiple=${allowMultiple}
      openItemId=${openItemId}
    ></ui-accordion>
  `
};

export const SingleOpen: Story = {
  render: () => html`
    <ui-accordion
      .items=${defaultItems}
      ?allowMultiple=${false}
      openItemId="item-1"
    ></ui-accordion>
  `,
  args: {
    allowMultiple: false
  }
};

export const MultipleOpen: Story = {
  render: () => html`
    <ui-accordion
      .items=${defaultItems}
      ?allowMultiple=${true}
    ></ui-accordion>
  `,
  args: {
    allowMultiple: true
  }
};

export const CustomContent: Story = {
  render: () => {
    const customItems: AccordionItem[] = [
      {
        id: 'features',
        title: '✨ Features',
        content: '• Lightweight and fast\n• Framework agnostic\n• Full TypeScript support\n• Theme switching'
      },
      {
        id: 'usage',
        title: '📦 Installation',
        content: 'npm install @diniz/webcomponents'
      },
      {
        id: 'docs',
        title: '📚 Documentation',
        content: 'Check out our Storybook for interactive examples and API documentation.'
      }
    ];

    return html`
      <ui-accordion
        .items=${customItems}
        openItemId="features"
      ></ui-accordion>
    `;
  }
};

export const LongContent: Story = {
  render: () => {
    const longItems: AccordionItem[] = [
      {
        id: 'lorem',
        title: 'Expandable Content',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
      }
    ];

    return html`
      <ui-accordion .items=${longItems} openItemId="lorem"></ui-accordion>
    `;
  }
};
