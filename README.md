# @diniz/webcomponents

<p align="center">
  <img src="https://img.shields.io/npm/v/@diniz/webcomponents?style=flat&color=24ec71" alt="npm version">
</p>

<p align="center">
  A lightweight, framework-agnostic Web Components library with 25+ UI components, built-in routing, state management, and theming — all without external dependencies.
</p>

---

## Features

- **25+ Web Components** — Buttons, inputs, tables, modals, date pickers, and more
- **Built-in Router** — SPA with lazy loading and route guards
- **State Management** — Lightweight store with signal-based reactivity
- **Theme System** — 7 pre-built themes (shadcn, zinc, rose, blue, green, orange, violet) with CSS variables
- **Fully Typed** — 100% TypeScript support with complete type definitions
- **No Dependencies** — Built on Lit and Web Components standards
- **~41KB gzipped** — Tiny bundle size
- **Storybook** — Interactive component playground

---

## Quick Start

### Installation

```bash
npm install @diniz/webcomponents
```

### Basic Setup with CSS

**Option 1: CSS via HTML link tag**

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <!-- 🎨 Import theme CSS -->
  <link rel="stylesheet" href="/src/styles/theme.css">
</head>
<body>
  <app-root></app-root>
  <script type="module" src="/src/app.ts"></script>
</body>
</html>
```

**Option 2: CSS via JavaScript import**

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
</head>
<body>
  <app-root></app-root>
  <script type="module" src="/src/app.ts"></script>
</body>
</html>
```

Create `src/app.ts`:

```typescript
// Option 1: Import CSS from your HTML file (see index.html above)
// Option 2: Import CSS directly from JavaScript
import '@diniz/webcomponents/style.css';  // 🎨 Alternative: import theme CSS here

import '@diniz/webcomponents';
import { html } from 'lit';
import { LitComponent } from '@diniz/webcomponents';

export class App extends LitComponent {
  render() {
    return html`
      <div class="container">
        <h1>Welcome to Web Components</h1>
        <ui-button variant="primary" size="lg">
          Get Started
        </ui-button>
        
        <ui-input 
          label="Email" 
          type="email" 
          placeholder="you@example.com"
        ></ui-input>
        
        <ui-table 
          .columns=${[
            { key: 'name', label: 'Name', sortable: true },
            { key: 'email', label: 'Email' }
          ]}
          .rows=${[
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Jane Smith', email: 'jane@example.com' }
          ]}
        ></ui-table>
      </div>
    `;
  }
}

customElements.define('app-root', App);
```

Then use both imports or just the CSS import in your `src/app.ts` (shown in Option 2 above).

### Available Themes

Import one of the included themes:

**HTML Method:**
```html
<!-- Modern shadcn design -->
<link rel="stylesheet" href="/src/styles/theme-shadcn.css">

<!-- Or use the base theme -->
<link rel="stylesheet" href="/src/styles/theme.css">
```

**JavaScript Method:**
```typescript
import '@diniz/webcomponents/style.css'; // Default theme
// or import a specific theme build
```

Switch themes at runtime:

```typescript
import { applyTheme } from '@diniz/webcomponents';

applyTheme('shadcn'); // 'zinc', 'rose', 'blue', 'green', 'orange', 'violet'
```

---

## Routing & SPA

Build single-page applications with built-in routing and lazy loading:

```typescript
import { createRouter } from '@diniz/webcomponents';

const routes = [
  {
    path: '/',
    component: 'home-page',
    load: () => import('./pages/home')
  },
  {
    path: '/users',
    component: 'users-page',
    load: () => import('./pages/users')
  },
  {
    path: '/users/:id',
    component: 'user-detail-page',
    load: () => import('./pages/user-detail')
  }
];

createRouter(routes, '#app');
```

Features:
- **Lazy Loading** — Pages load only when navigated to
- **Route Guards** — Protect routes with authentication guards
- **Path Parameters** — Extract `/users/:id` style parameters
- **Base Path Support** — Deploy to subdirectories

**See [Router Documentation](./docs/ROUTER.md)** for advanced features.

---

## Components

**Form & Input**
- `ui-button` — Multiple variants, sizes, and icon support
- `ui-input` — Text, email, password with validation
- `ui-select` — Searchable dropdown select
- `ui-checkbox` — Custom styled checkboxes
- `ui-radio` — Radio buttons and radio groups
- `ui-toggle-switch` — iOS-style toggle
- `ui-textarea` — Multi-line text input
- `ui-upload` — File upload component

**Data & Tables**
- `ui-table` — Sortable, resizable columns, expandable rows, actions
- `ui-treeview` — Hierarchical data with lazy loading
- `ui-pagination` — Page navigation
- `ui-picklist` — Dual-list selection

**Layout**
- `ui-card` — Versatile card with slots
- `ui-accordion` — Collapsible sections
- `ui-tabs` — Tab navigation
- `ui-modal` — Modal dialogs
- `ui-sidebar` — Navigation sidebar
- `ui-top-bar` — Page header bar

**Feedback & Utilities**
- `ui-toast` — Toast notifications (success, error, warning, info)
- `ui-spinner` — Loading indicators
- `ui-tooltip` — Hover/click tooltips
- `ui-stepper` — Multi-step flows
- `ui-dropdown` — Dropdown menus
- `ui-link` — Styled links
- `ui-date-picker` — Calendar date selection

---

## State Management & Utilities

```typescript
import { createStore, createRouter, applyTheme } from '@diniz/webcomponents';

// Lightweight state store
const store = createStore({ user: null, theme: 'light' });
store.setState('user', { name: 'John', role: 'admin' });
store.getState('user');

// Router with guards
const router = createRouter(routes);
router.navigate('/new-page');

// Theme switching
applyTheme('shadcn'); // Built-in themes or custom
```

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build library
npm run build:lib

# Build app
npm run build

# Preview production build
npm run preview
```

---

## Documentation

- **[Storybook](https://rodiniz.github.io/webcomponents/)** — Interactive component playground
- **[Component Docs](./docs/)** — Detailed API and usage guides
- **[HTTP Client](./docs/HTTP_CLIENT.md)** — Lightweight fetch wrapper
- **[Styling Guide](./docs/STYLING_GUIDE.md)** — Design patterns and CSS customization
- **[Skills](./skills/SKILL.md)** — AI agent skill for component development
- **TypeScript** — Full type definitions included in the package

---

## Framework Compatibility

Works with any framework that supports Web Components:

```tsx
// React
import '@diniz/webcomponents';
export const App = () => (
  <ui-button variant="primary">Click me</ui-button>
);

// Vue
import '@diniz/webcomponents';
<template>
  <ui-button variant="primary">Click me</ui-button>
</template>

// Vanilla TypeScript
import '@diniz/webcomponents';
document.querySelector('ui-button')?.addEventListener('click', () => {
  console.log('clicked');
});
```

## License

MIT
