import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import { createEnumValidator, createSizeValidator } from '../../core/validators';
import themeStyles from '../../styles/theme.css?inline';
import stepperStyles from './stepper.css?inline';

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
  static styles = [unsafeCSS(themeStyles), unsafeCSS(stepperStyles)];

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


