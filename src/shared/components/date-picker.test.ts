import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/date-picker';

describe('UIDatePicker', () => {
  let datePicker: HTMLElement;

  beforeEach(() => {
    datePicker = document.createElement('ui-date-picker');
    document.body.appendChild(datePicker);
  });

  afterEach(() => {
    datePicker.remove();
  });

  it('should render date picker inside shadow DOM', () => {
    const shadowRoot = datePicker.shadowRoot;
    expect(shadowRoot?.querySelector('.date-picker-container')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(datePicker.getAttribute('data-ui')).toBe('date-picker');
  });

  it('should have date input wrapper', () => {
    const wrapper = datePicker.shadowRoot?.querySelector('.date-input-wrapper');
    expect(wrapper).toBeTruthy();
  });

  it('should have formatted input', () => {
    const input = datePicker.shadowRoot?.querySelector('.formatted-input');
    expect(input).toBeTruthy();
  });

  it('should have calendar button', () => {
    const btn = datePicker.shadowRoot?.querySelector('.calendar-btn');
    expect(btn).toBeTruthy();
  });

  it('should apply label', async () => {
    datePicker.setAttribute('label', 'Select Date');
    await (datePicker as any).updateComplete;
    const label = datePicker.shadowRoot?.querySelector('.date-picker-label');
    expect(label?.textContent).toBe('Select Date');
  });

  it('should apply placeholder', async () => {
    datePicker.setAttribute('placeholder', 'Choose date');
    await (datePicker as any).updateComplete;
    const input = datePicker.shadowRoot?.querySelector('.formatted-input') as HTMLInputElement;
    expect(input?.placeholder).toBe('Choose date');
  });

  it('should be disabled when disabled attribute present', async () => {
    datePicker.setAttribute('disabled', '');
    await (datePicker as any).updateComplete;
    const input = datePicker.shadowRoot?.querySelector('.formatted-input') as HTMLInputElement;
    expect(input?.disabled).toBe(true);
  });

  it('should apply value', async () => {
    datePicker.setAttribute('value', '2024-01-15');
    await (datePicker as any).updateComplete;
    const input = datePicker.shadowRoot?.querySelector('.formatted-input') as HTMLInputElement;
    expect(input?.value).toBe('2024-01-15');
  });

  it('should have calendar icon', () => {
    const icon = datePicker.shadowRoot?.querySelector('.calendar-icon');
    expect(icon).toBeTruthy();
  });
});
