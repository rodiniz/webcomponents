import { buildPath, getRoutePath, getPathParams } from './navigation';

export { getPathParams };
export { buildPath, getRoutePath } from './navigation';

export type Route = {
  path: string;
  load: () => Promise<unknown>;
  component: string;
  guard?: () => boolean | Promise<boolean>;
};

function matchRoute(routePath: string, path: string): boolean | Record<string, string> {
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

export function createRouter(routes: Route[], appSelector: string = '#app') {
  async function router(): Promise<void> {
    const fullPath = location.pathname;
    const path = getRoutePath(fullPath);
    const match = routes.find(route => matchRoute(route.path, path));

    if (!match) {
      if (path !== '/') {
        const fullHomePath = buildPath('/');
        history.replaceState(null, '', fullHomePath);
        await router();
      }
      return;
    }

    await match.load();

    if (match.guard) {
      const allowed = await match.guard();
      if (!allowed) {
        const fullHomePath = buildPath('/');
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
  window.addEventListener('DOMContentLoaded', router);

  document.addEventListener('click', event => {
    const path = event.composedPath();
    const linkElement = path.find(el =>
      el instanceof Element && el.matches('[data-link]')
    ) as Element | undefined;

    if (linkElement) {
      event.preventDefault();
      const href = linkElement.getAttribute('href') ?? '/';
      const fullPath = buildPath(href);
      history.pushState(null, '', fullPath);
      router();
    }
  });

  return router;
}
