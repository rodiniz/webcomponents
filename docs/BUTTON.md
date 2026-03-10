# ui-button Component

Accessible button component with variants, sizes, optional icons, and native click handling.

## Features

- `primary`, `secondary`, `ghost`, and `danger` variants
- `sm`, `md`, and `lg` sizes
- Optional icon support
- Icon position control (`left` or `right`)
- Disabled state support
- Supports button types: `button`, `submit`, `reset`

## Basic Usage

```html
<ui-button>Click me</ui-button>
<ui-button variant="secondary">Secondary</ui-button>
<ui-button variant="danger">Delete</ui-button>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| `icon` | `string` | `''` | Icon name |
| `icon-position` | `'left' \| 'right'` | `'left'` | Icon placement when label exists |
| `disabled` | `boolean` | `false` | Disables interaction |

## Handle Click Event

### Plain JavaScript

```html
<ui-button id="save-btn" variant="primary">Save</ui-button>

<script type="module">
  const saveBtn = document.getElementById('save-btn');

  saveBtn.addEventListener('click', (event) => {
    console.log('Button clicked', event);
    // Your action here
  });
</script>
```

### TypeScript

```ts
const saveBtn = document.querySelector('ui-button#save-btn');

saveBtn?.addEventListener('click', (event: MouseEvent) => {
  console.log('Button clicked', event.clientX, event.clientY);
});
```

### Lit Template

```ts
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('button-demo')
export class ButtonDemo extends LitElement {
  private handleSaveClick() {
    console.log('Save clicked');
  }

  render() {
    return html`
      <ui-button variant="primary" @click=${this.handleSaveClick}>
        Save
      </ui-button>
    `;
  }
}
```

## Icon Usage

```html
<ui-button icon="check">Confirm</ui-button>
<ui-button icon="settings" icon-position="right">Settings</ui-button>
<ui-button icon="trash-2" variant="danger"></ui-button>
```

## Disabled State

```html
<ui-button disabled>Disabled button</ui-button>
```

When `disabled` is set, clicks are blocked.

## Form Submit Behavior

Use `type="submit"` inside a `<form>` to trigger form submit flow:

```html
<form id="profile-form">
  <ui-button type="submit">Submit</ui-button>
</form>

<script type="module">
  const form = document.getElementById('profile-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Form submitted');
  });
</script>
```

## Advanced Example

```html
<ui-button id="delete-btn" variant="danger" icon="trash-2">
  Delete User
</ui-button>

<script type="module">
  const deleteBtn = document.getElementById('delete-btn');

  deleteBtn.addEventListener('click', async () => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      // await api.deleteUser(userId)
      console.log('User deleted');
    } catch (error) {
      console.error('Delete failed:', error);
    }
  });
</script>
```