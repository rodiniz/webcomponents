import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../../../src/shared/components/button';
import '../../../src/shared/components/input';

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

  it('should be disabled when is-processing attribute is present', async () => {
    button.setAttribute('is-processing', '');
    await (button as any).updateComplete;
    const shadowRoot = button.shadowRoot;
    const btn = shadowRoot?.querySelector('button') as HTMLButtonElement;
    expect(btn?.disabled).toBe(true);
    expect(btn?.getAttribute('aria-busy')).toBe('true');
  });

  it('should have correct type', async () => {
    button.setAttribute('type', 'submit');
    await (button as any).updateComplete;
    const shadowRoot = button.shadowRoot;
    const btn = shadowRoot?.querySelector('button') as HTMLButtonElement;
    expect(btn?.type).toBe('submit');
  });

  it('should submit form when Enter is pressed in ui-input and has submit button', async () => {
    const form = document.createElement('form');
    const uiInput = document.createElement('ui-input') as HTMLElement;
    const submitButton = document.createElement('ui-button') as HTMLElement;

    submitButton.setAttribute('type', 'submit');

    form.appendChild(uiInput);
    form.appendChild(submitButton);
    document.body.appendChild(form);

    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    form.addEventListener('submit', onSubmit);

    await (uiInput as any).updateComplete;
    await (submitButton as any).updateComplete;

    const inputEl = uiInput.shadowRoot?.querySelector('input') as HTMLInputElement;
    inputEl.value = 'hello';
    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    form.remove();
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
    const slot = shadowRoot?.querySelector('slot') as HTMLSlotElement;
    const slottedText = slot
      ?.assignedNodes({ flatten: true })
      .map(node => node.textContent ?? '')
      .join(' ')
      .trim();
    expect(slottedText).toContain('Click me');
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

  it('should render label when icon and slotted text are both provided', async () => {
    const btn = document.createElement('ui-button') as HTMLElement;
    btn.setAttribute('icon', 'check');
    btn.innerHTML = 'Save';
    document.body.appendChild(btn);

    await (btn as any).updateComplete;
    await (btn as any).updateComplete;

    const shadowRoot = btn.shadowRoot;
    const buttonEl = shadowRoot?.querySelector('button');
    const slot = shadowRoot?.querySelector('slot') as HTMLSlotElement;
    const slottedText = slot
      ?.assignedNodes({ flatten: true })
      .map(node => node.textContent ?? '')
      .join(' ')
      .trim();

    expect(slottedText).toContain('Save');
    expect(buttonEl?.classList.contains('icon-only')).toBe(false);
    btn.remove();
  });

  it('should render spinner while processing', async () => {
    button.setAttribute('is-processing', '');
    await (button as any).updateComplete;

    const shadowRoot = button.shadowRoot;
    const spinner = shadowRoot?.querySelector('.btn-spinner');
    const spinnerRing = shadowRoot?.querySelector('.btn-spinner-ring');

    expect(spinner).toBeTruthy();
    expect(spinnerRing).toBeTruthy();
  });

  it('should re-render on attribute change', async () => {
    button.setAttribute('variant', 'danger');
    await (button as any).updateComplete;
    const shadowRoot = button.shadowRoot;
    const btn = shadowRoot?.querySelector('button');
    expect(btn?.classList.contains('danger')).toBe(true);
  });
});
