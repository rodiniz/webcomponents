import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../shared/components/table';
import '../../shared/components/pagination';
import '../../shared/components/modal';
import '../../shared/components/button';
import '../../shared/components/checkbox';
import type { TableColumn, TableRow } from '../../shared/components/table';
import { http } from '../../core/http';

type ProductsResponse = {
  products: Array<{
    id: number;
    title: string;
    brand: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
  }>;
  total: number;
  limit: number;
  skip: number;
};

@customElement('table-demo')
export class TableDemo extends LitElement {
  @state() private loading = false;
  @state() private error: string | null = null;
  @state() private data: { columns: TableColumn[]; rows: TableRow[] } | null = null;
  @state() private currentPage = 1;
  @state() private pageSize = 10;
  @state() private total = 0;
  @state() private actionMessage = '';

  static styles = css`
    h1 {
      font-size: 2rem;
      margin: 0 0 0.5rem;
      color: #0f172a;
    }

    .intro {
      color: #64748b;
      margin-bottom: 2rem;
    }

    .demo-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    h2 {
      margin: 0;
      font-size: 1.25rem;
      color: #0f172a;
    }

    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .status.loading {
      background: #fef3c7;
      color: #d97706;
    }

    .status.error {
      background: #fee2e2;
      color: #dc2626;
    }

    .status.success {
      background: #dcfce7;
      color: #16a34a;
    }

    .code-block {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 8px;
      font-family: monospace;
      font-size: 0.875rem;
    }

    .action-message {
      margin-bottom: 1rem;
      padding: 0.75rem 1rem;
      background: #dcfce7;
      color: #16a34a;
      border-radius: 8px;
      font-weight: 500;
    }

    .meta {
      margin-top: 1rem;
      font-size: 0.875rem;
      color: #64748b;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadData();
  }

  private async loadData(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const skip = (this.currentPage - 1) * this.pageSize;
      const payload = await http.get<ProductsResponse>(
        `https://dummyjson.com/products?limit=${this.pageSize}&skip=${skip}`
      );

      const columns: TableColumn[] = [
        { key: 'id', label: 'ID', align: 'right', visible: false },
        { key: 'title', label: 'Title' },
        { key: 'brand', label: 'Brand' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price', align: 'right' },
        { key: 'rating', label: 'Rating', align: 'right' },
        { key: 'stock', label: 'Stock', align: 'right' },
        { 
          key: 'actions', 
          label: 'Actions', 
          align: 'center',
          actions: { 
            edit: true, 
            delete: true 
          }
        }
      ];

      const rows: TableRow[] = payload.products.map(product => ({
        id: product.id,
        title: product.title,
        brand: product.brand,
        category: product.category,
        price: `$${product.price.toFixed(2)}`,
        rating: product.rating.toFixed(1),
        stock: product.stock
      }));

      this.data = { columns, rows };
      this.total = payload.total;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Unknown error';
    } finally {
      this.loading = false;
    }
  }

  private handlePageChange = (e: CustomEvent): void => {
    this.currentPage = e.detail.page;
    this.loadData();
  };

  private handleEditAction = (e: CustomEvent): void => {
    const { row } = e.detail;
    this.showActionMessage(`EDIT clicked for "${row.id}: ${row.title}"`);
  };

  private handleDeleteAction = (e: CustomEvent): void => {
    const { row } = e.detail;
    console.log(`DELETE clicked for "${row.id}: ${row.title}"`);
    this.showActionMessage(`DELETE clicked for "${row.id}: ${row.title}"`);
  };

  private showActionMessage(message: string): void {
    this.actionMessage = message;
    setTimeout(() => {
      this.actionMessage = '';
    }, 5000);
  }

  render() {
    const optionRows = (this.data?.rows ?? []).slice(0, 5).map((row, index) => ({
      ...row,
      selected: index % 2 === 0
    }));

    const optionColumns: TableColumn[] = [
      {
        key: 'selected',
        label: '',
        align: 'center',
        template: row => html`<ui-checkbox size="sm" ?checked=${row.selected}></ui-checkbox>`
      },
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'price', label: 'Price', align: 'right' }
    ];

    return html`
      <h1>Table Demo</h1>
      <p class="intro">Example of loading JSON data and rendering a table.</p>

      <div class="demo-section">
        <div class="section-header">
          <h2>Data Source</h2>
          <span class="status ${this.loading ? 'loading' : this.error ? 'error' : 'success'}">
            ${this.loading ? 'Loading...' : this.error ? 'Error' : 'Loaded'}
          </span>
        </div>
        <div class="code-block">
          <code>fetch('https://dummyjson.com/products')</code>
        </div>
      </div>

      <div class="demo-section">
        <h2>Table</h2>
        ${this.actionMessage ? html`
          <div class="action-message">${this.actionMessage}</div>
        ` : ''}
        <ui-table 
          id="demo-table" 
          .data=${this.data || { columns: [], rows: [] }}
          @edit-action=${this.handleEditAction}
          @delete-action=${this.handleDeleteAction}
        ></ui-table>
        <div class="meta"></div>
        <ui-pagination 
          .total=${this.total}
          .currentPage=${this.currentPage}
          .pageSize=${this.pageSize}
          @page-change=${this.handlePageChange}
        ></ui-pagination>
      </div>

      <div class="demo-section">
        <h2>Templates + Options</h2>
        <p class="intro">Checkbox template column, zebra rows, and no outer border.</p>
        <ui-table
          .columns=${optionColumns}
          .rows=${optionRows}
          .bordered=${false}
          .zebra=${true}
        ></ui-table>
      </div>
    `;
  }
}
