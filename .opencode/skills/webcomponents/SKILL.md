---
name: webcomponents
description: Use this skill when working with @your-org/webcomponents library. Provides lightweight web components including ui-button, ui-input, ui-table, ui-treeview, ui-date-picker, ui-pagination with validation, lazy loading, and HTTP client integration.
---

# Web Components Library

Use the @your-org/webcomponents library for building UI with production-grade components.

## Available Components

### ui-button
Variants: primary, secondary, ghost
Sizes: sm, md, lg
Icon support via feather-icons

```html
<ui-button variant="primary" size="md" icon="plus">Add</ui-button>
<ui-button variant="ghost" icon="trash-2"></ui-button>
```

### ui-input
Native validation: required, pattern, minlength, maxlength, min, max
Custom validation via validate attribute:
- validate="email:domain.com" - must end with @domain.com
- validate="match:#selector" - must match another input
- validate="min:N" / validate="max:N" - length limits

```html
<ui-input label="Email" type="email" required></ui-input>
<ui-input label="Corporate" validate="email:company.com" custom-error="Use company email"></ui-input>
```

### ui-table
Per-column sorting and resizing, row actions, collapsible rows

```javascript
table.columns = [
  { key: 'name', label: 'Name', sortable: true, resizable: true },
  { key: 'actions', label: 'Actions', actions: { edit: true, delete: true } }
];
table.rows = [{ name: 'Item 1' }];
```

### ui-treeview
Lazy loading, HTTP integration, multi-select, custom templates

```javascript
const treeview = document.querySelector('ui-treeview');
treeview.items = [
  { id: '1', label: 'root', lazy: true }
];

treeview.options = {
  onLoadChildren: async (node) => {
    const data = await http.get(`/api/nodes/${node.id}`);
    return data.map(item => ({ id: item.id, label: item.name }));
  }
};

treeview.addEventListener('node-selected', (e) => {
  console.log('Selected:', e.detail.node);
});
```

### ui-date-picker
```html
<ui-date-picker label="Date" format="YYYY-MM-DD"></ui-date-picker>
```

### ui-pagination
```javascript
pagination.total = 100;
pagination.addEventListener('page-change', e => console.log(e.detail.page));
```

## HTTPClient Integration

The library provides an HTTPClient for making API calls:

```javascript
import { http } from '@diniz/webcomponents';

// Configure client
http.setBaseURL('https://api.example.com');
http.setDefaultTimeout(5000);

// Make requests
const data = await http.get('/users');
const result = await http.post('/users', { name: 'John' });
```

Use with treeview for lazy loading:

```javascript
treeview.options = {
  onLoadChildren: async (node) => {
    return await http.get(`/api/nodes/${node.id}/children`);
  }
};
```

## Import
```javascript
import '@your-org/webcomponents';
import { UIButton, UITreeView, http } from '@your-org/webcomponents';
```
