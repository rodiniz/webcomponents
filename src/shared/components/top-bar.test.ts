import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/top-bar';

describe('UITopBar', () => {
  let topBar: HTMLElement;

  beforeEach(() => {
    topBar = document.createElement('ui-top-bar');
    document.body.appendChild(topBar);
  });

  afterEach(() => {
    topBar.remove();
  });

  it('should render top bar inside shadow DOM', () => {
    const shadowRoot = topBar.shadowRoot;
    expect(shadowRoot?.querySelector('.top-bar')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(topBar.getAttribute('data-ui')).toBe('top-bar');
  });

  it('should have title section', () => {
    const titleSection = topBar.shadowRoot?.querySelector('.title-section');
    expect(titleSection).toBeTruthy();
  });

  it('should apply default title', () => {
    const title = topBar.shadowRoot?.querySelector('.page-title');
    expect(title?.textContent).toBe('Dashboard');
  });

  it('should apply title attribute', async () => {
    topBar.setAttribute('title', 'My Page');
    await (topBar as any).updateComplete;
    const title = topBar.shadowRoot?.querySelector('.page-title');
    expect(title?.textContent).toBe('My Page');
  });

  it('should apply subtitle', async () => {
    topBar.setAttribute('subtitle', 'This is a subtitle');
    await (topBar as any).updateComplete;
    const subtitle = topBar.shadowRoot?.querySelector('.page-subtitle');
    expect(subtitle?.textContent).toBe('This is a subtitle');
  });

  it('should not render subtitle when empty', () => {
    const subtitle = topBar.shadowRoot?.querySelector('.page-subtitle');
    expect(subtitle).toBeFalsy();
  });

  it('should have actions slot', () => {
    const actionsSlot = topBar.shadowRoot?.querySelector('.actions-slot');
    expect(actionsSlot).toBeTruthy();
  });

  it('should have slot for content', () => {
    const slot = topBar.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });
});
