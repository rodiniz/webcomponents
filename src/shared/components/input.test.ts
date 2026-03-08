import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../../../src/shared/components/input';

describe('UIInput', () => {
  let input: HTMLElement;

  beforeEach(() => {
    input = document.createElement('ui-input');
    document.body.appendChild(input);
  });

  afterEach(() => {
    input.remove();
  });

  it('should render input element inside shadow DOM', () => {
    const shadowRoot = input.shadowRoot;
    expect(shadowRoot?.querySelector('input')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(input.getAttribute('data-ui')).toBe('input');
  });

  it('should have default type text', () => {
    const inputEl = input.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(inputEl?.type).toBe('text');
  });

  it('should apply type attribute', async () => {
    input.setAttribute('type', 'email');
    await (input as any).updateComplete;
    const inputEl = input.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(inputEl?.type).toBe('email');
  });

  it('should render label when label attribute is set', async () => {
    input.setAttribute('label', 'Username');
    await (input as any).updateComplete;
    const label = input.shadowRoot?.querySelector('.input-label');
    expect(label).toBeTruthy();
    expect(label?.textContent).toContain('Username');
  });

  it('should show required asterisk when required is true', async () => {
    input.setAttribute('label', 'Username');
    input.setAttribute('required', '');
    await (input as any).updateComplete;
    const label = input.shadowRoot?.querySelector('.input-label');
    expect(label?.textContent).toContain('*');
  });

  it('should apply placeholder attribute', async () => {
    input.setAttribute('placeholder', 'Enter text');
    await (input as any).updateComplete;
    const inputEl = input.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(inputEl?.placeholder).toBe('Enter text');
  });

  it('should be disabled when disabled attribute present', async () => {
    input.setAttribute('disabled', '');
    await (input as any).updateComplete;
    const inputEl = input.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(inputEl?.disabled).toBe(true);
  });

  it('should apply name attribute', async () => {
    input.setAttribute('name', 'username');
    await (input as any).updateComplete;
    const inputEl = input.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(inputEl?.name).toBe('username');
  });

  it('should render icon when icon attribute is set', async () => {
    input.setAttribute('icon', 'check');
    await (input as any).updateComplete;
    const icon = input.shadowRoot?.querySelector('.input-icon');
    expect(icon).toBeTruthy();
  });

  it('should apply icon position', async () => {
    input.setAttribute('icon', 'check');
    await (input as any).updateComplete;
    input.setAttribute('icon-position', 'right');
    await (input as any).updateComplete;
    const icon = input.shadowRoot?.querySelector('.input-icon.right');
    expect(icon).toBeTruthy();
  });

  it('should accept minlength attribute', async () => {
    input.setAttribute('minlength', '3');
    await (input as any).updateComplete;
    const inputEl = input.shadowRoot?.querySelector('input');
    expect(inputEl?.hasAttribute('minlength')).toBe(true);
  });

  it('should accept maxlength attribute', async () => {
    input.setAttribute('maxlength', '10');
    await (input as any).updateComplete;
    const inputEl = input.shadowRoot?.querySelector('input');
    expect(inputEl?.hasAttribute('maxlength')).toBe(true);
  });
});
