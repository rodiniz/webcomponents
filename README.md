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

```typescript
import { BaseComponent } from '@diniz/webcomponents';

class MyComponent extends BaseComponent {
  private count = this.useSignal(0);
  
  connectedCallback() {
    super.connectedCallback();
    this.count.set(this.count.get() + 1);
  }
}
```

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

