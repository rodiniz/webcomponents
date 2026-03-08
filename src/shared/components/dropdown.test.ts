import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/dropdown';

describe('UIDropdown', () => {
  let dropdown: HTMLElement;

  beforeEach(() => {
    dropdown = document.createElement('ui-dropdown');
    document.body.appendChild(dropdown);
  });

  afterEach(() => {
    dropdown.remove();
  });

  it('should render dropdown inside shadow DOM', () => {
    const shadowRoot = dropdown.shadowRoot;
    expect(shadowRoot?.querySelector('.dropdown-container')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(dropdown.getAttribute('data-ui')).toBe('dropdown');
  });

  it('should have default label Menu', () => {
    const label = dropdown.shadowRoot?.querySelector('.dropdown-label');
    expect(label?.textContent).toBe('Menu');
  });

  it('should apply label attribute', async () => {
    dropdown.setAttribute('label', 'Select option');
    await (dropdown as any).updateComplete;
    const label = dropdown.shadowRoot?.querySelector('.dropdown-label');
    expect(label?.textContent).toBe('Select option');
  });

  it('should have trigger button', () => {
    const button = dropdown.shadowRoot?.querySelector('.dropdown-trigger');
    expect(button).toBeTruthy();
  });

  it('should have chevron icon', () => {
    const chevron = dropdown.shadowRoot?.querySelector('.dropdown-chevron');
    expect(chevron).toBeTruthy();
  });

  it('should have default size md', () => {
    const button = dropdown.shadowRoot?.querySelector('.dropdown-trigger');
    expect(button?.classList.contains('md')).toBe(true);
  });

  it('should apply size attribute', async () => {
    dropdown.setAttribute('size', 'lg');
    await (dropdown as any).updateComplete;
    const button = dropdown.shadowRoot?.querySelector('.dropdown-trigger');
    expect(button?.classList.contains('lg')).toBe(true);
  });

  it('should apply small size', async () => {
    dropdown.setAttribute('size', 'sm');
    await (dropdown as any).updateComplete;
    const button = dropdown.shadowRoot?.querySelector('.dropdown-trigger');
    expect(button?.classList.contains('sm')).toBe(true);
  });

  it('should be disabled when disabled attribute present', async () => {
    dropdown.setAttribute('disabled', '');
    await (dropdown as any).updateComplete;
    const button = dropdown.shadowRoot?.querySelector('.dropdown-trigger') as HTMLButtonElement;
    expect(button?.disabled).toBe(true);
  });

  it('should have dropdown menu', () => {
    const menu = dropdown.shadowRoot?.querySelector('.dropdown-menu');
    expect(menu).toBeTruthy();
  });

  it('should show empty message when no items', () => {
    const empty = dropdown.shadowRoot?.querySelector('.dropdown-empty');
    expect(empty?.textContent).toBe('No items');
  });
});
