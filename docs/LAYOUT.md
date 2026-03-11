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
import { createRouter } from '@/core/router-lib';

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
import { html } from 'lit';

export class PageLogin extends LitComponent {
  private async handleLogin(event: Event) {
    event.preventDefault();

    // Replace with real authentication call.
    localStorage.setItem('auth_token', 'demo-token');

    history.pushState(null, '', '/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return html`
      <section class="login-screen">
        <h1>Sign in</h1>
        <form @submit=${this.handleLogin}>
          <ui-input label="Email" type="email" required></ui-input>
          <ui-input label="Password" type="password" required></ui-input>
          <ui-button type="submit" variant="primary">Login</ui-button>
        </form>
      </section>
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
