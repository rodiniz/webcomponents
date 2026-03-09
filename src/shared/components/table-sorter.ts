import type { TableColumn, TableRow } from './table.types';
import { sortRows } from './table-utils';

export class TableSorter {
  private mode: 'client' | 'server';

  constructor(mode: 'client' | 'server') {
    this.mode = mode;
  }

  setMode(mode: 'client' | 'server'): void {
    this.mode = mode;
  }

  getSortedRows(
    rows: TableRow[],
    columns: TableColumn[],
    sortKey: string | null,
    sortDirection: 'asc' | 'desc'
  ): TableRow[] {
    if (!sortKey) return rows;
    if (this.mode === 'server') return rows;

    const column = columns.find(col => col.key === sortKey);
    if (!column || !column.sortable) return rows;

    return sortRows(rows, sortKey, sortDirection, column);
  }
}
