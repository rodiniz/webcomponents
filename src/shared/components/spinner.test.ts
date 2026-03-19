import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/spinner';

describe('UISpinner', () => {
  let spinner: HTMLElement;

  beforeEach(() => {
    spinner = document.createElement('ui-spinner');
    document.body.appendChild(spinner);
  });

  afterEach(() => {
    spinner.remove();
  });

  it('should render spinner element inside shadow DOM', () => {
    const shadowRoot = spinner.shadowRoot;
    expect(shadowRoot?.querySelector('.spinner')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(spinner.getAttribute('data-ui')).toBe('spinner');
  });

  it('should have default size md', () => {
    const spinnerEl = spinner.shadowRoot?.querySelector('.spinner');
    expect(spinnerEl?.classList.contains('md')).toBe(true);
  });

  it('should apply size class', async () => {
    spinner.setAttribute('size', 'lg');
    await (spinner as any).updateComplete;
    const spinnerEl = spinner.shadowRoot?.querySelector('.spinner');
    expect(spinnerEl?.classList.contains('lg')).toBe(true);
    expect(spinnerEl?.classList.contains('md')).toBe(false);
  });

  it('should apply small size', async () => {
    spinner.setAttribute('size', 'sm');
    await (spinner as any).updateComplete;
    const spinnerEl = spinner.shadowRoot?.querySelector('.spinner');
    expect(spinnerEl?.classList.contains('sm')).toBe(true);
  });

  it('should have default variant primary', () => {
    const spinnerEl = spinner.shadowRoot?.querySelector('.spinner');
    expect(spinnerEl?.classList.contains('primary')).toBe(true);
  });

  it('should apply variant class', async () => {
    spinner.setAttribute('variant', 'danger');
    await (spinner as any).updateComplete;
    const spinnerEl = spinner.shadowRoot?.querySelector('.spinner');
    expect(spinnerEl?.classList.contains('danger')).toBe(true);
    expect(spinnerEl?.classList.contains('primary')).toBe(false);
  });

  it('should show label by default', () => {
    const label = spinner.shadowRoot?.querySelector('.spinner-label');
    expect(label).toBeTruthy();
  });

  it('should hide label when showLabel is false', async () => {
    (spinner as any).showLabel = false;
    await (spinner as any).updateComplete;
    const label = spinner.shadowRoot?.querySelector('.spinner-label');
    expect(label).toBeFalsy();
  });

  it('should apply custom label', async () => {
    spinner.setAttribute('label', 'Loading data...');
    await (spinner as any).updateComplete;
    const label = spinner.shadowRoot?.querySelector('.spinner-label');
    expect(label?.textContent).toBe('Loading data...');
  });

  it('should have three spinner rings', () => {
    const rings = spinner.shadowRoot?.querySelectorAll('.spinner-ring');
    expect(rings?.length).toBe(3);
  });

  it('should be visible by default', () => {
    const spinnerEl = spinner.shadowRoot?.querySelector('.spinner');
    expect(spinnerEl).toBeTruthy();
  });

  it('should hide spinner when isVisible is false', async () => {
    (spinner as any).isVisible = false;
    await (spinner as any).updateComplete;
    const spinnerEl = spinner.shadowRoot?.querySelector('.spinner');
    const label = spinner.shadowRoot?.querySelector('.spinner-label');
    expect(spinnerEl).toBeFalsy();
    expect(label).toBeFalsy();
  });
});
