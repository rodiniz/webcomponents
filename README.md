# @diniz/webcomponents

A framework-agnostic Web Components library that ships with the app primitives you usually have to wire up yourself.

## Demo & Documentation


- **[Storybook](https://rodiniz.github.io/webcomponents/)** - Interactive component library with live demos and theme switching

## GitHub Pages routing

GitHub Pages serves static files and does not automatically rewrite SPA routes to `index.html`. To make client-side routes work, set the Vite base path to your repo name and add a simple 404 fallback.

1) Set the base path in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/webcomponents/',
});
```

2) Add a `404.html` in `public/` so Vite copies it to the build output:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=/webcomponents/" />
    <title>Redirecting...</title>
  </head>
  <body>Redirecting...</body>
</html>
```

With the base path set, the router uses `import.meta.env.BASE_URL` and links via `data-link` will resolve correctly on GitHub Pages.

## Getting Started (Vite)

### 1) Create a new Vite app

```bash
npm create vite@latest my-app -- --template vanilla-ts
cd my-app
npm install
```

### 2) Install the library

```bash
npm install @diniz/webcomponents
```

### 3) Create page components

Create `src/pages/home-page.ts`:

```ts
export class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h1>Home</h1>
      <a href="/buttons" data-link>Go to button test</a>
    `;
  }
}

customElements.define('home-page', HomePage);
```

Create `src/pages/buttons-page.ts`:

```ts
import '@diniz/webcomponents';

export class ButtonsPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h1>Button Test</h1>
      <ui-button variant="primary" size="md">Hello Web Components</ui-button>
      <br /><br />
      <a href="/" data-link>Back home</a>
    `;
  }
}

customElements.define('buttons-page', ButtonsPage);
```

### 4) Configure router in `src/main.ts`

```ts
import { createRouter, type Route } from '@diniz/webcomponents';

const routes: Route[] = [
  { path: '/', component: 'home-page', load: () => import('./pages/home-page') },
  { path: '/buttons', component: 'buttons-page', load: () => import('./pages/buttons-page') }
];

createRouter(routes, '#app');
```

### 5) Add app outlet in `index.html`

```html
<div id="app"></div>
<script type="module" src="/src/main.ts"></script>
```

### 6) Run and test

```bash
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173), click **Go to button test**, and confirm the `ui-button` renders.

## ThemeService usage

The ThemeService writes CSS variables into `:root` so all components pick up the active theme automatically.

```ts
import { applyTheme, getCurrentTheme, THEME_LIST } from '@diniz/webcomponents';

// Apply a default theme on startup
applyTheme('shadcn');

// Switch themes (example)
const next = THEME_LIST.find(t => t.value !== getCurrentTheme())?.value ?? 'shadcn';
applyTheme(next);
```

Available theme names: `shadcn`, `zinc`, `rose`, `blue`, `green`, `orange`, `violet`.

## For contributors

Build this repository's library bundle:

```bash
npm run build:lib
```

Distributable files are generated in `dist/`.

Library builds are scoped to `src/lib/index.ts` and intentionally exclude demo/app sources such as `src/features`.

## Advantages

- Built-in routing with lazy loading, guards, and `data-link` navigation
- Predictable state with a small store and per-component signals
- Efficient rendering via `lit-html` templates and partial updates
- Themeable design tokens using CSS custom properties
- TypeScript-first APIs with strong IntelliSense
- Zero runtime framework dependencies and tree-shakeable exports
- Accessible components with keyboard and ARIA support

## Core Systems

**Routing**
- Client-side router that handles history, guards, and code-splitting
- Route navigation with simple `data-link` anchors

**State**
- A global store for shared app state
- Lightweight signals for component-local reactivity

## Component Foundation

Buttons, inputs, selects, checkboxes, date picker, table, modal, tabs, toast, stepper, upload, layout, and more.

## Design Goals

Ship UI fast with native Custom Elements, minimal dependencies, and reliable app primitives for real-world screens.