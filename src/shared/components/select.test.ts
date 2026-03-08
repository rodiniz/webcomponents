import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/select';

describe('UISelect', () => {
  let select: HTMLElement;

  beforeEach(() => {
    select = document.createElement('ui-select');
    document.body.appendChild(select);
  });

  afterEach(() => {
    select.remove();
  });

  it('should render select inside shadow DOM', () => {
    const shadowRoot = select.shadowRoot;
    expect(shadowRoot?.querySelector('.select-container')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(select.getAttribute('data-ui')).toBe('select');
  });

  it('should have select display', () => {
    const display = select.shadowRoot?.querySelector('.select-display');
    expect(display).toBeTruthy();
  });

  it('should have select arrow', () => {
    const arrow = select.shadowRoot?.querySelector('.select-arrow');
    expect(arrow).toBeTruthy();
  });

  it('should apply label', async () => {
    select.setAttribute('label', 'Choose option');
    await (select as any).updateComplete;
    const label = select.shadowRoot?.querySelector('.select-label');
    expect(label?.textContent).toBe('Choose option');
  });

  it('should have default placeholder', () => {
    const value = select.shadowRoot?.querySelector('.select-value');
    expect(value?.textContent).toBe('Select an option');
  });

  it('should apply placeholder attribute', async () => {
    select.setAttribute('placeholder', 'Select one');
    await (select as any).updateComplete;
    const value = select.shadowRoot?.querySelector('.select-value');
    expect(value?.textContent).toBe('Select one');
  });

  it('should be disabled when disabled attribute present', async () => {
    select.setAttribute('disabled', '');
    await (select as any).updateComplete;
    const container = select.shadowRoot?.querySelector('.select-container');
    expect(container?.classList.contains('disabled')).toBe(true);
  });

  it('should render options', async () => {
    const el = select as any;
    el.options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ];
    el.isOpen = true;
    await el.updateComplete;
    
    const options = select.shadowRoot?.querySelectorAll('.select-option');
    expect(options?.length).toBe(2);
  });

  it('should show selected value', async () => {
    const el = select as any;
    el.options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ];
    el.value = '1';
    await el.updateComplete;
    
    const value = select.shadowRoot?.querySelector('.select-value');
    expect(value?.textContent).toBe('Option 1');
  });

  it('should show search input when searchable', async () => {
    select.setAttribute('searchable', '');
    await (select as any).updateComplete;
    
    const el = select as any;
    el.isOpen = true;
    await el.updateComplete;
    
    const searchInput = select.shadowRoot?.querySelector('.select-input');
    expect(searchInput).toBeTruthy();
  });
});
