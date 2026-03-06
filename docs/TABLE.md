# ui-table Component

Data table with sortable columns, resizable columns, collapsible rows, and row actions.

## Basic Usage

```javascript
const table = document.querySelector('ui-table');
table.columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' }
];
table.rows = [
  { name: 'Alice', email: 'alice@example.com', status: 'Active' },
  { name: 'Bob', email: 'bob@example.com', status: 'Inactive' }
];
```

## Table Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `bordered` | boolean | `true` | Show table borders |
| `zebra` | boolean | `false` | Alternate row background colors |
| `collapsible` | boolean | `true` | Allow rows with children to be expanded/collapsed |

## Column Options

Each column object in the `columns` array supports the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `key` | string | required | Unique identifier for the column |
| `label` | string | required | Display name for the column header |
| `align` | 'left' \| 'center' \| 'right' | 'left' | Text alignment |
| `sortable` | boolean | false | Enable sorting for this column |
| `sortType` | 'string' \| 'number' \| 'date' | 'string' | Data type for sorting |
| `sortFn` | function | - | Custom sort function `(a, b) => number` |
| `resizable` | boolean | false | Allow user to resize this column |
| `width` | number | - | Fixed column width in pixels |
| `minWidth` | number | 80 | Minimum column width for resizing |
| `maxWidth` | number | 600 | Maximum column width for resizing |
| `visible` | boolean | true | Show or hide the column |
| `template` | function | - | Custom render function `(row, rowIndex) => HTML` |
| `actions` | object | - | Row actions (see Row Actions section) |

## Sorting

Enable sorting per column by setting `sortable: true`. Click column headers to sort ascending/descending.

```javascript
const table = document.querySelector('ui-table');
table.columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age', sortable: true, sortType: 'number' },
  { key: 'date', label: 'Created', sortable: true, sortType: 'date' }
];
```

### Custom Sort Functions

Provide a custom comparator for complex sorting logic:

```javascript
const table = document.querySelector('ui-table');
table.columns = [
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    sortFn: (rowA, rowB) => {
      const order = { active: 1, pending: 2, inactive: 3 };
      return (order[rowA.status] || 0) - (order[rowB.status] || 0);
    }
  }
];
```

## Resizing Columns

Enable resizing per column by setting `resizable: true`. Drag the handle at the right edge of the column header to resize.

```javascript
const table = document.querySelector('ui-table');
table.columns = [
  { key: 'name', label: 'Name', sortable: true, resizable: true, minWidth: 140, maxWidth: 300 },
  { key: 'email', label: 'Email', sortable: true, resizable: true, minWidth: 200, maxWidth: 400 },
  { key: 'actions', label: 'Actions', actions: { edit: true, delete: true }, resizable: false }
];
```

## Row Actions

Add action buttons (edit, delete) to rows:

```javascript
const table = document.querySelector('ui-table');
table.columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  {
    key: 'actions',
    label: 'Actions',
    align: 'center',
    actions: {
      edit: true,    // Show edit button
      delete: true   // Show delete button
    }
  }
];

// Listen for action events
table.addEventListener('action', (e) => {
  const { action, row, rowIndex } = e.detail;
  if (action === 'edit') {
    console.log('Edit row:', rowIndex, row);
  } else if (action === 'delete') {
    console.log('Delete row:', rowIndex, row);
  }
});
```

## Custom Cell Templates

Render custom content in columns using template functions:

```javascript
const table = document.querySelector('ui-table');
table.columns = [
  { key: 'name', label: 'Name' },
  {
    key: 'status',
    label: 'Status',
    template: (row) => {
      const badge = row.status === 'Active'
        ? `<span style="color: green;">✓ ${row.status}</span>`
        : `<span style="color: red;">✗ ${row.status}</span>`;
      return badge;
    }
  }
];
```

## Collapsible Rows

Add child rows to create expandable row groups:

```javascript
const table = document.querySelector('ui-table');
table.rows = [
  {
    name: 'Department A',
    manager: 'John Doe',
    childColumns: [
      { key: 'member', label: 'Team Member' },
      { key: 'role', label: 'Role' }
    ],
    childRows: [
      { member: 'Alice', role: 'Developer' },
      { member: 'Bob', role: 'Designer' }
    ]
  }
];
```

## Complete Example

```html
<ui-table id="data-table" bordered zebra collapsible></ui-table>

<script>
  const table = document.getElementById('data-table');

  table.columns = [
    { key: 'id', label: 'ID', sortable: true, resizable: true, width: 80 },
    { key: 'name', label: 'Name', sortable: true, resizable: true, minWidth: 140 },
    { key: 'email', label: 'Email', sortable: true, resizable: true, minWidth: 200 },
    { key: 'role', label: 'Role', sortable: true, resizable: true, minWidth: 120 },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      template: (row) => {
        const color = row.status === 'Active' ? 'green' : 'gray';
        return `<span style="color: ${color};">${row.status}</span>`;
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'center',
      resizable: false,
      actions: { edit: true, delete: true }
    }
  ];

  table.rows = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer', status: 'Active' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Manager', status: 'Away' }
  ];

  table.addEventListener('action', (e) => {
    const { action, row, rowIndex } = e.detail;
    console.log(`${action} clicked for row ${rowIndex}:`, row);
  });
</script>
```

## API Reference

### Properties

- `columns: TableColumn[]` - Array of column configurations
- `rows: TableRow[]` - Array of row data objects

### Events

- `action` - Fired when a row action (edit/delete) is clicked
  - Event detail: `{ action: string, row: object, rowIndex: number }`

### Methods

```javascript
// Access table data
const data = table.data; // { columns, rows }

// Update table data
table.data = { columns: [...], rows: [...] };
```

## Styling

Customize table appearance via CSS:

```css
ui-table {
  --table-border-color: #ddd;
  --table-row-hover-bg: #f5f5f5;
  --table-header-bg: #f9f9f9;
  --table-text-color: #333;
}
```

## Types

```typescript
interface TableColumn {
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

interface TableRow {
  [key: string]: any;
  children?: TableRow[];
  childColumns?: TableColumn[];
  childRows?: TableRow[];
}
```
