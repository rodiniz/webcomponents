import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/radio';

describe('UIRadio', () => {
  let radio: HTMLElement;

  beforeEach(() => {
    radio = document.createElement('ui-radio');
    document.body.appendChild(radio);
  });

  afterEach(() => {
    radio.remove();
  });

  it('should render radio element inside shadow DOM', () => {
    const shadowRoot = radio.shadowRoot;
    expect(shadowRoot?.querySelector('.radio-container')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(radio.getAttribute('data-ui')).toBe('radio');
  });

  it('should have native radio input', () => {
    const input = radio.shadowRoot?.querySelector('input[type="radio"]');
    expect(input).toBeTruthy();
  });

  it('should have radio ring', () => {
    const ring = radio.shadowRoot?.querySelector('.radio-ring');
    expect(ring).toBeTruthy();
  });

  it('should have radio dot', () => {
    const dot = radio.shadowRoot?.querySelector('.radio-dot');
    expect(dot).toBeTruthy();
  });

  it('should have default size md', () => {
    const ring = radio.shadowRoot?.querySelector('.radio-ring');
    expect(ring?.classList.contains('size-md')).toBe(true);
  });

  it('should apply size attribute', async () => {
    radio.setAttribute('size', 'lg');
    await (radio as any).updateComplete;
    const ring = radio.shadowRoot?.querySelector('.radio-ring');
    expect(ring?.classList.contains('size-lg')).toBe(true);
    expect(ring?.classList.contains('size-md')).toBe(false);
  });

  it('should apply small size', async () => {
    radio.setAttribute('size', 'sm');
    await (radio as any).updateComplete;
    const ring = radio.shadowRoot?.querySelector('.radio-ring');
    expect(ring?.classList.contains('size-sm')).toBe(true);
  });

  it('should not be checked by default', () => {
    const ring = radio.shadowRoot?.querySelector('.radio-ring');
    expect(ring?.classList.contains('checked')).toBe(false);
  });

  it('should apply checked attribute', async () => {
    radio.setAttribute('checked', '');
    await (radio as any).updateComplete;
    const ring = radio.shadowRoot?.querySelector('.radio-ring');
    expect(ring?.classList.contains('checked')).toBe(true);
  });

  it('should be disabled when disabled attribute present', async () => {
    radio.setAttribute('disabled', '');
    await (radio as any).updateComplete;
    const container = radio.shadowRoot?.querySelector('.radio-container');
    expect(container?.classList.contains('disabled')).toBe(true);
  });

  it('should apply label', async () => {
    radio.setAttribute('label', 'Option 1');
    await (radio as any).updateComplete;
    const label = radio.shadowRoot?.querySelector('.radio-label');
    expect(label?.textContent).toBe('Option 1');
  });

  it('should apply description', async () => {
    radio.setAttribute('description', 'Description text');
    await (radio as any).updateComplete;
    const desc = radio.shadowRoot?.querySelector('.radio-description');
    expect(desc?.textContent).toBe('Description text');
  });

  it('should apply value attribute', async () => {
    radio.setAttribute('value', 'option1');
    await (radio as any).updateComplete;
    const input = radio.shadowRoot?.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(input?.value).toBe('option1');
  });

  it('should apply name attribute', async () => {
    radio.setAttribute('name', 'options');
    await (radio as any).updateComplete;
    const input = radio.shadowRoot?.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(input?.name).toBe('options');
  });
});
