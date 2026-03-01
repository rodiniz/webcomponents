import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/checkbox';

describe('UICheckbox', () => {
  let checkbox: HTMLElement;

  beforeEach(() => {
    checkbox = document.createElement('ui-checkbox');
    document.body.appendChild(checkbox);
  });

  afterEach(() => {
    checkbox.remove();
  });

  it('should render a container and box inside shadow DOM', () => {
    const root = checkbox.shadowRoot;
    expect(root?.querySelector('.checkbox-container')).toBeTruthy();
    expect(root?.querySelector('.checkbox-box')).toBeTruthy();
  });

  it('should include size-md class by default', () => {
    const box = checkbox.shadowRoot?.querySelector('.checkbox-box');
    expect(box?.classList.contains('size-md')).toBe(true);
  });

  it('should fallback to md for invalid size attr', () => {
    checkbox.setAttribute('size', 'xx' as any);
    const box = checkbox.shadowRoot?.querySelector('.checkbox-box');
    expect(box?.classList.contains('size-md')).toBe(true);
    expect(box?.classList.contains('size-sm')).toBe(false);
    expect(box?.classList.contains('size-lg')).toBe(false);
  });

  it('should never collapse even if size class missing', () => {
    // set the property directly to an invalid value bypassing setter
    (checkbox as any)._size = 'foo';
    checkbox.requestUpdate();
    const box = checkbox.shadowRoot?.querySelector('.checkbox-box') as HTMLElement;
    // rendered element should still have width/height set via default styles - we can't compute real layout
    // but the element should exist and not be display:none
    expect(box).toBeTruthy();
    expect(getComputedStyle(box).display).not.toBe('none');
  });
});
