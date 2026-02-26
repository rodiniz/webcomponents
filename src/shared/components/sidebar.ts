import { BaseComponent } from '../../core/base-component';
import styles from '../../styles/theme.css?inline';

class AppSidebar extends BaseComponent {
  connectedCallback(): void {
    this.setAttribute('data-ui', 'sidebar');
    super.connectedCallback();
  }

  render(): void {
    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <aside class="dashboard-sidebar">
        <h2 class="sidebar-title">Workspace</h2>
        <nav class="sidebar-nav">
          <a class="sidebar-link" href="/" data-link>Button Demo</a>
          <a class="sidebar-link" href="/input-demo" data-link>Input Demo</a>
          <a class="sidebar-link" href="/date-picker" data-link>Date Picker Demo</a>
          <a class="sidebar-link" href="/table-demo" data-link>Table Demo</a>
        </nav>
      </aside>
    `;
  }
}

customElements.define('app-sidebar', AppSidebar);
