# ui-modal Component

Accessible modal dialog component that replaces native browser modals with a customizable, fully-styled alternative. Perfect as a modern replacement for `confirm()`, `alert()`, and custom dialog requirements.

## Features

- **Multiple Sizes** — Choose from `sm`, `md`, `lg`, `xl`, and `full` sizes
- **Keyboard Support** — Close with ESC key or disable with `no-close-on-escape`
- **Backdrop Control** — Click outside to close or prevent with `no-close-on-backdrop`
- **Flexible Slots** — Default slot for content, dedicated `footer` slot for actions
- **Event Emitters** — Listen to `modal-open` and `modal-close` events
- **Portal to Body** — Automatically positioned correctly regardless of parent container
- **Accessibility** — Full ARIA attributes and semantic HTML

## Basic Usage

```html
<ui-modal id="confirm-modal" title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <div slot="footer">
    <ui-button variant="ghost" onclick="document.getElementById('confirm-modal').close()">
      Cancel
    </ui-button>
    <ui-button variant="primary" onclick="handleConfirm()">
      Confirm
    </ui-button>
  </div>
</ui-modal>

<ui-button onclick="document.getElementById('confirm-modal').open()">
  Open Modal
</ui-button>
```

## Modal Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `open` | boolean | `false` | Open/close the modal (reflected property) |
| `title` | string | `''` | Modal title text |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal width size |
| `no-close-on-escape` | boolean | `false` | Prevent closing with ESC key |
| `no-close-on-backdrop` | boolean | `false` | Prevent closing when clicking backdrop |

## Methods

### `open()`

Open the modal and display it. The modal will portal to `document.body` to ensure it's not clipped by parent containers.

```typescript
const modal = document.querySelector('ui-modal');
modal.open();
```

### `close()`

Close the modal and restore it to its original DOM position.

```typescript
const modal = document.querySelector('ui-modal');
modal.close();
```

## Events

### `modal-open`

Fired when the modal is opened.

```javascript
const modal = document.querySelector('ui-modal');
modal.addEventListener('modal-open', () => {
  console.log('Modal opened');
  // Focus management, animations, etc.
});
```

### `modal-close`

Fired when the modal is closed.

```javascript
const modal = document.querySelector('ui-modal');
modal.addEventListener('modal-close', () => {
  console.log('Modal closed');
  // Cleanup, save state, etc.
});
```

## Slots

### Default Slot

Content displayed in the modal body. Use for your main message, form, or custom content.

```html
<ui-modal title="Confirm">
  <p>This is the main content</p>
  <div>Custom HTML goes here</div>
</ui-modal>
```

### `footer` Slot

Dedicated area for action buttons. Typically contains confirm/cancel buttons.

```html
<ui-modal title="Delete User">
  <p>Are you sure? This cannot be undone.</p>
  <div slot="footer">
    <ui-button variant="ghost">Cancel</ui-button>
    <ui-button variant="danger">Delete</ui-button>
  </div>
</ui-modal>
```

## Modal Sizes

Choose the appropriate size for your content:

```html
<!-- Small: 400px -->
<ui-modal size="sm" title="Small Modal">
  Content here
</ui-modal>

<!-- Medium: 600px (default) -->
<ui-modal size="md" title="Medium Modal">
  Content here
</ui-modal>

<!-- Large: 800px -->
<ui-modal size="lg" title="Large Modal">
  Content here
</ui-modal>

<!-- Extra Large: 1000px -->
<ui-modal size="xl" title="Extra Large Modal">
  Content here
</ui-modal>

<!-- Full: 90vw -->
<ui-modal size="full" title="Full Modal">
  Content here
</ui-modal>
```

## Replace JavaScript confirm()

The primary use case: replacing the native `confirm()` method with a styled modal:

### JavaScript confirm() - Old Way

```javascript
if (confirm('Are you sure?')) {
  deleteUser();
}
```

### ui-modal - New Way

```html
<ui-modal id="delete-confirm" title="Delete User">
  <p>Are you sure you want to delete this user? This action cannot be undone.</p>
  <div slot="footer">
    <ui-button variant="ghost" onclick="cancelDelete()">Cancel</ui-button>
    <ui-button variant="danger" onclick="confirmDelete()">Delete</ui-button>
  </div>
</ui-modal>

<script type="module">
  function showDeleteConfirm(userId) {
    const modal = document.getElementById('delete-confirm');
    
    // Store userId for later use
    window.pendingDeleteId = userId;
    
    // Open modal
    modal.open();
  }

  function confirmDelete() {
    const userId = window.pendingDeleteId;
    deleteUser(userId);
    document.getElementById('delete-confirm').close();
  }

  function cancelDelete() {
    document.getElementById('delete-confirm').close();
  }

  // Usage
  document.getElementById('delete-btn').addEventListener('click', () => {
    showDeleteConfirm(42);
  });
</script>
```

## TypeScript with Type-Safe Helpers

Use the exported `queryModal` helper for type-safe modal access:

```typescript
import { queryModal } from '@diniz/webcomponents';

// Type-safe query that includes open() and close() methods
const modal = queryModal(document, 'ui-modal#confirm-modal');

if (modal) {
  modal.open();
  
  // Later...
  modal.close();
}
```

## Common Patterns

### Confirmation Dialog

```typescript
import { queryModal } from '@diniz/webcomponents';

function askForConfirmation(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const modal = queryModal(document, 'ui-modal#confirm-modal');
    if (!modal) {
      resolve(false);
      return;
    }

    modal.textContent = message;
    
    const handleConfirm = () => {
      modal.close();
      cleanup();
      resolve(true);
    };
    
    const handleCancel = () => {
      modal.close();
      cleanup();
      resolve(false);
    };
    
    const cleanup = () => {
      confirmBtn.removeEventListener('click', handleConfirm);
      cancelBtn.removeEventListener('click', handleCancel);
    };
    
    const confirmBtn = modal.querySelector('[data-action="confirm"]');
    const cancelBtn = modal.querySelector('[data-action="cancel"]');

    if (!confirmBtn || !cancelBtn) {
      resolve(false);
      return;
    }

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
    
    modal.open();
  });
}

// Usage
const confirmed = await askForConfirmation('Delete this item?');
if (confirmed) {
  await deleteItem();
}
```

### Alert Dialog (One Button)

```html
<ui-modal id="alert-modal" title="Alert">
  <p id="alert-message"></p>
  <div slot="footer">
    <ui-button variant="primary" onclick="closeAlert()">OK</ui-button>
  </div>
</ui-modal>

<script type="module">
  function showAlert(message) {
    const modal = document.getElementById('alert-modal');
    modal.querySelector('#alert-message').textContent = message;
    modal.open();
  }

  function closeAlert() {
    document.getElementById('alert-modal').close();
  }
</script>
```

### Form Modal

```html
<ui-modal id="form-modal" title="Edit User" size="lg">
  <form id="user-form">
    <ui-input name="name" label="Name" required></ui-input>
    <ui-input name="email" label="Email" type="email" required></ui-input>
  </form>
  
  <div slot="footer">
    <ui-button variant="ghost" onclick="cancelForm()">Cancel</ui-button>
    <ui-button variant="primary" onclick="submitForm()">Save</ui-button>
  </div>
</ui-modal>

<script type="module">
  import { queryModal, getFormValues } from '@diniz/webcomponents';

  function openEditUser(userId) {
    const modal = queryModal(document, '#form-modal');
    
    // Load user data
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(user => {
        const form = document.getElementById('user-form');
        form.elements.name.value = user.name;
        form.elements.email.value = user.email;
        modal?.open();
      });
  }

  function submitForm() {
    const form = document.getElementById('user-form');
    const { name, email } = getFormValues(form);
    
    // Save to API
    fetch('/api/users/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    }).then(() => {
      queryModal(document, '#form-modal')?.close();
    });
  }

  function cancelForm() {
    queryModal(document, '#form-modal')?.close();
  }
</script>
```

### Modal with Event Listeners

```javascript
const modal = document.querySelector('ui-modal#my-modal');

// Listen to open event
modal.addEventListener('modal-open', () => {
  console.log('Modal opened - focus on first input');
  modal.querySelector('input')?.focus();
});

// Listen to close event
modal.addEventListener('modal-close', () => {
  console.log('Modal closed - cleanup here');
});

// Open
modal.open();

// Close after 3 seconds
setTimeout(() => {
  modal.close();
}, 3000);
```

## Disable ESC Close

Prevent users from closing a critical confirmation modal with ESC:

```html
<ui-modal id="critical" title="Critical Action" no-close-on-escape>
  <p>This action requires explicit confirmation.</p>
  <div slot="footer">
    <ui-button variant="primary" onclick="handleCritical()">
      I Understand
    </ui-button>
  </div>
</ui-modal>
```

## Disable Backdrop Close

Force users to use a button to close:

```html
<ui-modal id="important" title="Important" no-close-on-backdrop>
  <p>Please read this carefully.</p>
  <div slot="footer">
    <ui-button variant="ghost" onclick="confirmRead()">
      I've Read This
    </ui-button>
  </div>
</ui-modal>
```

## Lit Component Example

```typescript
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { queryModal } from '@diniz/webcomponents';

@customElement('user-manager')
export class UserManager extends LitElement {
  @state() private selectedUserId: number | null = null;

  private openDeleteConfirm(userId: number) {
    this.selectedUserId = userId;
    const modal = queryModal(this, 'ui-modal#delete');
    modal?.open();
  }

  private confirmDelete() {
    if (this.selectedUserId) {
      fetch(`/api/users/${this.selectedUserId}`, { method: 'DELETE' })
        .then(() => {
          queryModal(this, 'ui-modal#delete')?.close();
          this.selectedUserId = null;
        });
    }
  }

  render() {
    return html`
      <ui-modal id="delete" title="Delete User">
        <p>Are you sure?</p>
        <div slot="footer">
          <ui-button variant="ghost" @click=${() => queryModal(this, 'ui-modal#delete')?.close()}>
            Cancel
          </ui-button>
          <ui-button variant="danger" @click=${() => this.confirmDelete()}>
            Delete
          </ui-button>
        </div>
      </ui-modal>
      
      <ui-button @click=${() => this.openDeleteConfirm(1)}>
        Delete User
      </ui-button>
    `;
  }
}
```

## Styling

The modal inherits your theme colors and can be styled further with CSS variables:

```css
ui-modal {
  /* Customize via theme variables */
  --color-bg: white;
  --color-text: #333;
  --color-border: #e0e0e0;
}
```

## Accessibility

- Full ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`)
- Keyboard navigation (ESC to close)
- Semantic HTML structure
- Proper focus management with body overflow hidden
- Screen reader friendly

## Migration from confirm()

Quick reference for migrating from native confirm:

| Native | ui-modal |
|--------|----------|
| `confirm('Delete?')` | Modal with buttons + `modal-open`/`modal-close` events |
| `alert('Done!')` | Modal with one button |
| `prompt('Name?')` | Modal with form input |
| ESC closes | `no-close-on-escape` to prevent |
| Click outside closes | `no-close-on-backdrop` to prevent |
