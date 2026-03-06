---
name: skills
description: Use this skill when working with @your-org/webcomponents library. This library provides lightweight web components including ui-button, ui-input, ui-table, ui-treeview, ui-date-picker, ui-pagination, ui-card, ui-toast, ui-toggle-switch, and more form controls.
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
- Background colors via `bg` attribute (e.g., `primary`, `rose`, `light`, `dark`)

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

<ui-card bg="rose" shadow elevation="md">
  <p>Card with a rose background</p>
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
- Icon support via `icon` attribute (uses feather-icons)
- Icon position via `icon-position` ("left" or "right")

```html
<ui-input label="Email" type="email" required></ui-input>
<ui-input label="Corporate Email" validate="email:company.com" custom-error="Must be company email"></ui-input>
<ui-input label="Confirm Password" validate="match:#password" custom-error="Passwords must match"></ui-input>
<ui-input label="Search" icon="search" icon-position="left" placeholder="Search..."></ui-input>
<ui-input label="Amount" icon="dollar-sign" icon-position="right" type="number"></ui-input>
```

### ui-toggle-switch
- Modern on/off switch for boolean values
- Sizes: `sm`, `md` (default), `lg`
- Supports label, disabled state, keyboard navigation
- Emits 'toggle-change' event with { checked }
- Can be used in forms with `name` attribute

```html
<ui-toggle-switch label="Enable notifications"></ui-toggle-switch>
<ui-toggle-switch label="Dark mode" checked></ui-toggle-switch>
<ui-toggle-switch label="Small switch" size="sm"></ui-toggle-switch>
<ui-toggle-switch label="Disabled" disabled></ui-toggle-switch>

<!-- In forms -->
<form>
  <ui-toggle-switch name="newsletter" label="Subscribe to newsletter"></ui-toggle-switch>
  <ui-toggle-switch name="terms" label="Accept terms" checked></ui-toggle-switch>
</form>

<!-- JavaScript -->
<script>
  const toggle = document.querySelector('ui-toggle-switch');
  toggle.addEventListener('toggle-change', (e) => {
    console.log('Checked:', e.detail.checked);
  });
</script>
```

### ui-table
- Columns: array of { key, label, align?, sortable?, resizable?, actions?, ... }
- Rows: array of objects
- Sorting and resizing are per-column (no table-level flags)
- Server-side sorting via `sortMode="server"` + `sort-change` event
- Emits `action` (row actions) and `sort-change` (server sorting)

```javascript
const table = document.querySelector('ui-table');
table.columns = [
  { key: 'name', label: 'Name', sortable: true, resizable: true },
  { key: 'price', label: 'Price', align: 'right', sortable: true },
  { key: 'actions', label: 'Actions', actions: { edit: true, delete: true } }
];
table.rows = [
  { name: 'Product 1', price: '$19.99' },
  { name: 'Product 2', price: '$29.99' }
];

table.sortMode = 'server';
table.addEventListener('sort-change', (e) => {
  const { key, direction } = e.detail;
  console.log('Sort request:', key, direction);
});
```

### ui-treeview
- **Lazy Loading**: Load child nodes on-demand via `onLoadChildren` callback
- **HTTP Integration**: Works seamlessly with library's HTTPClient
- **Multi-Select**: Support for selecting multiple nodes
- **Custom Templates**: Customize node appearance with templates
- **Event System**: `node-selected` and `node-expanded` events
- **Full docs**: [TREEVIEW.md](../docs/TREEVIEW.md)

```javascript
const treeview = document.querySelector('ui-treeview');
treeview.items = [
  { id: '1', label: 'Users', lazy: true },
  { id: '2', label: 'Posts', lazy: true }
];

treeview.options = {
  onLoadChildren: async (node) => {
    if (node.id === '1') {
      const users = await http.get('/api/users');
      return users.map((u) => ({ id: u.id, label: u.name, isLeaf: true }));
    }
    return [];
  }
};

treeview.addEventListener('node-selected', (e) => {
  console.log('Selected:', e.detail.node.label);
});
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

## Styling Components

For detailed styling guidance including beautiful UI patterns, color palettes, and design best practices, see [STYLING_GUIDE.md](../docs/STYLING_GUIDE.md).

### Quick Styling Tips

**Use component properties first** - they're designed for visual customization:

```html
<!-- Shadow color examples -->
<ui-card shadow shadow-color="99, 102, 241" elevation="lg">Blue shadow</ui-card>
<ui-card shadow shadow-color="168, 85, 247" elevation="lg">Purple shadow</ui-card>
<ui-card shadow shadow-color="34, 211, 238" elevation="lg">Cyan shadow</ui-card>

<!-- Variant combinations -->
<ui-card variant="elevated" shadow elevation="md">Premium look</ui-card>
<ui-card variant="ghost">Minimalist look</ui-card>
<ui-card variant="bordered" rounded="false">Geometric look</ui-card>
```

**Container styling** - wrap components for layout and spacing:

```html
<style>
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .card-content {
    width: 100%;
    max-width: 420px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>

<div class="card-container">
  <ui-card variant="elevated" shadow elevation="xl">
    <div class="card-content">
      <!-- content -->
    </div>
  </ui-card>
</div>
```

**Shadow DOM styling** - component styles are encapsulated:

```html
<style>
  /* ❌ These won't work -->
  ui-card { color: red; }  /* Shadow DOM blocks global styles -->

  /* ✅ Style the slot content instead -->
  .card-content { color: #1f2937; }
</style>

<ui-card>
  <div class="card-content">
    <!-- This gets styled -->
  </div>
</ui-card>
```

**Typography hierarchy** - use semantic HTML:

```html
<ui-card variant="elevated">
  <div class="card-content">
    <h2>Main Title</h2>      <!-- Largest -->
    <h3>Section Title</h3>   <!-- Medium -->
    <p>Body text content</p> <!-- Regular -->
    <small>Helper text</small> <!-- Small -->
  </div>
</ui-card>
```

### Design Patterns

**Login Form**:
```html
<style>
  .login-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #667eea, #764ba2);
  }
  .login-form { max-width: 400px; width: 100%; margin: 0 20px; }
  .login-form ui-card { width: 100%; }
  .form-content { padding: 40px; display: flex; flex-direction: column; gap: 24px; }
  .form-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
</style>

<div class="login-container">
  <ui-card variant="elevated" shadow elevation="xl" class="login-form">
    <div class="form-content">
      <h2>Login</h2>
      <ui-input label="Email" type="email" required></ui-input>
      <ui-input label="Password" type="password" required></ui-input>
      <div class="form-actions">
        <ui-button variant="secondary">Cancel</ui-button>
        <ui-button variant="primary">Login</ui-button>
      </div>
    </div>
  </ui-card>
</div>
```

**Feature Cards Grid**:
```html
<style>
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
    padding: 60px 20px;
  }
  .feature-card { text-align: center; }
  .feature-icon { font-size: 36px; margin-bottom: 16px; }
</style>

<div class="features-grid">
  <ui-card variant="ghost">
    <div class="feature-card">
      <div class="feature-icon">⚡</div>
      <h3>Fast</h3>
      <p>Lightning quick performance</p>
    </div>
  </ui-card>
  <!-- More cards -->
</div>
```

### Common Styling Mistakes to Avoid

- ❌ Using all variants on one page (use 1-2 max)
- ❌ Inconsistent spacing (use a consistent scale: 4px, 8px, 16px, etc.)
- ❌ Too many colors (3-4 color maximum)
- ❌ Forgetting mobile responsiveness
- ❌ Over-animating elements
- ❌ Mixing bold and timid design choices (commit to a direction)

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
