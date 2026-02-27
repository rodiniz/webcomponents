---
name: webcomponents
description: Use this skill when working with @your-org/webcomponents library. This library provides lightweight web components including ui-button, ui-input, ui-table, ui-date-picker, and ui-pagination.
---

# Web Components Library

This skill provides guidance on using the @your-org/webcomponents library.

## Available Components

### ui-button
- Variants: `primary`, `secondary`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Icon support via `icon` attribute (uses feather-icons)
- Icon position via `icon-position` ("left" or "right")

```html
<ui-button variant="primary" size="md" icon="plus">Add Item</ui-button>
<ui-button variant="secondary" icon="edit" icon-position="right">Edit</ui-button>
<ui-button variant="ghost" icon="trash-2" icon-position="left"></ui-button>
```

### ui-input
- Types: text, email, password, number, tel, url
- Native validation: required, pattern, minlength, maxlength, min, max
- Custom validation via `validate` attribute:
  - `validate="email:domain.com"` - must end with @domain.com
  - `validate="match:#selector"` - must match another input's value
  - `validate="min:N"` - minimum length
  - `validate="max:N"` - maximum length
  - `validate="regex:pattern"` - custom regex
- Custom error message via `custom-error` attribute

```html
<ui-input label="Email" type="email" required></ui-input>
<ui-input label="Corporate Email" validate="email:company.com" custom-error="Must be company email"></ui-input>
<ui-input label="Confirm Password" validate="match:#password" custom-error="Passwords must match"></ui-input>
```

### ui-table
- Columns: array of { key, label, align?, actions? }
- Rows: array of objects
- Emits 'row-action' event with { action, row, rowIndex }

```javascript
const table = document.querySelector('ui-table');
table.data = {
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price', align: 'right' },
    { key: 'actions', label: 'Actions', actions: { edit: true, delete: true } }
  ],
  rows: [
    { name: 'Product 1', price: '$19.99' },
    { name: 'Product 2', price: '$29.99' }
  ]
};
```

### ui-date-picker
- Attributes: value, min, max, format, placeholder, disabled

```html
<ui-date-picker label="Start Date" format="YYYY-MM-DD"></ui-date-picker>
<ui-date-picker label="End Date" min="2024-01-01" max="2024-12-31"></ui-date-picker>
```

### ui-pagination
- Properties: total, currentPage, pageSize
- Emits 'page-change' event with { page }

```javascript
const pagination = document.querySelector('ui-pagination');
pagination.total = 100;
pagination.currentPage = 1;
pagination.pageSize = 10;

pagination.addEventListener('page-change', (e) => {
  console.log('Page changed to:', e.detail.page);
});
```

## Validation

Use the native HTML5 validation attributes or custom validation:
- Native: `required`, `pattern`, `minlength`, `maxlength`, `min`, `max`
- Custom: `validate` attribute with rules
- Error messages: `error-message` or `custom-error` attributes

## Importing

```javascript
import '@your-org/webcomponents';
```

Or via CDN:
```html
<script src="https://unpkg.com/@your-org/webcomponents/dist/webcomponents.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@your-org/webcomponents/dist/style.css">
```

## TypeScript

Import types for better IDE support:
```typescript
import type { TableColumn, TableRow } from '@your-org/webcomponents';
```
