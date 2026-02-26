# UI Date Picker Component

A flexible and customizable date picker web component with multiple date format options.

## Features

- ✅ Multiple date format options (YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY, DD-MM-YYYY, MM-DD-YYYY)
- ✅ Min/max date constraints
- ✅ Disabled state support
- ✅ Formatted value display
- ✅ Custom events for date changes
- ✅ Programmatic API
- ✅ Follows existing component patterns
- ✅ Styled with theme CSS variables

## Usage

### Basic Example

```html
<ui-date-picker format="DD/MM/YYYY"></ui-date-picker>
```

### With Attributes

```html
<ui-date-picker 
  format="DD/MM/YYYY"
  value="2026-02-26"
  min="2026-01-01"
  max="2026-12-31"
  disabled
></ui-date-picker>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `format` | string | `YYYY-MM-DD` | Date display format |
| `value` | string | `""` | Date value in ISO format (YYYY-MM-DD) |
| `min` | string | `""` | Minimum allowed date (ISO format) |
| `max` | string | `""` | Maximum allowed date (ISO format) |
| `disabled` | boolean | `false` | Disable the date picker |
| `placeholder` | string | `format` | Placeholder text |

## Supported Formats

- `YYYY-MM-DD` - ISO format (e.g., 2026-02-26)
- `DD/MM/YYYY` - European format (e.g., 26/02/2026)
- `MM/DD/YYYY` - US format (e.g., 02/26/2026)
- `DD-MM-YYYY` - Dash-separated European (e.g., 26-02-2026)
- `MM-DD-YYYY` - Dash-separated US (e.g., 02-26-2026)

## Events

### `date-change`
Fired when the selected date changes.

```javascript
picker.addEventListener('date-change', (e) => {
  console.log(e.detail.value);          // ISO format: "2026-02-26"
  console.log(e.detail.formattedValue); // Formatted: "26/02/2026"
  console.log(e.detail.format);         // Format: "DD/MM/YYYY"
});
```

### `date-input`
Fired when the user types or interacts with the input.

```javascript
picker.addEventListener('date-input', (e) => {
  console.log(e.detail.value);
  console.log(e.detail.formattedValue);
});
```

## Programmatic API

### Methods

```javascript
const picker = document.querySelector('ui-date-picker');

// Get ISO value (YYYY-MM-DD)
const isoValue = picker.getISOValue();

// Get formatted value
const formatted = picker.getFormattedValue();

// Set value (ISO format)
picker.setValue('2026-03-15');

// Clear the date
picker.clear();
```

## Example with JavaScript

```html
<ui-date-picker id="myPicker" format="DD/MM/YYYY"></ui-date-picker>

<script type="module">
  import './src/shared/components/date-picker.ts';

  const picker = document.getElementById('myPicker');

  // Listen to changes
  picker.addEventListener('date-change', (e) => {
    console.log('Selected date:', e.detail.formattedValue);
  });

  // Set initial value
  picker.setValue('2026-02-26');

  // Get current value
  console.log('Current date:', picker.getFormattedValue());
</script>
```

## Demo

To view the interactive demo:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the demo page:
   - Navigate to `http://localhost:5173/date-picker-demo.html`

## Styling

The component uses CSS custom properties from the theme:

```css
--color-primary
--color-ink
--color-border
--color-border-strong
--color-muted
--radius-md
```

You can customize the appearance by overriding these variables or using the `::part` selector:

```css
ui-date-picker::part(input) {
  /* Custom styles for the input element */
}
```

## Integration

To use in your components:

```typescript
import './shared/components/date-picker';

// Now you can use <ui-date-picker> in your templates
```

## Browser Support

Compatible with all modern browsers that support:
- Web Components (Custom Elements, Shadow DOM)
- HTML5 date input
- ES6+ JavaScript
