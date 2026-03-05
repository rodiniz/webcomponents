import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { TableColumn, TableRow } from '../src/shared/components/table';
import '../src/shared/components/table';

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true, minWidth: 140 },
  { key: 'role', label: 'Role', sortable: true, minWidth: 180 },
  { key: 'status', label: 'Status', sortable: true, minWidth: 120 },
  { key: 'actions', label: 'Actions', align: 'center', actions: { edit: true, delete: true }, resizable: false }
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
  sortable: boolean;
  resizable: boolean;
};

const meta: Meta<TableArgs> = {
  title: 'Components/Table',
  tags: ['autodocs'],
  argTypes: {
    bordered: { control: 'boolean' },
    zebra: { control: 'boolean' },
    collapsible: { control: 'boolean' },
    sortable: { control: 'boolean' },
    resizable: { control: 'boolean' }
  },
  args: {
    bordered: true,
    zebra: true,
    collapsible: true,
    sortable: true,
    resizable: true
  }
};

export default meta;

type Story = StoryObj<TableArgs>;

export const Playground: Story = {
  render: ({ bordered, zebra, collapsible, sortable, resizable }) => html`
    <ui-table
      .columns=${columns}
      .rows=${rows}
      ?bordered=${bordered}
      ?zebra=${zebra}
      ?collapsible=${collapsible}
      ?sortable=${sortable}
      ?resizable=${resizable}
    ></ui-table>
  `
};

export const WithChildRow: Story = {
  render: () => html`
    <ui-table
      .columns=${columns}
      .rows=${[
        {
          name: 'Ava Johnson',
          role: 'Frontend Engineer',
          status: 'Active',
          childColumns: [
            { key: 'title', label: 'Title' },
            { key: 'date', label: 'Date' },
            { key: 'duration', label: 'Duration' },
            { key: 'status', label: 'Status' }
          ],
          childRows: [
            { title: 'iBabs Debrief', date: '19/02/2026, 10:40 - 11:40', duration: '01:00:00', status: 'Exported' },
            { title: 'iBabs Debrief - test', date: '12/02/2026, 13:45 - 13:49', duration: '00:03:57', status: 'Ready' }
          ]
        },
        { name: 'Noah Silva', role: 'Product Designer', status: 'Active' }
      ]}
      bordered
      zebra
      collapsible
      sortable
      resizable
    ></ui-table>
  `
};
