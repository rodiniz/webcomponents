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

