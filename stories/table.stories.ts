import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { TableColumn, TableRow } from '../src/shared/components/table';
import '../src/shared/components/table';

const columns: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', align: 'center', actions: { edit: true, delete: true } }
];

const rows: TableRow[] = [
  { name: 'Ava Johnson', role: 'Frontend Engineer', status: 'Active' },
  { name: 'Noah Silva', role: 'Product Designer', status: 'Active' },
  { name: 'Mia Costa', role: 'QA Analyst', status: 'Away' }
];

type TableArgs = {
  bordered: boolean;
  zebra: boolean;
  collapsible: boolean;
};

const meta: Meta<TableArgs> = {
  title: 'Components/Table',
  tags: ['autodocs'],
  argTypes: {
    bordered: { control: 'boolean' },
    zebra: { control: 'boolean' },
    collapsible: { control: 'boolean' }
  },
  args: {
    bordered: true,
    zebra: true,
    collapsible: true
  }
};

export default meta;

type Story = StoryObj<TableArgs>;

export const Playground: Story = {
  render: ({ bordered, zebra, collapsible }) => html`
    <ui-table
      .columns=${columns}
      .rows=${rows}
      ?bordered=${bordered}
      ?zebra=${zebra}
      ?collapsible=${collapsible}
    ></ui-table>
  `
};
