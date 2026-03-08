# @diniz/webcomponents

<p align="center">
  <img src="https://img.shields.io/npm/v/@diniz/webcomponents?style=flat&color=24ec71" alt="npm version">
  <img src="https://img.shields.io/bundlejsize/minified/@diniz/webcomponents?color=24ec71" alt="bundle size">
  <img src="https://img.shields.io/github/license/rodiniz/webcomponents?color=24ec71" alt="license">
  <img src="https://img.shields.io/testng-cover/rodiniz/webcomponents?color=24ec71" alt="coverage">
</p>

<p align="center">
  A lightweight, framework-agnostic Web Components library with everything you need to build modern web apps — without the bloat.
</p>

---

## Why @diniz/webcomponents?

Most web component libraries force you into a choice: **either** you get a polished design system **or** you get app-level primitives like routing and state management. 

**@diniz/webcomponents** gives you **both** — in a tiny, dependency-free package.

| Feature | @diniz/webcomponents | Shoelace | Material Web | Lightning Web Runtime |
|---------|---------------------|----------|--------------|----------------------|
| **Routing with lazy loading** | ✅ Built-in | ❌ | ❌ | ❌ |
| **State management** | ✅ Store + Signals | ❌ | ❌ | ❌ |
| **Theme system** | ✅ CSS Variables | ✅ | ✅ | ✅ |
| **Bundle size** | **~15KB gzipped** | ~84KB | ~50KB | ~100KB+ |
| **Framework agnostic** | ✅ | ✅ | ✅ | ❌ Salesforce-only |
| **TypeScript-first** | ✅ | ✅ | ✅ | ✅ |
| **Storybook docs** | ✅ | ✅ | ✅ | ❌ |

---

## Quick Start

```bash
npm install @diniz/webcomponents
```

```html
<script type="module">
  import '@diniz/webcomponents';
</script>

<ui-button variant="primary" size="lg">
  Get Started
</ui-button>

<ui-input 
  label="Email" 
  type="email" 
  placeholder="you@example.com"
  required
></ui-input>

<ui-table id="users"></ui-table>

<script type="module">
  const table = document.getElementById('users');
  table.columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'actions', label: 'Actions', actions: { edit: true, delete: true } }
  ];
  table.rows = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' }
  ];
</script>
```

---

## What's Included

### 📋 Form Components
- **ui-input** — Text, email, password with validation, icons, custom rules
- **ui-select** — Searchable dropdowns
- **ui-checkbox** — Custom styled checkboxes
- **ui-radio** — Radio buttons with descriptions
- **ui-radio-group** — Grouped radios with card variant
- **ui-toggle-switch** — iOS-style toggles

### 🧩 Layout Components
- **ui-card** — Versatile card with slots, variants, shadows
- **ui-accordion** — Collapsible sections
- **ui-tabs** — Animated tab navigation
- **ui-modal** — Accessible dialogs
- **ui-sidebar** — Navigation sidebar with icons
- **ui-top-bar** — Page header with actions

### 📊 Data Components
- **ui-table** — Sortable, resizable, expandable rows, actions
- **ui-treeview** — Hierarchical data with lazy loading
- **ui-pagination** — Page navigation
- **ui-picklist** — Dual-list selection

### 🎯 Feedback
- **ui-toast** — Success, error, warning, info notifications
- **ui-spinner** — Loading indicators
- **ui-tooltip** — Hover/click tooltips
- **ui-stepper** — Multi-step flows

### 🔧 Utilities
- **ui-button** — Variants, sizes, icons, loading states
- **ui-link** — Styled anchor links
- **ui-dropdown** — Menu dropdowns
- **ui-date-picker** — Calendar date selection
- **ui-upload** — File uploads

### ⚙️ App Primitives (Unique!)

```ts
import { createRouter, createStore, applyTheme } from '@diniz/webcomponents';

// Built-in router with lazy loading
const router = createRouter([
  { path: '/', component: 'home-page', load: () => import('./pages/home') },
  { path: '/users/:id', component: 'user-page', load: () => import('./pages/user'), guards: [authGuard] }
]);

// Lightweight state management
const store = createStore({ user: null });
const { state, setState } = store;
setState('user', { name: 'John' });

// Multiple themes
applyTheme('shadcn'); // or 'zinc', 'rose', 'blue', 'green', 'orange', 'violet'
```

---

## Comparison with Alternatives

### vs Shoelace

| | @diniz/webcomponents | Shoelace |
|---|---------------------|----------|
| **Routing** | ✅ Native | ❌ External |
| **State management** | ✅ Native | ❌ External |
| **Bundle size** | ~15KB | ~84KB |
| **Theming** | CSS variables | CSS variables |
| **Dependencies** | None (lit only) | None (lit only) |

### vs Material Web (Google)

| | @diniz/webcomponents | Material Web |
|---|---------------------|--------------|
| **Routing** | ✅ Built-in | ❌ External |
| **State management** | ✅ Native | ❌ External |
| **Bundle size** | ~15KB | ~50KB |
| **Design** | Clean, modern | Material Design 3 |
| **Customization** | Full CSS control | Limited theming |

### vs Salesforce Lightning Web Runtime

| | @diniz/webcomponents | LWR |
|---|---------------------|-----|
| **Routing** | ✅ Universal | ❌ Salesforce-only |
| **State management** | ✅ Universal | ❌ Salesforce-only |
| **Bundle size** | ~15KB | ~100KB+ |
| **Platform** | Any framework | Salesforce only |
| **Open source** | ✅ MIT | ❌ Proprietary |

### vs Building from Scratch

| | @diniz/webcomponents | Custom |
|---|---------------------|--------|
| **Time to first component** | 5 minutes | 2-3 days |
| **Accessibility** | ✅ ARIA, keyboard | You decide |
| **Theming** | ✅ Ready | Build yourself |
| **Routing** | ✅ Included | Build yourself |
| **State** | ✅ Included | Build yourself |
| **Testing** | ✅ Included | Build yourself |

---

## Why It's Different

Most web component libraries are just **component collections**. They give you buttons and inputs but leave you to figure out:

- How to navigate between pages
- How to manage application state  
- How to theme everything consistently

**@diniz/webcomponents** includes all the pieces you need for a complete app:

```
┌─────────────────────────────────────────────────────────────┐
│                    @diniz/webcomponents                     │
├─────────────────────────────────────────────────────────────┤
│  Components    │  Routing    │  State    │  Theming       │
│  ───────────   │  ───────    │  ─────    │  ───────       │
│  • ui-button   │  • SPA      │  • Store   │  • CSS vars    │
│  • ui-input    │  • Lazy     │  • Signals │  • 7 themes    │
│  • ui-table    │  • Guards   │            │  • Custom      │
│  • ui-modal    │             │            │                │
│  • ui-toast    │             │            │                │
│  • ...20+ more │             │            │                │
└─────────────────────────────────────────────────────────────┘
```

---

## Documentation & Demo

- **[Storybook](https://rodiniz.github.io/webcomponents/)** — Interactive component playground with live demos and theme switching
- **TypeScript** — Full type definitions included
- **Tests** — 260+ tests covering all components

---

## Framework Integration

Works with anything that supports Custom Elements:

```ts
// Vanilla TypeScript
import '@diniz/webcomponents';

// React
import '@diniz/webcomponents';
<ui-button>Click me</ui-button>;

// Vue  
import '@diniz/webcomponents';
<ui-button>Click me</ui-button>;

// Svelte
import '@diniz/webcomponents';
<ui-button>Click me</ui-button>;
```

---

## License

MIT — use it anywhere.
