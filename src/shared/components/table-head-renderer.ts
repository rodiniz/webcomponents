import { html, type TemplateResult } from 'lit';
import type { TableColumn } from './table.types';
import { TableHeaderRenderer } from './table-header-renderer';

/**
 * Context object for rendering table headers
 */
export interface TableHeadRenderContext {
  /** Array of visible table columns */
  visibleColumns: TableColumn[];
  /** Function to check if a column is currently sorted */
  isSorted: (key: string) => boolean;
  /** Current sort direction ('asc' or 'desc') */
  sortDirection: 'asc' | 'desc';
  /** Callback when a header is clicked */
  onHeaderClick: (column: TableColumn) => void;
  /** Callback when column resize starts */
  onResizeStart: (event: MouseEvent, column: TableColumn) => void;
  /** Map of column widths by column key */
  columnWidths: Record<string, number>;
}

/**
 * Renders the table header (thead) with columns
 * @param context - Rendering context containing columns and callbacks
 * @returns Template result for the thead element
 */
export function renderTableHead(context: TableHeadRenderContext): TemplateResult {
  return html`
    <thead>
      <tr>
        ${context.visibleColumns.map(column => TableHeaderRenderer.renderHeader(column, {
          isSorted: context.isSorted(column.key),
          sortDirection: context.sortDirection,
          onHeaderClick: () => context.onHeaderClick(column),
          onResizeStart: (event: MouseEvent) => context.onResizeStart(event, column),
          columnWidths: context.columnWidths
        }))}
      </tr>
    </thead>
  `;
}
