# UI Toast Component

An elegant notification system with smooth animations, glassmorphic design, and comprehensive customization options. Perfect for displaying temporary messages to users.

## Features

- ✅ Multiple toast types (success, error, warning, info)
- ✅ Smooth slide-in/out animations with spring physics
- ✅ Glassmorphic design with backdrop blur
- ✅ Auto-dismiss with visual progress bar
- ✅ Position control (6 positions)
- ✅ Stack multiple toasts
- ✅ Programmatic API
- ✅ Customizable duration
- ✅ Manual close button
- ✅ Responsive & mobile-friendly
- ✅ Dark mode support
- ✅ Accessibility features (ARIA attributes)

## Usage

### Basic Setup

```html
<!-- Add toast container to your page -->
<ui-toast id="toaster" position="top-right"></ui-toast>
```

```javascript
// Get reference to toast container
const toaster = document.getElementById('toaster');

// Show a success toast
toaster.success('Success!', 'Your changes have been saved.');

// Show an error toast
toaster.error('Error occurred!', 'Please try again later.');

// Show a warning toast
toaster.warning('Warning', 'Low disk space detected.');

// Show an info toast
toaster.info('Information', 'New updates available.');
```

### Using the Full API

```javascript
const toaster = document.getElementById('toaster');

// Advanced usage with configuration
const toastId = toaster.show({
  title: 'Upload complete',
  description: 'Your file has been uploaded successfully.',
  type: 'success',  // 'success' | 'error' | 'warning' | 'info'
  duration: 5000,   // milliseconds (0 = persistent)
  closable: true    // show close button
});

// Dismiss specific toast
toaster.dismiss(toastId);

// Dismiss all toasts
toaster.dismissAll();
```

## API Reference

### Methods

#### `show(config: ToastConfig): string`

Shows a toast notification and returns a unique toast ID.

**Parameters:**
```typescript
interface ToastConfig {
  title: string;              // Toast title (required)
  description?: string;       // Optional description text
  type?: ToastType;          // 'success' | 'error' | 'warning' | 'info' (default: 'info')
  duration?: number;         // Auto-dismiss time in ms, 0 = no auto-dismiss (default: 5000)
  closable?: boolean;        // Show close button (default: true)
}
```

**Returns:** Toast ID string for manual dismissal

#### `success(title: string, description?: string, duration?: number): string`

Convenience method to show a success toast.

```javascript
toaster.success('Saved!', 'Document saved successfully.');
```

#### `error(title: string, description?: string, duration?: number): string`

Convenience method to show an error toast.

```javascript
toaster.error('Failed', 'Unable to connect to server.');
```

#### `warning(title: string, description?: string, duration?: number): string`

Convenience method to show a warning toast.

```javascript
toaster.warning('Warning', 'Low storage space.');
```

#### `info(title: string, description?: string, duration?: number): string`

Convenience method to show an info toast.

```javascript
toaster.info('Update', 'New version available.');
```

#### `dismiss(toastId: string): void`

Dismisses a specific toast by ID.

```javascript
const id = toaster.info('Loading...');
// Later...
toaster.dismiss(id);
```

#### `dismissAll(): void`

Dismisses all active toasts.

```javascript
toaster.dismissAll();
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `position` | string | `"top-right"` | Toast position: `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center` |

### Changing Position

```html
<!-- Top right corner -->
<ui-toast position="top-right"></ui-toast>

<!-- Top center -->
<ui-toast position="top-center"></ui-toast>

<!-- Bottom left corner -->
<ui-toast position="bottom-left"></ui-toast>
```

```javascript
// Change position dynamically
toaster.setAttribute('position', 'bottom-center');
```

## Events

### `toast-show`

Fired when a toast is shown.

```javascript
toaster.addEventListener('toast-show', (event) => {
  console.log('Toast shown:', event.detail);
  // detail: { id, title, description, type, duration, closable }
});
```

### `toast-dismiss`

Fired when a toast is dismissed.

```javascript
toaster.addEventListener('toast-dismiss', (event) => {
  console.log('Toast dismissed:', event.detail);
  // detail: { id }
});
```

## Examples

### Simple Notification

```javascript
toaster.success('Task completed!');
```

### With Description

```javascript
toaster.error(
  'Connection failed',
  'Unable to reach the server. Please check your internet connection.'
);
```

### Custom Duration

```javascript
// Quick notification (2 seconds)
toaster.info('Quick message', null, 2000);

// Long notification (10 seconds)
toaster.warning('Important message', 'Please read carefully.', 10000);

// Persistent (must be closed manually)
toaster.info('Persistent message', 'This stays until you close it.', 0);
```

### Loading States

```javascript
// Show loading toast
const loadingId = toaster.info('Loading...', 'Please wait', 0);

// Simulate async operation
setTimeout(() => {
  // Dismiss loading toast
  toaster.dismiss(loadingId);
  
  // Show success toast
  toaster.success('Complete!', 'Operation finished successfully.');
}, 3000);
```

### Multiple Toasts

```javascript
// Show multiple toasts with stagger
setTimeout(() => toaster.success('Step 1', 'First action completed'), 0);
setTimeout(() => toaster.success('Step 2', 'Second action completed'), 200);
setTimeout(() => toaster.success('Step 3', 'Third action completed'), 400);
```

### Form Validation

```javascript
function validateForm(form) {
  const errors = [];
  
  if (!form.email.value) {
    errors.push('Email is required');
  }
  
  if (!form.password.value) {
    errors.push('Password is required');
  }
  
  if (errors.length > 0) {
    toaster.error(
      'Validation failed',
      errors.join('. '),
      6000
    );
    return false;
  }
  
  toaster.success('Form submitted!', 'Your data has been saved.');
  return true;
}
```

### Network Status

```javascript
// Monitor online/offline status
window.addEventListener('offline', () => {
  toaster.error(
    'Connection lost',
    'You are currently offline. Changes will be saved when connection is restored.',
    0  // persistent
  );
});

window.addEventListener('online', () => {
  toaster.success('Back online', 'Connection restored.');
});
```

## Styling

The toast component uses CSS custom properties that can be customized:

```css
ui-toast {
  --toast-success: #10b981;
  --toast-error: #ef4444;
  --toast-warning: #f59e0b;
  --toast-info: #3b82f6;
  --toast-bg: rgba(255, 255, 255, 0.95);
  --toast-blur: blur(12px);
  --toast-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  --toast-border: rgba(255, 255, 255, 0.3);
  --toast-text: #1e293b;
  --toast-radius: 14px;
  --toast-icon-size: 20px;
}
```

## Accessibility

The toast component includes proper ARIA attributes:

- `role="alert"` for screen readers
- `aria-live="polite"` for non-intrusive announcements
- `aria-label` on close button
- Keyboard accessible close buttons

## Browser Support

- Modern browsers with Web Components support
- Requires CSS backdrop-filter for glassmorphic effect (gracefully degrades)
- Mobile responsive (stacks properly on small screens)

## Best Practices

1. **Don't overuse**: Limit to important notifications
2. **Keep it brief**: Short titles and descriptions
3. **Appropriate duration**: 3-5 seconds for reading
4. **Right position**: Consider your UI layout
5. **Meaningful types**: Use appropriate toast types for context
6. **Respect user**: Don't show too many toasts at once
7. **Persistent for actions**: Use duration=0 for important messages requiring acknowledgment

## TypeScript

```typescript
import { UIToast, ToastConfig, ToastType, ToastPosition } from './components/toast';

const toaster = document.querySelector('ui-toast') as UIToast;

const config: ToastConfig = {
  title: 'Success',
  description: 'Operation completed',
  type: 'success',
  duration: 5000,
  closable: true
};

const toastId: string = toaster.show(config);
```

## Related Components

- [ui-modal](./MODAL.md) - For blocking interactions
- [ui-card](./CARD.md) - For static information display

## License

Part of the UI Component Library.
