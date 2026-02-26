import { BaseComponent } from '../core/base-component';
import styles from '../styles/theme.css?inline';
import '../shared/components/sidebar';
import { store } from '../core/store';
import '../shared/components/button';
import { requireUser } from '../core/guards';
import type { Route } from '../core/router';



export const routes: Route[] = [
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
class AppLayout extends BaseComponent {
  connectedCallback(): void {
    this.setAttribute('data-ui', 'layout');
    super.connectedCallback();
  }
  
  render(): void {
    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <nav class="app-nav">
        Dashboard
        <ui-button id="theme-toggle" variant="ghost" size="sm">Toggle Theme</ui-button>
      </nav>
      <div class="dashboard-layout">
        <app-sidebar></app-sidebar>
        <main class="dashboard-main">
          <slot></slot>
        </main>
      </div>
    `;
     const themeToggle = this.shadowRoot!.querySelector('#theme-toggle');
        if (themeToggle) {
          themeToggle.addEventListener('click', () => {
            const nextTheme = store.getState().theme === 'shadcn' ? 'light' : 'shadcn';
            store.setState({ theme: nextTheme });
            this.render();
          });
        }
  }
  
}

customElements.define('app-layout', AppLayout);
