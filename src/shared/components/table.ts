import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import themeStyles from '../../styles/theme.css?inline';
import './button';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  visible?: boolean;
  actions?: {
    edit?: boolean;
    delete?: boolean;
  };
}

export interface TableRow {
  [key: string]: any;
}

@customElement('ui-table')
export class UITable extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: TableRow[] = [];

  connectedCallback(): void {
    this.setAttribute('data-ui', 'table');
    super.connectedCallback();
  }

  set data(value: { columns: TableColumn[]; rows: TableRow[] }) {
    this.columns = value.columns;
    this.rows = value.rows;
  }

  get data(): { columns: TableColumn[]; rows: TableRow[] } {
    return { columns: this.columns, rows: this.rows };
  }

  private handleAction(action: string, rowIndex: number): void {
    const row = this.rows[rowIndex];
    this.dispatchEvent(new CustomEvent('action', {
      detail: { action, row, rowIndex },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const visibleColumns = this.columns.filter(col => col.visible !== false);

    return html`
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${visibleColumns.map(column => html`
                <th class="align-${column.align ?? 'left'}">${column.label}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${this.rows.map((row, rowIndex) => html`
              <tr data-row-index="${rowIndex}">
                ${visibleColumns.map(column => {
      if (column.actions) {
        return html`
                      <td class="align-center actions-cell">
                        ${column.actions.edit ? html`
                          <ui-button variant="primary" class="action-btn" icon="edit" size="sm" data-action="edit" data-row-index="${rowIndex}" @click=${() => this.handleAction('edit', rowIndex)}>Edit</ui-button>
                        ` : ''}
                        ${column.actions.delete ? html`
                          <ui-button variant="danger" class="action-btn" icon="trash" size="sm" data-action="delete" data-row-index="${rowIndex}" @click=${() => this.handleAction('delete', rowIndex)}>Delete</ui-button>
                        ` : ''}
                      </td>
                    `;
      }
      return html`<td class="align-${column.align ?? 'left'}">${String(row[column.key] ?? '')}</td>`;
    })}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}
