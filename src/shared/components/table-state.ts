/**
 * Manages state for the UITable component
 * Centralizes all table state logic in one place for better maintainability
 */
export class TableState {
  private _expandedRows: Set<number> = new Set();
  private _sortKey: string | null = null;
  private _sortDirection: 'asc' | 'desc' = 'asc';
  private _columnWidths: Record<string, number> = {};

  /**
   * Get the set of expanded row indices
   */
  get expandedRows(): Set<number> {
    return this._expandedRows;
  }

  /**
   * Get the current sort key
   */
  get sortKey(): string | null {
    return this._sortKey;
  }

  /**
   * Get the current sort direction
   */
  get sortDirection(): 'asc' | 'desc' {
    return this._sortDirection;
  }

  /**
   * Get the column widths map
   */
  get columnWidths(): Record<string, number> {
    return this._columnWidths;
  }

  /**
   * Set column widths (replaces entire map)
   */
  set columnWidths(widths: Record<string, number>) {
    this._columnWidths = widths;
  }

  /**
   * Toggle expansion state of a row
   * @param rowIndex Index of the row to toggle
   * @returns New Set of expanded rows (for reactivity)
   */
  toggleExpand(rowIndex: number): Set<number> {
    if (this._expandedRows.has(rowIndex)) {
      this._expandedRows.delete(rowIndex);
    } else {
      this._expandedRows.add(rowIndex);
    }
    // Return a new Set to trigger reactivity in Lit components
    this._expandedRows = new Set(this._expandedRows);
    return this._expandedRows;
  }

  /**
   * Check if a row is expanded
   * @param rowIndex Index of the row to check
   * @returns True if the row is expanded
   */
  isExpanded(rowIndex: number): boolean {
    return this._expandedRows.has(rowIndex);
  }

  /**
   * Collapse all rows
   * @returns New Set of expanded rows (empty)
   */
  collapseAll(): Set<number> {
    this._expandedRows = new Set();
    return this._expandedRows;
  }

  /**
   * Expand all rows
   * @param rowIndices Array of all row indices to expand
   * @returns New Set of expanded rows
   */
  expandAll(rowIndices: number[]): Set<number> {
    this._expandedRows = new Set(rowIndices);
    return this._expandedRows;
  }

  /**
   * Set sorting configuration
   * @param key Column key to sort by
   * @param direction Sort direction
   * @returns Object with current sort state
   */
  setSorting(key: string, direction: 'asc' | 'desc'): { key: string; direction: 'asc' | 'desc' } {
    this._sortKey = key;
    this._sortDirection = direction;
    return { key: this._sortKey, direction: this._sortDirection };
  }

  /**
   * Toggle sort direction for a column
   * If the column is not currently sorted, set to ascending
   * If the column is sorted ascending, change to descending
   * If the column is sorted descending, change to ascending
   * @param key Column key to toggle
   * @returns Object with new sort state
   */
  toggleSort(key: string): { key: string; direction: 'asc' | 'desc' } {
    if (this._sortKey === key) {
      this._sortDirection = this._sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortKey = key;
      this._sortDirection = 'asc';
    }
    return { key: this._sortKey, direction: this._sortDirection };
  }

  /**
   * Clear sorting
   */
  clearSorting(): void {
    this._sortKey = null;
    this._sortDirection = 'asc';
  }

  /**
   * Check if a column is currently sorted
   * @param key Column key to check
   * @returns True if the column is sorted
   */
  isSorted(key: string): boolean {
    return this._sortKey === key;
  }

  /**
   * Set width for a specific column
   * @param key Column key
   * @param width Width in pixels
   * @returns Updated column widths map
   */
  setColumnWidth(key: string, width: number): Record<string, number> {
    this._columnWidths = {
      ...this._columnWidths,
      [key]: width
    };
    return this._columnWidths;
  }

  /**
   * Get width for a specific column
   * @param key Column key
   * @returns Width in pixels, or undefined if not set
   */
  getColumnWidth(key: string): number | undefined {
    return this._columnWidths[key];
  }

  /**
   * Reset all state to initial values
   */
  reset(): void {
    this._expandedRows = new Set();
    this._sortKey = null;
    this._sortDirection = 'asc';
    this._columnWidths = {};
  }

  /**
   * Create a snapshot of the current state
   * Useful for debugging or storing state
   */
  snapshot(): {
    expandedRows: number[];
    sortKey: string | null;
    sortDirection: 'asc' | 'desc';
    columnWidths: Record<string, number>;
  } {
    return {
      expandedRows: Array.from(this._expandedRows),
      sortKey: this._sortKey,
      sortDirection: this._sortDirection,
      columnWidths: { ...this._columnWidths }
    };
  }

  /**
   * Restore state from a snapshot
   * @param snapshot State snapshot to restore
   */
  restore(snapshot: {
    expandedRows?: number[];
    sortKey?: string | null;
    sortDirection?: 'asc' | 'desc';
    columnWidths?: Record<string, number>;
  }): void {
    if (snapshot.expandedRows) {
      this._expandedRows = new Set(snapshot.expandedRows);
    }
    if (snapshot.sortKey !== undefined) {
      this._sortKey = snapshot.sortKey;
    }
    if (snapshot.sortDirection) {
      this._sortDirection = snapshot.sortDirection;
    }
    if (snapshot.columnWidths) {
      this._columnWidths = { ...snapshot.columnWidths };
    }
  }
}
