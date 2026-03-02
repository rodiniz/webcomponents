# @diniz/webcomponents

A framework-agnostic Web Components library that ships with the app primitives you usually have to wire up yourself.

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