import { html } from 'lit';
import type { TableColumn, TableRow } from './table.types';
import { getVisibleColumns, hasChildren, getChildConfig } from './table-utils';
import { TableCellRenderer } from './table-cell-renderer';
import { TableHeaderRenderer } from './table-header-renderer';

export interface TableRowsRenderContext {
  columns: TableColumn[];
  rows: TableRow[];
  collapsible: boolean;
  childRowsKey: string;
  childColumns: TableColumn[];
  emptyMessage: string;
  emptyHint: string;
  columnWidths: Record<string, number>;
  isExpanded: (rowIndex: number) => boolean;
  onToggleExpand: (rowIndex: number) => void;
  onAction: (action: string, rowIndex: number) => void;
}

function renderExpandIcon(row: TableRow, rowIndex: number, context: TableRowsRenderContext) {
  if (!context.collapsible || !hasChildren(row, context.childRowsKey)) return null;

  const isExpanded = context.isExpanded(rowIndex);
  return html`
    <ui-button
      variant="ghost"
      size="sm"
      icon="${isExpanded ? 'chevron-down' : 'chevron-right'}"
      @click=${() => context.onToggleExpand(rowIndex)}
    ></ui-button>
  `;
}

export function renderTableRows(context: TableRowsRenderContext): unknown[] {
  const rows: unknown[] = [];
  const visibleColumns = getVisibleColumns(context.columns);

  if (context.rows.length === 0) {
    return [html`
      <tr class="table-empty">
        <td colspan=${Math.max(visibleColumns.length, 1)}>
          <div class="table-empty-content">
            <div class="table-empty-title">${context.emptyMessage}</div>
            <div class="table-empty-hint">${context.emptyHint}</div>
          </div>
        </td>
      </tr>
    `];
  }

  context.rows.forEach((row, rowIndex) => {
    const isExpanded = context.isExpanded(rowIndex);
    const rowHasChildren = hasChildren(row, context.childRowsKey);

    rows.push(html`
      <tr class="${rowHasChildren ? 'has-children' : ''} ${isExpanded ? 'expanded' : ''}" data-row-index="${rowIndex}">
        ${visibleColumns.map((column, colIndex) =>
          TableCellRenderer.renderCell(row, column, rowIndex, colIndex, {
            columnWidths: context.columnWidths,
            renderExpandIcon: (targetRow, targetRowIndex) => renderExpandIcon(targetRow, targetRowIndex, context),
            onAction: (action, targetRowIndex) => context.onAction(action, targetRowIndex),
            includeActionDataAttrs: true
          })
        )}
      </tr>
    `);

    if (isExpanded && rowHasChildren) {
      const childConfig = getChildConfig(row, context.columns, {
        childRowsKey: context.childRowsKey,
        childColumns: context.childColumns
      });
      if (childConfig) {
        rows.push(html`
          <tr class="child-row" data-parent-row="${rowIndex}">
            <td colspan=${visibleColumns.length}>
              <div class="child-table-wrap">
                <table class="nested-table">
                  <thead>
                    <tr>
                      ${childConfig.columns.map((column) =>
                        TableHeaderRenderer.renderBasicHeader(column, context.columnWidths)
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    ${TableCellRenderer.renderFlatRows(childConfig.rows, childConfig.columns, {
                      columnWidths: context.columnWidths,
                      onAction: (action, targetRowIndex) => context.onAction(action, targetRowIndex)
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
