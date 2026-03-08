import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/link';

describe('UILink', () => {
  let link: HTMLElement;

  beforeEach(() => {
    link = document.createElement('ui-link');
    document.body.appendChild(link);
  });

  afterEach(() => {
    link.remove();
  });

  it('should render link element inside shadow DOM', () => {
    const shadowRoot = link.shadowRoot;
    expect(shadowRoot?.querySelector('a')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(link.getAttribute('data-ui')).toBe('link');
  });

  it('should have default variant primary', () => {
    const linkEl = link.shadowRoot?.querySelector('a');
    expect(linkEl?.classList.contains('primary')).toBe(true);
  });

  it('should apply variant class', async () => {
    link.setAttribute('variant', 'secondary');
    await (link as any).updateComplete;
    const linkEl = link.shadowRoot?.querySelector('a');
    expect(linkEl?.classList.contains('secondary')).toBe(true);
    expect(linkEl?.classList.contains('primary')).toBe(false);
  });

  it('should apply ghost variant', async () => {
    link.setAttribute('variant', 'ghost');
    await (link as any).updateComplete;
    const linkEl = link.shadowRoot?.querySelector('a');
    expect(linkEl?.classList.contains('ghost')).toBe(true);
  });

  it('should apply danger variant', async () => {
    link.setAttribute('variant', 'danger');
    await (link as any).updateComplete;
    const linkEl = link.shadowRoot?.querySelector('a');
    expect(linkEl?.classList.contains('danger')).toBe(true);
  });

  it('should apply href attribute', async () => {
    link.setAttribute('href', 'https://example.com');
    await (link as any).updateComplete;
    const linkEl = link.shadowRoot?.querySelector('a');
    expect(linkEl?.getAttribute('href')).toBe('https://example.com');
  });

  it('should apply target attribute', async () => {
    link.setAttribute('href', 'https://example.com');
    link.setAttribute('target', '_blank');
    await (link as any).updateComplete;
    const linkEl = link.shadowRoot?.querySelector('a');
    expect(linkEl?.getAttribute('target')).toBe('_blank');
  });

  it('should apply rel attribute', async () => {
    link.setAttribute('href', 'https://example.com');
    link.setAttribute('rel', 'noopener noreferrer');
    await (link as any).updateComplete;
    const linkEl = link.shadowRoot?.querySelector('a');
    expect(linkEl?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should apply underline class when underline is true', async () => {
    link.setAttribute('underline', '');
    await (link as any).updateComplete;
    const linkEl = link.shadowRoot?.querySelector('a');
    expect(linkEl?.classList.contains('underline')).toBe(true);
  });

  it('should be disabled when disabled attribute present', async () => {
    link.setAttribute('disabled', '');
    await (link as any).updateComplete;
    const linkEl = link.shadowRoot?.querySelector('a');
    expect(linkEl?.classList.contains('disabled')).toBe(true);
  });

  it('should have slot for content', () => {
    const slot = link.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });
});
