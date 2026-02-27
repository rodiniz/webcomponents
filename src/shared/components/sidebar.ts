import { BaseComponent } from '../../core/base-component';
import feather from 'feather-icons';
import styles from '../../styles/theme.css?inline';

const sidebarStyles = `
:host {
  display: block;
  width: 280px;
  height: 100%;
  box-sizing: border-box;
}

.sidebar {
  background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  overflow: hidden;
  padding: 0;
  width: 100%;
  height: 100%;
}

.sidebar::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.06) 0%, transparent 50%);
  pointer-events: none;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin: 0;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  flex-shrink: 0;
}

.brand-icon svg {
  width: 22px;
  height: 22px;
  stroke: white;
}

.brand-text {
  font: 600 16px/1.2 "Sora", system-ui, sans-serif;
  color: #ffffff;
  letter-spacing: -0.01em;
  margin: 0;
}

.brand-sub {
  font: 500 10px/1 "Inter", system-ui, sans-serif;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}

.nav-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 12px;
  position: relative;
  z-index: 1;
}

.nav-label {
  font: 600 11px/1 "Inter", system-ui, sans-serif;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 12px 8px 6px;
  margin: 4px 0 0;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  font: 500 14px/1.3 "Inter", system-ui, sans-serif;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.sidebar-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%);
  border-radius: 8px;
  opacity: 0;
  transition: opacity 200ms ease;
}

.sidebar-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.sidebar-link:hover::before {
  opacity: 1;
}

.sidebar-link.active {
  color: #ffffff;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.2) 100%);
}

.sidebar-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 0 3px 3px 0;
}

.link-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.65;
  transition: opacity 200ms ease;
}

.sidebar-link:hover .link-icon,
.sidebar-link.active .link-icon {
  opacity: 1;
}

.link-icon svg {
  width: 100%;
  height: 100%;
}

.sidebar-footer {
  margin-top: auto;
  padding: 16px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.sidebar-link[data-link] {
  cursor: pointer;
}

.nav-section:first-child {
  padding-top: 12px;
}
`;

class AppSidebar extends BaseComponent {
  private navItems: Array<{ icon: string; label: string; href: string; active: boolean }> = [];
  private footerItems: Array<{ icon: string; label: string; href: string }> = [];

  connectedCallback(): void {
    this.setAttribute('data-ui', 'sidebar');
    super.connectedCallback();
    this.updateActiveState();
    window.addEventListener('popstate', () => this.updateActiveState());
    document.addEventListener('click', () => this.updateActiveState());
  }

  set items(items: Array<{ icon: string; label: string; href: string }>) {
    this.navItems = items.map(item => ({ ...item, active: false }));
    this.updateActiveState();
  }

  get items() {
    return this.navItems;
  }

  set footer(items: Array<{ icon: string; label: string; href: string }>) {
    this.footerItems = items;
    this.render();
  }

  get footer() {
    return this.footerItems;
  }

  private updateActiveState(): void {
    if (this.navItems.length === 0) return;
    
    const path = window.location.pathname;
    this.navItems = this.navItems.map(item => ({
      ...item,
      active: item.href === path
    }));
    this.render();
  }

  private renderIcon(iconName: string): string {
    const svg = (feather.icons as Record<string, any>)[iconName]?.toSvg({ class: '' }) || '';
    return svg;
  }

  render(): void {
    const navLinks = this.navItems.map(item => `
      <a 
        class="sidebar-link ${item.active ? 'active' : ''}" 
        href="${item.href}" 
        data-link
      >
        <span class="link-icon">${this.renderIcon(item.icon)}</span>
        ${item.label}
      </a>
    `).join('');

    const footerLinks = this.footerItems.map(item => `
      <a 
        class="sidebar-link" 
        href="${item.href}" 
        target="_blank"
        rel="noopener"
      >
        <span class="link-icon">${this.renderIcon(item.icon)}</span>
        ${item.label}
      </a>
    `).join('');

    const footerSection = this.footerItems.length > 0 ? `
      <div class="sidebar-footer">
        ${footerLinks}
      </div>
    ` : '';

    this.shadowRoot!.innerHTML = `
      <style>${styles}${sidebarStyles}</style>
      <aside class="sidebar">
        <div class="sidebar-brand">
          <div class="brand-icon">
            ${this.renderIcon('hexagon')}
          </div>
          <div>
            <div class="brand-text">UI Kit</div>
            <div class="brand-sub">Components</div>
          </div>
        </div>
        
        <nav class="nav-section">
          <div class="nav-label">Components</div>
          ${navLinks}
        </nav>
        
        ${footerSection}
      </aside>
    `;
  }
}

customElements.define('app-sidebar', AppSidebar);

export { AppSidebar };
