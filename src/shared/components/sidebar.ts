import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import themeStyles from '../../styles/theme.css?inline';
import sidebarStyles from './sidebar.css?inline';
import feather from 'feather-icons';

@customElement('ui-sidebar')
export class UISidebar extends LitElement {
  static styles = [unsafeCSS(themeStyles), unsafeCSS(sidebarStyles)];

  @property({ type: String }) brand: string = 'App';
  @property({ type: String }) version: string = 'v1.0';
  @property({ type: Array }) items: Array<{icon: string; label: string; href?: string}> = [];
  @property({ type: Array }) footerItems: Array<{icon: string; label: string; href?: string}> = [];

  connectedCallback(): void {
    this.setAttribute('data-ui', 'sidebar');
    super.connectedCallback();
  }

  private handleClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    const link = target.closest('.sidebar-link') as HTMLElement;
    if (!link) return;

    const links = this.shadowRoot?.querySelectorAll('.sidebar-link') || [];
    links.forEach(el => el.classList.remove('is-active'));
    link.classList.add('is-active');
  };

  private handleFooterClick = (): void => {
    // Footer links don't need active state handling
  };

  render() {
    return html`
      <div class="sidebar">
        <div class="sidebar-brand">
          <div class="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div>
            <p class="brand-text">${this.brand}</p>
            <p class="brand-sub">${this.version}</p>
          </div>
        </div>
        <div class="nav-section" @click=${this.handleClick}>
          ${this.items.map(item => html`
            <a class="sidebar-link" href="${item.href || '#'}">
              <span class="link-icon">${unsafeHTML(feather.icons[item.icon]?.toSvg() || '')}</span>
              <span>${item.label}</span>
            </a>
          `)}
        </div>
        <div class="sidebar-footer" @click=${this.handleFooterClick}>
          ${this.footerItems.map(item => html`
            <a class="sidebar-link" href="${item.href || '#'}" target="${item.href?.startsWith('http') ? '_blank' : '_self'}">
              <span class="link-icon">${unsafeHTML(feather.icons[item.icon]?.toSvg() || '')}</span>
              <span>${item.label}</span>
            </a>
          `)}
        </div>
      </div>
    `;
  }
}
