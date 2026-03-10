import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import themeStyles from '../../styles/theme.css?inline';
import sidebarStyles from './sidebar.css?inline';
import { UIComponentBase } from '../../core/ui-component-base';
import { renderIcon } from '../../core/icon-helpers';

/**
 * Navigation sidebar component with brand section and navigation items.
 *
 * The sidebar displays a brand header, navigation menu items, and footer links.
 * It's fully themeable and supports custom background and text colors.
 *
 * @element ui-sidebar
 *
 * @prop {string} brand - Brand/app name (default: 'App')
 * @prop {string} version - Version string (default: 'v1.0')
 * @prop {array} items - Navigation items array
 * @prop {array} footerItems - Footer navigation items array
 *
 * @event nav - Fired when a navigation item is clicked
 *   - detail.href: string
 *
 * @csspart sidebar - Main sidebar container
 * @csspart brand - Brand section
 * @csspart nav-section - Navigation items section
 * @csspart sidebar-footer - Footer section
 *
 * @cssprop --sidebar-bg - Sidebar background (default: dark gradient)
 * @cssprop --sidebar-text - Text color (default: #ffffff)
 * @cssprop --sidebar-border - Border color (default: rgba(255,255,255,0.08))
 * @cssprop --sidebar-hover - Hover background (default: rgba(255,255,255,0.06))
 *
 * @example
 * ```html
 * <ui-sidebar
 *   brand="My App"
 *   version="v1.0"
 *   .items=${[
 *     { icon: 'home', label: 'Home', href: '/' },
 *     { icon: 'settings', label: 'Settings', href: '/settings' }
 *   ]}
 *   .footerItems=${[
 *     { icon: 'github', label: 'GitHub', href: 'https://github.com' }
 *   ]}
 * ></ui-sidebar>
 * ```
 *
 * @example
 * ```css
 * / * Custom light theme * /
 * ui-sidebar {
 *   --sidebar-bg: #f8fafc;
 *   --sidebar-text: #1e293b;
 *   --sidebar-border: #e2e8f0;
 *   --sidebar-hover: #f1f5f9;
 * }
 * ```
 *
 * @example
 * ```css
 * / * Custom gradient theme * /
 * ui-sidebar {
 *   --sidebar-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 *   --sidebar-text: #ffffff;
 *   --sidebar-border: rgba(255, 255, 255, 0.15);
 *   --sidebar-hover: rgba(255, 255, 255, 0.1);
 * }
 * ```
 *
 * @example
 * ```javascript
 * const sidebar = document.querySelector('ui-sidebar');
 *
 * sidebar.addEventListener('nav', (e) => {
 *   const { href } = e.detail;
 *   console.log('Navigating to:', href);
 * });
 * ```
 */
@customElement('ui-sidebar')
export class UISidebar extends UIComponentBase {
  static styles = [unsafeCSS(themeStyles), unsafeCSS(sidebarStyles)];

  /**
   * Brand name displayed in the sidebar header
   * @type {string}
   */
  @property({ type: String }) brand: string = 'App';

  /**
   * Version string displayed below the brand name
   * @type {string}
   */
  @property({ type: String }) version: string = 'v1.0';

  /**
   * Navigation items array
   * @type {Array<{icon: string; label: string; href?: string}>}
   * @example
   * [
   *   { icon: 'home', label: 'Home', href: '/home' },
   *   { icon: 'settings', label: 'Settings', href: '/settings' }
   * ]
   */
  @property({ type: Array }) items: Array<{icon: string; label: string; href?: string}> = [];

  /**
   * Footer navigation items array
   * @type {Array<{icon: string; label: string; href?: string}>}
   * @example
   * [
   *   { icon: 'github', label: 'GitHub', href: 'https://github.com' }
   * ]
   */
  @property({ type: Array }) footerItems: Array<{icon: string; label: string; href?: string}> = [];

  // connectedCallback handled by UIComponentBase

  private handleClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    const link = target.closest('.sidebar-link') as HTMLElement;
    if (!link) return;

    const links = this.shadowRoot?.querySelectorAll('.sidebar-link') || [];
    links.forEach(el => el.classList.remove('is-active'));
    link.classList.add('is-active');
    
    // Using emit() from UIComponentBase
    // Emits 'nav' event with href detail
    const href = link.getAttribute('href') || '';
    this.emit('nav', { href });
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
              <span class="link-icon">${renderIcon(item.icon)}</span>
              <span>${item.label}</span>
            </a>
          `)}
        </div>
        <div class="sidebar-footer" @click=${this.handleFooterClick}>
          ${this.footerItems.map(item => html`
            <a class="sidebar-link" href="${item.href || '#'}" target="${item.href?.startsWith('http') ? '_blank' : '_self'}">
              <span class="link-icon">${renderIcon(item.icon)}</span>
              <span>${item.label}</span>
            </a>
          `)}
        </div>
      </div>
    `;
  }
}
