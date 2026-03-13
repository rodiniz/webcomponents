import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/textarea';

describe('UITextarea', () => {
  let textarea: HTMLElement;

  beforeEach(() => {
    textarea = document.createElement('ui-textarea');
    document.body.appendChild(textarea);
  });

  afterEach(() => {
    textarea.remove();
  });

  it('should render textarea element inside shadow DOM', () => {
    const shadowRoot = textarea.shadowRoot;
    expect(shadowRoot?.querySelector('textarea')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(textarea.getAttribute('data-ui')).toBe('textarea');
  });

  it('should accept maxlength attribute', async () => {
    textarea.setAttribute('maxlength', '5');
    await (textarea as any).updateComplete;

    const textareaEl = textarea.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
    expect(textareaEl.hasAttribute('maxlength')).toBe(true);
    expect(textareaEl.maxLength).toBe(5);
  });

  it('should enforce maxlength while typing', async () => {
    textarea.setAttribute('maxlength', '5');
    await (textarea as any).updateComplete;

    const textareaEl = textarea.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
    textareaEl.value = '123456789';
    textareaEl.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await (textarea as any).updateComplete;

    expect(textareaEl.value).toBe('12345');
    expect((textarea as any).value).toBe('12345');
  });
});
