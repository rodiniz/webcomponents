export interface PagedData {
  columns: TableColumn[];
  rows: TableRow[];
  total: number;
}

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
  childColumns?: TableColumn[];
  childRows?: TableRow[];
}

export interface SortChangeDetail {
  key: string;
  direction: 'asc' | 'desc';
  column: TableColumn;
}
