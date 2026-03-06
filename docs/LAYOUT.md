# Layout Components

Layout primitives for app shells: header, sidebar, main content, and footer.

## Components

- `ui-layout` - container that arranges children
- `ui-layout-header` - top bar
- `ui-layout-sidebar` - left sidebar
- `ui-layout-content` - main content area
- `ui-layout-footer` - bottom bar

## Basic Usage

```html
<ui-layout>
  <ui-layout-header>
    <h1>App Title</h1>
  </ui-layout-header>

  <ui-layout-content>
    <p>Main content goes here.</p>
  </ui-layout-content>

  <ui-layout-footer>
    <small>Footer</small>
  </ui-layout-footer>
</ui-layout>
```

## With Sidebar

```html
<ui-layout>
  <ui-layout-sidebar>
    <div class="sidebar-section">
      <div class="sidebar-label">Navigation</div>
      <div class="sidebar-item">Dashboard</div>
      <div class="sidebar-item">Reports</div>
    </div>
  </ui-layout-sidebar>

  <ui-layout-content>
    <p>Content area</p>
  </ui-layout-content>
</ui-layout>
```

## Layout Direction

`ui-layout` auto-detects direction:

- If a sidebar is present, it uses a horizontal layout.
- If only header/footer are present, it uses a vertical layout.

You can override with the `direction` attribute:

```html
<ui-layout direction="horizontal">
  <ui-layout-sidebar>...</ui-layout-sidebar>
  <ui-layout-content>...</ui-layout-content>
</ui-layout>
```

## Styling

The layout components use theme tokens:

- `ui-layout-header` uses `--color-header`
- `ui-layout-footer` uses `--color-footer`
- `ui-layout-sidebar` uses `--color-nav-bg` and `--color-nav-text`

You can override them locally:

```css
ui-layout-header {
  --color-header: hsl(var(--primary-h) 45% 95%);
}

ui-layout-sidebar {
  --color-nav-bg: #111827;
  --color-nav-text: #ffffff;
}
```

## Notes

- `ui-layout-content` is an alias for `ui-layout-main`.
- Sidebar items can be styled using the `.sidebar-section`, `.sidebar-label`, and `.sidebar-item` classes.
