# ui-table Component

Data table with per-column sorting, per-column resizing, collapsible rows, row actions, and theme-aware header styling.

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

Note: sorting is configured on each column. There is no table-level `sortable` flag.

By default, sorting is done on the client. To request sorted data from an API instead, set
`sortMode="server"` and listen to the `sort-change` event.

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

### Server-Side Sorting (API)

```javascript
import { http } from '@diniz/webcomponents';

const table = document.querySelector('ui-table');
table.sortMode = 'server';

table.columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: true }
];

async function fetchSorted(key, direction) {
  const data = await http.get(`/api/users?sort=${key}&direction=${direction}`);
  table.rows = data;
}

table.addEventListener('sort-change', (e) => {
  const { key, direction } = e.detail;
  fetchSorted(key, direction).catch((error) => {
    console.error('Failed to sort:', error);
  });
});
```

## Resizing Columns

Enable resizing per column by setting `resizable: true`. Drag the handle at the right edge of the column header to resize.

Note: resizing is configured on each column. There is no table-level `resizable` flag.

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

## Loading Data From API

Use the library HTTP client (`http`) to fetch data and bind it to `table.rows`.

### Basic API Loading

```javascript
import { http } from '@diniz/webcomponents';

const table = document.querySelector('ui-table');

table.columns = [
  { key: 'id', label: 'ID', sortable: true, resizable: true, minWidth: 90 },
  { key: 'name', label: 'Name', sortable: true, resizable: true, minWidth: 160 },
  { key: 'email', label: 'Email', sortable: true, resizable: true, minWidth: 220 }
];

async function loadUsers() {
  try {
    const users = await http.get('https://jsonplaceholder.typicode.com/users?_limit=8');
    table.rows = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email
    }));
  } catch (error) {
    console.error('Failed to load users:', error);
    table.rows = [];
  }
}

loadUsers();
```

### API Loading With Client Configuration

```javascript
import { http } from '@diniz/webcomponents';

const table = document.querySelector('ui-table');

http.setBaseURL('https://jsonplaceholder.typicode.com');
http.setDefaultTimeout(5000);

async function loadPosts() {
  const posts = await http.get('/posts?_limit=5');
  table.rows = posts.map((post) => ({
    id: post.id,
    title: post.title,
    userId: post.userId
  }));
}

table.columns = [
  { key: 'id', label: 'Post ID', sortable: true, resizable: true, minWidth: 90 },
  { key: 'title', label: 'Title', sortable: true, resizable: true, minWidth: 260 },
  { key: 'userId', label: 'Author ID', sortable: true, resizable: true, minWidth: 110 }
];

loadPosts().catch((error) => {
  console.error('Failed to load posts:', error);
});
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
- `sort-change` - Fired when user clicks a sortable header and `sortMode="server"`
  - Event detail: `{ key: string, direction: 'asc' | 'desc', column: TableColumn }`

### Methods

```javascript
// Access table data
const data = table.data; // { columns, rows }

// Update table data
table.data = { columns: [...], rows: [...] };
```

## Theming

`ui-table` uses the shared theme tokens from `ThemeService` and updates automatically when the active theme changes.

Header styling uses:
- `--color-header` for `thead` background
- `--color-header-foreground` for header text color

The default theme pipeline sets these tokens for you. You can still override them per instance:

```css
ui-table {
  --color-header: hsl(var(--primary-h) 45% 95%);
  --color-header-foreground: hsl(var(--foreground));
}
```

## Types

```typescript
type SortDirection = 'asc' | 'desc';

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
  // Nested rows should be defined here for expandable parent rows
  childColumns?: TableColumn[];
  childRows?: TableRow[];
}

interface SortChangeDetail {
  key: string;
  direction: SortDirection;
  column: TableColumn;
}
```
