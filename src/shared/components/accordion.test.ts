import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/accordion';

describe('UIAccordion', () => {
  let accordion: HTMLElement;

  beforeEach(() => {
    accordion = document.createElement('ui-accordion');
    document.body.appendChild(accordion);
  });

  afterEach(() => {
    accordion.remove();
  });

  it('should render accordion inside shadow DOM', () => {
    const shadowRoot = accordion.shadowRoot;
    expect(shadowRoot?.querySelector('.accordion')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(accordion.getAttribute('data-ui')).toBe('accordion');
  });

  it('should render accordion items', async () => {
    const accordionEl = accordion as any;
    accordionEl.items = [
      { id: '1', title: 'Section 1', content: 'Content 1' },
      { id: '2', title: 'Section 2', content: 'Content 2' }
    ];
    await accordionEl.updateComplete;
    
    const headers = accordion.shadowRoot?.querySelectorAll('.accordion-header');
    expect(headers?.length).toBe(2);
  });

  it('should apply allowMultiple attribute', async () => {
    accordion.setAttribute('allow-multiple', '');
    await (accordion as any).updateComplete;
    expect(accordion.hasAttribute('allow-multiple')).toBe(true);
  });

  it('should open item based on openItemId', async () => {
    const accordionEl = accordion as any;
    accordionEl.items = [
      { id: '1', title: 'Section 1', content: 'Content 1' },
      { id: '2', title: 'Section 2', content: 'Content 2' }
    ];
    accordionEl.openItemId = '1';
    await accordionEl.updateComplete;
    
    const firstHeader = accordion.shadowRoot?.querySelector('.accordion-item:first-child .accordion-header');
    expect(firstHeader?.classList.contains('is-open')).toBe(true);
  });

  it('should have accordion icon', async () => {
    const accordionEl = accordion as any;
    accordionEl.items = [
      { id: '1', title: 'Section 1', content: 'Content 1' }
    ];
    await accordionEl.updateComplete;
    const icon = accordion.shadowRoot?.querySelector('.accordion-icon');
    expect(icon).toBeTruthy();
  });

  it('should emit accordion-change event on toggle', async () => {
    const accordionEl = accordion as any;
    accordionEl.items = [
      { id: '1', title: 'Section 1', content: 'Content 1' }
    ];
    await accordionEl.updateComplete;
    
    const header = accordion.shadowRoot?.querySelector('.accordion-header');
    let eventFired = false;
    accordion.addEventListener('accordion-change', () => { eventFired = true; });
    
    (header as HTMLElement).click();
    expect(eventFired).toBe(true);
  });
});
