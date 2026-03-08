import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/picklist';

describe('UIPicklist', () => {
  let picklist: HTMLElement;

  beforeEach(() => {
    picklist = document.createElement('ui-picklist');
    document.body.appendChild(picklist);
  });

  afterEach(() => {
    picklist.remove();
  });

  it('should render picklist inside shadow DOM', () => {
    const shadowRoot = picklist.shadowRoot;
    expect(shadowRoot?.querySelector('.picklist')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(picklist.getAttribute('data-ui')).toBe('picklist');
  });

  it('should have list sections', () => {
    const sections = picklist.shadowRoot?.querySelectorAll('.list-section');
    expect(sections?.length).toBe(2);
  });

  it('should have available list header', () => {
    const headers = picklist.shadowRoot?.querySelectorAll('.list-header');
    expect(headers?.[0]?.textContent).toContain('Available');
  });

  it('should have selected list header', () => {
    const headers = picklist.shadowRoot?.querySelectorAll('.list-header');
    expect(headers?.[1]?.textContent).toContain('Selected');
  });

  it('should have action buttons', () => {
    const actions = picklist.shadowRoot?.querySelector('.actions');
    expect(actions).toBeTruthy();
  });

  it('should show empty message when no items', () => {
    const empty = picklist.shadowRoot?.querySelector('.list-empty');
    expect(empty?.textContent).toContain('No items available');
  });
});
