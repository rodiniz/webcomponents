import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/pagination';

describe('UIPagination', () => {
  let pagination: HTMLElement;

  beforeEach(() => {
    pagination = document.createElement('ui-pagination');
    document.body.appendChild(pagination);
  });

  afterEach(() => {
    pagination.remove();
  });

  it('should render pagination inside shadow DOM', () => {
    const shadowRoot = pagination.shadowRoot;
    expect(shadowRoot?.querySelector('.pagination-container')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(pagination.getAttribute('data-ui')).toBe('pagination');
  });

  it('should show info text when total > 0', async () => {
    pagination.setAttribute('total', '100');
    await (pagination as any).updateComplete;
    const info = pagination.shadowRoot?.querySelector('.pagination-info');
    expect(info?.textContent).toContain('Showing');
  });

  it('should show no results when total is 0', async () => {
    pagination.setAttribute('total', '0');
    await (pagination as any).updateComplete;
    const info = pagination.shadowRoot?.querySelector('.pagination-info');
    expect(info?.textContent).toContain('No results');
  });

  it('should calculate total pages correctly', async () => {
    pagination.setAttribute('total', '100');
    pagination.setAttribute('page-size', '10');
    await (pagination as any).updateComplete;
    const info = pagination.shadowRoot?.querySelector('.pagination-info');
    expect(info?.textContent).toContain('100');
  });

  it('should not render pagination nav when total pages <= 1', async () => {
    pagination.setAttribute('total', '5');
    pagination.setAttribute('page-size', '10');
    await (pagination as any).updateComplete;
    const nav = pagination.shadowRoot?.querySelector('.pagination');
    expect(nav).toBeFalsy();
  });

  it('should render pagination nav when total pages > 1', async () => {
    pagination.setAttribute('total', '20');
    pagination.setAttribute('page-size', '10');
    await (pagination as any).updateComplete;
    const nav = pagination.shadowRoot?.querySelector('.pagination');
    expect(nav).toBeTruthy();
  });

  it('should render page buttons', async () => {
    pagination.setAttribute('total', '50');
    pagination.setAttribute('page-size', '10');
    await (pagination as any).updateComplete;
    const buttons = pagination.shadowRoot?.querySelectorAll('.page-btn');
    expect(buttons?.length).toBeGreaterThan(0);
  });

  it('should have previous and next buttons', async () => {
    pagination.setAttribute('total', '50');
    pagination.setAttribute('page-size', '10');
    await (pagination as any).updateComplete;
    const prevBtn = pagination.shadowRoot?.querySelector('[data-page="prev"]');
    const nextBtn = pagination.shadowRoot?.querySelector('[data-page="next"]');
    expect(prevBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();
  });

  it('should disable prev button on first page', async () => {
    pagination.setAttribute('total', '50');
    pagination.setAttribute('page-size', '10');
    pagination.setAttribute('current-page', '1');
    await (pagination as any).updateComplete;
    const prevBtn = pagination.shadowRoot?.querySelector('[data-page="prev"]') as HTMLButtonElement;
    expect(prevBtn?.disabled).toBe(true);
  });

  it('should emit page-change event on page click', async () => {
    pagination.setAttribute('total', '50');
    pagination.setAttribute('page-size', '10');
    pagination.setAttribute('current-page', '1');
    await (pagination as any).updateComplete;
    
    const nextBtn = pagination.shadowRoot?.querySelector('[data-page="next"]');
    let eventFired = false;
    pagination.addEventListener('page-change', () => { eventFired = true; });
    
    (nextBtn as HTMLElement).click();
    expect(eventFired).toBe(true);
  });
});
