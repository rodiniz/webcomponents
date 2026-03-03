# @diniz/webcomponents

A framework-agnostic Web Components library that ships with the app primitives you usually have to wire up yourself.

## Demo

Live demo (GitHub Pages): https://rodiniz.github.io/webcomponents/

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