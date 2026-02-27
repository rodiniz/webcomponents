---
name: webcomponents
description: Use this skill when working with @your-org/webcomponents library. This library provides lightweight web components including ui-button, ui-input, ui-table, ui-date-picker, ui-pagination, ui-card, and ui-toast.
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

### ui-card
- Variants: `default`, `elevated`, `bordered`, `ghost`
- Elevation levels: `none`, `sm`, `md`, `lg`, `xl`
- Customizable shadow color via `shadow-color` (RGB format)
- Rounded corners via `rounded` attribute (default: true)

```html
<ui-card shadow elevation="md">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</ui-card>

<ui-card variant="elevated" shadow shadow-color="99, 102, 241" elevation="lg">
  <p>Card with blue-tinted shadow</p>
</ui-card>

<ui-card variant="bordered" rounded="false">
  <p>Square card with border</p>
</ui-card>
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

### ui-toast
- Types: `success`, `error`, `warning`, `info`
- Position: `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center`
- Auto-dismiss with customizable duration
- Progress bar indicator
- Stack multiple toasts
- Programmatic API

```html
<!-- Add toast container to your page -->
<ui-toast id="toaster" position="top-right"></ui-toast>
```

```javascript
const toaster = document.querySelector('ui-toast');

// Convenience methods
toaster.success('Success!', 'Operation completed successfully.');
toaster.error('Error!', 'Something went wrong.');
toaster.warning('Warning', 'Please be careful.');
toaster.info('Info', 'New updates available.');

// Full API
const toastId = toaster.show({
  title: 'Upload complete',
  description: 'Your file has been uploaded.',
  type: 'success',
  duration: 5000,  // milliseconds, 0 = no auto-dismiss
  closable: true   // show close button
});

// Dismiss specific toast
toaster.dismiss(toastId);

// Dismiss all toasts
toaster.dismissAll();

// Custom duration
toaster.success('Quick message', null, 2000);  // 2 seconds
toaster.info('Persistent', 'Stays until closed', 0);  // no auto-dismiss

// Events
toaster.addEventListener('toast-show', (e) => {
  console.log('Toast shown:', e.detail);
});

toaster.addEventListener('toast-dismiss', (e) => {
  console.log('Toast dismissed:', e.detail);
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
