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
  }
];

async function router(): Promise<void> {
  const path = location.pathname;
  const match = routes.find(route => route.path === path);

  if (!match) return;

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
    history.pushState(null, '', event.target.getAttribute('href') ?? '/');
    router();
  }
});
