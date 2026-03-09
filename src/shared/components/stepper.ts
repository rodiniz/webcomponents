import { html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import { createEnumValidator, createSizeValidator } from '../../core/validators';
import themeStyles from '../../styles/theme.css?inline';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperSize = 'sm' | 'md' | 'lg';
export type StepState = 'complete' | 'active' | 'upcoming' | 'error' | 'warning';

export interface StepperStep {
  title: string;
  description?: string;
  state?: StepState;
  disabled?: boolean;
}

export interface StepChangeDetail {
  index: number;
  step: StepperStep;
  state: StepState;
}

@customElement('ui-stepper')
export class UIStepper extends UIComponentBase {
  static styles = [
    unsafeCSS(themeStyles),
    css`
       :host {
         display: block;
         width: 100%;
         --stepper-primary: var(--color-primary, hsl(var(--primary)));
         --stepper-secondary: var(--color-muted, hsl(var(--muted)));
         --stepper-border: var(--color-border, hsl(var(--border)));
         --stepper-text: var(--color-ink, hsl(var(--foreground)));
         --stepper-muted: var(--color-text-muted, hsl(var(--muted-foreground)));
       }

      .stepper {
        display: flex;
        width: 100%;
        position: relative;
        gap: 1.5rem;
      }

      .stepper.horizontal {
        flex-direction: row;
        align-items: flex-start;
      }

      .stepper.vertical {
        flex-direction: column;
      }

      .step {
        display: flex;
        position: relative;
        flex: 1;
        gap: 0.75rem;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .stepper.horizontal .step {
        flex-direction: column;
        align-items: center;
        text-align: center;
        min-width: 120px;
      }

      .stepper.vertical .step {
        flex-direction: row;
        align-items: flex-start;
      }

      /* Connectors */
      .step::after {
        content: '';
        position: absolute;
        background: var(--stepper-border);
        transition: all 0.3s ease;
        z-index: 0;
      }

      .stepper.horizontal .step:not(:last-child)::after {
        top: 20px;
        left: 50%;
        width: calc(100% + 1.5rem);
        height: 2px;
      }

      .stepper.vertical .step:not(:last-child)::after {
        top: 40px;
        left: 17px;
        width: 2px;
        height: calc(100% - 20px);
      }

      .step.complete::after {
        background: var(--stepper-primary);
      }

      .step-marker {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: white;
        border: 2px solid var(--stepper-border);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.9rem;
        color: var(--stepper-muted);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        z-index: 1;
        flex-shrink: 0;
        position: relative;
      }

      .step.active .step-marker {
        border-color: var(--stepper-primary);
        background: white;
        color: var(--stepper-primary);
        box-shadow: 0 0 0 4px rgba(36, 236, 113, 0.15);
        transform: scale(1.1);
      }

      .step.complete .step-marker {
        background: var(--stepper-primary);
        border-color: var(--stepper-primary);
        color: white;
      }

      .step.error .step-marker {
        background: #fee2e2;
        border-color: #ef4444;
        color: #ef4444;
      }

      .step.warning .step-marker {
        background: #fef3c7;
        border-color: #f59e0b;
        color: #f59e0b;
      }

      .step-marker svg {
        width: 18px;
        height: 18px;
      }

      .step-content {
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .step-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--stepper-text);
        transition: color 0.2s ease;
      }

      .step.upcoming .step-title {
        color: var(--stepper-muted);
      }

      .step-description {
        font-size: 0.8rem;
        color: var(--stepper-muted);
        line-height: 1.4;
      }

      .step.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      /* Size variations */
      .stepper.sm .step-marker { width: 28px; height: 28px; font-size: 0.8rem; }
      .stepper.sm .step-marker svg { width: 14px; height: 14px; }
      .stepper.sm.horizontal .step:not(:last-child)::after { top: 14px; }
      .stepper.sm.vertical .step:not(:last-child)::after { top: 32px; left: 13px; }

      .stepper.lg .step-marker { width: 44px; height: 44px; font-size: 1rem; }
      .stepper.lg .step-marker svg { width: 22px; height: 22px; }
      .stepper.lg.horizontal .step:not(:last-child)::after { top: 22px; }
      .stepper.lg.vertical .step:not(:last-child)::after { top: 48px; left: 21px; }

      @media (max-width: 640px) {
        .stepper.horizontal {
          flex-direction: column;
          align-items: stretch;
        }
        .stepper.horizontal .step {
          flex-direction: row;
          align-items: flex-start;
          text-align: left;
        }
        .stepper.horizontal .step:not(:last-child)::after {
          top: 40px;
          left: 17px;
          width: 2px;
          height: calc(100% - 20px);
        }
      }
    `
  ];

  @property({ type: Array }) steps: StepperStep[] = [];
  @property({ type: Number }) active: number = 1;
  private validateOrientation = createEnumValidator<StepperOrientation>(
    ['horizontal', 'vertical'],
    'horizontal',
    'orientation',
    'UIStepper'
  );
  private validateSize = createSizeValidator<StepperSize>(['sm', 'md', 'lg'], 'md', 'UIStepper');

  private _orientation: StepperOrientation = 'horizontal';
  private _size: StepperSize = 'md';

  @property({ type: String })
  get orientation(): StepperOrientation { return this._orientation; }
  set orientation(value: StepperOrientation) {
    const old = this._orientation;
    this._orientation = this.validateOrientation(value);
    this.requestUpdate('orientation', old);
  }

  @property({ type: String })
  get size(): StepperSize { return this._size; }
  set size(value: StepperSize) {
    const old = this._size;
    this._size = this.validateSize(value);
    this.requestUpdate('size', old);
  }

  private getActiveIndex(): number {
    const steps = this.steps || [];
    if (Number.isNaN(this.active) || steps.length <= 0) return 1;
    return Math.min(Math.max(this.active, 1), steps.length);
  }

  private getStepState(step: StepperStep, index: number): StepState {
    const steps = this.steps || [];
    if (step.state) return step.state;
    const activeIdx = this.getActiveIndex();
    if (index + 1 < activeIdx) return 'complete';
    if (index + 1 === activeIdx) return 'active';
    return 'upcoming';
  }

  private handleStepClick(index: number): void {
    const steps = this.steps || [];
    const step = steps[index];
    if (step.disabled) return;

    this.active = index + 1;
    const state = this.getStepState(step, index);

    this.emit<StepChangeDetail>('step-change', { index: index + 1, step, state });
  }

  render() {
    const steps = this.steps || [];
    const containerClass = classMap({
      'stepper': true,
      [this.orientation]: true,
      [this.size]: true
    });

    return html`
      <div class=${containerClass}>
        ${steps.map((step, index) => {
      const state = this.getStepState(step, index);
      const stepClass = classMap({
        'step': true,
        [state]: true,
        'disabled': !!step.disabled
      });

      return html`
            <div class=${stepClass} @click=${() => this.handleStepClick(index)}>
              <div class="step-marker">
                ${state === 'complete' ? html`
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ` : (state === 'error' ? html`
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ` : (state === 'warning' ? '!' : index + 1))}
              </div>
              <div class="step-content">
                <div class="step-title">${step.title}</div>
                ${step.description ? html`<div class="step-description">${step.description}</div>` : ''}
              </div>
            </div>
          `;
    })}
      </div>
    `;
  }
}


