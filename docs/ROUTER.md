# Router Documentation

## Overview

The Router is a lightweight, client-side routing library designed for Web Components applications. It enables single-page application (SPA) navigation with support for dynamic route matching, path parameters, and route guards.

The router is built on top of the browser's History API and handles navigation through `data-link` attributes on clickable elements.

## Core Concepts

### Routes

A route defines a path pattern and the component to render when that path is accessed. Each route consists of:

- **path** - The URL path pattern (e.g., `/home`, `/users/:id`)
- **component** - The Web Component tag name to render
- **load** - An async function to load the component module
- **guard** - (Optional) A function to protect the route with conditional access

### Route Matching

The router uses path pattern matching to determine which component to render:
- **Static routes** - Exact path matches (e.g., `/home` matches only `/home`)
- **Dynamic routes** - Support path parameters with `:paramName` syntax
- Parameters are extracted and made available to the routed component

### Navigation

There are two primary ways to trigger navigation:

1. **Browser Navigation** - Using back/forward buttons (handled via `popstate` events)
2. **Link Clicks** - Clicking elements with `data-link` attribute

## Creating a Router

### Basic Setup

```typescript
import { createRouter } from '@/core/router-lib';

const routes = [
  {
    path: '/',
    component: 'page-home',
    load: () => import('./pages/home')
  },
  {
    path: '/about',
    component: 'page-about',
    load: () => import('./pages/about')
  }
];

const router = createRouter(routes);
```

### Parameters

**createRouter(routes, appSelectorOrOptions)**

- `routes` — Array of `Route` objects
- `appSelectorOrOptions` — Either a CSS selector string (default: `'#app'`) or a `RouterOptions` object

### RouterOptions

```typescript
type RouterOptions = {
  /** CSS selector for the router outlet element. Default: '#app' */
  outlet?: string;
  /**
   * Base path prefix this router is responsible for.
   * Routes are matched relative to this base, enabling nested routers.
   * Example: basePath '/dashboard' makes route '/overview' match '/dashboard/overview'.
   * Default: '' (root router)
   */
  basePath?: string;
};
```

| Option | Type | Default | Description |
|---|---|---|---|
| `outlet` | `string` | `'#app'` | CSS selector for the element where components are rendered |
| `basePath` | `string` | `''` | Path prefix this router owns. Used to create nested (child) routers |

## Route Configuration

### Route Object

```typescript
type Route = {
  path: string;
  load: () => Promise<unknown>;
  component: string;
  guard?: () => boolean | Promise<boolean>;
};
```

## Wildcard Routes

Use `/*` as a suffix to match a path and all its descendants. This is required to hand off nested paths to a child router.

```typescript
{
  path: '/dashboard/*',
  component: 'page-dashboard',
  load: () => import('./pages/dashboard')
}
```

**Matching Examples:**
- ✅ `/dashboard` matches
- ✅ `/dashboard/overview` matches
- ✅ `/dashboard/reports/monthly` matches
- ❌ `/settings` does not match

---

## Static Routes

Static routes match an exact path without parameters.

```typescript
{
  path: '/home',
  component: 'page-home',
  load: () => import('./pages/home')
}
```

**Matching Examples:**
- ✅ `/home` matches
- ❌ `/home/` does not match
- ❌ `/home/edit` does not match

## Dynamic Routes with Parameters

Use `:paramName` syntax to define dynamic segments in routes.

```typescript
{
  path: '/recording/:id',
  component: 'page-recording',
  load: () => import('./pages/recording')
}
```

**Matching Examples:**
- ✅ `/recording/123` matches with `{ id: '123' }`
- ✅ `/recording/abc` matches with `{ id: 'abc' }`
- ❌ `/recording` does not match
- ❌ `/recording/123/edit` does not match

### Multiple Parameters

```typescript
{
  path: '/users/:userId/posts/:postId',
  component: 'page-user-post',
  load: () => import('./pages/user-post')
}
```

**Matching Examples:**
- ✅ `/users/42/posts/123` matches with `{ userId: '42', postId: '123' }`
- ✅ `/users/john/posts/hello` matches with `{ userId: 'john', postId: 'hello' }`

### Nested Parameters

```typescript
{
  path: '/dashboard/:section/analytics',
  component: 'page-analytics',
  load: () => import('./pages/analytics')
}
```

**Matching Examples:**
- ✅ `/dashboard/sales/analytics` matches with `{ section: 'sales' }`
- ✅ `/dashboard/users/analytics` matches with `{ section: 'users' }`

## Nested Routers

You can create a second router inside a component — for example, inside a layout that has its own navigation area (tabs, sidebar sections). This is the typical pattern when using `ui-layout`.

### How It Works

1. The **outer router** uses a wildcard route (`/section/*`) to match the entry component.
2. The entry component creates an **inner router** with `basePath` set to that prefix.
3. The inner router only processes paths that start with its `basePath`; the outer router ignores them.
4. Each router renders into its own outlet element.

### Outer Router (app entry point)

```typescript
// main.ts
import { createRouter } from '@/core/router-lib';

createRouter([
  { path: '/',            component: 'page-home',      load: () => import('./pages/home') },
  { path: '/about',       component: 'page-about',     load: () => import('./pages/about') },
  // Wildcard: hand off anything under /dashboard to the inner router
  { path: '/dashboard/*', component: 'page-dashboard', load: () => import('./pages/dashboard') },
]);
```

### Inner Router (inside a Web Component with ui-layout)

```typescript
// pages/dashboard.ts
import { LitComponent } from '@/core/lit-component';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import { createRouter } from '@/core/router-lib';

@customElement('page-dashboard')
export class PageDashboard extends LitComponent {

  firstUpdated() {
    // Create the inner router AFTER the component is in the DOM
    createRouter([
      { path: '/',        component: 'dash-overview', load: () => import('./dash/overview') },
      { path: '/reports', component: 'dash-reports',  load: () => import('./dash/reports') },
      { path: '/users',   component: 'dash-users',    load: () => import('./dash/users') },
    ], {
      outlet:   '#dashboard-outlet', // outlet inside this component's shadow/light DOM
      basePath: '/dashboard',        // only handles paths starting with /dashboard
    });
  }

  render() {
    return html`
      <ui-layout>
        <ui-layout-sidebar>
          <nav>
            <a href="/dashboard"         data-link>Overview</a>
            <a href="/dashboard/reports" data-link>Reports</a>
            <a href="/dashboard/users"   data-link>Users</a>
          </nav>
        </ui-layout-sidebar>
        <ui-layout-main>
          <div id="dashboard-outlet"></div>
        </ui-layout-main>
      </ui-layout>
    `;
  }
}
```

### Navigation Scoping

Click events on `[data-link]` elements are automatically scoped:

- A link to `/about` is handled **only** by the outer router.
- A link to `/dashboard/reports` is handled **only** by the inner router (whose `basePath` is `/dashboard`).

This means both routers can coexist on the same page without interfering with each other.

### Initialisation Timing

A nested router created inside a component (long after `DOMContentLoaded`) will run immediately because `createRouter` checks `document.readyState` at call time:

- If the DOM is still loading → waits for `DOMContentLoaded`.
- If the DOM is already ready → runs the router function immediately.

Always create the inner router in `connectedCallback`, `firstUpdated`, or equivalent lifecycle hooks to ensure the outlet element exists before the router tries to render into it.

### Guards in Nested Routers

Guards work the same way inside a nested router:

```typescript
createRouter([
  {
    path: '/admin',
    component: 'dash-admin',
    load: () => import('./dash/admin'),
    guard: async () => {
      const user = await getUser();
      return user.role === 'admin';
    }
  }
], { outlet: '#dashboard-outlet', basePath: '/dashboard' });
```

When the guard returns `false`, the user is redirected to the nested root (`basePath + '/'`).

---

## Route Guards

Guards protect routes with conditional access logic. A guard function receives no parameters and should return `true` to allow access or `false` to deny it.

```typescript
{
  path: '/admin',
  component: 'page-admin',
  load: () => import('./pages/admin'),
  guard: () => isUserAdmin()
}
```

### Async Guards

Guards can be asynchronous:

```typescript
{
  path: '/settings',
  component: 'page-settings',
  load: () => import('./pages/settings'),
  guard: async () => {
    const user = await fetchUser();
    return user.isAuthenticated;
  }
}
```

### Guard Behavior

When a guard returns `false`:
1. The component does not render
2. The user is redirected to the home page (`/`)
3. The browser history is updated

## Navigation

### Using data-link Attribute

Add `data-link` attribute to any clickable element to enable client-side navigation:

```html
<a href="/home" data-link>Home</a>
<button href="/about" data-link>About</button>
```

**Benefits:**
- Prevents full page reload
- Updates URL without server request
- Maintains application state

### Browser Navigation

The router automatically listens to browser back/forward button clicks through the `popstate` event.

### Programmatic Navigation

While not directly exposed by the router, you can use the History API:

```typescript
import { buildPath } from '@/core/router-lib';

const fullPath = buildPath('/recording/123');
history.pushState(null, '', fullPath);
router(); // Manually trigger router
```

## Path Parameters in Components

Extract path parameters using the `getPathParams` function:

```typescript
import { getPathParams } from '@/core/router-lib';

export class PageRecording extends BaseComponent {
  connectedCallback() {
    const params = getPathParams('/recording/:id', location.pathname);
    const recordingId = params?.id;
  }
}
```

## Path Helpers

### getRoutePath(fullPath)

Extracts the route path, accounting for a base path configuration.

```typescript
import { getRoutePath } from '@/core/router-lib';

// With BASE_URL = '/'
getRoutePath('/home'); // Returns '/home'

// With BASE_URL = '/app'
getRoutePath('/app/home'); // Returns '/home'
```

### buildPath(routePath)

Constructs a full path by prepending the base path.

```typescript
import { buildPath } from '@/core/router-lib';

// With BASE_URL = '/'
buildPath('/home'); // Returns '/home'

// With BASE_URL = '/app'
buildPath('/home'); // Returns '/app/home'
```

## Base Path Configuration

The router respects the `BASE_URL` from Vite's import.meta.env. This is useful for hosting applications at a subpath.

```typescript
// vite.config.ts
export default {
  base: '/app/'
};
```

Routes continue to be defined relative to the root:

```typescript
// Still use '/' for the root of the app
{
  path: '/',
  component: 'page-home',
  load: () => import('./pages/home')
}

// But the browser URL becomes '/app/'
```

## Complete Example

### Single Router

```typescript
import { createRouter } from '@/core/router-lib';

const routes = [
  {
    path: '/',
    component: 'page-home',
    load: () => import('./pages/home')
  },
  {
    path: '/about',
    component: 'page-about',
    load: () => import('./pages/about')
  },
  {
    path: '/recording/:id',
    component: 'page-recording',
    load: () => import('./pages/recording')
  },
  {
    path: '/admin',
    component: 'page-admin',
    load: () => import('./pages/admin'),
    guard: () => isUserAdmin()
  },
  {
    path: '/users/:userId/posts/:postId',
    component: 'page-user-post',
    load: () => import('./pages/user-post')
  }
];

createRouter(routes, '#app');
```

### Nested Routers (two-level routing)

```typescript
// main.ts — outer router
import { createRouter } from '@/core/router-lib';

createRouter([
  { path: '/',            component: 'page-home',      load: () => import('./pages/home') },
  { path: '/about',       component: 'page-about',     load: () => import('./pages/about') },
  { path: '/dashboard/*', component: 'page-dashboard', load: () => import('./pages/dashboard') },
]);
```

```typescript
// pages/dashboard.ts — inner router inside ui-layout
import { LitComponent } from '@/core/lit-component';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import { createRouter } from '@/core/router-lib';

@customElement('page-dashboard')
export class PageDashboard extends LitComponent {

  firstUpdated() {
    createRouter([
      { path: '/',        component: 'dash-overview', load: () => import('./dash/overview') },
      { path: '/reports', component: 'dash-reports',  load: () => import('./dash/reports') },
    ], {
      outlet:   '#dash-outlet',
      basePath: '/dashboard',
    });
  }

  render() {
    return html`
      <ui-layout>
        <ui-layout-sidebar>
          <a href="/dashboard"         data-link>Overview</a>
          <a href="/dashboard/reports" data-link>Reports</a>
          <a href="/about"             data-link>About (outer)</a>
        </ui-layout-sidebar>
        <ui-layout-main>
          <div id="dash-outlet"></div>
        </ui-layout-main>
      </ui-layout>
    `;
  }
}
```

## Component Template

Web Components rendered by the router can access path parameters:

```typescript
import { LitComponent } from '@/core/lit-component';
import { getPathParams } from '@/core/router-lib';
import { html } from 'lit';

export class PageRecording extends LitComponent {
  private recordingId: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    const params = getPathParams('/recording/:id', location.pathname);
    this.recordingId = params?.id ?? null;
    this.requestUpdate();
  }

  render() {
    return html`<h1>Recording ${this.recordingId}</h1>`;
  }
}

customElements.define('page-recording', PageRecording);
```

## Route Precedence

Routes are evaluated in the order they are defined in the routes array. The first matching route is selected.

```typescript
const routes = [
  { path: '/users/:id', ... },  // Matches first
  { path: '/users/admin', ... } // Never matches because above is checked first
];
```

**Best Practice:** Define more specific routes before generic ones.

## Query Parameters

The router focuses on path parameters. Query parameters (`?key=value`) are not processed by the router automatically.

For query parameters, use the standard browser APIs:

```typescript
const params = new URLSearchParams(location.search);
const token = params.get('token'); // Get ?token=abc
```

## Error Handling

### No Matching Route

If no route matches the current path:
1. The user is redirected to the home route (`/`)
2. No component is rendered

### Failed Route Load

If the `load()` function throws an error, the navigation will not complete. Consider implementing error boundaries in your components.

## API Reference

### createRouter(routes, appSelectorOrOptions?)

Creates and initializes the router.

**Parameters:**
- `routes: Route[]` — Array of route definitions
- `appSelectorOrOptions?: string | RouterOptions` — Outlet selector string **or** a `RouterOptions` object (default: `'#app'`)

**Returns:** `() => Promise<void>` — The router function (handles navigation)

### RouterOptions

```typescript
type RouterOptions = {
  outlet?: string;   // Default: '#app'
  basePath?: string; // Default: '' (root)
};
```

### Route (type)

```typescript
type Route = {
  path: string;
  load: () => Promise<unknown>;
  component: string;
  guard?: () => boolean | Promise<boolean>;
};
```

### getPathParams(routePath, path)

Extracts parameters from a path using a route pattern.

**Parameters:**
- `routePath: string` - Route pattern (e.g., `/users/:id`)
- `path: string` - Actual path (e.g., `/users/42`)

**Returns:** `Record<string, string> | null` - Parameters object or null if no match

### getRoutePath(fullPath)

Extracts the route path from a full browser path.

**Parameters:**
- `fullPath: string` - Full path from `location.pathname`

**Returns:** `string` - Route path

### buildPath(routePath)

Constructs a full browser path from a route path.

**Parameters:**
- `routePath: string` - Route path (e.g., `/home`)

**Returns:** `string` - Full browser path

## Performance Considerations

- Routes are matched sequentially until a match is found
- Route guards are awaited, so use them carefully
- Components are loaded dynamically to keep bundle size small
- The router clears the previous component DOM when rendering a new one

## Browser Compatibility

The router uses the following browser APIs:
- [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) - Path navigation
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) - Component rendering
- [Dynamic Imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) - Lazy loading

Supported in all modern browsers (Chrome, Firefox, Safari, Edge).

## Troubleshooting

### Route Not Matching

- Check path segment count - routes must have the same number of segments
- Verify parameter syntax - use `:paramName` format
- Check route order - more specific routes must come before generic ones

### guard() Never Executes

- Guards are only checked after the route matches
- Ensure the route pattern matches your current path
- Check that the guard function is provided in the route definition

### Navigation Not Working

- Verify elements have `data-link` attribute
- Check that the outlet selector exists in the DOM
- Ensure route components are properly registered as custom elements

### Components Not Rendering

- Confirm the component is registered with `customElements.define()`
- Verify the `load()` function imports and exports the component
- Check browser console for import errors

### Nested Router Not Activating

- Ensure the outer router has a wildcard route (`/section/*`) for the section, not an exact path
- Verify `basePath` matches the prefix used in the wildcard route (`/dashboard` for `/dashboard/*`)
- Create the inner router inside `firstUpdated` or `connectedCallback`, **not** in the constructor — the outlet element must exist in the DOM first
- Double-check the `outlet` selector matches an element that's actually rendered by the component

### Both Routers React to the Same Link

- A nested router with a `basePath` will only intercept `[data-link]` clicks whose `href` starts with that base path
- If a link inside a nested component points to a root-level path (e.g., `/about`), the inner router will ignore it and the outer router will handle it normally
- If you see duplicate navigation, check that the `basePath` option is set on the inner router

### Inner Router Redirects to Wrong Path

- When a nested router finds no matching route, it redirects to `basePath + '/'` (e.g., `/dashboard/`)
- Ensure your routes array includes a `'/'` entry for the default view within the section
