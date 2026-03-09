import { html, nothing, type TemplateResult } from 'lit';
import type { TableColumn, TableRow } from './table.types';
import { getColumnStyle } from './table-utils';

export interface TableCellRenderOptions {
  columnWidths: Record<string, number>;
  renderExpandIcon?: (row: TableRow, rowIndex: number) => unknown;
  onAction?: (action: string, rowIndex: number) => void;
  includeActionDataAttrs?: boolean;
}

export class TableCellRenderer {
  static renderCell(
    row: TableRow,
    column: TableColumn,
    rowIndex: number,
    columnIndex: number,
    options: TableCellRenderOptions
  ): TemplateResult {
    const style = getColumnStyle(column, options.columnWidths);
    const align = column.align ?? 'left';
    const expandIcon = columnIndex === 0 && options.renderExpandIcon
      ? options.renderExpandIcon(row, rowIndex)
      : '';

    if (column.template) {
      return html`
        <td class="align-${align}" style=${style}>
          ${expandIcon}
          ${column.template(row, rowIndex)}
        </td>
      `;
    }

    if (column.actions) {
      const includeAttrs = Boolean(options.includeActionDataAttrs);

      return html`
        <td class="align-center actions-cell" style=${style}>
          ${column.actions.edit ? html`
            <ui-button
              variant="primary"
              class="action-btn"
              icon="edit"
              size="sm"
              data-action=${includeAttrs ? 'edit' : nothing}
              data-row-index=${includeAttrs ? rowIndex : nothing}
              @click=${() => options.onAction?.('edit', rowIndex)}
            ></ui-button>
          ` : ''}
          ${column.actions.delete ? html`
            <ui-button
              variant="danger"
              class="action-btn"
              icon="trash"
              size="sm"
              data-action=${includeAttrs ? 'delete' : nothing}
              data-row-index=${includeAttrs ? rowIndex : nothing}
              @click=${() => options.onAction?.('delete', rowIndex)}
            ></ui-button>
          ` : ''}
        </td>
      `;
    }

    if (columnIndex === 0) {
      return html`
        <td class="align-${align}" style=${style}>
          ${expandIcon}
          ${String(row[column.key] ?? '')}
        </td>
      `;
    }

    return html`
      <td class="align-${align}" style=${style}>
        ${String(row[column.key] ?? '')}
      </td>
    `;
  }

  static renderFlatRows(
    rows: TableRow[],
    columns: TableColumn[],
    options: TableCellRenderOptions
  ): TemplateResult[] {
    return rows.map((row, rowIndex) => html`
      <tr data-row-index="${rowIndex}">
        ${columns.map((column, columnIndex) =>
          TableCellRenderer.renderCell(row, column, rowIndex, columnIndex, options)
        )}
      </tr>
    `);
  }
}
