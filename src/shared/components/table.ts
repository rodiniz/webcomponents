import { html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import themeStyles from '../../styles/theme.css?inline';
import './button';
import type { PagedData, TableColumn, TableRow, SortChangeDetail } from './table.types';
export type { PagedData, TableColumn, TableRow, SortChangeDetail } from './table.types';
import {
  getVisibleColumns,
  hasChildren,
  getChildConfig,
  initializeColumnWidths
} from './table-utils';
import { TableState } from './table-state';
import { TableCellRenderer } from './table-cell-renderer';
import { TableHeaderRenderer } from './table-header-renderer';
import { TableSorter } from './table-sorter';
import { ColumnResizer } from './table-column-resizer';

@customElement('ui-table')
export class UITable extends UIComponentBase {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: TableRow[] = [];
  @property({ type: Boolean, reflect: true }) bordered: boolean = true;
  @property({ type: Boolean, reflect: true }) zebra: boolean = false;
  @property({ type: Boolean, reflect: true }) collapsible: boolean = true;
  @property({ type: String, reflect: true }) sortMode: 'client' | 'server' = 'client';
  @property({ type: String, attribute: 'empty-message' }) emptyMessage: string = 'No rows to display';
  @property({ type: String, attribute: 'empty-hint' }) emptyHint: string = 'Add data to populate this table.';

  @state() private tableState = new TableState();

  private sorter = new TableSorter(this.sortMode);
  private columnResizer = new ColumnResizer();

  disconnectedCallback(): void {
    this.columnResizer.stopResize();
    super.disconnectedCallback();
  }

  protected updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('columns')) {
      this.tableState.columnWidths = initializeColumnWidths(this.columns, this.tableState.columnWidths);
    }

    if (changedProperties.has('sortMode')) {
      this.sorter.setMode(this.sortMode);
    }
  }

  set data(value: PagedData) {
    this.columns = value.columns;
    this.rows = value.rows;
  }

  get data(): PagedData {
    return { columns: this.columns, rows: this.rows, total: this.rows.length };
  }

  private handleAction(action: string, rowIndex: number): void {
    const row = this.rows[rowIndex];
    this.emit('action', { action, row, rowIndex });
  }

  private toggleExpand(rowIndex: number): void {
    this.tableState.toggleExpand(rowIndex);
    this.requestUpdate();
  }



  private handleHeaderClick(column: TableColumn): void {
    if (!column.sortable) return;

    const sortState = this.tableState.toggleSort(column.key);

    if (this.sortMode === 'server') {
      this.emit<SortChangeDetail>('sort-change', {
        key: sortState.key,
        direction: sortState.direction,
        column
      });
    }
  }



  private getSortedRows(): TableRow[] {
    return this.sorter.getSortedRows(
      this.rows,
      this.columns,
      this.tableState.sortKey,
      this.tableState.sortDirection
    );
  }

  private handleResizeStart(event: MouseEvent, column: TableColumn): void {
    this.columnResizer.startResize(event, column, (key, width) => {
      this.tableState.setColumnWidth(key, width);
    });
  }

  private renderExpandIcon(row: TableRow, rowIndex: number) {
    if (!this.collapsible || !hasChildren(row)) return null;
    
    const isExpanded = this.tableState.isExpanded(rowIndex);
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
    const visibleColumns = getVisibleColumns(this.columns);

    const sourceRows = this.getSortedRows();

    if (sourceRows.length === 0) {
      return [html`
        <tr class="table-empty">
          <td colspan=${Math.max(visibleColumns.length, 1)}>
            <div class="table-empty-content">
              <div class="table-empty-title">${this.emptyMessage}</div>
              <div class="table-empty-hint">${this.emptyHint}</div>
            </div>
          </td>
        </tr>
      `];
    }

    sourceRows.forEach((row, rowIndex) => {
      const isExpanded = this.tableState.isExpanded(rowIndex);
      const rowHasChildren = hasChildren(row);
      
      rows.push(html`
          <tr class="${rowHasChildren ? 'has-children' : ''} ${isExpanded ? 'expanded' : ''}" data-row-index="${rowIndex}">
            ${visibleColumns.map((column, colIndex) => TableCellRenderer.renderCell(
              row,
              column,
              rowIndex,
              colIndex,
              {
                columnWidths: this.tableState.columnWidths,
                renderExpandIcon: (targetRow, targetRowIndex) => this.renderExpandIcon(targetRow, targetRowIndex),
                onAction: (action, targetRowIndex) => this.handleAction(action, targetRowIndex),
                includeActionDataAttrs: true
              }
            ))}
          </tr>
        `);
      
      if (isExpanded && rowHasChildren) {
        const childConfig = getChildConfig(row, this.columns);
        if (childConfig) {
          rows.push(html`
            <tr class="child-row" data-parent-row="${rowIndex}">
              <td colspan=${visibleColumns.length}>
                <div class="child-table-wrap">
                  <table class="nested-table">
                    <thead>
                      <tr>
                        ${childConfig.columns.map(column =>
                          TableHeaderRenderer.renderBasicHeader(column, this.tableState.columnWidths)
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      ${TableCellRenderer.renderFlatRows(childConfig.rows, childConfig.columns, {
                        columnWidths: this.tableState.columnWidths,
                        onAction: (action, targetRowIndex) => this.handleAction(action, targetRowIndex)
                      })}
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
    const visibleColumns = getVisibleColumns(this.columns);

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
              ${visibleColumns.map(column => TableHeaderRenderer.renderHeader(column, {
                isSorted: this.tableState.isSorted(column.key),
                sortDirection: this.tableState.sortDirection,
                onHeaderClick: () => this.handleHeaderClick(column),
                onResizeStart: (event: MouseEvent) => this.handleResizeStart(event, column),
                columnWidths: this.tableState.columnWidths
              }))}
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
