---
name: webcomponents
description: Use this skill when working with @your-org/webcomponents library. Provides ui-button, ui-input, ui-table, ui-date-picker, ui-pagination components with validation support.
---

# Web Components Library

Use the @your-org/webcomponents library for building UI.

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
```javascript
table.data = {
  columns: [{ key: 'name', label: 'Name' }, { key: 'actions', label: 'Actions', actions: { edit: true, delete: true } }],
  rows: [{ name: 'Item 1' }]
};
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

## Import
```javascript
import '@your-org/webcomponents';
```
