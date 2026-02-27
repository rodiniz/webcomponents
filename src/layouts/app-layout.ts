import { BaseComponent } from '../core/base-component';
import styles from '../styles/theme.css?inline';
import layoutStyles from './app-layout.css?inline';
import '../shared/components/sidebar';
import '../shared/components/top-bar';
import { store } from '../core/store';
import '../shared/components/button';
import feather from 'feather-icons';
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
  },
  {
    path: '/tabs',
    layout: 'app-layout',
    load: () => import('../features/tabs-demo/tabs-demo'),
    component: 'tabs-demo'
  }
];

class AppLayout extends BaseComponent {
  private pageTitle = 'Dashboard';
  private pageSubtitle = 'Explore our component library';

  connectedCallback(): void {
    this.setAttribute('data-ui', 'layout');
    super.connectedCallback();
    this.updateTitle();
    window.addEventListener('popstate', () => this.updateTitle());
    document.addEventListener('click', () => this.updateTitle());
  }

  private updateTitle(): void {
    const path = window.location.pathname;
    const titles: Record<string, { title: string; subtitle: string }> = {
      '/': { title: 'Components', subtitle: 'Explore our web components library' },
      '/input-demo': { title: 'Input', subtitle: 'Form inputs with validation' },
      '/date-picker': { title: 'Date Picker', subtitle: 'Date selection component' },
      '/table-demo': { title: 'Table', subtitle: 'Data table with actions' },
      '/modal': { title: 'Modal', subtitle: 'Dialog and overlay components' },
      '/select': { title: 'Select', subtitle: 'Dropdown selection component' },
      '/checkbox': { title: 'Checkbox', subtitle: 'Checkbox input component' },
      '/tabs': { title: 'Tabs', subtitle: 'Tabbed navigation component' },
    };
    
    const info = titles[path] || { title: 'Dashboard', subtitle: 'Explore our component library' };
    this.pageTitle = info.title;
    this.pageSubtitle = info.subtitle;
    this.render();
  }

  private renderIcon(name: string): string {
    return feather.icons[name as keyof typeof feather.icons]?.toSvg({ class: '' }) || '';
  }

  render(): void {
    this.shadowRoot!.innerHTML = `
      <style>${styles}${layoutStyles}</style>
      <ui-top-bar title="${this.pageTitle}" subtitle="${this.pageSubtitle}"></ui-top-bar>
      <div class="layout-container">
        <app-sidebar></app-sidebar>
        <div class="main-area">
          <main class="content-area">
            <slot></slot>
          </main>
        </div>
      </div>
    `;
  }
}

customElements.define('app-layout', AppLayout);

export { AppLayout };
