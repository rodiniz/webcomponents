type Route = {
  path: string;
  layout: string;
  load: () => Promise<unknown>;
  component: string;
};

const routes: Route[] = [
  {
    path: '/',
    layout: 'app-layout',
    load: () => import('../features/dashboard/dashboard-page'),
    component: 'dashboard-page'
  },
  {
    path: '/date-picker',
    layout: 'app-layout',
    load: () => import('../features/date-picker-demo/date-picker-demo'),
    component: 'date-picker-demo'
  },
  {
    path: '/table-demo',
    layout: 'app-layout',
    load: () => import('../features/table-demo/table-demo'),
    component: 'table-demo'
  },
  {
    path: '/input-demo',
    layout: 'app-layout',
    load: () => import('../features/input-demo/input-demo'),
    component: 'input-demo'
  },
  {
    path: '/modal',
    layout: 'app-layout',
    load: () => import('../features/modal-demo/modal-demo-page'),
    component: 'modal-demo-page'
  },
  {
    path: '/select',
    layout: 'app-layout',
    load: () => import('../features/select-demo/select-demo-page'),
    component: 'select-demo-page'
  },
  {
    path: '/checkbox',
    layout: 'app-layout',
    load: () => import('../features/checkbox-demo/checkbox-demo-page'),
    component: 'checkbox-demo-page'
  }
];

// Get base path from import.meta.env or default to '/'
const BASE_PATH = import.meta.env.BASE_URL || '/';

// Helper to normalize paths by removing base path
function getRoutePath(fullPath: string): string {
  if (BASE_PATH === '/') return fullPath;
  
  // Normalize base path (remove trailing slash if present)
  const normalizedBase = BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH;
  
  // Remove base path from the beginning
  if (fullPath === normalizedBase || fullPath === normalizedBase + '/') {
    return '/';
  }
  
  if (fullPath.startsWith(normalizedBase + '/')) {
    return fullPath.slice(normalizedBase.length);
  }
  
  return fullPath;
}

// Helper to build full path with base
function buildPath(routePath: string): string {
  if (BASE_PATH === '/') return routePath;
  const base = BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH;
  return `${base}${routePath}`;
}

async function router(): Promise<void> {
  const fullPath = location.pathname;
  const path = getRoutePath(fullPath);
  const match = routes.find(route => route.path === path);

  // If no match, redirect to home
  if (!match) {
    if (path !== '/') {
      const fullHomePath = buildPath('/');
      history.replaceState(null, '', fullHomePath);
      await router();
    }
    return;
  }

  await match.load();

  const layout = document.createElement(match.layout);
  const page = document.createElement(match.component);

  layout.appendChild(page);

  const outlet = document.querySelector('#app');
  if (!outlet) return;

  outlet.innerHTML = '';
  outlet.appendChild(layout);
}

window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);

document.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;

  if (event.target.matches('[data-link]')) {
    event.preventDefault();
    const href = event.target.getAttribute('href') ?? '/';
    const fullPath = buildPath(href);
    history.pushState(null, '', fullPath);
    router();
  }
});
