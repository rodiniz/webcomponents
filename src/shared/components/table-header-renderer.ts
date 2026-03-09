import { html, type TemplateResult } from 'lit';
import { classMap } from '../../core/template';
import type { TableColumn } from './table.types';
import { getColumnStyle } from './table-utils';

export interface TableHeaderRenderOptions {
  isSorted: boolean;
  sortDirection: 'asc' | 'desc';
  onHeaderClick: () => void;
  onResizeStart: (event: MouseEvent) => void;
  columnWidths: Record<string, number>;
}

export class TableHeaderRenderer {
  static renderHeader(
    column: TableColumn,
    options: TableHeaderRenderOptions
  ): TemplateResult {
    const isSortable = Boolean(column.sortable);
    const headerClasses = classMap({
      [`align-${column.align ?? 'left'}`]: true,
      'sortable': isSortable,
      'sorted': options.isSorted
    });

    const sortIndicator = isSortable
      ? html`<span class="sort-indicator ${options.isSorted ? options.sortDirection : ''}"></span>`
      : '';

    const resizer = column.resizable
      ? html`<span class="column-resizer" @mousedown=${options.onResizeStart}></span>`
      : '';

    return html`
      <th
        class=${headerClasses}
        style=${getColumnStyle(column, options.columnWidths)}
        @click=${options.onHeaderClick}
      >
        <span class="th-label">${column.label}</span>
        ${sortIndicator}
        ${resizer}
      </th>
    `;
  }

  static renderBasicHeader(
    column: TableColumn,
    columnWidths: Record<string, number>
  ): TemplateResult {
    return html`
      <th class="align-${column.align ?? 'left'}" style=${getColumnStyle(column, columnWidths)}>
        ${column.label}
      </th>
    `;
  }
}
