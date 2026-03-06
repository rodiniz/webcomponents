# ui-treeview Component

A modern, production-grade tree view component with lazy loading, multi-select, custom rendering, and seamless HTTP client integration for loading hierarchical data.

## Features

- **Lazy Loading**: Load child nodes on-demand via callbacks
- **HTTP Integration**: Built-in support for the library's HTTPClient
- **Multi-Select**: Support for selecting multiple nodes
- **Custom Rendering**: Custom node templates for flexible styling
- **Event System**: Comprehensive events for selection and expansion
- **Smooth Animations**: CSS-based transitions for expand/collapse
- **Accessible**: Keyboard navigation and ARIA attributes
- **Type-Safe**: Full TypeScript support

## Installation

The component is part of `@diniz/webcomponents` library:

```javascript
import '@diniz/webcomponents';
import { UITreeView } from '@diniz/webcomponents';
```

## Basic Usage

### HTML

```html
<ui-treeview id="my-tree"></ui-treeview>
```

### JavaScript

```javascript
const treeview = document.getElementById('my-tree');

// Set items
treeview.items = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1.1', label: 'Forms' },
      { id: '1.2', label: 'Reports' }
    ]
  },
  {
    id: '2',
    label: 'Settings',
    isLeaf: true
  }
];

// Handle selection
treeview.addEventListener('node-selected', (e) => {
  const { node, selected } = e.detail;
  console.log(`Node ${node.label} is ${selected ? 'selected' : 'deselected'}`);
});
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `TreeNode[]` | `[]` | Root-level tree nodes |
| `multiSelect` | `boolean` | `false` | Allow multiple node selection |
| `options` | `TreeViewOptions` | `{}` | Configuration options |

### TreeNode Interface

```typescript
interface TreeNode {
  id: string;                    // Unique identifier
  label: string;                 // Display text
  icon?: string;                 // Optional HTML/SVG icon
  children?: TreeNode[];         // Child nodes (static)
  isLeaf?: boolean;              // Mark as leaf node (no children)
  lazy?: boolean;                // Enable lazy loading for this node
  data?: any;                    // Custom data attached to node
  [key: string]: any;            // Additional custom properties
}
```

### TreeViewOptions Interface

```typescript
interface TreeViewOptions {
  // Custom rendering function for nodes
  nodeTemplate?: (node: TreeNode) => string | HTMLElement;

  // Callback to load children asynchronously
  onLoadChildren?: (node: TreeNode) => Promise<TreeNode[]>;

  // Callback when a node is selected
  onNodeSelect?: (node: TreeNode) => void;

  // Enable multi-select mode
  multiSelect?: boolean;

  // Auto-expand nodes on load
  autoExpand?: boolean;
}
```

### Events

#### node-selected
Fired when a node is selected or deselected.

```javascript
treeview.addEventListener('node-selected', (e) => {
  const { node, selected } = e.detail;
  console.log(`${node.label}: ${selected}`);
});
```

#### node-expanded
Fired when a node is expanded or collapsed.

```javascript
treeview.addEventListener('node-expanded', (e) => {
  const { node, expanded } = e.detail;
  console.log(`${node.label}: ${expanded ? 'expanded' : 'collapsed'}`);
});
```

## Usage Examples

### Static Tree Structure

Display a pre-defined tree hierarchy:

```javascript
const treeview = document.getElementById('tree');

treeview.items = [
  {
    id: 'root',
    label: 'Project Files',
    children: [
      {
        id: 'src',
        label: 'src',
        children: [
          { id: 'src-index', label: 'index.ts', isLeaf: true },
          { id: 'src-utils', label: 'utils.ts', isLeaf: true }
        ]
      },
      {
        id: 'docs',
        label: 'docs',
        children: [
          { id: 'docs-readme', label: 'README.md', isLeaf: true }
        ]
      }
    ]
  }
];
```

### Lazy Loading from API

Load child nodes on-demand from an API:

```javascript
const treeview = document.getElementById('tree');
const { http } = await import('@diniz/webcomponents');

treeview.items = [
  { id: 'users', label: 'Users', lazy: true },
  { id: 'posts', label: 'Posts', lazy: true }
];

treeview.options = {
  onLoadChildren: async (node) => {
    if (node.id === 'users') {
      const data = await http.get('/api/users');
      return data.map(user => ({
        id: `user-${user.id}`,
        label: user.name,
        isLeaf: true
      }));
    }
    return [];
  }
};
```

### Custom Node Rendering

Use templates to customize node appearance:

```javascript
treeview.options = {
  nodeTemplate: (node) => {
    // Add emoji based on content
    const icons = {
      'Users': '👥',
      'Posts': '📝',
      'Settings': '⚙️'
    };

    const icon = Object.entries(icons).find(([key]) => 
      node.label.includes(key)
    )?.[1] || '📁';

    return `<strong>${icon} ${node.label}</strong>`;
  }
};
```

### Multi-Select with Event Tracking

Enable selection of multiple nodes:

```javascript
const treeview = document.getElementById('tree');
const selectedNodes = new Set();

treeview.multiSelect = true;
treeview.items = [/* ... */];

treeview.addEventListener('node-selected', (e) => {
  const { node, selected } = e.detail;
  
  if (selected) {
    selectedNodes.add(node.id);
  } else {
    selectedNodes.delete(node.id);
  }

  console.log('Selected nodes:', Array.from(selectedNodes));
});
```

### HTTPClient Integration with Configuration

Use HTTPClient with custom baseURL and timeout:

```javascript
import { http, UITreeView } from '@diniz/webcomponents';

const treeview = document.getElementById('tree');

// Configure HTTPClient
http.setBaseURL('https://api.example.com');
http.setDefaultTimeout(5000);

treeview.items = [
  { id: 'api-data', label: 'API Data', lazy: true }
];

treeview.options = {
  onLoadChildren: async (node) => {
    // HTTPClient will use the configured baseURL and timeout
    const data = await http.get('/resources');
    
    return data.map(item => ({
      id: item.id,
      label: item.name,
      lazy: item.hasChildren
    }));
  }
};
```

### Multi-Level Lazy Loading

Load hierarchical data with multiple levels:

```javascript
treeview.options = {
  onLoadChildren: async (node) => {
    // Level 1: Top-level categories
    if (node.id === 'root') {
      return [
        { id: 'category-1', label: 'Category A', lazy: true },
        { id: 'category-2', label: 'Category B', lazy: true }
      ];
    }

    // Level 2: Items in category
    if (node.id?.startsWith('category-')) {
      const categoryId = node.id.split('-')[1];
      const items = await http.get(`/categories/${categoryId}/items`);
      
      return items.map(item => ({
        id: `item-${item.id}`,
        label: item.name,
        isLeaf: !item.hasSubitems
      }));
    }

    return [];
  }
};
```

## Styling

### CSS Variables

Customize the treeview appearance using CSS variables:

```css
ui-treeview {
  --tree-indent: 20px;              /* Indentation per level */
  --tree-node-height: 36px;         /* Node height */
  --tree-transition: 200ms;         /* Animation duration */
  --tree-bg: #ffffff;               /* Background color */
  --tree-hover-bg: #f5f5f5;         /* Hover background */
  --tree-text: #333333;             /* Text color */
  --tree-text-secondary: #666666;   /* Secondary text */
  --tree-border: #e0e0e0;           /* Border color */
  --tree-accent: #2196f3;           /* Accent color */
  --tree-accent-light: rgba(33, 150, 243, 0.08);
}
```

### Example: Dark Theme

```css
:root {
  color-scheme: dark;
}

ui-treeview {
  --tree-bg: #1e1e1e;
  --tree-hover-bg: #2a2a2a;
  --tree-text: #e0e0e0;
  --tree-text-secondary: #999999;
  --tree-border: #333333;
  --tree-accent: #64b5f6;
  --tree-accent-light: rgba(100, 181, 246, 0.12);
}
```

## Performance Considerations

### Large Trees

For trees with many nodes, use lazy loading:

```javascript
treeview.items = [
  { id: 'root', label: 'Large Dataset', lazy: true }
];

treeview.options = {
  onLoadChildren: async (node) => {
    // Load nodes in batches
    const start = 0;
    const limit = 50;
    return await http.get(`/items?start=${start}&limit=${limit}`);
  }
};
```

### Caching

The component automatically caches loaded nodes. To refresh:

```javascript
// Force reload by expanding a node
const node = treeview.items[0];
treeview.expandedNodeIds?.clear();
```

## Types

```typescript
import {
  TreeNode,
  TreeViewOptions,
  TreeNodeChangedDetail,
  TreeNodeSelectedDetail,
  UITreeView
} from '@diniz/webcomponents';
```

## Accessibility

The component includes:
- ARIA labels on interactive elements
- Keyboard navigation support
- Proper semantic HTML structure
- Readable font sizes and contrast ratios

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- [ui-table](./TABLE.md) - Data tables with sorting and resizing
- [ui-accordion](./CARD.md) - Accordion for grouped content
- [ui-modal](./MODAL.md) - Modal dialogs

## Examples

See the Storybook stories for comprehensive examples:
- Basic static tree
- Lazy loading from API
- Custom node rendering
- Multi-select with event tracking
- HTTPClient integration
- Multi-level lazy loading
