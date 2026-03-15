# @diniz/webcomponents-snippets

[![npm version](https://img.shields.io/npm/v/@diniz/webcomponents-snippets)](https://www.npmjs.com/package/@diniz/webcomponents-snippets)

VS Code snippets for [@diniz/webcomponents](https://github.com/rodiniz/webcomponents) library.

## Installation

### Option 1: VS Code Marketplace
Search for "webcomponents snippets" in VS Code Extensions (Ctrl+Shift+X).

### Option 2: VSIX
1. Download the `.vsix` file from releases
2. Run: `code --install-extension webcomponents-snippets.vsix`

### Option 3: Symlink (for development)
```bash
cd ~/.vscode/extensions
ln -s /path/to/webcomponents/snippets webcomponents-snippets
```

## Snippets

### Form Components

| Snippet | Description |
|---------|-------------|
| `ui-button` | Button with variant, size, icon |
| `uibtn` | Quick primary button |
| `uibtn-submit` | Submit button for forms |
| `ui-input` | Input with common props |
| `ui-input-validate` | Input with validation |
| `ui-input-icon` | Input with icon |
| `ui-textarea` | Textarea element |
| `ui-checkbox` | Checkbox element |
| `ui-radio` | Radio button |
| `ui-radio-group` | Radio group |
| `ui-toggle-switch` | Toggle switch |
| `ui-select` | Select dropdown |
| `ui-select-multi` | Multi-select dropdown |

### Layout Components

| Snippet | Description |
|---------|-------------|
| `ui-card` | Card component |
| `ui-accordion` | Accordion section |
| `ui-tabs` | Tab navigation |
| `ui-modal` | Modal dialog |
| `ui-sidebar` | Sidebar navigation |
| `ui-top-bar` | Top bar header |
| `ui-layout` | Layout structure |

### Data Components

| Snippet | Description |
|---------|-------------|
| `ui-table` | Data table |
| `ui-table-events` | Table event handlers |
| `ui-pagination` | Pagination |
| `ui-treeview` | Tree view |
| `ui-picklist` | Dual list |

### Feedback Components

| Snippet | Description |
|---------|-------------|
| `ui-toast` | Toast container |
| `ui-toast-show` | Show toast notification |
| `ui-spinner` | Loading spinner |
| `ui-tooltip` | Tooltip wrapper |
| `ui-stepper` | Stepper component |

### Utility Components

| Snippet | Description |
|---------|-------------|
| `ui-date-picker` | Date picker |
| `ui-upload` | File upload |
| `ui-link` | Link component |
| `ui-dropdown` | Dropdown menu |

### Utilities

| Snippet | Description |
|---------|-------------|
| `wc-import` | Import all components |
| `wc-import-named` | Import named components |
| `wc-apply-theme` | Apply theme |
| `wc-http-get` | HTTP GET request |
| `wc-http-post` | HTTP POST request |
| `wc-router` | Create router |
| `wc-store` | Create state store |
| `wc-bind-props` | Bind props to element |
| `wc-lit-component` | Create LitComponent |
| `wc-form` | Complete form template |

## Usage

1. Type snippet prefix in HTML/TS/JS file
2. Press `Tab` to expand
3. Use `Tab` to move between placeholders
4. Use arrow keys to select options in `|option1,option2|`

## Examples

```html
<!-- ui-button -->
<ui-button variant="primary" size="md">
    Click me
</ui-button>

<!-- ui-table -->
<ui-table
    .columns=${[
        { key: 'name', label: 'Name', sortable: true },
        { key: 'actions', label: 'Actions', actions: { edit: true, delete: true } }
    ]}
    .rows=${[]}
></ui-table>
```

```typescript
// wc-router
const router = createRouter([
    { path: '/', component: 'home-page', load: () => import('./pages/home') },
    { path: '/about', component: 'about-page', load: () => import('./pages/about') }
]);
```

## License

MIT
