import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/tabs';

describe('UITabs', () => {
  let tabs: HTMLElement;

  beforeEach(() => {
    tabs = document.createElement('ui-tabs');
    document.body.appendChild(tabs);
  });

  afterEach(() => {
    tabs.remove();
  });

  it('should render tabs element inside shadow DOM', () => {
    const shadowRoot = tabs.shadowRoot;
    expect(shadowRoot?.querySelector('.tabs')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(tabs.getAttribute('data-ui')).toBe('tabs');
  });

  it('should have tablist with role tablist', () => {
    const tablist = tabs.shadowRoot?.querySelector('.tablist');
    expect(tablist?.getAttribute('role')).toBe('tablist');
  });

  it('should have tab slot', () => {
    const tabSlot = tabs.shadowRoot?.querySelector('slot[name="tab"]');
    expect(tabSlot).toBeTruthy();
  });

  it('should have panel slot', () => {
    const panelSlot = tabs.shadowRoot?.querySelector('slot[name="panel"]');
    expect(panelSlot).toBeTruthy();
  });

  it('should have tab indicator', () => {
    const indicator = tabs.shadowRoot?.querySelector('.tab-indicator');
    expect(indicator).toBeTruthy();
  });
});
