# @diniz/webcomponents

<p align="center">
  <img src="https://img.shields.io/npm/v/@diniz/webcomponents?style=flat&color=24ec71" alt="npm version">
  
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
| **Theme system** | ✅ CSS Variables + Custom | ✅ | ✅ | ✅ |
| **Bundle size** | **~41KB gzipped** | ~84KB | ~50KB | ~100KB+ |
| **Framework agnostic** | ✅ | ✅ | ✅ | ❌ Salesforce-only |
| **TypeScript-first** | ✅ | ✅ | ✅ | ✅ |
| **Storybook docs** | ✅ | ✅ | ✅ | ❌ |

---

## Quick Start

```bash
npm install @diniz/webcomponents
```

### Vite Helper-First Setup (Recommended)

For DRY app code, use reusable helper functions in your Vite app project:

- **Guide:** [docs/VITE_HELPERS.md](./docs/VITE_HELPERS.md)
- Includes `initUI`, `bindProps`, `onCE`, `createFormBridge`, and `getEl`

### Component Usage

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
  import { bindProps, getEl } from '@diniz/webcomponents';

  const table = getEl('ui-table#users');

  bindProps(table, {
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email' },
      { key: 'actions', label: 'Actions', actions: { edit: true, delete: true } }
    ],
    rows: [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' }
    ]
  });
</script>
```

### Router & SPA Setup

Build a single-page application with built-in routing and lazy loading:

#### 1. Create HTML Entry Point

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="/src/styles/theme.css">
</head>
<body>
  <nav>
    <a href="/" data-link>Home</a>
    <a href="/about" data-link>About</a>
    <a href="/users" data-link>Users</a>
  </nav>

  <!-- Router outlet - components render here -->
  <div id="app"></div>

  <!-- Vite module entry point -->
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

#### 2. Create Main TypeScript Module

Create `src/main.ts`:

```typescript
import { initUI } from '@diniz/webcomponents';

// Define routes with lazy-loaded components
const routes = [
  {
    path: '/',
    component: 'home-page',
    load: () => import('./pages/home')
  },
  {
    path: '/about',
    component: 'about-page',
    load: () => import('./pages/about')
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

initUI({
  theme: 'shadcn',
  routes,
  outlet: '#app'
});
```

#### 3. Create Page Components

Create `src/pages/home.ts`:

```typescript
import { LitComponent } from '@diniz/webcomponents';
import { html } from 'lit';

export class HomePage extends LitComponent {
  render() {
    return html`
      <div class="page">
        <h1>Welcome Home</h1>
        <p>This is the home page.</p>
        <ui-button @click=${() => this.navigate('/about')}>
          Go to About
        </ui-button>
      </div>
    `;
  }

  private navigate(path: string) {
    history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

customElements.define('home-page', HomePage);
```

Create `src/pages/users.ts`:

```typescript
import { LitComponent } from '@diniz/webcomponents';
import { html } from 'lit';

export class UsersPage extends LitComponent {
  private users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  render() {
    return html`
      <div class="page">
        <h1>Users</h1>
        <ui-table
          .columns=${[
            { key: 'name', label: 'Name', sortable: true },
            { key: 'email', label: 'Email' }
          ]}
          .rows=${this.users}
        ></ui-table>
      </div>
    `;
  }
}

customElements.define('users-page', UsersPage);
```

Create `src/pages/user-detail.ts`:

```typescript
import { LitComponent } from '@diniz/webcomponents';
import { html } from 'lit';
import { getPathParams } from '@diniz/webcomponents';

export class UserDetailPage extends LitComponent {
  private userId: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    const params = getPathParams('/users/:id', location.pathname);
    this.userId = params?.id ?? null;
  }

  render() {
    return html`
      <div class="page">
        <h1>User Details</h1>
        <p>User ID: ${this.userId}</p>
        <ui-button @click=${() => history.back()}>
          Go Back
        </ui-button>
      </div>
    `;
  }
}

customElements.define('user-detail-page', UserDetailPage);
```

#### 4. Vite Configuration

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist'
  }
});
```

#### 5. Run Development Server

```bash
npm run dev
```

The Vite dev server will:
- Serve `index.html` as entry point
- Handle TypeScript compilation automatically
- Lazy load page modules on navigation
- Support hot module replacement

#### Key Features

- **Lazy Loading** — Pages load only when navigated to
- **No Build Step for Components** — Components render dynamically
- **Type Safety** — Full TypeScript support
- **Real-time HMR** — See changes instantly during development
- **Automatic Bundling** — Vite handles optimization

#### Complete Example Structure

```
src/
├── main.ts           # Router setup
├── pages/
│   ├── home.ts       # HomePage component
│   ├── about.ts      # AboutPage component
│   ├── users.ts      # UsersPage component
│   └── user-detail.ts # UserDetailPage component
└── styles/
    └── theme.css     # Global theme
index.html           # Entry point
```

See **[Router Documentation](./docs/ROUTER.md)** for advanced features like route guards, path parameters, and base path configuration.

---

## What's Included

> **Icons**: This library uses [Feather Icons](https://feathericons.com/) for all iconography.

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

// Custom themes
registerCustomTheme({ name: 'my-app', url: '/themes/my-app.css' });
await applyTheme('my-app');
```

---

## Comparison with Alternatives

### vs Shoelace

| | @diniz/webcomponents | Shoelace |
|---|---------------------|----------|
| **Routing** | ✅ Native | ❌ External |
| **State management** | ✅ Native | ❌ External |
| **Bundle size** | ~41KB | ~84KB |
| **Theming** | CSS variables | CSS variables |
| **Dependencies** | None (lit only) | None (lit only) |

### vs Material Web (Google)

| | @diniz/webcomponents | Material Web |
|---|---------------------|--------------|
| **Routing** | ✅ Built-in | ❌ External |
| **State management** | ✅ Native | ❌ External |
| **Bundle size** | ~41KB | ~50KB |
| **Design** | Clean, modern | Material Design 3 |
| **Customization** | Full CSS control | Limited theming |

### vs Salesforce Lightning Web Runtime

| | @diniz/webcomponents | LWR |
|---|---------------------|-----|
| **Routing** | ✅ Universal | ❌ Salesforce-only |
| **State management** | ✅ Universal | ❌ Salesforce-only |
| **Bundle size** | ~41KB | ~100KB+ |
| **Platform** | All frameworks | Salesforce only |
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
- **[Component Documentation](./docs/)** — Detailed guides:
  - [DROPDOWN.md](./docs/DROPDOWN.md) — Menu dropdowns with item selection events
  - [TABLE.md](./docs/TABLE.md) — Data table with sorting, pagination, and child rows
  - [SIDEBAR.md](./docs/SIDEBAR.md) — Navigation sidebar with theming
  - [DATE_PICKER.md](./docs/DATE_PICKER.md) — Calendar date selection
  - [FORM.md](./docs/FORM.md) — Form documentation
  - [TOAST.md](./docs/TOAST.md) — Toast notifications
  - [TREEVIEW.md](./docs/TREEVIEW.md) — Hierarchical tree with lazy loading
  - [HTTP_CLIENT.md](./docs/HTTP_CLIENT.md) — Lightweight fetch wrapper
  - [STYLING_GUIDE.md](./docs/STYLING_GUIDE.md) — Design patterns and styling
- **[Skills Documentation](./skills/SKILL.md)** — Comprehensive AI agent skill guide with examples
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

## AI Agent Skills

The library includes comprehensive **[AI agent skills](./skills/SKILL.md)** for developers and AI assistants working with the components.

### Using Skills with VS Code Copilot

The skills are available for use with VS Code's GitHub Copilot:

1. **Install the skill** — It's automatically available when this project is open
2. **Ask questions** — Use natural language queries like:
   - "How do I create a table with sorting and pagination?"
   - "Show me how to validate form inputs"
   - "Create a sidebar with custom theme colors"
   - "How do I use the HTTP client?"

3. **Get guidance** — The skill provides:
   - Component usage examples
   - Validation patterns
   - Theming and styling guidance
   - API integration patterns
   - Best practices
   - Type definitions

### Skill Features

- **Component Reference** — Complete API for 25+ components
- **Code Examples** — Copy-paste ready examples for all components
- **Patterns** — Common patterns for forms, tables, navigation, etc.
- **Validation** — Form validation and error handling patterns
- **Theming** — Theme system and customization guide
- **HTTP Integration** — API client usage and patterns
- **State Management** — Built-in store and signals guide
- **Routing** — Navigation and page management patterns

### Example Usage

```bash
# Ask Copilot to help with a component
# "I need a data table that loads from an API with pagination and sorting"

# The skill provides:
# ✅ Complete HTML/JS example
# ✅ API integration code
# ✅ Event handling
# ✅ Error handling patterns
# ✅ TypeScript types
```

## VS Code Snippets

Install [VS Code snippets](./snippets/) for faster development:

```bash
# Install from npm
npm install -D @diniz/webcomponents-snippets

# Or copy snippets to VS Code extensions folder
cp -r snippets ~/.vscode/extensions/webcomponents-snippets

# Or symlink for development
ln -s "$(pwd)/snippets" ~/.vscode/extensions/webcomponents-snippets
```

### Available Snippets

| Prefix | Component |
|--------|-----------|
| `ui-button`, `uibtn` | Button |
| `ui-input` | Input |
| `ui-select` | Select dropdown |
| `ui-table` | Data table |
| `ui-modal` | Modal |
| `ui-toast` | Toast notifications |
| `wc-router` | Router setup |
| `wc-store` | State management |
| `wc-lit-component` | Create custom component |

See [snippets/README.md](./snippets/README.md) for full list.

---

## License

MIT — use it anywhere.
