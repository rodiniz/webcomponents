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

## Use Layout Only On Protected Routes

A common app flow is:

- `/login` uses a focused screen without `ui-layout`
- authenticated routes (like `/dashboard`) render inside `ui-layout`

This keeps login minimal and reserves the app shell for the private area.

### Route Setup Example

```typescript
import { createRouter } from '@diniz/webcomponents';

const isAuthenticated = () => Boolean(localStorage.getItem('auth_token'));

const routes = [
  {
    path: '/login',
    component: 'page-login',
    load: () => import('./pages/login')
  },
  {
    path: '/dashboard',
    component: 'page-dashboard',
    load: () => import('./pages/dashboard'),
    guard: () => isAuthenticated()
  }
];

const router = createRouter(routes, '#app');
window.addEventListener('popstate', () => router());
router();
```

### Login Page (No Layout)

```typescript
import { LitComponent } from '@/core/lit-component';
import { css, html, unsafeCSS } from 'lit';
import themeStyles from '@/styles/theme.css?inline';
import '@/shared/components/card';

export class PageLogin extends LitComponent {
  static styles = [unsafeCSS(themeStyles), css`
    :host { display: grid; min-height: 100vh; place-items: center; padding: 1rem; background: hsl(var(--muted)); }
    .login-content { width: min(36rem, 100%); }
    .login-card { --card-padding: 2.375rem; }
    .login-title { margin: 0 0 1.5rem; text-align: center; font-size: 1.75rem; }
    .login-form { display: grid; gap: 1.25rem; }
    .login-form input { height: 3.375rem; font-size: 1.125rem; }
    .login-form button { width: 100%; }
    .signup { margin: 1.5rem 0 0; color: hsl(var(--muted-foreground)); text-align: center; }
  `];

  private async handleLogin(event: Event) {
    event.preventDefault();

    // Replace with real authentication call.
    localStorage.setItem('auth_token', 'demo-token');

    history.pushState(null, '', '/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return html`
      <div class="login-content">
        <ui-card class="login-card" shadow elevation="sm">
          <h1 class="login-title">Login</h1>
          <form class="login-form" @submit=${this.handleLogin}>
            <input class="input-field" name="email" type="email" placeholder="Email" aria-label="Email" autocomplete="email" required>
            <input class="input-field" name="password" type="password" placeholder="Password" aria-label="Password" autocomplete="current-password" required>
            <button class="btn primary lg" type="submit">Login</button>
          </form>
        </ui-card>
        <p class="signup">Need an account? <a href="/signup">Sign up</a></p>
      </div>
    `;
  }
}

customElements.define('page-login', PageLogin);
```

### Dashboard Page (Inside `ui-layout`)

```typescript
import { LitComponent } from '@/core/lit-component';
import { html } from 'lit';

export class PageDashboard extends LitComponent {
  private handleLogout() {
    localStorage.removeItem('auth_token');
    history.pushState(null, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return html`
      <ui-layout>
        <ui-layout-header>
          <h2>Dashboard</h2>
          <ui-button variant="ghost" @click=${this.handleLogout}>Logout</ui-button>
        </ui-layout-header>

        <ui-layout-sidebar>
          <a href="/dashboard" data-link>Overview</a>
          <a href="/dashboard/reports" data-link>Reports</a>
        </ui-layout-sidebar>

        <ui-layout-content>
          <p>Welcome back. This area uses the application layout.</p>
        </ui-layout-content>
      </ui-layout>
    `;
  }
}

customElements.define('page-dashboard', PageDashboard);
```

### Optional Guard For `/login`

If the user is already authenticated, redirect them away from login:

```typescript
{
  path: '/login',
  component: 'page-login',
  load: () => import('./pages/login'),
  guard: () => {
    if (localStorage.getItem('auth_token')) {
      history.pushState(null, '', '/dashboard');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return false;
    }

    return true;
  }
}
```

## Avoid Repeating Layout Per Page

You do not need to duplicate `ui-layout` in every protected page.

Use one shell component that owns header/sidebar/content, then swap only the page content.

### App Shell Pattern

```typescript
import { LitComponent } from '@/core/lit-component';
import { html } from 'lit';

type ProtectedView = 'dashboard' | 'reports' | 'settings';

export class AppShell extends LitComponent {
  private getCurrentView(): ProtectedView {
    if (location.pathname.startsWith('/reports')) return 'reports';
    if (location.pathname.startsWith('/settings')) return 'settings';
    return 'dashboard';
  }

  private renderView() {
    const view = this.getCurrentView();

    if (view === 'reports') {
      return html`<page-reports></page-reports>`;
    }

    if (view === 'settings') {
      return html`<page-settings></page-settings>`;
    }

    return html`<page-dashboard-home></page-dashboard-home>`;
  }

  render() {
    return html`
      <ui-layout>
        <ui-layout-header>
          <h2>My App</h2>
        </ui-layout-header>

        <ui-layout-sidebar>
          <a href="/dashboard" data-link>Dashboard</a>
          <a href="/reports" data-link>Reports</a>
          <a href="/settings" data-link>Settings</a>
        </ui-layout-sidebar>

        <ui-layout-content>
          ${this.renderView()}
        </ui-layout-content>
      </ui-layout>
    `;
  }
}

customElements.define('app-shell', AppShell);
```

### Router Mapping With One Shell

All authenticated routes can point to the same shell component:

```typescript
const isAuthenticated = () => Boolean(localStorage.getItem('auth_token'));

const routes = [
  {
    path: '/login',
    component: 'page-login',
    load: () => import('./pages/login')
  },
  {
    path: '/dashboard',
    component: 'app-shell',
    load: () => import('./pages/app-shell'),
    guard: () => isAuthenticated()
  },
  {
    path: '/reports',
    component: 'app-shell',
    load: () => import('./pages/app-shell'),
    guard: () => isAuthenticated()
  },
  {
    path: '/settings',
    component: 'app-shell',
    load: () => import('./pages/app-shell'),
    guard: () => isAuthenticated()
  }
];
```

This approach keeps login outside the shell and reuses one layout for the full private area.

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

## Dashboard Shell Example

Use a two-column CSS grid for a dashboard with a fixed navigation rail, an app bar, and a flexible workspace. This standalone HTML example follows the layout in the screenshot and can be adapted to any page content.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dashboard</title>
  <style>
    :root {
      color: #171717;
      background: #fff;
      font: 14px/1.5 system-ui, sans-serif;
    }

    * { box-sizing: border-box; }
    body { margin: 0; min-width: 320px; }

    .app-shell {
      display: grid;
      grid-template-columns: 240px minmax(0, 1fr);
      min-height: 100vh;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      padding: 14px 8px;
      border-right: 1px solid #e5e5e5;
      background: #fafafa;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 9px;
      margin: 0 6px 20px;
      color: inherit;
      text-decoration: none;
    }

    .brand-mark {
      display: grid;
      width: 28px;
      aspect-ratio: 1;
      place-items: center;
      border-radius: 5px;
      background: #171717;
      color: #fff;
      font-weight: 700;
    }

    .brand-name, .brand-caption { display: block; }
    .brand-name { font-weight: 600; }
    .brand-caption { color: #737373; font-size: 12px; }

    .nav-group { display: grid; gap: 2px; }
    .nav-group + .nav-group { margin-top: 20px; }
    .nav-group.support { margin-top: auto; }
    .nav-label {
      margin: 0;
      padding: 8px 10px 4px;
      color: #737373;
      font-size: 12px;
    }

    .nav-link {
      display: block;
      padding: 5px 10px;
      border-radius: 5px;
      color: inherit;
      text-decoration: none;
    }

    .nav-link:hover { background: #f0f0f0; }
    .nav-link[aria-current="page"] {
      background: #f0f0f0;
      font-weight: 500;
    }

    .page { display: flex; min-width: 0; flex-direction: column; }
    .app-bar {
      display: flex;
      min-height: 54px;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      border-bottom: 1px solid #e5e5e5;
    }

    .app-bar h1 { margin: 0; font-size: 16px; font-weight: 600; }
    .user-avatar {
      width: 32px;
      aspect-ratio: 1;
      border: 0;
      border-radius: 50%;
      background: #f0f0f0;
      color: #171717;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }

    .workspace { flex: 1; padding: 14px; }
    .workspace-canvas {
      min-height: calc(100vh - 82px);
      border-radius: 10px;
      background: #fafafa;
    }

    @media (max-width: 640px) {
      .app-shell { grid-template-columns: 1fr; }
      .sidebar {
        min-height: auto;
        padding: 10px;
        border-right: 0;
        border-bottom: 1px solid #e5e5e5;
      }
      .brand { margin-bottom: 10px; }
      .nav-group { display: flex; overflow-x: auto; }
      .nav-group + .nav-group { margin-top: 6px; }
      .nav-group.support { display: none; }
      .nav-label { display: none; }
      .nav-link { flex: 0 0 auto; }
      .app-bar { min-height: 48px; padding: 0 16px; }
      .workspace { padding: 10px; }
      .workspace-canvas { min-height: 60vh; }
    }
  </style>
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar">
      <a class="brand" href="#overview">
        <span class="brand-mark" aria-hidden="true">S</span>
        <span>
          <span class="brand-name">Shadcnblocks</span>
          <span class="brand-caption">Build your app</span>
        </span>
      </a>

      <nav class="nav-group" aria-label="Main navigation">
        <a class="nav-link" href="#overview">Overview</a>
        <a class="nav-link" href="#dashboard" aria-current="page">Dashboard</a>
        <a class="nav-link" href="#tasks">Tasks</a>
        <a class="nav-link" href="#roadmap">Roadmap</a>
      </nav>

      <div class="nav-group support">
        <p class="nav-label">Support</p>
        <a class="nav-link" href="#help">Help Center</a>
        <a class="nav-link" href="#settings">Settings</a>
      </div>
    </aside>

    <main class="page">
      <header class="app-bar">
        <h1>Dashboard</h1>
        <button class="user-avatar" type="button" aria-label="Open account menu">JD</button>
      </header>
      <section class="workspace" aria-label="Dashboard workspace">
        <div class="workspace-canvas"></div>
      </section>
    </main>
  </div>
</body>
</html>
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
