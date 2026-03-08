import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/radio-group';

describe('UIRadioGroup', () => {
  let radioGroup: HTMLElement;

  beforeEach(() => {
    radioGroup = document.createElement('ui-radio-group');
    document.body.appendChild(radioGroup);
  });

  afterEach(() => {
    radioGroup.remove();
  });

  it('should render radio group inside shadow DOM', () => {
    const shadowRoot = radioGroup.shadowRoot;
    expect(shadowRoot?.querySelector('.group-options')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(radioGroup.getAttribute('data-ui')).toBe('radio-group');
  });

  it('should render options', async () => {
    const el = radioGroup as any;
    el.options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ];
    await el.updateComplete;
    
    const radios = radioGroup.shadowRoot?.querySelectorAll('ui-radio');
    expect(radios?.length).toBe(2);
  });

  it('should apply label', async () => {
    radioGroup.setAttribute('label', 'Select an option');
    await (radioGroup as any).updateComplete;
    const label = radioGroup.shadowRoot?.querySelector('.group-label');
    expect(label?.textContent).toBe('Select an option');
  });

  it('should have radiogroup role', () => {
    const container = radioGroup.shadowRoot?.querySelector('.group-options');
    expect(container?.getAttribute('role')).toBe('radiogroup');
  });

  it('should apply horizontal orientation', async () => {
    radioGroup.setAttribute('orientation', 'horizontal');
    await (radioGroup as any).updateComplete;
    const options = radioGroup.shadowRoot?.querySelector('.group-options');
    expect(options?.classList.contains('horizontal')).toBe(true);
  });

  it('should apply card variant', async () => {
    radioGroup.setAttribute('variant', 'card');
    await (radioGroup as any).updateComplete;
    const options = radioGroup.shadowRoot?.querySelector('.group-options');
    expect(options?.classList.contains('card')).toBe(true);
  });

  it('should emit group-change event on selection', async () => {
    const el = radioGroup as any;
    el.options = [
      { value: '1', label: 'Option 1' }
    ];
    await el.updateComplete;
    
    let eventFired = false;
    radioGroup.addEventListener('group-change', () => { eventFired = true; });
    
    const radio = radioGroup.shadowRoot?.querySelector('ui-radio');
    radio?.dispatchEvent(new CustomEvent('radio-change', { detail: { value: '1' } }));
    expect(eventFired).toBe(true);
  });
});
