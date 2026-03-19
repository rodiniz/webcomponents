# ui-dropdown Component

Menu dropdown component with configurable items, disabled state, and selection events.

## Features

- Trigger button with `sm`, `md`, and `lg` sizes
- Menu item list from `items` property
- Disabled dropdown support
- Disabled item support
- Click-outside to close
- Emits selection event when a menu item is clicked

## Basic Usage

```html
<ui-dropdown id="record-menu" label="Record"></ui-dropdown>

<script type="module">
  const dropdown = document.getElementById('record-menu');

  dropdown.items = [
    { id: 'create', label: 'Create a recording', disabled: false },
    { id: 'upload', label: 'Upload a recording', disabled: false }
  ];
</script>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | `string` | `'Menu'` | Trigger button text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger button size |
| `disabled` | `boolean` | `false` | Disables trigger and blocks opening |

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `DropdownItem[]` | `[]` | Menu item list |

```ts
interface DropdownItem {
  id: string;
  label: string;
  disabled: boolean;
}
```

## Events

### `dropdown-select`

Fired when an enabled menu item is clicked.

**Event detail:**

```ts
{
  id: string;
  label: string;
}
```

Disabled items do not emit this event.

## Handle Click on a Menu Item

### Plain JavaScript

```html
<ui-dropdown id="actions-menu" label="Actions"></ui-dropdown>

<script type="module">
  const menu = document.getElementById('actions-menu');

  menu.items = [
    { id: 'edit', label: 'Edit', disabled: false },
    { id: 'duplicate', label: 'Duplicate', disabled: false },
    { id: 'delete', label: 'Delete', disabled: true }
  ];

  menu.addEventListener('dropdown-select', (event) => {
    const { id, label } = event.detail;

    if (id === 'edit') {
      console.log('Edit clicked');
    } else if (id === 'duplicate') {
      console.log('Duplicate clicked');
    }

    console.log('Selected item:', id, label);
  });
</script>
```

### TypeScript

```ts
type DropdownSelectDetail = {
  id: string;
  label: string;
};

const menu = document.querySelector('ui-dropdown#actions-menu') as HTMLElement & {
  items: Array<{ id: string; label: string; disabled: boolean }>;
};

menu.items = [
  { id: 'create', label: 'Create a recording', disabled: false },
  { id: 'upload', label: 'Upload a recording', disabled: false }
];

menu.addEventListener('dropdown-select', (event: Event) => {
  const customEvent = event as CustomEvent<DropdownSelectDetail>;
  const { id, label } = customEvent.detail;

  console.log('Selected:', id, label);
});
```

### Lit Template

```ts
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@diniz/webcomponents';

@customElement('dropdown-demo')
export class DropdownDemo extends LitElement {
  private menuItems = [
    { id: 'create', label: 'Create a recording', disabled: false },
    { id: 'upload', label: 'Upload a recording', disabled: false }
  ];

  private onSelect(event: CustomEvent<{ id: string; label: string }>) {
    const { id } = event.detail;
    if (id === 'create') {
      console.log('Create action');
    }
  }

  render() {
    return html`
      <ui-dropdown
        label="Record"
        .items=${this.menuItems}
        @dropdown-select=${this.onSelect}
      ></ui-dropdown>
    `;
  }
}
```

## Disabled State

```html
<ui-dropdown
  label="Disabled"
  disabled
></ui-dropdown>
```

## Empty State

If `items` is empty, the menu shows `No items`.

```html
<ui-dropdown label="Empty" .items=${[]}></ui-dropdown>
```
