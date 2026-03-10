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

**createRouter(routes, appSelector)**

- `routes` - Array of Route objects
- `appSelector` - CSS selector for the app outlet (default: `'#app'`)

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

```typescript
import { createRouter } from '@/core/router-lib';

// Define routes
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

// Create router
const router = createRouter(routes, '#app');

// HTML markup
const html = `
  <nav>
    <a href="/" data-link>Home</a>
    <a href="/about" data-link>About</a>
    <a href="/recording/42" data-link>Recording</a>
    <a href="/admin" data-link>Admin</a>
  </nav>
  <div id="app"></div>
`;
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

### createRouter(routes, appSelector?)

Creates and initializes the router.

**Parameters:**
- `routes: Route[]` - Array of route definitions
- `appSelector?: string` - CSS selector for the outlet (default: `'#app'`)

**Returns:** `() => Promise<void>` - The router function (handles navigation)

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
