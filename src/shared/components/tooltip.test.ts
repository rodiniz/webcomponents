import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/tooltip';

describe('UITooltip', () => {
  let tooltip: HTMLElement;

  beforeEach(() => {
    tooltip = document.createElement('ui-tooltip');
    document.body.appendChild(tooltip);
  });

  afterEach(() => {
    tooltip.remove();
  });

  it('should render tooltip element inside shadow DOM', () => {
    const shadowRoot = tooltip.shadowRoot;
    expect(shadowRoot?.querySelector('.tooltip')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(tooltip.getAttribute('data-ui')).toBe('tooltip');
  });

  it('should have default position top', () => {
    const tooltipEl = tooltip.shadowRoot?.querySelector('.tooltip');
    expect(tooltipEl?.classList.contains('top')).toBe(true);
  });

  it('should apply position attribute', async () => {
    tooltip.setAttribute('position', 'bottom');
    await (tooltip as any).updateComplete;
    const tooltipEl = tooltip.shadowRoot?.querySelector('.tooltip');
    expect(tooltipEl?.classList.contains('bottom')).toBe(true);
    expect(tooltipEl?.classList.contains('top')).toBe(false);
  });

  it('should apply left position', async () => {
    tooltip.setAttribute('position', 'left');
    await (tooltip as any).updateComplete;
    const tooltipEl = tooltip.shadowRoot?.querySelector('.tooltip');
    expect(tooltipEl?.classList.contains('left')).toBe(true);
  });

  it('should apply right position', async () => {
    tooltip.setAttribute('position', 'right');
    await (tooltip as any).updateComplete;
    const tooltipEl = tooltip.shadowRoot?.querySelector('.tooltip');
    expect(tooltipEl?.classList.contains('right')).toBe(true);
  });

  it('should show tooltip text', async () => {
    tooltip.setAttribute('text', 'Tooltip text');
    await (tooltip as any).updateComplete;
    const content = tooltip.shadowRoot?.querySelector('.tooltip-content');
    expect(content?.textContent).toBe('Tooltip text');
  });

  it('should have tooltip arrow', () => {
    const arrow = tooltip.shadowRoot?.querySelector('.tooltip-arrow');
    expect(arrow).toBeTruthy();
  });

  it('should have default trigger hover', () => {
    expect(tooltip.getAttribute('trigger')).toBe('hover');
  });

  it('should apply click trigger', async () => {
    tooltip.setAttribute('trigger', 'click');
    await (tooltip as any).updateComplete;
    expect(tooltip.getAttribute('trigger')).toBe('click');
  });

  it('should be disabled when disabled attribute present', async () => {
    tooltip.setAttribute('disabled', '');
    await (tooltip as any).updateComplete;
    const tooltipEl = tooltip.shadowRoot?.querySelector('.tooltip');
    expect(tooltipEl?.classList.contains('disabled')).toBe(true);
  });
});
