# @diniz/webcomponents

A lightweight, framework-agnostic web components library built with vanilla TypeScript. Create modern, reactive UIs using native Web Components API with zero dependencies.

## Features

✨ **Native Web Components** - Built on standard Custom Elements API  
⚡ **Reactive Signals** - Built-in signal-based reactivity system  
🎨 **Theme Support** - CSS custom properties for easy theming  
📦 **Zero Runtime Dependencies** - No framework required  
🔒 **TypeScript** - Full type safety and IntelliSense support  
🎯 **Tree-shakeable** - Import only what you need  
♿ **Accessible** - ARIA attributes and keyboard navigation  
🚀 **lit-html Templates** - Efficient partial DOM updates

## 🚀 Live Demo & Component Documentation

Check out the interactive demo and explore component implementations:

**[View Live Demo →](https://rodiniz.github.io/webcomponents/)**

**Component source code and demos are located in the `src/features/` directory:**
- Button Demo: `src/features/button-demo/`
- Input Demo: `src/features/input-demo/`  
- Table Demo: `src/features/table-demo/`
- Form Demo: `src/features/form-demo/`
- Date Picker Demo: `src/features/date-picker-demo/`
- And more...

Each demo includes the component implementation and usage examples. Visit the live demo site to see all components in action.

## Installation

```bash
npm install @diniz/webcomponents
```

## Quick Start

```typescript
import '@diniz/webcomponents';
import '@diniz/webcomponents/dist/style.css';

// Components are now available
document.body.innerHTML = `
  <ui-button variant="primary">Click Me</ui-button>
  <ui-date-picker format="DD/MM/YYYY"></ui-date-picker>
`;
```

## Quick Start with Vite (No Framework)

Create a new Vite project without any framework to use these web components:

### 1. Create a new Vite project

```bash
npm create vite@latest my-app -- --template vanilla-ts
cd my-app
```

### 2. Install the web components library

```bash
npm install @diniz/webcomponents
```

### 3. Import components in your `src/main.ts`

```typescript
import '@diniz/webcomponents';
import '@diniz/webcomponents/dist/style.css';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>My Web Components App</h1>
    
    <ui-button variant="primary">Primary Button</ui-button>
    <ui-button variant="secondary">Secondary Button</ui-button>
    
    <ui-input 
      label="Email" 
      type="email" 
      placeholder="Enter your email"
      required
    ></ui-input>
    
    <ui-date-picker 
      label="Select Date" 
      format="DD/MM/YYYY"
    ></ui-date-picker>
  </div>
`;

// Listen to component events
document.querySelector('ui-button')?.addEventListener('click', () => {
  console.log('Button clicked!');
});

document.querySelector('ui-input')?.addEventListener('input', (e: Event) => {
  const input = e.target as HTMLInputElement;
  console.log('Input value:', input.value);
});
```

### 4. Run the development server

```bash
npm run dev
```

Your app is now running with web components! Open your browser and start building.

### Example: Building a Counter with Signals

Create reactive components using the signals system:

**src/components/counter.ts**
```typescript
import { BaseComponent } from '@diniz/webcomponents';

class CounterComponent extends BaseComponent {
  private count = this.useSignal(0);
  
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  private increment() {
    this.count.set(this.count.get() + 1);
  }

  private decrement() {
    this.count.set(this.count.get() - 1);
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 2rem;
          text-align: center;
        }
        .count {
          font-size: 3rem;
          margin: 1rem 0;
          color: var(--color-primary, #24ec71);
        }
        .buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
      </style>
      
      <div>
        <h2>Counter</h2>
        <div class="count">${this.count.get()}</div>
        <div class="buttons">
          <ui-button id="decrement" variant="secondary">-</ui-button>
          <ui-button id="increment" variant="primary">+</ui-button>
        </div>
      </div>
    `;

    this.shadowRoot!.getElementById('increment')?.addEventListener('click', 
      () => this.increment()
    );
    this.shadowRoot!.getElementById('decrement')?.addEventListener('click', 
      () => this.decrement()
    );
  }
}

customElements.define('my-counter', CounterComponent);
```

**src/main.ts**
```typescript
import '@diniz/webcomponents';
import '@diniz/webcomponents/dist/style.css';
import './components/counter';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>My Web Components App</h1>
    <my-counter></my-counter>
  </div>
`;
```

### Templating with lit-html

The library uses **lit-html** for type-safe, efficient templating. This provides partial DOM updates (only changing what's needed) instead of full re-renders.

#### Basic Usage

```typescript
import { BaseComponent } from '@diniz/webcomponents';
import { html, render } from 'lit-html';
import { classMap, styleMap } from '@diniz/webcomponents';

class MyComponent extends BaseComponent {
  private name = 'World';

  render() {
    const classes = classMap({
      'greeting': true,
      'highlighted': this.isActive
    });

    const template = html`
      <div class=${classes} style=${styleMap({ color: 'blue' })}>
        Hello, ${this.name}!
      </div>
    `;

    render(template, this.shadowRoot!);
  }
}
```

#### Helper Functions

- **`classMap`**: Conditionally apply CSS classes
- **`styleMap`**: Conditionally apply inline styles
- **`ifDefined`**: Render value only if defined (not null/undefined)
- **`repeat`**: Efficiently render lists

```typescript
import { html, classMap, styleMap, ifDefined, repeat } from '@diniz/webcomponents';

// Dynamic classes
const classes = classMap({
  'active': this.isActive,
  'disabled': this.isDisabled
});

// Dynamic styles  
const styles = styleMap({
  'color': this.textColor,
  'font-size': this.fontSize || ''
});

// Conditional rendering
const label = ifDefined(this.labelText);

// List rendering
const items = repeat(this.items, 
  (item) => item.id,
  (item) => html`<li>${item.name}</li>`
);
```

#### Performance Benefits

| Feature | innerHTML (old) | lit-html (new) |
|---------|----------------|----------------|
| Partial updates | Full DOM rebuild | Only changed parts |
| Template caching | None | Parsed once, reused |
| Event handlers | Destroyed/recreated | Stable references |
| Bundle size | +0KB | ~3KB minified |

For complex components like tables, forms, and lists, lit-html provides significant performance improvements by avoiding full re-renders on every state change.

### Adding Routing to Your App

The library includes a built-in router for client-side navigation. Here's how to set it up:

#### 1. Create your route configuration

**src/router.ts**
```typescript
import { createRouter, type Route } from '@diniz/webcomponents';

export const routes: Route[] = [
  {
    path: '/',
    load: () => import('./pages/home'),
    component: 'home-page'
  },
  {
    path: '/about',
    load: () => import('./pages/about'),
    component: 'about-page'
  },
  {
    path: '/counter',
    load: () => import('./components/counter'),
    component: 'my-counter'
  }
];

// Initialize the router with your routes
// The router automatically sets up navigation and loads the initial route
createRouter(routes);

// Optional: specify a custom app container selector (default is '#app')
// createRouter(routes, '#my-app-container');
```

> **How it works:** The `createRouter()` function sets up the routing system, registers event listeners for navigation, and automatically loads the initial route when the page loads. Navigation happens via links with the `data-link` attribute, and the browser's back/forward buttons work automatically.

**Optional: Adding Route Guards**

You can protect routes with guard functions that return a boolean or a Promise:

```typescript
import { createRouter, type Route } from '@diniz/webcomponents';

// Example: Synchronous guard
const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
};

// Example: Async guard (e.g., checking with an API)
const hasPermission = async () => {
  const response = await fetch('/api/check-permission');
  const data = await response.json();
  return data.hasAccess;
};

export const routes: Route[] = [
  {
    path: '/',
    load: () => import('./pages/home'),
    component: 'home-page'
  },
  {
    path: '/profile',
    load: () => import('./pages/profile'),
    component: 'profile-page',
    guard: isAuthenticated // Redirect to home if guard returns false
  },
  {
    path: '/admin',
    load: () => import('./pages/admin'),
    component: 'admin-page',
    guard: hasPermission // Supports async guards
  }
];

createRouter(routes);
```

#### 2. Create page components (with optional shared navigation)

You can create a reusable navigation component:

**src/components/nav.ts**
```typescript
import { BaseComponent } from '@diniz/webcomponents';

class NavComponent extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        nav {
          background: var(--color-surface, #1e1e1e);
          padding: 1rem;
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        nav a {
          color: var(--color-text, #fff);
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
        }
        nav a:hover {
          background: var(--color-surface-hover, #2a2a2a);
        }
      </style>
      
      <nav>
        <a href="/" data-link>Home</a>
        <a href="/about" data-link>About</a>
        <a href="/counter" data-link>Counter</a>
      </nav>
    `;
  }
}

customElements.define('app-nav', NavComponent);
```

**src/pages/home.ts**
```typescript
import { BaseComponent } from '@diniz/webcomponents';
import '../components/nav';

class HomePage extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <app-nav></app-nav>
      <h1>Home Page</h1>
      <p>Welcome to my web components app!</p>
      <ui-button variant="primary">
        <a href="/counter" data-link style="color: inherit; text-decoration: none;">
          Try Counter
        </a>
      </ui-button>
    `;
  }
}

customElements.define('home-page', HomePage);
```

**src/pages/about.ts**
```typescript
import { BaseComponent } from '@diniz/webcomponents';
import '../components/nav';

class AboutPage extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <app-nav></app-nav>
      <h1>About</h1>
      <p>This is a Vite app using web components with routing.</p>
    `;
  }
}

customElements.define('about-page', AboutPage);
```

#### 3. Initialize the router in main.ts

**src/main.ts**
```typescript
import '@diniz/webcomponents';
import '@diniz/webcomponents/dist/style.css';
import './style.css';
import './router'; // This loads the routes and initializes routing
```

The moment you import `./router`, the routing system:
1. ✅ Registers all event listeners for navigation
2. ✅ Automatically loads the initial route based on the current URL
3. ✅ Starts handling clicks on `[data-link]` elements
4. ✅ Enables browser back/forward button support

That's it! Your app now has client-side routing with:
- ✅ Lazy-loaded pages
- ✅ Browser back/forward navigation
- ✅ Declarative routing with `data-link` attribute
- ✅ Optional route guards for protected pages
- ✅ Reusable navigation component

## Components

- **ui-button** - Button with variants, sizes, icons
- **ui-input** - Input with validation
- **ui-table** - Data table with actions
- **ui-date-picker** - Date picker
- **ui-pagination** - Pagination control
- **ui-select** - Dropdown selection
- **ui-checkbox** - Checkbox input
- **ui-modal** - Modal dialog
- **ui-card** - Card container
- **ui-tabs** - Tab navigation
- **ui-stepper** - Step indicator
- **ui-toast** - Toast notifications
- **ui-upload** - File upload
- **ui-layout** - Application layout

For detailed documentation on each component, see the demo implementations in `src/features/`.

## TypeScript Types

The library ships first-class TypeScript types. Import them with `type` to keep builds tree-shakeable:

```typescript
import type {
  ButtonVariant,
  ButtonSize,
  InputType,
  ValidationResult,
  TableColumn,
  SelectOption,
  ToastConfig,
  StepperStep,
  Route,
  Signal
} from '@diniz/webcomponents';
```

### Example: Table column typing

```typescript
import type { TableColumn } from '@diniz/webcomponents';

type User = { id: number; name: string; email: string };

const columns: TableColumn<User>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' }
];
```

### Example: Button variants and sizes

```typescript
import type { ButtonVariant, ButtonSize } from '@diniz/webcomponents';

const variant: ButtonVariant = 'primary';
const size: ButtonSize = 'md';
```

### Example: Form validation results

```typescript
import type { ValidationResult } from '@diniz/webcomponents';

const result: ValidationResult = {
  valid: false,
  message: 'Email is required'
};
```

### Example: Router types

```typescript
import { createRouter, type Route } from '@diniz/webcomponents';

const routes: Route[] = [
  { path: '/', load: () => import('./pages/home'), component: 'home-page' }
];

createRouter(routes);
```

## Core Features

### Signals & Reactivity

Create reactive, auto-updating UI with signals. Changes automatically trigger re-renders:

```typescript
import { BaseComponent } from '@diniz/webcomponents';

class CounterComponent extends BaseComponent {
  // Create a reactive signal with initial value 0
  private count = this.useSignal(0);
  
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  private increment() {
    // Update signal value - automatically triggers re-render
    this.count.set(this.count.get() + 1);
  }

  private reset() {
    this.count.set(0);
  }

  render() {
    const currentCount = this.count.get();
    
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 2rem;
        }
        .count-display {
          font-size: 2rem;
          font-weight: bold;
          color: var(--color-primary, #24ec71);
        }
      </style>
      
      <div class="count-display">Count: ${currentCount}</div>
      <button id="increment">Increment</button>
      <button id="reset">Reset</button>
    `;

    // Connect event listeners to update signals
    this.shadowRoot!.getElementById('increment')?.addEventListener('click', 
      () => this.increment()
    );
    this.shadowRoot!.getElementById('reset')?.addEventListener('click', 
      () => this.reset()
    );
  }
}

customElements.define('counter-app', CounterComponent);
```

**Usage in HTML:**
```html
<counter-app></counter-app>
```

**Key features:**
- `this.useSignal(value)` - Create a reactive signal
- `signal.get()` - Read the current value
- `signal.set(newValue)` - Update value and trigger re-render
- `this.setState({ ... })` - Update multiple values at once
- Changes are isolated within component's shadow DOM

### Signals with Separated HTML & TypeScript Files

When using separate HTML template files, you can achieve automatic reactivity so the HTML updates whenever a signal changes:

**counter.html**
```html
<style>
  :host {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
  }
  .count-display {
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-primary, #24ec71);
  }
</style>

<div class="count-display">
  Count: <span id="countValue">0</span>
</div>
<button id="incrementBtn">Increment</button>
<button id="resetBtn">Reset</button>
```

**counter.ts - Automatic Reactivity Approach**
```typescript
import { BaseComponent } from '@diniz/webcomponents';
import template from './counter.html?raw';

class CounterComponent extends BaseComponent {
  private count = this.useSignal(0);
  
  connectedCallback() {
    super.connectedCallback();
    this.render();
    this.setupEventListeners();
    
    // Subscribe to signal changes - re-render when count changes
    this.watchSignal(this.count, () => {
      this.updateCountDisplay();
    });
  }

  private increment() {
    this.count.set(this.count.get() + 1);
  }

  private reset() {
    this.count.set(0);
  }

  // Single method that updates the display - called whenever signal changes
  private updateCountDisplay() {
    const countValue = this.shadowRoot?.getElementById('countValue');
    if (countValue) {
      countValue.textContent = String(this.count.get());
    }
  }

  private setupEventListeners() {
    this.shadowRoot?.getElementById('incrementBtn')?.addEventListener('click', 
      () => this.increment()
    );
    this.shadowRoot?.getElementById('resetBtn')?.addEventListener('click', 
      () => this.reset()
    );
  }

  render() {
    this.shadowRoot!.innerHTML = template;
    this.updateCountDisplay(); // Initial display
  }
}

customElements.define('counter-app', CounterComponent);
```

**Alternative: Full Re-render on Signal Change**

For simpler components, you can also re-render the entire template when any signal changes:

```typescript
class CounterComponent extends BaseComponent {
  private count = this.useSignal(0);
  
  connectedCallback() {
    super.connectedCallback();
    this.render();
    this.setupEventListeners();
    // Re-render entire component when signal changes
    this.watchSignal(this.count, () => this.render());
  }

  private increment() {
    this.count.set(this.count.get() + 1);
    // No need to manually update - render() is called automatically
  }

  private reset() {
    this.count.set(0);
  }

  private setupEventListeners() {
    // Re-attach listeners after each render
    this.shadowRoot?.getElementById('incrementBtn')?.addEventListener('click', 
      () => this.increment()
    );
    this.shadowRoot?.getElementById('resetBtn')?.addEventListener('click', 
      () => this.reset()
    );
  }

  render() {
    const currentCount = this.count.get();
    
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 2rem;
        }
        .count-display {
          font-size: 2rem;
          font-weight: bold;
          color: var(--color-primary, #24ec71);
        }
      </style>
      
      <div class="count-display">Count: ${currentCount}</div>
      <button id="incrementBtn">Increment</button>
      <button id="resetBtn">Reset</button>
    `;
    
    this.setupEventListeners();
  }
}

customElements.define('counter-app', CounterComponent);
```

**Key improvements:**
- Use `this.watchSignal(signal, callback)` to subscribe to signal changes
- When signal updates, callback triggers automatically - no manual DOM updates needed
- Choose between:
  - **Selective updates** - Only update specific DOM elements (better performance)
  - **Full re-render** - Re-render entire template (simpler logic, less efficient)
- The HTML automatically stays in sync with signal values

### Enhanced: useSignalHtml for Direct DOM Binding

For even cleaner code, use `useSignalHtml()` to create a signal that automatically updates a specific HTML element:

**counter.html**
```html
<style>
  :host {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
  }
  .count-display {
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-primary, #24ec71);
  }
</style>

<div class="count-display">
  Count: <span id="countValue">0</span>
</div>
<button id="incrementBtn">Increment</button>
<button id="resetBtn">Reset</button>
```

**counter.ts - Simplified with useSignalHtml**
```typescript
import { BaseComponent } from '@diniz/webcomponents';
import template from './counter.html?raw';

class CounterComponent extends BaseComponent {
  // Create signal bound to HTML element with ID 'countValue'
  // Automatically updates the element's textContent when signal changes
  private count = this.useSignalHtml('countValue', 0);
  
  connectedCallback() {
    super.connectedCallback();
    this.render();
    this.setupEventListeners();
  }

  private increment() {
    // Just update the signal - HTML updates automatically
    this.count.set(this.count.get() + 1);
  }

  private reset() {
    // Just update the signal - HTML updates automatically
    this.count.set(0);
  }

  private setupEventListeners() {
    this.shadowRoot?.getElementById('incrementBtn')?.addEventListener('click', 
      () => this.increment()
    );
    this.shadowRoot?.getElementById('resetBtn')?.addEventListener('click', 
      () => this.reset()
    );
  }

  render() {
    this.shadowRoot!.innerHTML = template;
  }
}

customElements.define('counter-app', CounterComponent);
```

**Benefits of `useSignalHtml()`:**
- No need for `watchSignal()` subscription
- No need for manual `updateDisplay()` functions
- Automatically syncs signal value to element's `textContent`
- One line instead of multiple lines of setup
- Perfect for data binding in separated HTML/TS architecture

**Signature:**
```typescript
useSignalHtml<T>(elementId: string, initialValue: T): Signal<T>
```

Returns a signal that automatically updates the specified HTML element whenever the value changes.

This pattern is used throughout the demo components in `src/features/`.

### HTTP Client

```typescript
import { http } from '@diniz/webcomponents';

const users = await http.get<User[]>('/api/users');
const newUser = await http.post<User>('/api/users', data);
```

### Router & Store

Built-in routing and global state management utilities.

## Theming

Customize colors and spacing using CSS custom properties:

```css
:root {
  --color-primary: #24ec71;
  --color-secondary: #8b5cf6;
  --radius-md: 12px;
}
```

## Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Build for production
npm run build:lib # Build library distribution
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

## License

MIT © Rodrigo Diniz

