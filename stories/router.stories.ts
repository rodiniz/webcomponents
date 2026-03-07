import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Core/Router',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const testMatchRoute = (routePath: string, path: string): boolean | Record<string, string> => {
  const routeParts = routePath.split('/');
  const pathParts = path.split('/');

  if (routeParts.length !== pathParts.length) {
    return false;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const pathPart = pathParts[i];

    if (routePart.startsWith(':')) {
      params[routePart.slice(1)] = pathPart;
    } else if (routePart !== pathPart) {
      return false;
    }
  }

  return params;
};

export const StaticRoute: Story = {
  render: () => html`
    <div>
      <h3>Static Route: /home</h3>
      <pre><code>routePath: '/home'
path: '/home'
result: ${JSON.stringify(testMatchRoute('/home', '/home'))}</code></pre>
      
      <h3>Mismatch</h3>
      <pre><code>routePath: '/home'
path: '/about'
result: ${JSON.stringify(testMatchRoute('/home', '/about'))}</code></pre>
    </div>
  `
};

export const ParameterizedRoute: Story = {
  render: () => html`
    <div>
      <h3>Route with ID parameter: /recording/:id</h3>
      <pre><code>routePath: '/recording/:id'
path: '/recording/123'
result: ${JSON.stringify(testMatchRoute('/recording/:id', '/recording/123'))}</code></pre>

      <h3>Different ID</h3>
      <pre><code>routePath: '/recording/:id'
path: '/recording/abc'
result: ${JSON.stringify(testMatchRoute('/recording/:id', '/recording/abc'))}</code></pre>

      <h3>Length mismatch (no match)</h3>
      <pre><code>routePath: '/recording/:id'
path: '/recording/123/edit'
result: ${JSON.stringify(testMatchRoute('/recording/:id', '/recording/123/edit'))}</code></pre>
    </div>
  `
};

export const MultipleParameters: Story = {
  render: () => html`
    <div>
      <h3>Multiple parameters: /users/:userId/posts/:postId</h3>
      <pre><code>routePath: '/users/:userId/posts/:postId'
path: '/users/1/posts/42'
result: ${JSON.stringify(testMatchRoute('/users/:userId/posts/:postId', '/users/1/posts/42'))}</code></pre>

      <h3>With string IDs</h3>
      <pre><code>routePath: '/users/:userId/posts/:postId'
path: '/users/abc/posts/xyz'
result: ${JSON.stringify(testMatchRoute('/users/:userId/posts/:postId', '/users/abc/posts/xyz'))}</code></pre>
    </div>
  `
};

export const NestedParameterizedRoute: Story = {
  render: () => html`
    <div>
      <h3>Nested route: /dashboard/:section/analytics</h3>
      <pre><code>routePath: '/dashboard/:section/analytics'
path: '/dashboard/sales/analytics'
result: ${JSON.stringify(testMatchRoute('/dashboard/:section/analytics', '/dashboard/sales/analytics'))}</code></pre>

      <h3>Different section</h3>
      <pre><code>routePath: '/dashboard/:section/analytics'
path: '/dashboard/users/analytics'
result: ${JSON.stringify(testMatchRoute('/dashboard/:section/analytics', '/dashboard/users/analytics'))}</code></pre>
    </div>
  `
};

export const RootRoute: Story = {
  render: () => html`
    <div>
      <h3>Root route: /</h3>
      <pre><code>routePath: '/'
path: '/'
result: ${JSON.stringify(testMatchRoute('/', '/'))}</code></pre>
    </div>
  `
};

export const PathWithQueryParams: Story = {
  render: () => html`
    <div>
      <h3>Note: Query params are NOT handled by matchRoute</h3>
      <p>matchRoute only handles path parameters. Query strings (?id=123) should be handled separately.</p>
      <pre><code>routePath: '/recording/:id'
path: '/recording/123?token=abc'
result: ${JSON.stringify(testMatchRoute('/recording/:id', '/recording/123?token=abc'))}</code></pre>
    </div>
  `
};
