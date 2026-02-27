import { BaseComponent } from '../core/base-component';
import styles from '../styles/theme.css?inline';
import layoutStyles from './app-layout.css?inline';
import '../shared/components/sidebar';
import '../shared/components/top-bar';
import '../shared/components/button';
import feather from 'feather-icons';
import type { RouteOld } from '../core/router';

export const routes: RouteOld[] = [
  {
    path: '/',
    layout: 'app-layout',
    load: () => import('../features/home/home-page'),
    component: 'home-page'
  },
  {
    path: '/button',
    layout: 'app-layout',
    load: () => import('../features/button-demo/button-demo'),
    component: 'button-demo'
  },
  {
    path: '/layout',
    layout: 'app-layout',
    load: () => import('../features/layout-demo/layout-demo'),
    component: 'layout-demo'
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
    path: '/forms',
    layout: 'app-layout',
    load: () => import('../features/form-demo/form-demo-page'),
    component: 'form-demo-page'
  },
  {
    path: '/modal',
    layout: 'app-layout',
    load: () => import('../features/modal-demo/modal-demo-page'),
    component: 'modal-demo-page'
  },
  {
    path: '/tabs',
    layout: 'app-layout',
    load: () => import('../features/tabs-demo/tabs-demo'),
    component: 'tabs-demo'
  },
  {
    path: '/card',
    layout: 'app-layout',
    load: () => import('../features/card-demo/card-demo'),
    component: 'card-demo-page'
  },
  {
    path: '/toast',
    layout: 'app-layout',
    load: () => import('../features/toast-demo/toast-demo-page'),
    component: 'toast-demo-page'
  },
  {
    path: '/stepper',
    layout: 'app-layout',
    load: () => import('../features/stepper-demo/stepper-demo-page'),
    component: 'stepper-demo-page'
  }
];

class AppLayout extends BaseComponent {
  private pageTitle = 'Dashboard';
  private pageSubtitle = 'Explore our component library';
  private navItems = [
    { icon: 'home', label: 'Home', href: '/' },
    { icon: 'box', label: 'Button', href: '/button' },
    { icon: 'layout', label: 'Layout', href: '/layout' },
    { icon: 'sliders', label: 'Form Elements', href: '/forms' },
    { icon: 'calendar', label: 'Date Picker', href: '/date-picker' },
    { icon: 'table', label: 'Table', href: '/table-demo' },
    { icon: 'square', label: 'Modal', href: '/modal' },
    { icon: 'folder', label: 'Tabs', href: '/tabs' },
    { icon: 'credit-card', label: 'Card', href: '/card' },
    { icon: 'message-circle', label: 'Toast', href: '/toast' },
    { icon: 'layers', label: 'Stepper', href: '/stepper' },
  ];

  private footerItems = [
    { icon: 'github', label: 'GitHub', href: 'https://github.com/rodiniz/webcomponents' },
  ];

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
      '/': { title: 'Web Components', subtitle: 'A framework-agnostic component library' },
      '/button': { title: 'Button', subtitle: 'Flexible button with variants and sizes' },
      '/layout': { title: 'Layout', subtitle: 'Flexible page layouts with header, footer, sidebar, and content' },
      '/forms': { title: 'Form Elements', subtitle: 'Inputs, selects, checkboxes, uploads, and more' },
      '/date-picker': { title: 'Date Picker', subtitle: 'Date selection component' },
      '/table-demo': { title: 'Table', subtitle: 'Data table with actions' },
      '/modal': { title: 'Modal', subtitle: 'Dialog and overlay components' },
      '/tabs': { title: 'Tabs', subtitle: 'Tabbed navigation component' },
      '/card': { title: 'Card', subtitle: 'Flexible container component' },
      '/toast': { title: 'Toast', subtitle: 'Notification and alert system' },
      '/stepper': { title: 'Stepper', subtitle: 'Progressive step navigation' },
    };
    
    const info = titles[path] || { title: 'Dashboard', subtitle: 'Explore our component library' };
    this.pageTitle = info.title;
    this.pageSubtitle = info.subtitle;
    this.render();
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
    
    // Configure sidebar with navigation items and footer
    const sidebar = this.shadowRoot!.querySelector('app-sidebar') as any;
    if (sidebar) {
      sidebar.items = this.navItems;
      sidebar.footer = this.footerItems;
    }
  }
}

customElements.define('app-layout', AppLayout);

export { AppLayout };
