# ui-sidebar Component

Navigation sidebar with brand section, collapsible sections, and responsive design. The sidebar is fully themeable and supports custom colors and fonts.

## Basic Usage

```html
<ui-sidebar
  brand="My App"
  version="v1.0"
  .items=${[
    { icon: 'home', label: 'Home', href: '/' },
    { icon: 'settings', label: 'Settings', href: '/settings' }
  ]}
  .footerItems=${[
    { icon: 'github', label: 'GitHub', href: 'https://github.com' }
  ]}
></ui-sidebar>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `brand` | string | `'App'` | Brand/app name displayed in sidebar header |
| `version` | string | `'v1.0'` | Version string displayed below brand name |
| `items` | array | `[]` | Navigation items (main section) |
| `footerItems` | array | `[]` | Navigation items (footer section) |

## Item Structure

Each item in `items` or `footerItems` should have:

```typescript
{
  icon: string;      // Icon name from ui-icons
  label: string;     // Display label
  href?: string;     // Optional link URL
}
```

### Example:
```javascript
const items = [
  { icon: 'home', label: 'Dashboard', href: '/dashboard' },
  { icon: 'users', label: 'Users', href: '/users' },
  { icon: 'settings', label: 'Settings', href: '/settings' },
  { icon: 'help-circle', label: 'Help', href: '/help' }
];

const footerItems = [
  { icon: 'github', label: 'GitHub', href: 'https://github.com' },
  { icon: 'twitter', label: 'Twitter', href: 'https://twitter.com' }
];
```

## Events

### nav Event

Fired when a navigation item is clicked.

```javascript
const sidebar = document.querySelector('ui-sidebar');

sidebar.addEventListener('nav', (e) => {
  const { href } = e.detail;
  console.log('Navigation to:', href);
  // Handle navigation
  window.location.href = href;
});
```

## Styling

### CSS Custom Properties

The sidebar uses these CSS custom properties for theming:

| Property | Default | Description |
|----------|---------|-------------|
| `--sidebar-bg` | `linear-gradient(180deg, #1f2937 0%, #111827 100%)` | Sidebar background |
| `--sidebar-text` | `#ffffff` | Text color |
| `--sidebar-border` | `rgba(255, 255, 255, 0.08)` | Border color |
| `--sidebar-hover` | `rgba(255, 255, 255, 0.06)` | Hover background |

### Default Styling

The sidebar has built-in dark theme styling optimized for contrast and readability:

- **Background**: Dark gradient
- **Text**: Light white (#ffffff)
- **Border**: Subtle light border
- **Active state**: Purple highlight with accent bar
- **Hover state**: Subtle light background

## Customization

### Custom Background Color

Override the sidebar background using CSS custom properties:

```css
ui-sidebar {
  --sidebar-bg: #1e40af; /* Full custom background color */
}
```

Or with a gradient:

```css
ui-sidebar {
  --sidebar-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Custom Font Color

Override the text color:

```css
ui-sidebar {
  --sidebar-text: #000000; /* Light background with dark text */
}
```

### Custom Hover & Border Colors

```css
ui-sidebar {
  --sidebar-hover: rgba(0, 0, 0, 0.1);
  --sidebar-border: rgba(0, 0, 0, 0.1);
}
```

## Complete Custom Theme Example

### Light Theme

```css
ui-sidebar {
  --sidebar-bg: #f8fafc;
  --sidebar-text: #1e293b;
  --sidebar-border: #e2e8f0;
  --sidebar-hover: #f1f5f9;
}
```

### Blue Theme

```css
ui-sidebar {
  --sidebar-bg: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  --sidebar-text: #ffffff;
  --sidebar-border: rgba(255, 255, 255, 0.15);
  --sidebar-hover: rgba(255, 255, 255, 0.1);
}
```

### Teal Theme

```css
ui-sidebar {
  --sidebar-bg: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
  --sidebar-text: #ffffff;
  --sidebar-border: rgba(255, 255, 255, 0.1);
  --sidebar-hover: rgba(255, 255, 255, 0.08);
}
```

### Dark Slate Theme

```css
ui-sidebar {
  --sidebar-bg: linear-gradient(180deg, #334155 0%, #1e293b 100%);
  --sidebar-text: #f1f5f9;
  --sidebar-border: rgba(255, 255, 255, 0.05);
  --sidebar-hover: rgba(255, 255, 255, 0.04);
}
```

## Complete Example with Navigation

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      display: flex;
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    main {
      flex: 1;
      padding: 24px;
      background: #f8fafc;
    }

    /* Custom sidebar styling */
    ui-sidebar {
      --sidebar-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      --sidebar-text: #ffffff;
      --sidebar-border: rgba(255, 255, 255, 0.15);
      --sidebar-hover: rgba(255, 255, 255, 0.1);
    }
  </style>
</head>
<body>
  <ui-sidebar
    id="app-sidebar"
    brand="Dashboard"
    version="v2.1"
    .items=${[
      { icon: 'home', label: 'Dashboard', href: '/' },
      { icon: 'bar-chart-2', label: 'Analytics', href: '/analytics' },
      { icon: 'users', label: 'Team', href: '/team' },
      { icon: 'settings', label: 'Settings', href: '/settings' }
    ]}
    .footerItems=${[
      { icon: 'github', label: 'Repository', href: 'https://github.com' },
      { icon: 'mail', label: 'Support', href: 'mailto:support@example.com' }
    ]}
  ></ui-sidebar>

  <main>
    <h1>Welcome</h1>
    <p>Select an item from the sidebar to navigate.</p>
  </main>

  <script>
    const sidebar = document.querySelector('ui-sidebar');

    sidebar.addEventListener('nav', (e) => {
      const { href } = e.detail;
      console.log('Navigating to:', href);
      
      // Handle navigation
      if (href.startsWith('http')) {
        window.open(href, '_blank');
      } else if (href.startsWith('mailto:')) {
        window.location.href = href;
      } else {
        // For local navigation, handle as needed
        console.log('Navigate to:', href);
      }
    });
  </script>
</body>
</html>
```

## Typography Customization

The sidebar uses these font families by default:

- **Brand text**: `"Sora", system-ui, sans-serif` (600 weight, 16px)
- **Version text**: `"Inter", system-ui, sans-serif` (500 weight, 10px)
- **Navigation links**: `"Inter", system-ui, sans-serif` (500 weight, 14px)

To customize fonts across the entire sidebar, add font imports to your page:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&family=Roboto:wght@500&display=swap" rel="stylesheet">
```

Then override in CSS:

```css
ui-sidebar {
  --sidebar-font-brand: "Poppins", sans-serif;
  --sidebar-font-text: "Roboto", sans-serif;
}
```

## Active State Styling

When a navigation link is clicked, it receives the `.is-active` class. The active state includes:

- Background color: Primary color with 15% opacity
- Text color: Primary accent color
- Left indicator bar: 3px primary color bar

You can customize the active state colors by using the primary theme color:

```css
ui-sidebar {
  /**
   * The active state uses the primary theme color automatically.
   * For custom active colors, override these in TypeScript or use
   * CSS filters to adjust the component styles.
   */
}
```

## Responsive Behavior

The sidebar has a fixed width of **280px** by default:

```css
ui-sidebar {
  width: 280px; /* Fixed width */
}
```

To make it responsive, wrap it in a container:

```css
.sidebar-wrapper {
  width: 100%;
  max-width: 280px;
}

/* On mobile */
@media (max-width: 768px) {
  .sidebar-wrapper {
    display: none; /* Hide on mobile or make drawer */
  }
}
```

## Known Limitations

- The sidebar is currently always visible (no collapse/drawer mode)
- Navigation is handled via external listeners on the `nav` event
- Font customization requires CSS custom properties (see Typography section)

## Related Components

- [ui-table](TABLE.md) - Data table with sorting and pagination
- [ui-button](BUTTON.md) - Button component with variants

## Common Patterns

### With Router Integration

```javascript
import { Router } from 'your-router-library';

const router = new Router();
const sidebar = document.querySelector('ui-sidebar');

sidebar.addEventListener('nav', (e) => {
  const { href } = e.detail;
  router.navigate(href);
});
```

### Dynamic Items

```javascript
const sidebar = document.querySelector('ui-sidebar');

// Update items dynamically
async function loadNavigation() {
  const response = await fetch('/api/navigation');
  const items = await response.json();
  sidebar.items = items;
}

loadNavigation();
```

### With Authentication State

```javascript
const sidebar = document.querySelector('ui-sidebar');

function updateSidebar() {
  const isLoggedIn = !!localStorage.getItem('token');
  const items = isLoggedIn
    ? [
        { icon: 'home', label: 'Dashboard', href: '/dashboard' },
        { icon: 'log-out', label: 'Logout', href: '/logout' }
      ]
    : [
        { icon: 'log-in', label: 'Login', href: '/login' }
      ];

  sidebar.items = items;
}

updateSidebar();
```

