import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/sidebar';

describe('UISidebar', () => {
  let sidebar: HTMLElement;

  beforeEach(() => {
    sidebar = document.createElement('ui-sidebar');
    document.body.appendChild(sidebar);
  });

  afterEach(() => {
    sidebar.remove();
  });

  it('should render sidebar inside shadow DOM', () => {
    const shadowRoot = sidebar.shadowRoot;
    expect(shadowRoot?.querySelector('.sidebar')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(sidebar.getAttribute('data-ui')).toBe('sidebar');
  });

  it('should have sidebar brand', () => {
    const brand = sidebar.shadowRoot?.querySelector('.sidebar-brand');
    expect(brand).toBeTruthy();
  });

  it('should apply default brand text', () => {
    const brandText = sidebar.shadowRoot?.querySelector('.brand-text');
    expect(brandText?.textContent).toBe('App');
  });

  it('should apply brand attribute', async () => {
    sidebar.setAttribute('brand', 'MyApp');
    await (sidebar as any).updateComplete;
    const brandText = sidebar.shadowRoot?.querySelector('.brand-text');
    expect(brandText?.textContent).toBe('MyApp');
  });

  it('should apply version attribute', async () => {
    sidebar.setAttribute('version', 'v2.0');
    await (sidebar as any).updateComplete;
    const brandSub = sidebar.shadowRoot?.querySelector('.brand-sub');
    expect(brandSub?.textContent).toBe('v2.0');
  });

  it('should have nav section', () => {
    const navSection = sidebar.shadowRoot?.querySelector('.nav-section');
    expect(navSection).toBeTruthy();
  });

  it('should render sidebar items', async () => {
    const el = sidebar as any;
    el.items = [
      { icon: 'home', label: 'Home', href: '/' },
      { icon: 'settings', label: 'Settings', href: '/settings' }
    ];
    await el.updateComplete;
    
    const links = sidebar.shadowRoot?.querySelectorAll('.sidebar-link');
    expect(links?.length).toBe(2);
  });

  it('should have sidebar footer', () => {
    const footer = sidebar.shadowRoot?.querySelector('.sidebar-footer');
    expect(footer).toBeTruthy();
  });

  it('should emit nav event on link click', async () => {
    const el = sidebar as any;
    el.items = [{ icon: 'home', label: 'Home', href: '/' }];
    await el.updateComplete;
    
    const link = sidebar.shadowRoot?.querySelector('.sidebar-link');
    let eventFired = false;
    sidebar.addEventListener('nav', () => { eventFired = true; });
    
    (link as HTMLElement).click();
    expect(eventFired).toBe(true);
  });
});
