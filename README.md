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

## 🚀 Live Demo

Check out the interactive demo and component examples:

**[View Live Demo →](https://rodiniz.github.io/webcomponents/)**

## Installation

```bash
npm install @diniz/webcomponents
```

## Using with Vite (No Framework)

This library works seamlessly with Vite without requiring any framework. Here's how to set up a vanilla JavaScript/TypeScript project:

### 1. Create a New Vite Project

```bash
# Create a new Vite project with vanilla TypeScript template
npm create vite@latest my-app -- --template vanilla-ts
cd my-app
npm install
```

### 2. Install the Library

```bash
npm install @diniz/webcomponents
```

### 3. Import Components in Your Main File

In your `src/main.ts` file:

```typescript
import '@diniz/webcomponents';
import '@diniz/webcomponents/dist/style.css'; // Import styles

// Now you can use the components in your HTML
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>My Web Components App</h1>
    <ui-button variant="primary" size="md">Click Me</ui-button>
    <ui-date-picker format="DD/MM/YYYY"></ui-date-picker>
  </div>
`;
```

### 4. Use Components in HTML

In your `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <div id="app">
      <ui-button variant="primary">Click Me</ui-button>
      <ui-date-picker format="DD/MM/YYYY"></ui-date-picker>
      <ui-table></ui-table>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 5. Add Event Listeners (Optional)

```typescript
// Wait for components to be defined
customElements.whenDefined('ui-button').then(() => {
  const button = document.querySelector('ui-button');
  button?.addEventListener('click', () => {
    console.log('Button clicked!');
  });
});

// Listen to custom events
const picker = document.querySelector('ui-date-picker');
picker?.addEventListener('date-change', ((e: CustomEvent) => {
  console.log('Date selected:', e.detail.value);
}) as EventListener);
```

### 6. TypeScript Support

For full TypeScript support, create a `src/types.d.ts` file:

```typescript
declare module '@diniz/webcomponents' {
  export interface UIButton extends HTMLElement {
    variant: 'primary' | 'secondary' | 'ghost';
    size: 'sm' | 'md' | 'lg';
    icon?: string;
    disabled?: boolean;
  }
  
  export interface UIDatePicker extends HTMLElement {
    format: string;
    value: string;
    min?: string;
    max?: string;
  }
  
  // Add other component interfaces as needed
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-button': import('@diniz/webcomponents').UIButton;
    'ui-date-picker': import('@diniz/webcomponents').UIDatePicker;
    // Add other components as needed
  }
}
```

### 7. Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder, ready to deploy to any static hosting service.

### Tree-shaking (Import Only What You Need)

You can import individual components to reduce bundle size:

```typescript
// Import only specific components
import { UIButton } from '@diniz/webcomponents';
import '@diniz/webcomponents/dist/style.css';

// The component is automatically registered
// Now you can use <ui-button> in your HTML
```

### Configuration Tips

**Vite Config** - No special configuration needed! Web Components work out of the box with Vite.

**CSS Customization** - Override CSS custom properties to match your theme:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;
  --color-info: #06b6d4;
  
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}
```
**Update `src/main.ts`:**
```typescript
import '@diniz/webcomponents';
import '@diniz/webcomponents/dist/style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>My Web Components App</h1>
    <ui-button variant="primary">Click Me</ui-button>
    <ui-date-picker format="DD/MM/YYYY"></ui-date-picker>
    <ui-table id="myTable"></ui-table>
  </div>
`;

// Add some data to the table
const table = document.getElementById('myTable') as any;
table.data = {
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' }
  ],
  rows: [
    { name: 'Alice', role: 'Admin' },
    { name: 'Bob', role: 'User' }
  ]
};
```

### Using via CDN or Direct Import

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

A versatile button component with multiple variants, sizes, and icon support.

**Features:**
- 3 variants: `primary`, `secondary`, `ghost`
- 3 sizes: `sm`, `md`, `lg`
- Icon support with [Feather Icons](https://feathericons.com/)
- Icon positioning (left/right)
- Icon-only buttons
- Disabled state support
- Button type support
- Smooth transitions and hover effects

**Usage:**
```html
<ui-button variant="primary" size="md">Primary Button</ui-button>
<ui-button variant="secondary" size="sm">Secondary</ui-button>
<ui-button variant="ghost" disabled>Disabled</ui-button>

<!-- With icons -->
<ui-button variant="primary" icon="check">Save</ui-button>
<ui-button variant="secondary" icon="trash-2" icon-position="right">Delete</ui-button>
<ui-button variant="ghost" icon="settings"></ui-button>
```

**Attributes:**
- `variant` - Button style (`primary` | `secondary` | `ghost`)
- `size` - Button size (`sm` | `md` | `lg`)
- `icon` - Icon name from Feather Icons
- `icon-position` - Icon position (`left` | `right`, default: `left`)
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

### 🪟 Modal (`ui-modal`)

Responsive modal dialog with customizable sizes and behaviors.

**Features:**
- 5 size options: `sm`, `md`, `lg`, `xl`, `full`
- Auto-close on Escape key (configurable)
- Auto-close on backdrop click (configurable)
- Smooth animations (fade in, slide up)
- Header, body, and footer slots
- Programmatic open/close API
- Custom events
- Body scroll lock when open

**Usage:**
```html
<ui-button id="openModal">Open Modal</ui-button>

<ui-modal id="myModal" title="Welcome!" size="md">
  <p>This is the modal content.</p>
  <p>You can include any HTML here.</p>
  
  <div slot="footer">
    <ui-button id="closeBtn" variant="secondary">Cancel</ui-button>
    <ui-button id="confirmBtn" variant="primary">Confirm</ui-button>
  </div>
</ui-modal>

<script>
  const modal = document.getElementById('myModal');
  const openBtn = document.getElementById('openModal');
  const closeBtn = document.getElementById('closeBtn');
  
  openBtn.addEventListener('click', () => modal.open());
  closeBtn.addEventListener('click', () => modal.close());
  
  modal.addEventListener('modal-close', () => {
    console.log('Modal closed');
  });
</script>
```

**Attributes:**
- `title` - Modal title text
- `size` - Modal size (`sm` | `md` | `lg` | `xl` | `full`)
- `open` - Open state attribute
- `no-close-on-escape` - Disable closing on Escape key
- `no-close-on-backdrop` - Disable closing on backdrop click

**Methods:**
- `open()` - Open the modal
- `close()` - Close the modal

**Events:**
- `modal-open` - Fired when modal opens
- `modal-close` - Fired when modal closes

---

### 📋 Select (`ui-select`)

Customizable dropdown select with search capability.

**Features:**
- JSON-based options configuration
- Searchable dropdown (optional)
- Keyboard navigation
- Disabled options support
- Custom placeholder text
- Change events with full option details
- Click-outside to close
- Smooth animations
- Theme-aware styling

**Usage:**
```html
<ui-select 
  id="mySelect"
  label="Choose a Country"
  placeholder="Select country..."
  searchable
></ui-select>

<script>
  const select = document.getElementById('mySelect');
  
  // Set options
  const options = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia', disabled: true }
  ];
  
  select.setAttribute('options', JSON.stringify(options));
  
  // Set initial value
  select.setAttribute('value', 'us');
  
  // Listen for changes
  select.addEventListener('select-change', (e) => {
    console.log('Value:', e.detail.value);
    console.log('Option:', e.detail.option);
  });
</script>
```

**Attributes:**
- `label` - Label text above select
- `placeholder` - Placeholder when no selection
- `options` - JSON string of options array
- `value` - Currently selected value
- `disabled` - Disable the select
- `searchable` - Enable search functionality

**Option Format:**
```typescript
{
  value: string;      // The option value
  label: string;      // Display text
  disabled?: boolean; // Optional: disable option
}
```

**Events:**
- `select-change` - Fired when selection changes
  - `detail.value` - Selected value
  - `detail.option` - Full option object

---

### ☑️ Checkbox (`ui-checkbox`)

Flexible checkbox with indeterminate state support.

**Features:**
- 3 sizes: `sm`, `md`, `lg`
- Checked/unchecked states
- Indeterminate state (useful for "select all")
- Disabled state
- Label support (attribute or slot)
- Programmatic API
- Custom events
- Smooth animations and transitions
- Theme-aware styling

**Usage:**
```html
<!-- Basic usage -->
<ui-checkbox label="Accept terms"></ui-checkbox>
<ui-checkbox label="Subscribe" checked></ui-checkbox>
<ui-checkbox label="Disabled" disabled></ui-checkbox>

<!-- With sizes -->
<ui-checkbox label="Small" size="sm"></ui-checkbox>
<ui-checkbox label="Medium" size="md"></ui-checkbox>
<ui-checkbox label="Large" size="lg"></ui-checkbox>

<!-- Programmatic usage -->
<ui-checkbox id="myCheckbox" label="Select All"></ui-checkbox>

<script>
  const checkbox = document.getElementById('myCheckbox');
  
  // Listen for changes
  checkbox.addEventListener('checkbox-change', (e) => {
    console.log('Checked:', e.detail.checked);
  });
  
  // Set states programmatically
  checkbox.setChecked(true);
  checkbox.setIndeterminate(true);
</script>
```

**Attributes:**
- `label` - Label text
- `checked` - Checked state
- `indeterminate` - Indeterminate state
- `disabled` - Disable checkbox
- `size` - Checkbox size (`sm` | `md` | `lg`)

**Methods:**
- `setChecked(checked: boolean)` - Set checked state
- `setIndeterminate(indeterminate: boolean)` - Set indeterminate state

**Events:**
- `checkbox-change` - Fired when state changes
  - `detail.checked` - New checked state

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

### HTTP Client

Lightweight HTTP client with interceptor support for API requests:

```typescript
import { http } from '@diniz/webcomponents';

// Set base URL for all requests
http.setBaseURL('https://api.example.com');

// Set default headers
http.setDefaultHeaders({ 'Authorization': 'Bearer token' });

// Make requests
const users = await http.get<User[]>('/users');
const newUser = await http.post<User>('/users', { name: 'Alice' });
await http.put(`/users/${id}`, updatedData);
await http.delete(`/users/${id}`);
```

**Request Interceptors:**

```typescript
// Add auth token to every request
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Handle request errors
http.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('Request failed:', error);
    throw error;
  }
);
```

**Response Interceptors:**

```typescript
// Transform response data
http.interceptors.response.use((response) => {
  // Unwrap API response if it's nested
  if (response.data?.result) {
    response.data = response.data.result;
  }
  return response;
});

// Handle errors globally
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    throw error;
  }
);
```

**Methods:**

- `get<T>(url, config?)` - GET request
- `post<T>(url, data?, config?)` - POST request
- `put<T>(url, data?, config?)` - PUT request
- `patch<T>(url, data?, config?)` - PATCH request
- `delete<T>(url, config?)` - DELETE request
- `head<T>(url, config?)` - HEAD request

**Configuration:**

```typescript
interface RequestConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData | null;
  timeout?: number;      // Default: 30000ms
}
```

**Features:**

- ✅ Request/response interceptors with error handling
- ✅ Automatic JSON serialization/deserialization
- ✅ Timeout support (default 30s)
- ✅ Global headers and base URL configuration
- ✅ FormData support for file uploads
- ✅ TypeScript generics for type-safe responses
- ✅ Automatic error messages with status codes

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
│       ├── checkbox.ts
│       ├── date-picker.ts
│       ├── input.ts
│       ├── modal.ts
│       ├── pagination.ts
│       ├── select.ts
│       └── table.ts
├── layouts/
│   └── app-layout.ts      # Application shell
├── features/              # Page components
└── styles/
    └── theme.css          # Global theme variables
```
## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

MIT © Rodrigo Diniz


