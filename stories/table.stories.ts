import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { TableColumn, TableRow } from '../src/shared/components/table';
import { http } from '../src/lib/index';
import '../src/shared/components/table';
import '../src/shared/components/pagination';

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true, resizable: true, minWidth: 140 },
  { key: 'role', label: 'Role', sortable: true, resizable: true, minWidth: 180 },
  { key: 'status', label: 'Status', sortable: true, resizable: true, minWidth: 120 },
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
    ></ui-table>
  `
};

/**
 * Empty State - Default
 * Shows the default empty state when no rows are provided
 */
export const EmptyStateDefault: Story = {
  render: () => html`
    <ui-table
      .columns=${columns}
      .rows=${[]}
      bordered
    ></ui-table>
  `
};

/**
 * Empty State - Custom Message
 * Shows how to customize the empty state message and hint
 */
export const EmptyStateCustom: Story = {
  render: () => html`
    <ui-table
      .columns=${columns}
      .rows=${[]}
      bordered
      empty-message="No team members found"
      empty-hint="Click 'Add Member' to invite someone to your team."
    ></ui-table>
  `
};

/**
 * Example: Loading table data from a mock API using HTTPClient
 * This demonstrates the basic pattern for fetching and displaying data
 */
export const LoadingFromAPI: Story = {
  render: () => {
    class TodoTable extends HTMLElement {
      async connectedCallback() {
        this.innerHTML = '<div style="padding: 20px; color: #1976d2;">⏳ Loading todos...</div>';
        
        try {
          const columns: TableColumn[] = [
            { key: 'id', label: 'ID', sortable: true, resizable: true, minWidth: 100 },
            { key: 'title', label: 'Title', sortable: true, resizable: true, minWidth: 200 },
            { key: 'completed', label: 'Completed', sortable: true, resizable: true, minWidth: 120 }
          ];

          const data = await http.get<any>('https://jsonplaceholder.typicode.com/todos?_limit=5');
          
          const rows: TableRow[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            completed: item.completed ? 'Yes' : 'No'
          }));

          this.innerHTML = `
            <div style="padding: 20px;">
              <p style="margin-bottom: 16px; color: #666;">Data loaded successfully from API</p>
            </div>
          `;
          
          const table = document.createElement('ui-table');
          table.setAttribute('bordered', '');
          table.setAttribute('zebra', '');
          (table as any).columns = columns;
          (table as any).rows = rows;
          
          this.appendChild(table);
        } catch (error) {
          this.innerHTML = `
            <div style="padding: 20px; color: #d32f2f;">
              <p>Error loading data: ${(error as Error).message}</p>
            </div>
          `;
        }
      }
    }

    if (!customElements.get('todo-table')) {
      customElements.define('todo-table', TodoTable);
    }

    return html`<todo-table></todo-table>`;
  }
};

/**
 * Example: API Loading with Loading State
 * Shows how to handle loading, success, and error states
 */
export const APILoadingWithState: Story = {
  render: () => {
    class UserTable extends HTMLElement {
      async connectedCallback() {
        this.innerHTML = '<div style="padding: 20px; color: #1976d2;">⏳ Loading users...</div>';
        
        try {
          const columns: TableColumn[] = [
            { key: 'id', label: 'User ID', sortable: true, resizable: true, minWidth: 100 },
            { key: 'name', label: 'Name', sortable: true, resizable: true, minWidth: 180 },
            { key: 'email', label: 'Email', sortable: true, resizable: true, minWidth: 200 },
            { key: 'status', label: 'Status', sortable: true, resizable: true, minWidth: 120 }
          ];

          const data = await http.get<any>('https://jsonplaceholder.typicode.com/users?_limit=5');
          
          const rows: TableRow[] = data.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            status: 'Active'
          }));

          this.innerHTML = `
            <div style="padding: 20px;">
              <p style="margin-bottom: 16px; color: #2e7d32;">✓ Successfully loaded ${rows.length} users</p>
            </div>
          `;
          
          const table = document.createElement('ui-table');
          table.setAttribute('bordered', '');
          table.setAttribute('zebra', '');
          (table as any).columns = columns;
          (table as any).rows = rows;
          
          this.appendChild(table);
        } catch (error) {
          this.innerHTML = `
            <div style="padding: 20px; background-color: #ffebee; border-radius: 4px;">
              <p style="color: #d32f2f; font-weight: bold;">Error Loading Data</p>
              <p style="color: #d32f2f; font-size: 14px;">${(error as Error).message}</p>
              <p style="color: #666; font-size: 12px; margin-top: 8px;">
                Tip: Check your API endpoint and network connection
              </p>
            </div>
          `;
        }
      }
    }

    if (!customElements.get('user-table')) {
      customElements.define('user-table', UserTable);
    }

    return html`<user-table></user-table>`;
  }
};

/**
 * Example: Creating a Custom Element Component that loads API data
 * This shows the recommended pattern for encapsulating API calls in a component
 */
export const APIDataComponent: Story = {
  render: () => {
    // Define a custom component that loads data
    class APIDataTable extends HTMLElement {
      private tableElement: any;
      private isLoading = true;

      async connectedCallback() {
        this.render();
        await this.loadData();
      }

      private render() {
        this.innerHTML = `
          <div style="padding: 20px;">
            <div id="status" style="margin-bottom: 16px; color: #1976d2;">
              Loading users from API...
            </div>
            <ui-table
              id="data-table"
              bordered
              zebra
            ></ui-table>
          </div>
        `;
        this.tableElement = this.querySelector('ui-table');
      }

      private async loadData() {
        const columns: TableColumn[] = [
          { key: 'id', label: 'ID', sortable: true, resizable: true, minWidth: 80 },
          { key: 'username', label: 'Username', sortable: true, resizable: true, minWidth: 150 },
          { key: 'phone', label: 'Phone', sortable: true, resizable: true, minWidth: 160 },
          { key: 'company', label: 'Company', sortable: true, resizable: true, minWidth: 180 }
        ];

        try {
          const data = await http.get<any>('https://jsonplaceholder.typicode.com/users?_limit=8');
          
          const rows: TableRow[] = data.map((user: any) => ({
            id: user.id,
            username: user.username,
            phone: user.phone,
            company: user.company.name
          }));

          // Update table with loaded data
          if (this.tableElement) {
            this.tableElement.columns = columns;
            this.tableElement.rows = rows;
          }

          // Update status
          const statusDiv = this.querySelector('#status');
          if (statusDiv) {
            statusDiv.innerHTML = `✓ Loaded ${rows.length} users successfully`;
            statusDiv.style.color = '#2e7d32';
          }
        } catch (error) {
          // Update status with error
          const statusDiv = this.querySelector('#status');
          if (statusDiv) {
            statusDiv.innerHTML = `✗ Error: ${(error as Error).message}`;
            statusDiv.style.color = '#d32f2f';
          }
        }
      }
    }

    if (!customElements.get('api-data-table')) {
      customElements.define('api-data-table', APIDataTable);
    }

    return html`<api-data-table></api-data-table>`;
  }
};

/**
 * Example: Using HTTPClient with Custom Configuration
 * Demonstrates baseURL, headers, and timeout configuration
 */
export const APIWithCustomConfig: Story = {
  render: () => {
    class PostTable extends HTMLElement {
      async connectedCallback() {
        this.innerHTML = '<div style="padding: 20px; color: #1976d2;">⏳ Loading posts...</div>';
        
        try {
          const columns: TableColumn[] = [
            { key: 'id', label: 'Post ID', sortable: true, resizable: true, minWidth: 100 },
            { key: 'title', label: 'Title', sortable: true, resizable: true, minWidth: 300 },
            { key: 'userId', label: 'Author ID', sortable: true, resizable: true, minWidth: 120 }
          ];

          // Configure HTTP client
          http.setBaseURL('https://jsonplaceholder.typicode.com');
          http.setDefaultTimeout(5000);
          
          // Make request with configured client
          const posts = await http.get<any>('/posts?_limit=5');
          
          const rows: TableRow[] = posts.map((post: any) => ({
            id: post.id,
            title: post.title,
            userId: post.userId
          }));

          this.innerHTML = `
            <div style="padding: 20px;">
              <div style="margin-bottom: 16px; padding: 12px; background-color: #e3f2fd; border-left: 4px solid #1976d2; border-radius: 2px;">
                <p style="margin: 0; font-size: 14px; color: #1976d2;">
                  ℹ️ This example uses HTTPClient with baseURL and timeout configuration
                </p>
              </div>
            </div>
          `;
          
          const table = document.createElement('ui-table');
          table.setAttribute('bordered', '');
          table.setAttribute('zebra', '');
          (table as any).columns = columns;
          (table as any).rows = rows;
          
          this.appendChild(table);
        } catch (error) {
          this.innerHTML = `
            <div style="padding: 20px; color: #d32f2f;">
              <p>Error: ${(error as Error).message}</p>
            </div>
          `;
        }
      }
    }

    if (!customElements.get('post-table')) {
      customElements.define('post-table', PostTable);
    }

    return html`<post-table></post-table>`;
  }
};

/**
 * Example: Paging data with ui-pagination component
 * Shows how to integrate pagination with the table using real API calls
 */
export const WithPagination: Story = {
  render: () => {
    class PaginatedTable extends HTMLElement {
      private tableElement: any;
      private paginationElement: any;
      private totalItems = 0;
      private currentPage = 1;
      private pageSize = 5;

      async connectedCallback() {
        this.render();
        await this.loadData(this.currentPage);
      }

      private render() {
        this.innerHTML = `
          <div style="padding: 20px;">
            <h3 style="margin-bottom: 16px; color: #333;">Users List</h3>
            <ui-table id="data-table" bordered zebra></ui-table>
            <ui-pagination
              id="pagination"
              style="margin-top: 16px;"
            ></ui-pagination>
          </div>
        `;
        this.tableElement = this.querySelector('#data-table');
        this.paginationElement = this.querySelector('#pagination');
        
        this.paginationElement.addEventListener('page-change', this.handlePageChange);
      }

      private handlePageChange = (e: CustomEvent) => {
        this.currentPage = e.detail.page;
        this.loadData(this.currentPage);
      };

      private async loadData(page: number) {
        const columns: TableColumn[] = [
          { key: 'id', label: 'ID', sortable: true, resizable: true, minWidth: 80 },
          { key: 'name', label: 'Name', sortable: true, resizable: true, minWidth: 180 },
          { key: 'email', label: 'Email', sortable: true, resizable: true, minWidth: 220 },
          { key: 'status', label: 'Status', sortable: true, resizable: true, minWidth: 120 }
        ];

        try {
          const response = await http.get<any>(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${this.pageSize}`);
          
          const rows: TableRow[] = response.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.id % 2 === 0 ? 'Active' : 'Inactive'
          }));

          this.tableElement.columns = columns;
          this.tableElement.rows = rows;

          this.totalItems = 10;
          this.paginationElement.total = this.totalItems;
          this.paginationElement.pageSize = this.pageSize;
          this.paginationElement.currentPage = page;
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
    }

    if (!customElements.get('paginated-table')) {
      customElements.define('paginated-table', PaginatedTable);
    }

    return html`<paginated-table></paginated-table>`;
  }
};
