import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap, styleMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';
import './button';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  visible?: boolean;
  sortable?: boolean;
  sortType?: 'string' | 'number' | 'date';
  sortFn?: (a: TableRow, b: TableRow) => number;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  resizable?: boolean;
  template?: (row: TableRow, rowIndex: number) => unknown;
  actions?: {
    edit?: boolean;
    delete?: boolean;
  };
}

export interface TableRow {
  [key: string]: any;
  children?: TableRow[];
  childColumns?: TableColumn[];
  childRows?: TableRow[];
}

@customElement('ui-table')
export class UITable extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: TableRow[] = [];
  @property({ type: Boolean, reflect: true }) bordered: boolean = true;
  @property({ type: Boolean, reflect: true }) zebra: boolean = false;
  @property({ type: Boolean, reflect: true }) collapsible: boolean = true;
  @property({ type: Boolean, reflect: true }) sortable: boolean = false;
  @property({ type: Boolean, reflect: true }) resizable: boolean = false;

  @state() private expandedRows: Set<number> = new Set();
  @state() private sortKey: string | null = null;
  @state() private sortDirection: 'asc' | 'desc' = 'asc';
  @state() private columnWidths: Record<string, number> = {};

  private resizingKey: string | null = null;
  private resizeStartX: number = 0;
  private resizeStartWidth: number = 0;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'table');
    super.connectedCallback();
  }

  protected updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('columns')) {
      const nextWidths: Record<string, number> = { ...this.columnWidths };
      this.columns.forEach(column => {
        if (column.width && !nextWidths[column.key]) {
          nextWidths[column.key] = column.width;
        }
      });
      this.columnWidths = nextWidths;
    }
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
    const legacyChildren = Array.isArray(row.children) && row.children.length > 0;
    const nestedChildren = Array.isArray(row.childRows) && row.childRows.length > 0;
    return legacyChildren || nestedChildren;
  }

  private getChildConfig(row: TableRow): { columns: TableColumn[]; rows: TableRow[] } | null {
    const childRows = row.childRows ?? row.children ?? [];
    if (!Array.isArray(childRows) || childRows.length === 0) return null;

    const columns = row.childColumns ?? this.columns;
    return {
      columns: columns.filter(col => col.visible !== false),
      rows: childRows
    };
  }

  private renderFlatRows(rows: TableRow[], columns: TableColumn[]) {
    return rows.map((row, rowIndex) => html`
      <tr data-row-index="${rowIndex}">
        ${columns.map(column => {
          if (column.template) {
            return html`<td class="align-${column.align ?? 'left'}" style=${this.getColumnStyle(column)}>${column.template(row, rowIndex)}</td>`;
          }
          if (column.actions) {
            return html`
              <td class="align-center actions-cell" style=${this.getColumnStyle(column)}>
                ${column.actions.edit ? html`
                  <ui-button variant="primary" class="action-btn" icon="edit" size="sm" @click=${() => this.handleAction('edit', rowIndex)}></ui-button>
                ` : ''}
                ${column.actions.delete ? html`
                  <ui-button variant="danger" class="action-btn" icon="trash" size="sm" @click=${() => this.handleAction('delete', rowIndex)}></ui-button>
                ` : ''}
              </td>
            `;
          }
          return html`<td class="align-${column.align ?? 'left'}" style=${this.getColumnStyle(column)}>${String(row[column.key] ?? '')}</td>`;
        })}
      </tr>
    `);
  }

  private handleHeaderClick(column: TableColumn): void {
    const isSortable = this.sortable && column.sortable !== false;
    if (!isSortable) return;

    if (this.sortKey === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = column.key;
      this.sortDirection = 'asc';
    }
  }

  private compareValues(a: unknown, b: unknown, sortType?: 'string' | 'number' | 'date'): number {
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    if (sortType === 'number') {
      return Number(a) - Number(b);
    }

    if (sortType === 'date') {
      return new Date(String(a)).getTime() - new Date(String(b)).getTime();
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
  }

  private getSortedRows(): TableRow[] {
    if (!this.sortKey || !this.sortable) return this.rows;

    const column = this.columns.find(col => col.key === this.sortKey);
    if (!column || column.sortable === false) return this.rows;

    const rows = [...this.rows];
    rows.sort((rowA, rowB) => {
      const valueA = rowA[this.sortKey as string];
      const valueB = rowB[this.sortKey as string];
      const base = column.sortFn
        ? column.sortFn(rowA, rowB)
        : this.compareValues(valueA, valueB, column.sortType);

      return this.sortDirection === 'asc' ? base : -base;
    });

    return rows;
  }

  private getColumnStyle(column: TableColumn): string {
    const width = this.columnWidths[column.key] ?? column.width;
    return styleMap({
      width: width ? `${width}px` : '',
      'min-width': column.minWidth ? `${column.minWidth}px` : '',
      'max-width': column.maxWidth ? `${column.maxWidth}px` : ''
    });
  }

  private handleResizeStart(event: MouseEvent, column: TableColumn): void {
    if (!this.resizable || column.resizable === false) return;

    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget as HTMLElement | null;
    const header = target?.closest('th') as HTMLElement | null;
    if (!header) return;

    const currentWidth = header.getBoundingClientRect().width;
    this.resizingKey = column.key;
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = currentWidth;

    const handleMove = (moveEvent: MouseEvent) => {
      if (!this.resizingKey) return;
      const delta = moveEvent.clientX - this.resizeStartX;
      const minWidth = column.minWidth ?? 80;
      const maxWidth = column.maxWidth ?? 600;
      const nextWidth = Math.min(maxWidth, Math.max(minWidth, this.resizeStartWidth + delta));
      this.columnWidths = {
        ...this.columnWidths,
        [this.resizingKey]: nextWidth
      };
    };

    const handleUp = () => {
      this.resizingKey = null;
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
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

  private renderRows() {
    const rows: unknown[] = [];
    const visibleColumns = this.columns.filter(col => col.visible !== false);

    const sourceRows = this.getSortedRows();

    sourceRows.forEach((row, rowIndex) => {
      const isExpanded = this.expandedRows.has(rowIndex);
      const hasChildren = this.hasChildren(row);
      
      rows.push(html`
        <tr class="${hasChildren ? 'has-children' : ''} ${isExpanded ? 'expanded' : ''}" data-row-index="${rowIndex}">
          ${visibleColumns.map((column, colIndex) => {
            if (column.template) {
              return html`
                <td class="align-${column.align ?? 'left'}" style=${this.getColumnStyle(column)}>
                  ${colIndex === 0 ? this.renderExpandIcon(row, rowIndex) : ''}
                  ${column.template(row, rowIndex)}
                </td>
              `;
            }
            if (column.actions) {
              return html`
                <td class="align-center actions-cell" style=${this.getColumnStyle(column)}>
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
                <td class="align-${column.align ?? 'left'}" style=${this.getColumnStyle(column)}>
                  ${this.renderExpandIcon(row, rowIndex)}
                  ${String(row[column.key] ?? '')}
                </td>
              `;
            }
            return html`<td class="align-${column.align ?? 'left'}" style=${this.getColumnStyle(column)}>${String(row[column.key] ?? '')}</td>`;
          })}
        </tr>
      `);
      
      if (isExpanded && hasChildren) {
        const childConfig = this.getChildConfig(row);
        if (childConfig) {
          rows.push(html`
            <tr class="child-row" data-parent-row="${rowIndex}">
              <td colspan=${visibleColumns.length}>
                <div class="child-table-wrap">
                  <table class="nested-table">
                    <thead>
                      <tr>
                        ${childConfig.columns.map(column => html`
                          <th class="align-${column.align ?? 'left'}" style=${this.getColumnStyle(column)}>${column.label}</th>
                        `)}
                      </tr>
                    </thead>
                    <tbody>
                      ${this.renderFlatRows(childConfig.rows, childConfig.columns)}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          `);
        }
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
              ${visibleColumns.map(column => {
                const isSortable = this.sortable && column.sortable !== false;
                const isSorted = this.sortKey === column.key;
                const headerClasses = classMap({
                  [`align-${column.align ?? 'left'}`]: true,
                  'sortable': isSortable,
                  'sorted': isSorted
                });
                const sortIndicator = isSortable
                  ? html`<span class="sort-indicator ${isSorted ? this.sortDirection : ''}"></span>`
                  : '';
                const resizer = this.resizable && column.resizable !== false
                  ? html`<span class="column-resizer" @mousedown=${(event: MouseEvent) => this.handleResizeStart(event, column)}></span>`
                  : '';

                return html`
                  <th
                    class=${headerClasses}
                    style=${this.getColumnStyle(column)}
                    @click=${() => this.handleHeaderClick(column)}
                  >
                    <span class="th-label">${column.label}</span>
                    ${sortIndicator}
                    ${resizer}
                  </th>
                `;
              })}
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
