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
| `sortMode` | 'client' \| 'server' | `'client'` | Sorting mode: 'client' for local sorting, 'server' for API-driven sorting |

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
    table.rows = users;
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
  table.rows = posts;
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

## Advanced: API-Driven Table with Pagination, Sorting, and Child Rows

This example demonstrates a complete server-driven table with:
- **Server-side pagination** - Fetch only the current page from the API
- **Server-side sorting** - Let the API handle sorting logic
- **Lazy-loaded child rows** - Load child data on-demand when parent rows expand

### Complete Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>API-Driven Table Demo</title>
</head>
<body>
  <div class="table-container">
    <ui-table id="api-table" bordered zebra collapsible></ui-table>
    <ui-pagination 
      id="table-pagination" 
      page="1" 
      per-page="10" 
      total="0">
    </ui-pagination>
  </div>

  <script type="module">
    import { http } from '@diniz/webcomponents';

    // Configuration
    const API_BASE = 'https://api.example.com';
    const table = document.getElementById('api-table');
    const pagination = document.getElementById('table-pagination');

    // State management
    let currentPage = 1;
    let perPage = 10;
    let sortKey = 'name';
    let sortDirection = 'asc';
    let loadedChildData = new Map(); // Cache for child rows

    // Configure table columns
    table.columns = [
      { 
        key: 'id', 
        label: 'ID', 
        sortable: true, 
        resizable: true, 
        width: 80 
      },
      { 
        key: 'name', 
        label: 'Department Name', 
        sortable: true, 
        resizable: true, 
        minWidth: 180 
      },
      { 
        key: 'manager', 
        label: 'Manager', 
        sortable: true, 
        resizable: true, 
        minWidth: 160 
      },
      { 
        key: 'employeeCount', 
        label: 'Employees', 
        sortable: true, 
        sortType: 'number',
        align: 'center',
        width: 110 
      },
      { 
        key: 'status', 
        label: 'Status', 
        sortable: true,
        template: (row) => {
          const colors = {
            active: 'green',
            inactive: 'gray',
            pending: 'orange'
          };
          const color = colors[row.status.toLowerCase()] || 'black';
          return `<span style="color: ${color}; font-weight: 500;">${row.status}</span>`;
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

    // Set table to server-side sorting mode
    table.sortMode = 'server';

    /**
     * Fetch paginated data from API with sorting
     */
    async function fetchTableData(page, limit, sort, direction) {
      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sort: sort,
          direction: direction
        });

        const response = await http.get(
          `${API_BASE}/departments?${queryParams.toString()}`
        );

        return {
          data: response.data || [],
          total: response.total || 0,
          page: response.page || page,
          perPage: response.perPage || limit
        };
      } catch (error) {
        console.error('Failed to fetch table data:', error);
        return { data: [], total: 0, page: 1, perPage: limit };
      }
    }

    /**
     * Fetch child rows for a specific parent row
     */
    async function fetchChildRows(parentId) {
      // Check cache first
      if (loadedChildData.has(parentId)) {
        return loadedChildData.get(parentId);
      }

      try {
        const response = await http.get(
          `${API_BASE}/departments/${parentId}/employees`
        );

        const childData = {
          childColumns: [
            { key: 'employeeId', label: 'Employee ID', width: 100 },
            { key: 'name', label: 'Name', minWidth: 150 },
            { key: 'position', label: 'Position', minWidth: 140 },
            { key: 'email', label: 'Email', minWidth: 200 },
            { key: 'hireDate', label: 'Hire Date', width: 120 }
          ],
          childRows: response.employees.map(emp => ({
            employeeId: emp.id,
            name: emp.name,
            position: emp.position,
            email: emp.email,
            hireDate: new Date(emp.hireDate).toLocaleDateString()
          }))
        };

        // Cache the result
        loadedChildData.set(parentId, childData);
        
        return childData;
      } catch (error) {
        console.error(`Failed to fetch child rows for parent ${parentId}:`, error);
        return { childColumns: [], childRows: [] };
      }
    }

    /**
     * Load and render table data
     */
    async function loadTable() {
      // Show loading state (optional)
      table.setAttribute('data-loading', 'true');

      const result = await fetchTableData(
        currentPage,
        perPage,
        sortKey,
        sortDirection
      );

      // Transform API data to table rows
      table.rows = result.data.map(dept => ({
        id: dept.id,
        name: dept.name,
        manager: dept.managerName,
        employeeCount: dept.employeeCount,
        status: dept.status,
        // Mark rows with children
        hasChildren: dept.employeeCount > 0,
        // Child data will be loaded on-demand
        childColumns: [],
        childRows: []
      }));

      // Update pagination
      pagination.total = result.total;
      pagination.page = result.page;
      pagination.perPage = result.perPage;

      // Remove loading state
      table.removeAttribute('data-loading');
    }

    /**
     * Handle row expansion to lazy-load child data
     */
    table.addEventListener('row-expand', async (e) => {
      const { row, rowIndex } = e.detail;
      
      // Only load if we haven't loaded children yet
      if (row.hasChildren && (!row.childRows || row.childRows.length === 0)) {
        try {
          // Fetch child data from API
          const childData = await fetchChildRows(row.id);
          
          // Update the row with child data
          const updatedRows = [...table.rows];
          updatedRows[rowIndex] = {
            ...updatedRows[rowIndex],
            childColumns: childData.childColumns,
            childRows: childData.childRows
          };
          
          table.rows = updatedRows;
        } catch (error) {
          console.error('Failed to load child rows:', error);
        }
      }
    });

    /**
     * Handle sorting changes
     */
    table.addEventListener('sort-change', async (e) => {
      const { key, direction } = e.detail;
      
      sortKey = key;
      sortDirection = direction;
      currentPage = 1; // Reset to first page when sorting changes
      
      await loadTable();
    });

    /**
     * Handle pagination changes
     */
    pagination.addEventListener('page-change', async (e) => {
      currentPage = e.detail.page;
      await loadTable();
      
      // Scroll to top of table
      table.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    pagination.addEventListener('per-page-change', async (e) => {
      perPage = e.detail.perPage;
      currentPage = 1; // Reset to first page when items per page changes
      await loadTable();
    });

    /**
     * Handle row actions
     */
    table.addEventListener('action', async (e) => {
      const { action, row, rowIndex } = e.detail;
      
      if (action === 'edit') {
        console.log('Edit department:', row);
        // Navigate to edit page or open modal
        // window.location.href = `/departments/${row.id}/edit`;
      } else if (action === 'delete') {
        if (confirm(`Delete department "${row.name}"?`)) {
          try {
            await http.delete(`${API_BASE}/departments/${row.id}`);
            
            // Reload current page
            await loadTable();
            
            console.log('Department deleted successfully');
          } catch (error) {
            console.error('Failed to delete department:', error);
            alert('Failed to delete department. Please try again.');
          }
        }
      }
    });

    // Initial load
    loadTable().catch(error => {
      console.error('Failed to initialize table:', error);
    });
  </script>

  <style>
    .table-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    ui-table[data-loading] {
      opacity: 0.6;
      pointer-events: none;
    }

    ui-pagination {
      margin-top: 1rem;
    }
  </style>
</body>
</html>
```

### API Response Format

The example above expects the following API response formats:

#### GET `/departments` - Paginated List
```json
{
  "data": [
    {
      "id": 1,
      "name": "Engineering",
      "managerName": "John Doe",
      "employeeCount": 25,
      "status": "Active"
    },
    {
      "id": 2,
      "name": "Marketing",
      "managerName": "Jane Smith",
      "employeeCount": 12,
      "status": "Active"
    }
  ],
  "total": 47,
  "page": 1,
  "perPage": 10
}
```

#### GET `/departments/:id/employees` - Child Rows
```json
{
  "departmentId": 1,
  "employees": [
    {
      "id": 101,
      "name": "Alice Johnson",
      "position": "Senior Developer",
      "email": "alice@example.com",
      "hireDate": "2020-03-15"
    },
    {
      "id": 102,
      "name": "Bob Wilson",
      "position": "Developer",
      "email": "bob@example.com",
      "hireDate": "2021-07-22"
    }
  ]
}
```

### Key Features Explained

#### 1. Server-Side Sorting
```javascript
table.sortMode = 'server';

table.addEventListener('sort-change', async (e) => {
  const { key, direction } = e.detail;
  // Send sort parameters to API
  await loadTable();
});
```

#### 2. Server-Side Pagination
```javascript
pagination.addEventListener('page-change', async (e) => {
  currentPage = e.detail.page;
  await loadTable();
});
```

#### 3. Lazy-Loaded Child Rows
```javascript
table.addEventListener('row-expand', async (e) => {
  const { row, rowIndex } = e.detail;
  
  // Fetch children from API only when row expands
  const childData = await fetchChildRows(row.id);
  
  // Update row with loaded children
  const updatedRows = [...table.rows];
  updatedRows[rowIndex] = {
    ...updatedRows[rowIndex],
    ...childData
  };
  
  table.rows = updatedRows;
});
```

#### 4. Child Data Caching
The example includes a caching mechanism to avoid refetching child data:
```javascript
let loadedChildData = new Map();

// Check cache before API call
if (loadedChildData.has(parentId)) {
  return loadedChildData.get(parentId);
}
```

### Best Practices

1. **Loading States**: Show visual feedback during API calls
2. **Error Handling**: Gracefully handle network failures
3. **Cache Management**: Cache child rows to reduce API calls
4. **State Synchronization**: Keep sorting, paging, and filters in sync
5. **URL Parameters**: Consider syncing state with URL query params for shareable links
6. **Debouncing**: For search/filter inputs, debounce API calls to reduce load

### Mock API Example

For testing, you can create a simple mock API:

```javascript
// Mock API implementation for testing
const mockAPI = {
  departments: Array.from({ length: 47 }, (_, i) => ({
    id: i + 1,
    name: `Department ${i + 1}`,
    managerName: `Manager ${i + 1}`,
    employeeCount: Math.floor(Math.random() * 50) + 5,
    status: ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)]
  })),

  async getDepartments(page, limit, sort, direction) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Sort
    const sorted = [...this.departments].sort((a, b) => {
      const aVal = a[sort];
      const bVal = b[sort];
      const result = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return direction === 'asc' ? result : -result;
    });

    // Paginate
    const start = (page - 1) * limit;
    const data = sorted.slice(start, start + limit);

    return {
      data,
      total: this.departments.length,
      page,
      perPage: limit
    };
  },

  async getEmployees(deptId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const count = Math.floor(Math.random() * 10) + 3;
    return {
      departmentId: deptId,
      employees: Array.from({ length: count }, (_, i) => ({
        id: deptId * 1000 + i,
        name: `Employee ${deptId}-${i + 1}`,
        position: ['Developer', 'Designer', 'Manager', 'Analyst'][i % 4],
        email: `employee${deptId}-${i + 1}@example.com`,
        hireDate: new Date(2020 + Math.floor(Math.random() * 5), 
                           Math.floor(Math.random() * 12), 
                           Math.floor(Math.random() * 28) + 1).toISOString()
      }))
    };
  }
};

// Use mock API instead of real HTTP calls
async function fetchTableData(page, limit, sort, direction) {
  return await mockAPI.getDepartments(page, limit, sort, direction);
}

async function fetchChildRows(parentId) {
  if (loadedChildData.has(parentId)) {
    return loadedChildData.get(parentId);
  }

  const response = await mockAPI.getEmployees(parentId);
  const childData = {
    childColumns: [
      { key: 'employeeId', label: 'Employee ID', width: 100 },
      { key: 'name', label: 'Name', minWidth: 150 },
      { key: 'position', label: 'Position', minWidth: 140 },
      { key: 'email', label: 'Email', minWidth: 200 },
      { key: 'hireDate', label: 'Hire Date', width: 120 }
    ],
    childRows: response.employees.map(emp => ({
      employeeId: emp.id,
      name: emp.name,
      position: emp.position,
      email: emp.email,
      hireDate: new Date(emp.hireDate).toLocaleDateString()
    }))
  };

  loadedChildData.set(parentId, childData);
  return childData;
}
```

### Pagination Integration

When using `ui-pagination` with `ui-table` for server-side pagination:

#### Pagination Attributes
- `page` - Current page number (1-based)
- `per-page` - Items per page
- `total` - Total number of items across all pages

#### Pagination Events
- `page-change` - Fired when user changes page
  - Event detail: `{ page: number }`
- `per-page-change` - Fired when user changes items per page
  - Event detail: `{ perPage: number }`

#### Example Integration
```javascript
const pagination = document.getElementById('table-pagination');

// Update pagination when data loads
pagination.total = apiResponse.total;
pagination.page = apiResponse.currentPage;
pagination.perPage = apiResponse.itemsPerPage;

// Listen for page changes
pagination.addEventListener('page-change', async (e) => {
  const newPage = e.detail.page;
  await fetchAndDisplayTableData(newPage);
});

// Listen for per-page changes
pagination.addEventListener('per-page-change', async (e) => {
  const newPerPage = e.detail.perPage;
  await fetchAndDisplayTableData(1, newPerPage); // Reset to page 1
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
- `row-expand` - Fired when a collapsible row is expanded (useful for lazy-loading child rows)
  - Event detail: `{ row: object, rowIndex: number }`
- `row-collapse` - Fired when a collapsible row is collapsed
  - Event detail: `{ row: object, rowIndex: number }`

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
