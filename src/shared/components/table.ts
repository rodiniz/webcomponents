import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';
import './button';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  visible?: boolean;
  template?: (row: TableRow, rowIndex: number) => unknown;
  actions?: {
    edit?: boolean;
    delete?: boolean;
  };
}

export interface TableRow {
  [key: string]: any;
  children?: TableRow[];
}

@customElement('ui-table')
export class UITable extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: TableRow[] = [];
  @property({ type: Boolean, reflect: true }) bordered: boolean = true;
  @property({ type: Boolean, reflect: true }) zebra: boolean = false;
  @property({ type: Boolean, reflect: true }) collapsible: boolean = true;

  @state() private expandedRows: Set<number> = new Set();

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

  private toggleExpand(rowIndex: number): void {
    if (this.expandedRows.has(rowIndex)) {
      this.expandedRows.delete(rowIndex);
    } else {
      this.expandedRows.add(rowIndex);
    }
    this.expandedRows = new Set(this.expandedRows);
  }

  private hasChildren(row: TableRow): boolean {
    return Array.isArray(row.children) && row.children.length > 0;
  }

  private renderExpandIcon(row: TableRow, rowIndex: number) {
    if (!this.collapsible || !this.hasChildren(row)) return null;
    
    const isExpanded = this.expandedRows.has(rowIndex);
    return html`
      <ui-button 
        variant="ghost" 
        size="sm" 
        icon="${isExpanded ? 'chevron-down' : 'chevron-right'}"
        @click=${() => this.toggleExpand(rowIndex)}
      ></ui-button>
    `;
  }

  private renderChildRow(childRow: TableRow, rowIndex: number, depth: number) {
    const visibleColumns = this.columns.filter(col => col.visible !== false);
    
    return html`
      <tr class="child-row" data-row-index="${rowIndex}" data-depth="${depth}">
        ${visibleColumns.map((column, colIndex) => {
          if (column.template) {
            return html`<td class="align-${column.align ?? 'left'}">${column.template(childRow, rowIndex)}</td>`;
          }
          if (column.actions) {
            return html`<td class="align-center actions-cell"></td>`;
          }
          if (colIndex === 0) {
            return html`
              <td class="align-${column.align ?? 'left'}">
                <span class="child-row-indent" style="margin-left: ${depth * 24}px"></span>
                ${String(childRow[column.key] ?? '')}
              </td>
            `;
          }
          return html`<td class="align-${column.align ?? 'left'}">${String(childRow[column.key] ?? '')}</td>`;
        })}
      </tr>
    `;
  }

  private renderRows() {
    const rows: unknown[] = [];
    const visibleColumns = this.columns.filter(col => col.visible !== false);
    
    this.rows.forEach((row, rowIndex) => {
      const isExpanded = this.expandedRows.has(rowIndex);
      const hasChildren = this.hasChildren(row);
      
      rows.push(html`
        <tr class="${hasChildren ? 'has-children' : ''} ${isExpanded ? 'expanded' : ''}" data-row-index="${rowIndex}">
          ${visibleColumns.map((column, colIndex) => {
            if (column.template) {
              return html`
                <td class="align-${column.align ?? 'left'}">
                  ${colIndex === 0 ? this.renderExpandIcon(row, rowIndex) : ''}
                  ${column.template(row, rowIndex)}
                </td>
              `;
            }
            if (column.actions) {
              return html`
                <td class="align-center actions-cell">
                  ${column.actions.edit ? html`
                    <ui-button variant="primary" class="action-btn" icon="edit" size="sm" data-action="edit" data-row-index="${rowIndex}" @click=${() => this.handleAction('edit', rowIndex)}></ui-button>
                  ` : ''}
                  ${column.actions.delete ? html`
                    <ui-button variant="danger" class="action-btn" icon="trash" size="sm" data-action="delete" data-row-index="${rowIndex}" @click=${() => this.handleAction('delete', rowIndex)}></ui-button>
                  ` : ''}
                </td>
              `;
            }
            if (colIndex === 0) {
              return html`
                <td class="align-${column.align ?? 'left'}">
                  ${this.renderExpandIcon(row, rowIndex)}
                  ${String(row[column.key] ?? '')}
                </td>
              `;
            }
            return html`<td class="align-${column.align ?? 'left'}">${String(row[column.key] ?? '')}</td>`;
          })}
        </tr>
      `);
      
      if (isExpanded && hasChildren && row.children) {
        row.children.forEach((childRow, childIndex) => {
          rows.push(this.renderChildRow(childRow, rowIndex * 1000 + childIndex, 1));
        });
      }
    });
    
    return rows;
  }

  render() {
    const visibleColumns = this.columns.filter(col => col.visible !== false);

    const wrapClasses = classMap({
      'table-wrap': true,
      'no-border': !this.bordered,
      'zebra': this.zebra
    });

    return html`
      <div class=${wrapClasses}>
        <table>
          <thead>
            <tr>
              ${visibleColumns.map(column => html`
                <th class="align-${column.align ?? 'left'}">${column.label}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${this.renderRows()}
          </tbody>
        </table>
      </div>
    `;
  }
}
