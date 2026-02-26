import { BaseComponent } from '../core/base-component';
import styles from '../styles/theme.css?inline';
import '../shared/components/sidebar';
import { store } from '../core/store';
import '../shared/components/button';
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
