import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/pagination';

type PaginationArgs = {
  total: number;
  currentPage: number;
  pageSize: number;
};

const meta: Meta<PaginationArgs> = {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  argTypes: {
    total: { control: { type: 'number', min: 0, step: 1 } },
    currentPage: { control: { type: 'number', min: 1, step: 1 } },
    pageSize: { control: { type: 'number', min: 1, step: 1 } }
  },
  args: {
    total: 137,
    currentPage: 1,
    pageSize: 10
  }
};

export default meta;

type Story = StoryObj<PaginationArgs>;

export const Playground: Story = {
  render: ({ total, currentPage, pageSize }) => html`
    <ui-pagination
      .total=${total}
      .currentPage=${currentPage}
      .pageSize=${pageSize}
    ></ui-pagination>
  `
};
