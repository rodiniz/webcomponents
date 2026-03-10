import { styleMap } from '../../core/template';
import type { TableColumn, TableRow } from './table.types';

/**
 * Compare two values for sorting purposes
 * @param a First value to compare
 * @param b Second value to compare
 * @param sortType Optional type hint for comparison logic
 * @returns Negative if a < b, positive if a > b, 0 if equal
 */
export function compareValues(
  a: unknown,
  b: unknown,
  sortType?: 'string' | 'number' | 'date'
): number {
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

  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: 'base'
  });
}

/**
 * Sort an array of table rows based on a column key and direction
 * @param rows Array of rows to sort
 * @param sortKey Column key to sort by
 * @param sortDirection Sort direction ('asc' or 'desc')
 * @param column Column configuration with optional custom sort function
 * @returns Sorted array of rows
 */
export function sortRows(
  rows: TableRow[],
  sortKey: string,
  sortDirection: 'asc' | 'desc',
  column: TableColumn
): TableRow[] {
  const sortedRows = [...rows];
  
  sortedRows.sort((rowA, rowB) => {
    const valueA = rowA[sortKey];
    const valueB = rowB[sortKey];
    
    const base = column.sortFn
      ? column.sortFn(rowA, rowB)
      : compareValues(valueA, valueB, column.sortType);

    return sortDirection === 'asc' ? base : -base;
  });

  return sortedRows;
}

/**
 * Filter columns to only those that are visible
 * @param columns Array of column configurations
 * @returns Array of visible columns
 */
export function getVisibleColumns(columns: TableColumn[]): TableColumn[] {
  return columns.filter(col => col.visible !== false);
}

/**
 * Generate CSS style string for a column based on width constraints
 * @param column Column configuration
 * @param columnWidths Map of column keys to current widths
 * @returns Style string for the column
 */
export function getColumnStyle(
  column: TableColumn,
  columnWidths: Record<string, number>
): string {
  const width = columnWidths[column.key] ?? column.width;
  return styleMap({
    width: width ? `${width}px` : '',
    'min-width': column.minWidth ? `${column.minWidth}px` : '',
    'max-width': column.maxWidth ? `${column.maxWidth}px` : ''
  });
}

/**
 * Check if a table row has child rows
 * @param row Table row to check
 * @returns True if row has children
 */
export function hasChildren(row: TableRow): boolean {
  return Array.isArray(row.childRows) && row.childRows.length > 0;
}

/**
 * Get child table configuration (columns and rows) from a parent row
 * @param row Parent row
 * @param defaultColumns Default columns to use if row doesn't specify child columns
 * @returns Object with columns and rows, or null if no children exist
 */
export function getChildConfig(
  row: TableRow,
  defaultColumns: TableColumn[]
): { columns: TableColumn[]; rows: TableRow[] } | null {
  const childRows = row.childRows ?? [];
  
  if (!Array.isArray(childRows) || childRows.length === 0) {
    return null;
  }

  const columns = row.childColumns ?? defaultColumns;
  
  return {
    columns: getVisibleColumns(columns),
    rows: childRows
  };
}

/**
 * Initialize column widths from column configuration
 * @param columns Array of column configurations
 * @param existingWidths Existing width map to preserve
 * @returns Updated width map
 */
export function initializeColumnWidths(
  columns: TableColumn[],
  existingWidths: Record<string, number> = {}
): Record<string, number> {
  const nextWidths: Record<string, number> = { ...existingWidths };
  
  columns.forEach(column => {
    if (column.width && !nextWidths[column.key]) {
      nextWidths[column.key] = column.width;
    }
  });
  
  return nextWidths;
}
