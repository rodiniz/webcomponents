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
  initializeColumnWidths
} from './table-utils';
import { TableState } from './table-state';
import { TableHeaderRenderer } from './table-header-renderer';
import { TableSorter } from './table-sorter';
import { ColumnResizer } from './table-column-resizer';
import { renderTableRows } from './table-row-renderer';
import { renderTableHead } from './table-head-renderer';

@customElement('ui-table')
export class UITable extends UIComponentBase {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: TableRow[] = [];
  @property({ type: Boolean, reflect: true }) bordered: boolean = true;
  @property({ type: Boolean, reflect: true }) zebra: boolean = false;
  @property({ type: Boolean, reflect: true }) collapsible: boolean = true;
  @property({ type: String, attribute: 'child-rows-key' }) childRowsKey: string = 'childRows';
  @property({ type: String, reflect: true }) sortMode: 'client' | 'server' = 'client';
  @property({ type: String, attribute: 'empty-message' }) emptyMessage: string = 'No rows to display';
  @property({ type: String, attribute: 'empty-hint' }) emptyHint: string = 'Add data to populate this table.';
  @property({ attribute: false }) childColumns: TableColumn[] = [];

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
      this.requestUpdate();
    });
  }

  render() {
    const visibleColumns = getVisibleColumns(this.columns);
    const sortedRows = this.getSortedRows();

    const wrapClasses = classMap({
      'table-wrap': true,
      'no-border': !this.bordered,
      'zebra': this.zebra
    });

    return html`
      <div class=${wrapClasses}>
        <table>
          ${renderTableHead({
            visibleColumns,
            isSorted: (key: string) => this.tableState.isSorted(key),
            sortDirection: this.tableState.sortDirection,
            onHeaderClick: (column) => this.handleHeaderClick(column),
            onResizeStart: (event, column) => this.handleResizeStart(event, column),
            columnWidths: this.tableState.columnWidths
          })}
          <tbody>
            ${renderTableRows({
              columns: this.columns,
              rows: sortedRows,
              collapsible: this.collapsible,
              childRowsKey: this.childRowsKey,
              childColumns: this.childColumns,
              emptyMessage: this.emptyMessage,
              emptyHint: this.emptyHint,
              columnWidths: this.tableState.columnWidths,
              isExpanded: (rowIndex: number) => this.tableState.isExpanded(rowIndex),
              onToggleExpand: (rowIndex: number) => this.toggleExpand(rowIndex),
              onAction: (action: string, rowIndex: number) => this.handleAction(action, rowIndex)
            })}
          </tbody>
        </table>
      </div>
    `;
  }
}
