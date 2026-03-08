import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/card';

describe('UICard', () => {
  let card: HTMLElement;

  beforeEach(() => {
    card = document.createElement('ui-card');
    document.body.appendChild(card);
  });

  afterEach(() => {
    card.remove();
  });

  it('should render card element inside shadow DOM', () => {
    const shadowRoot = card.shadowRoot;
    expect(shadowRoot?.querySelector('.card')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(card.getAttribute('data-ui')).toBe('card');
  });

  it('should have default variant default', () => {
    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('default')).toBe(true);
  });

  it('should apply variant class', async () => {
    card.setAttribute('variant', 'elevated');
    await (card as any).updateComplete;
    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('elevated')).toBe(true);
  });

  it('should apply bordered variant', async () => {
    card.setAttribute('variant', 'bordered');
    await (card as any).updateComplete;
    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('bordered')).toBe(true);
  });

  it('should apply ghost variant', async () => {
    card.setAttribute('variant', 'ghost');
    await (card as any).updateComplete;
    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('ghost')).toBe(true);
  });

  it('should apply glass variant', async () => {
    card.setAttribute('variant', 'glass');
    await (card as any).updateComplete;
    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('glass')).toBe(true);
  });

  it('should have rounded class by default', () => {
    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('rounded')).toBe(true);
  });

  it('should remove rounded when rounded is false', async () => {
    (card as any).rounded = false;
    await (card as any).updateComplete;
    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('square')).toBe(true);
  });

  it('should have no-shadow class by default', () => {
    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('no-shadow')).toBe(true);
  });

  it('should apply shadow when shadow attribute is set', async () => {
    card.setAttribute('shadow', '');
    await (card as any).updateComplete;
    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('custom-shadow')).toBe(true);
  });

  it('should apply interactive class when interactive is true', async () => {
    card.setAttribute('interactive', '');
    await (card as any).updateComplete;
    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('interactive')).toBe(true);
  });

  it('should apply animated class when animated is true', async () => {
    card.setAttribute('animated', '');
    await (card as any).updateComplete;
    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('animated')).toBe(true);
  });

  it('should have header slot', () => {
    const headerSlot = card.shadowRoot?.querySelector('slot[name="header"]');
    expect(headerSlot).toBeTruthy();
  });

  it('should have content slot', () => {
    const contentSlot = card.shadowRoot?.querySelector('.card-content slot');
    expect(contentSlot).toBeTruthy();
  });

  it('should have footer slot', () => {
    const footerSlot = card.shadowRoot?.querySelector('slot[name="footer"]');
    expect(footerSlot).toBeTruthy();
  });
});
