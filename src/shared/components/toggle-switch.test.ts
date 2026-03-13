import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './toggle-switch';

describe('UIToggleSwitch', () => {
  let toggleSwitch: any;

  beforeEach(() => {
    toggleSwitch = document.createElement('ui-toggle-switch');
    document.body.appendChild(toggleSwitch);
  });

  afterEach(() => {
    toggleSwitch.remove();
  });

  it('should render a toggle container and track inside shadow DOM', () => {
    const root = toggleSwitch.shadowRoot;
    expect(root?.querySelector('.toggle-container')).toBeTruthy();
    expect(root?.querySelector('.toggle-track')).toBeTruthy();
    expect(root?.querySelector('.toggle-thumb')).toBeTruthy();
  });

  it('should not be checked by default', () => {
    expect(toggleSwitch.checked).toBe(false);
  });

  it('should toggle checked state on click', async () => {
    expect(toggleSwitch.checked).toBe(false);
    
    const container = toggleSwitch.shadowRoot?.querySelector('.toggle-container');
    container?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await toggleSwitch.updateComplete;
    
    expect(toggleSwitch.checked).toBe(true);
  });

  it('should render with label when provided', async () => {
    toggleSwitch.setAttribute('label', 'Enable notifications');
    await toggleSwitch.updateComplete;
    const label = toggleSwitch.shadowRoot?.querySelector('.toggle-label');
    expect(label?.textContent).toBe('Enable notifications');
  });

  it('should apply size class', async () => {
    toggleSwitch.setAttribute('size', 'lg');
    await toggleSwitch.updateComplete;
    const container = toggleSwitch.shadowRoot?.querySelector('.toggle-container');
    expect(container?.classList.contains('size-lg')).toBe(true);
  });

  it('should be disabled when disabled attribute is set', async () => {
    toggleSwitch.setAttribute('disabled', '');
    await toggleSwitch.updateComplete;
    const container = toggleSwitch.shadowRoot?.querySelector('.toggle-container');
    expect(container?.classList.contains('disabled')).toBe(true);
  });

  it('should not toggle when disabled', async () => {
    toggleSwitch.setAttribute('disabled', '');
    expect(toggleSwitch.checked).toBe(false);
    
    const container = toggleSwitch.shadowRoot?.querySelector('.toggle-container');
    container?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await toggleSwitch.updateComplete;
    
    expect(toggleSwitch.checked).toBe(false);
  });

  it('should emit toggle-change event when toggled', async () => {
    let emittedDetail: any = null;
    
    toggleSwitch.addEventListener('toggle-change', (e: Event) => {
      emittedDetail = (e as CustomEvent).detail;
    });

    const container = toggleSwitch.shadowRoot?.querySelector('.toggle-container');
    container?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await toggleSwitch.updateComplete;
    
    expect(emittedDetail).toEqual({ checked: true });
  });

  it('should support keyboard activation with Space key', async () => {
    expect(toggleSwitch.checked).toBe(false);
    
    const container = toggleSwitch.shadowRoot?.querySelector('.toggle-container');
    container?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await toggleSwitch.updateComplete;
    
    expect(toggleSwitch.checked).toBe(true);
  });

  it('should support keyboard activation with Enter key', async () => {
    expect(toggleSwitch.checked).toBe(false);
    
    const container = toggleSwitch.shadowRoot?.querySelector('.toggle-container');
    container?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await toggleSwitch.updateComplete;
    
    expect(toggleSwitch.checked).toBe(true);
  });

  it('should not emit event when checked is set programmatically', async () => {
    let eventFired = false;
    
    toggleSwitch.addEventListener('toggle-change', () => {
      eventFired = true;
    });

    toggleSwitch.checked = true;
    await toggleSwitch.updateComplete;
    
    expect(toggleSwitch.checked).toBe(true);
    expect(eventFired).toBe(false);
  });

  it('should emit event only on user interaction', async () => {
    let eventCount = 0;
    
    toggleSwitch.addEventListener('toggle-change', () => {
      eventCount++;
    });

    // Programmatic change - should not emit
    toggleSwitch.checked = true;
    await toggleSwitch.updateComplete;
    expect(eventCount).toBe(0);

    // User click - should emit
    const container = toggleSwitch.shadowRoot?.querySelector('.toggle-container');
    container?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await toggleSwitch.updateComplete;
    expect(eventCount).toBe(1);
  });
});
