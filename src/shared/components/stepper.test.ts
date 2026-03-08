import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/stepper';

describe('UIStepper', () => {
  let stepper: HTMLElement;

  beforeEach(() => {
    stepper = document.createElement('ui-stepper');
    document.body.appendChild(stepper);
  });

  afterEach(() => {
    stepper.remove();
  });

  it('should render stepper inside shadow DOM', () => {
    const shadowRoot = stepper.shadowRoot;
    expect(shadowRoot?.querySelector('.stepper')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(stepper.getAttribute('data-ui')).toBe('stepper');
  });

  it('should render steps', async () => {
    const el = stepper as any;
    el.steps = [
      { title: 'Step 1' },
      { title: 'Step 2' },
      { title: 'Step 3' }
    ];
    await el.updateComplete;
    
    const steps = stepper.shadowRoot?.querySelectorAll('.step');
    expect(steps?.length).toBe(3);
  });

  it('should have default orientation horizontal', () => {
    const stepperEl = stepper.shadowRoot?.querySelector('.stepper');
    expect(stepperEl?.classList.contains('horizontal')).toBe(true);
  });

  it('should apply vertical orientation', async () => {
    stepper.setAttribute('orientation', 'vertical');
    await (stepper as any).updateComplete;
    const stepperEl = stepper.shadowRoot?.querySelector('.stepper');
    expect(stepperEl?.classList.contains('vertical')).toBe(true);
  });

  it('should have default size md', () => {
    const stepperEl = stepper.shadowRoot?.querySelector('.stepper');
    expect(stepperEl?.classList.contains('md')).toBe(true);
  });

  it('should apply small size', async () => {
    stepper.setAttribute('size', 'sm');
    await (stepper as any).updateComplete;
    const stepperEl = stepper.shadowRoot?.querySelector('.stepper');
    expect(stepperEl?.classList.contains('sm')).toBe(true);
  });

  it('should render step titles', async () => {
    const el = stepper as any;
    el.steps = [
      { title: 'Step 1', description: 'Description 1' },
      { title: 'Step 2' }
    ];
    await el.updateComplete;
    
    const titles = stepper.shadowRoot?.querySelectorAll('.step-title');
    expect(titles?.[0]?.textContent).toBe('Step 1');
    expect(titles?.[1]?.textContent).toBe('Step 2');
  });

  it('should emit step-change event on step click', async () => {
    const el = stepper as any;
    el.steps = [
      { title: 'Step 1' },
      { title: 'Step 2' }
    ];
    el.active = 1;
    await el.updateComplete;
    
    const step = stepper.shadowRoot?.querySelector('.step');
    let eventFired = false;
    stepper.addEventListener('step-change', () => { eventFired = true; });
    
    (step as HTMLElement).click();
    expect(eventFired).toBe(true);
  });
});
