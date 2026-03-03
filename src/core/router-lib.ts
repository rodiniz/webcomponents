import { buildPath, getRoutePath } from './navigation';

export type Route = {
  path: string;
  load: () => Promise<unknown>;
  component: string;
  guard?: () => boolean | Promise<boolean>;
};

export function createRouter(routes: Route[], appSelector: string = '#app') {
  async function router(): Promise<void> {
    const fullPath = location.pathname;
    const path = getRoutePath(fullPath);
    const match = routes.find(route => route.path === path);

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
