import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-stepper')
export class UIStepper extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: String }) steps: string = '[]';
  @property({ type: Number }) active: number = 1;
  @property({ type: String }) orientation: StepperOrientation = 'horizontal';
  @property({ type: String }) size: StepperSize = 'md';

  private _steps: StepperStep[] = [];

  connectedCallback(): void {
    this.setAttribute('data-ui', 'stepper');
    super.connectedCallback();
    this.parseSteps();
  }

  willUpdate(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('steps')) {
      this.parseSteps();
    }
  }

  private parseSteps(): void {
    try {
      const parsed = JSON.parse(this.steps) as StepperStep[];
      this._steps = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      this._steps = [];
    }
  }

  private getActiveIndex(total: number): number {
    if (Number.isNaN(this.active) || total <= 0) return 1;
    return Math.min(Math.max(this.active, 1), total);
  }

  private getStepState(step: StepperStep, index: number): StepState {
    const activeIdx = this.getActiveIndex(this._steps.length);
    if (step.state) return step.state;
    if (index + 1 < activeIdx) return 'complete';
    if (index + 1 === activeIdx) return 'active';
    return 'upcoming';
  }

  private handleStepClick(index: number): void {
    const step = this._steps[index];
    if (step.disabled) return;
    
    this.active = index + 1;
    const state = this.getStepState(step, index);
    
    this.dispatchEvent(new CustomEvent<StepChangeDetail>('step-change', {
      bubbles: true,
      composed: true,
      detail: { index: index + 1, step, state }
    }));
  }

  render() {
    const activeIdx = this.getActiveIndex(this._steps.length);
    const containerClass = classMap({
      'stepper': true,
      [this.orientation]: true,
      [this.size]: true
    });

    return html`
      <div class=${containerClass}>
        ${this._steps.map((step, index) => {
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ` : index + 1}
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

export type { StepperStep, StepChangeDetail };
