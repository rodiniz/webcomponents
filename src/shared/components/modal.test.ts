import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/modal';

describe('UIModal', () => {
  let modal: HTMLElement;

  beforeEach(() => {
    modal = document.createElement('ui-modal');
    document.body.appendChild(modal);
  });

  afterEach(() => {
    modal.remove();
  });

  it('should append itself to document.body when connected', () => {
    expect(modal.parentElement).toBe(document.body);
  });

  it('should show backdrop full-viewport when opened', async () => {
    (modal as any).open();
    await (modal as any).updateComplete;
    const backdrop = modal.shadowRoot?.querySelector('.modal-backdrop') as HTMLElement;
    expect(backdrop).toBeTruthy();
    const rect = backdrop.getBoundingClientRect();
    expect(rect.width).toBeGreaterThan(window.innerWidth - 1);
    expect(rect.height).toBeGreaterThan(window.innerHeight - 1);
  });
});
