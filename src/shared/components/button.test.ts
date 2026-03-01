import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/button';

describe('UIButton', () => {
  let button: HTMLElement;

  beforeEach(() => {
    button = document.createElement('ui-button');
    document.body.appendChild(button);
  });

  afterEach(() => {
    button.remove();
  });

  it('should render button element', () => {
    const shadowRoot = button.shadowRoot;
    expect(shadowRoot?.querySelector('button')).toBeTruthy();
  });

  it('should have default variant primary', () => {
    const shadowRoot = button.shadowRoot;
    const btn = shadowRoot?.querySelector('button');
    expect(btn?.classList.contains('primary')).toBe(true);
  });

  it('should apply variant class', async () => {
    button.setAttribute('variant', 'secondary');
    await (button as any).updateComplete;
    const shadowRoot = button.shadowRoot;
    const btn = shadowRoot?.querySelector('button');
    expect(btn?.classList.contains('secondary')).toBe(true);
    expect(btn?.classList.contains('primary')).toBe(false);
  });

  it('should apply size class', async () => {
    button.setAttribute('size', 'lg');
    await (button as any).updateComplete;
    const shadowRoot = button.shadowRoot;
    const btn = shadowRoot?.querySelector('button');
    expect(btn?.classList.contains('lg')).toBe(true);
  });

  it('should be disabled when disabled attribute present', async () => {
    button.setAttribute('disabled', '');
    await (button as any).updateComplete;
    const shadowRoot = button.shadowRoot;
    const btn = shadowRoot?.querySelector('button') as HTMLButtonElement;
    expect(btn?.disabled).toBe(true);
  });

  it('should have correct type', async () => {
    button.setAttribute('type', 'submit');
    await (button as any).updateComplete;
    const shadowRoot = button.shadowRoot;
    const btn = shadowRoot?.querySelector('button') as HTMLButtonElement;
    expect(btn?.type).toBe('submit');
  });

  it('should default to type button', () => {
    const shadowRoot = button.shadowRoot;
    const btn = shadowRoot?.querySelector('button') as HTMLButtonElement;
    expect(btn?.type).toBe('button');
  });

  it('should render content inside button when set before connect', async () => {
    const btn = document.createElement('ui-button') as HTMLElement;
    btn.innerHTML = 'Click me';
    document.body.appendChild(btn);
    await (btn as any).updateComplete;
    const shadowRoot = btn.shadowRoot;
    const renderedBtn = shadowRoot?.querySelector('button');
    expect(renderedBtn?.textContent?.trim()).toContain('Click me');
    btn.remove();
  });

  it('should add data-ui attribute', () => {
    expect(button.getAttribute('data-ui')).toBe('button');
  });

  it('should handle icon attribute', async () => {
    button.setAttribute('icon', 'check');
    await (button as any).updateComplete;
    const shadowRoot = button.shadowRoot;
    const iconEl = shadowRoot?.querySelector('.btn-icon');
    expect(iconEl).toBeTruthy();
  });

  it('should render icon-only button when only icon provided', async () => {
    button.setAttribute('icon', 'check');
    await (button as any).updateComplete;
    const shadowRoot = button.shadowRoot;
    const btn = shadowRoot?.querySelector('button');
    expect(btn?.classList.contains('icon-only')).toBe(true);
  });

  it('should re-render on attribute change', async () => {
    button.setAttribute('variant', 'danger');
    await (button as any).updateComplete;
    const shadowRoot = button.shadowRoot;
    const btn = shadowRoot?.querySelector('button');
    expect(btn?.classList.contains('danger')).toBe(true);
  });
});
