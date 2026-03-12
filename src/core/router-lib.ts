import { buildPath, getRoutePath, getPathParams } from './navigation';

export { getPathParams };
export { buildPath, getRoutePath } from './navigation';

export type Route = {
  path: string;
  load: () => Promise<unknown>;
  component: string;
  guard?: () => boolean | Promise<boolean>; 
};

export type RouterOptions = {
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

function matchRoute(routePath: string, path: string): boolean | Record<string, string> {
  // Wildcard suffix: '/section/*' matches '/section' and '/section/anything/deep'
  if (routePath.endsWith('/*')) {
    const base = routePath.slice(0, -2);
    if (path === base || path.startsWith(base + '/')) {
      return {};
    }
    return false;
  }

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
}

export function createRouter(routes: Route[], appSelectorOrOptions: string | RouterOptions = '#app') {
  const options: RouterOptions = typeof appSelectorOrOptions === 'string'
    ? { outlet: appSelectorOrOptions }
    : appSelectorOrOptions;

  const appSelector = options.outlet ?? '#app';
  const rawBase = options.basePath ?? '';
  // Normalize: remove trailing slash
  const basePath = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

  async function router(): Promise<void> {
    const fullPath = location.pathname;
    const path = getRoutePath(fullPath);

    // Nested router: only handle paths under its basePath
    if (basePath && path !== basePath && !path.startsWith(basePath + '/')) return;

    // Strip basePath prefix so routes are declared relative to the base
    const relativePath = basePath ? (path.slice(basePath.length) || '/') : path;

    const match = routes.find(route => matchRoute(route.path, relativePath));

    if (!match) {
      if (relativePath !== '/') {
        const fullHomePath = buildPath(basePath + '/');
        history.replaceState(null, '', fullHomePath);
        await router();
      }
      return;
    }

    await match.load();

    if (match.guard) {
      const allowed = await match.guard();
      if (!allowed) {
        const fullHomePath = buildPath(basePath + '/');
        history.replaceState(null, '', fullHomePath);
        await router();
        return;
      }
    }

    const page = document.createElement(match.component);

    const outlet = document.querySelector(appSelector);
    if (!outlet) return;

    outlet.innerHTML = '';
    outlet.appendChild(page);
  }

  window.addEventListener('popstate', router);

  // Run immediately if the DOM is already ready (e.g. router created inside a component),
  // otherwise wait for DOMContentLoaded.
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', router);
  } else {
    router();
  }

  document.addEventListener('click', event => {
    const path = event.composedPath();
    const linkElement = path.find(el =>
      el instanceof Element && el.matches('[data-link]')
    ) as Element | undefined;

    if (linkElement) {
      const href = linkElement.getAttribute('href') ?? '/';

      // Nested routers only intercept links that belong to their basePath scope,
      // leaving root-level navigation to the outer router.
      if (basePath) {
        const routePath = getRoutePath(href);
        if (routePath !== basePath && !routePath.startsWith(basePath + '/')) return;
      }

      event.preventDefault();
      const fullPath = buildPath(href);
      history.pushState(null, '', fullPath);
      router();
    }
  });

  return router;
}
