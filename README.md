# @diniz/webcomponents

A lightweight, framework-agnostic web components library built with vanilla TypeScript. Create modern, reactive UIs using native Web Components API with zero dependencies.

## Features

✨ **Native Web Components** - Built on standard Custom Elements API  
⚡ **Reactive Signals** - Built-in signal-based reactivity system  
🎨 **Theme Support** - CSS custom properties for easy theming  
📦 **Zero Dependencies** - No framework required  
🔒 **TypeScript** - Full type safety and IntelliSense support  
🎯 **Tree-shakeable** - Import only what you need  
♿ **Accessible** - ARIA attributes and keyboard navigation

## Installation

```bash
npm install @diniz/webcomponents
```

## Quick Start

```html
<script type="module">
  import '@diniz/webcomponents';
</script>

<ui-button variant="primary">Click Me</ui-button>
<ui-date-picker format="DD/MM/YYYY"></ui-date-picker>
<ui-table></ui-table>
```

## Components

### 🔘 Button (`ui-button`)

A versatile button component with multiple variants and sizes.

**Features:**
- 3 variants: `primary`, `secondary`, `ghost`
- 3 sizes: `sm`, `md`, `lg`
- Disabled state support
- Button type support
- Smooth transitions and hover effects

**Usage:**
```html
<ui-button variant="primary" size="md">Primary Button</ui-button>
<ui-button variant="secondary" size="sm">Secondary</ui-button>
<ui-button variant="ghost" disabled>Disabled</ui-button>
```

**Attributes:**
- `variant` - Button style (`primary` | `secondary` | `ghost`)
- `size` - Button size (`sm` | `md` | `lg`)
- `disabled` - Disable the button
- `type` - Button type (`button` | `submit` | `reset`)

---

### 📅 Date Picker (`ui-date-picker`)

A customizable date picker with multiple format options and calendar support.

**Features:**
- 5 date formats: `YYYY-MM-DD`, `DD/MM/YYYY`, `MM/DD/YYYY`, `DD-MM-YYYY`, `MM-DD-YYYY`
- Native calendar picker integration
- Min/max date constraints
- Text input with format validation
- Real-time format conversion
- Disabled state support
- Custom events for date changes

**Usage:**
```html
<ui-date-picker 
  format="DD/MM/YYYY"
  value="2026-02-26"
  min="2026-01-01"
  max="2026-12-31"
></ui-date-picker>

<script>
  const picker = document.querySelector('ui-date-picker');
  
  picker.addEventListener('date-change', (e) => {
    console.log('ISO:', e.detail.value);
    console.log('Formatted:', e.detail.formattedValue);
  });
</script>
```

**Attributes:**
- `format` - Date display format
- `value` - Date value in ISO format (YYYY-MM-DD)
- `min` - Minimum date (ISO format)
- `max` - Maximum date (ISO format)
- `disabled` - Disable the picker
- `placeholder` - Placeholder text

**Methods:**
- `getISOValue()` - Get date in ISO format
- `getFormattedValue()` - Get date in display format
- `setValue(isoDate)` - Set the date value
- `clear()` - Clear the date

**Events:**
- `date-change` - Fired when date changes
- `date-input` - Fired during input

---

### 📋 Table (`ui-table`)

A dynamic data table with customizable columns and alignment.

**Features:**
- Dynamic column configuration
- Text alignment per column (left, center, right)
- Responsive layout
- Automatic row rendering
- Theme-aware styling

**Usage:**
```html
<ui-table id="myTable"></ui-table>

<script type="module">
  const table = document.getElementById('myTable');
  
  table.data = {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'score', label: 'Score', align: 'right' }
    ],
    rows: [
      { name: 'Alice', role: 'Admin', score: 95 },
      { name: 'Bob', role: 'User', score: 87 }
    ]
  };
</script>
```

**Properties:**
- `data` - Object with `columns` and `rows`
  - `columns`: Array of `{ key, label, align? }`
  - `rows`: Array of objects matching column keys

---

### 📄 Pagination (`ui-pagination`)

Smart pagination component with ellipsis for large page counts.

**Features:**
- Automatic page number generation
- Smart ellipsis for large page counts
- Previous/Next navigation
- "Showing X to Y of Z" info display
- Disabled states for edge pages
- Custom events for page changes
- ARIA labels for accessibility

**Usage:**
```html
<ui-pagination 
  total="250" 
  current-page="5" 
  page-size="10"
></ui-pagination>

<script>
  const pagination = document.querySelector('ui-pagination');
  
  pagination.addEventListener('page-change', (e) => {
    console.log('Page:', e.detail.page);
    console.log('Total Pages:', e.detail.totalPages);
    // Load new data...
  });
</script>
```

**Attributes/Properties:**
- `total` - Total number of items
- `current-page` - Current page number
- `page-size` - Items per page (default: 10)

**Computed Properties:**
- `totalPages` - Total number of pages

**Events:**
- `page-change` - Fired when page changes, includes pagination details

---

### 📝 Input (`ui-input`)

Advanced form input with built-in validation and error handling.

**Features:**
- Multiple input types: `text`, `email`, `password`, `number`, `tel`, `url`
- Built-in validation rules:
  - Email domain validation
  - Password matching
  - Min/max length
  - Regex patterns
- Custom validators
- Real-time validation feedback
- Error message display
- Touched state tracking
- Disabled state support

**Usage:**
```html
<ui-input 
  type="email"
  label="Email"
  placeholder="you@example.com"
  required
  validate="emailDomain:company.com"
></ui-input>

<ui-input 
  type="password"
  label="Password"
  minlength="8"
  required
></ui-input>
```

**Attributes:**
- `type` - Input type
- `label` - Label text
- `placeholder` - Placeholder text
- `required` - Required field
- `pattern` - Regex pattern
- `minlength` / `maxlength` - Length constraints
- `min` / `max` - Number constraints
- `error-message` - Custom error message
- `disabled` - Disable input
- `name` - Form field name
- `validate` - Validation rule (e.g., `emailDomain:company.com`)

**State:**
- `value` - Current input value
- `valid` - Validation state
- `touched` - Whether field has been interacted with
- `error` - Current error message

---

### 🎯 Sidebar (`app-sidebar`)

Navigation sidebar component with links.

**Features:**
- Workspace navigation
- Active link highlighting (via routing)
- Theme-aware styling

**Usage:**
```html
<app-sidebar></app-sidebar>
```

---

### 📐 Layout (`app-layout`)

Application layout wrapper with navigation and sidebar.

**Features:**
- Top navigation bar
- Sidebar integration
- Main content area with slot
- Responsive layout

**Usage:**
```html
<app-layout>
  <your-page-component></your-page-component>
</app-layout>
```

---

## Core Features

### Base Component

All components extend `BaseComponent` which provides:

**Signal-based Reactivity:**
```typescript
class MyComponent extends BaseComponent {
  private count = this.useSignal(0);
  
  connectedCallback() {
    super.connectedCallback();
    // count.set() automatically triggers re-render
    this.count.set(this.count.get() + 1);
  }
}
```

**State Management:**
```typescript
class MyComponent extends BaseComponent<{ user: string }> {
  constructor() {
    super();
    this.state = { user: '' };
  }
  
  updateUser() {
    this.setState({ user: 'Alice' }); // Triggers re-render
  }
}
```

### Router

Built-in client-side router with layouts:

```typescript
const routes = [
  {
    path: '/',
    layout: 'app-layout',
    load: () => import('./features/home/home-page'),
    component: 'home-page'
  }
];
```

### Store

Global state management:

```typescript
import { store } from './core/store';

store.setState({ theme: 'dark' });
const currentState = store.getState();

store.subscribe(state => {
  console.log('State changed:', state);
});
```

---

## Theming

All components use CSS custom properties for easy theming:

```css
:root {
  --color-primary: #24ec71;
  --color-primary-contrast: #ffffff;
  --color-ink: #0f172a;
  --color-muted: #f1f5f9;
  --color-border: #e2e8f0;
  --radius-md: 12px;
  --radius-pill: 999px;
}
```

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ All modern browsers with Custom Elements support

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build library
npm run build:lib

# Build production app
npm run build:prod
```

---

## Project Structure

```
src/
├── core/
│   ├── base-component.ts  # Base class with signals
│   ├── router.ts          # Client-side routing
│   └── store.ts           # Global state management
├── shared/
│   └── components/        # Reusable UI components
│       ├── button.ts
│       ├── date-picker.ts
│       ├── input.ts
│       ├── pagination.ts
│       └── table.ts
├── layouts/
│   └── app-layout.ts      # Application shell
├── features/              # Page components
└── styles/
    └── theme.css          # Global theme variables
```

---

## Examples

### Form with Validation

```html
<form id="myForm">
  <ui-input 
    type="email"
    name="email"
    label="Email"
    required
  ></ui-input>
  
  <ui-input 
    type="password"
    name="password"
    label="Password"
    minlength="8"
    required
  ></ui-input>
  
  <ui-button type="submit">Submit</ui-button>
</form>
```

### Data Table with Pagination

```html
<ui-table id="dataTable"></ui-table>
<ui-pagination id="pagination" page-size="10"></ui-pagination>

<script type="module">
  const table = document.getElementById('dataTable');
  const pagination = document.getElementById('pagination');
  
  async function loadData(page = 1) {
    const response = await fetch(`/api/data?page=${page}`);
    const data = await response.json();
    
    table.data = {
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' }
      ],
      rows: data.items
    };
    
    pagination.total = data.total;
    pagination.currentPage = page;
  }
  
  pagination.addEventListener('page-change', (e) => {
    loadData(e.detail.page);
  });
  
  loadData(1);
</script>
```

### Date Range Picker

```html
<ui-date-picker id="startDate" format="DD/MM/YYYY"></ui-date-picker>
<ui-date-picker id="endDate" format="DD/MM/YYYY"></ui-date-picker>

<script>
  const start = document.getElementById('startDate');
  const end = document.getElementById('endDate');
  
  start.addEventListener('date-change', (e) => {
    end.setAttribute('min', e.detail.value);
  });
  
  end.addEventListener('date-change', (e) => {
    start.setAttribute('max', e.detail.value);
  });
</script>
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

MIT © [Your Name]

---

## Links

- [Demo](https://your-demo-url.com)
- [Documentation](https://your-docs-url.com)
- [GitHub](https://github.com/yourusername/webcomponents)
- [npm](https://www.npmjs.com/package/@diniz/webcomponents)
