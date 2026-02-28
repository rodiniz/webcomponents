import { BaseComponent } from '../../core/base-component';
import { html, render } from 'lit-html';
import { classMap } from '../../core/template';
import styles from '../../styles/theme.css?inline';

type StepperOrientation = 'horizontal' | 'vertical';
type StepperSize = 'sm' | 'md' | 'lg';
type StepState = 'complete' | 'active' | 'upcoming' | 'error' | 'warning';

type StepperStep = {
	title: string;
	description?: string;
	disabled?: boolean;
	state?: StepState;
};

type StepChangeDetail = {
	index: number;
	step: StepperStep;
	state: StepState;
};

class UIStepper extends BaseComponent {
	private steps: StepperStep[] = [];

	connectedCallback(): void {
		this.setAttribute('data-ui', 'stepper');
		super.connectedCallback();
		this.parseSteps();
	}

	static get observedAttributes(): string[] {
		return ['steps', 'active', 'orientation', 'size'];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if (name === 'steps' && oldValue !== newValue) {
			this.parseSteps();
		}
		if (name === 'active' && oldValue !== newValue) {
			this.render();
			return;
		}
		this.render();
	}

	private parseSteps(): void {
		const stepsAttr = this.getAttribute('steps');
		if (!stepsAttr) {
			this.steps = [];
			return;
		}

		try {
			const parsed = JSON.parse(stepsAttr) as StepperStep[];
			this.steps = Array.isArray(parsed) ? parsed : [];
		} catch (error) {
			console.error('Invalid steps JSON', error);
			this.steps = [];
		}
	}

	private getOrientation(): StepperOrientation {
		const value = this.getAttribute('orientation');
		if (value === 'vertical') return 'vertical';
		return 'horizontal';
	}

	private getSize(): StepperSize {
		const value = this.getAttribute('size');
		if (value === 'sm' || value === 'lg') return value;
		return 'md';
	}

	private getActiveIndex(total: number): number {
		const raw = parseInt(this.getAttribute('active') || '1', 10);
		if (Number.isNaN(raw) || total <= 0) return 1;
		return Math.min(Math.max(raw, 1), total);
	}

	private resolveState(step: StepperStep, index: number, activeIndex: number): StepState {
		if (step.state) return step.state;
		if (index + 1 < activeIndex) return 'complete';
		if (index + 1 === activeIndex) return 'active';
		return 'upcoming';
	}

	private setActive(index: number): void {
		const total = this.steps.length;
		if (total === 0) return;

		const nextIndex = Math.min(Math.max(index, 1), total);
		if (nextIndex === this.getActiveIndex(total)) return;

		this.setAttribute('active', String(nextIndex));
		const step = this.steps[nextIndex - 1];
		const state = this.resolveState(step, nextIndex - 1, nextIndex);

		this.dispatchEvent(
			new CustomEvent<StepChangeDetail>('step-change', {
				bubbles: true,
				composed: true,
				detail: { index: nextIndex, step, state }
			})
		);
	}

	private escapeHtml(text: string): string {
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	render(): void {
		const orientation = this.getOrientation();
		const size = this.getSize();
		const steps = this.steps;
		const total = steps.length;
		const activeIndex = this.getActiveIndex(total);

		const renderStep = (step: StepperStep, index: number) => {
			const state = this.resolveState(step, index, activeIndex);
			const isActive = state === 'active';
			const disabled = !!step.disabled;

			const stepClasses = classMap({
				'step': true,
				[state]: true,
				'disabled': disabled
			});

			return html`
				<li class=${stepClasses} data-state="${state}">
					<button 
						class="step-trigger" 
						data-index="${index}" 
						?disabled=${disabled}
						aria-current="${isActive ? 'step' : 'false'}"
					>
						<span class="step-node">${index + 1}</span>
						<span class="step-text">
							<span class="step-title">${this.escapeHtml(step.title || `Step ${index + 1}`)}</span>
							${step.description ? html`<span class="step-desc">${this.escapeHtml(step.description)}</span>` : ''}
						</span>
					</button>
					${index < total - 1 ? html`<span class="step-connector" aria-hidden="true"></span>` : ''}
				</li>
			`;
		};

		const template = html`
			<style>${styles}</style>
			<div class="stepper-wrap">
				${total === 0 
					? html`<div class="stepper-empty">No steps configured</div>` 
					: html`
						<ol class="stepper ${orientation} ${size}" role="list">
							${steps.map(renderStep)}
						</ol>
					`}
			</div>
		`;

		render(template, this.shadowRoot!);

		this.shadowRoot!.querySelectorAll<HTMLButtonElement>('.step-trigger').forEach(button => {
			button.addEventListener('click', () => {
				const index = parseInt(button.dataset.index || '0', 10);
				if (!Number.isNaN(index)) this.setActive(index + 1);
			});
		});
	}
}

export { UIStepper };
export type { StepperOrientation, StepperSize, StepperStep, StepChangeDetail, StepState };

customElements.define('ui-stepper', UIStepper);
