import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../../../src/shared/components/toast';

describe('UIToast', () => {
  let toast: HTMLElement;

  beforeEach(() => {
    toast = document.createElement('ui-toast');
    document.body.appendChild(toast);
  });

  afterEach(() => {
    toast.remove();
  });

  it('should render toast container inside shadow DOM', () => {
    const shadowRoot = toast.shadowRoot;
    expect(shadowRoot?.querySelector('.toast-container')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(toast.getAttribute('data-ui')).toBe('toast');
  });

  it('should have default position top-right', () => {
    const container = toast.shadowRoot?.querySelector('.toast-container');
    expect(container?.classList.contains('top-right')).toBe(true);
  });

  it('should apply position attribute', async () => {
    toast.setAttribute('position', 'bottom-left');
    await (toast as any).updateComplete;
    const container = toast.shadowRoot?.querySelector('.toast-container');
    expect(container?.classList.contains('bottom-left')).toBe(true);
  });

  it('should show toast with show method', () => {
    const toastEl = toast as any;
    const id = toastEl.show({ title: 'Test toast' });
    expect(id).toBeTruthy();
    expect(id).toContain('toast-');
  });

  it('should show success toast', () => {
    const toastEl = toast as any;
    const id = toastEl.success('Success!', 'Operation completed');
    expect(id).toBeTruthy();
  });

  it('should show error toast', () => {
    const toastEl = toast as any;
    const id = toastEl.error('Error!', 'Something went wrong');
    expect(id).toBeTruthy();
  });

  it('should show warning toast', () => {
    const toastEl = toast as any;
    const id = toastEl.warning('Warning!', 'Check this');
    expect(id).toBeTruthy();
  });

  it('should show info toast', () => {
    const toastEl = toast as any;
    const id = toastEl.info('Info', 'Some information');
    expect(id).toBeTruthy();
  });

  it('should emit toast-show event when toast is shown', () => {
    const toastEl = toast as any;
    let eventFired = false;
    toast.addEventListener('toast-show', () => { eventFired = true; });
    
    toastEl.show({ title: 'Test' });
    expect(eventFired).toBe(true);
  });

  it('should dismiss toast with dismiss method', async () => {
    const toastEl = toast as any;
    const id = toastEl.show({ title: 'Test', duration: 0 });
    await new Promise(resolve => setTimeout(resolve, 50));
    toastEl.dismiss(id);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const toastContainer = toast.shadowRoot?.querySelector('.toast-container');
    const toastElements = toastContainer?.querySelectorAll('.toast');
    expect(toastElements?.length).toBe(0);
  });

  it('should dismiss all toasts with dismissAll method', async () => {
    const toastEl = toast as any;
    toastEl.show({ title: 'Test 1', duration: 0 });
    toastEl.show({ title: 'Test 2', duration: 0 });
    await new Promise(resolve => setTimeout(resolve, 50));
    toastEl.dismissAll();
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const toastContainer = toast.shadowRoot?.querySelector('.toast-container');
    const toastElements = toastContainer?.querySelectorAll('.toast');
    expect(toastElements?.length).toBe(0);
  });
});
