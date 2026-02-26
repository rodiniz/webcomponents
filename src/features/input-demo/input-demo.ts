import { BaseComponent } from '../../core/base-component';
import '../../shared/components/input';
import '../../shared/components/button';
import template from './input-demo.html?raw';
import styles from './input-demo.css?inline';
import '../../layouts/app-layout';

class InputDemo extends BaseComponent {
	private formResult: HTMLElement | null = null;
	private statusSpan: HTMLElement | null = null;

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			${template}
		`;

		this.formResult = this.shadowRoot!.querySelector('#form-result');
		this.statusSpan = this.shadowRoot!.querySelector('#result-status');

		const form = this.shadowRoot!.querySelector('#demo-form');
		const resetBtn = this.shadowRoot!.querySelector('#reset-btn');

		if (form) {
			form.addEventListener('submit', this.handleSubmit.bind(this));
		}

		if (resetBtn) {
			resetBtn.addEventListener('click', this.handleReset.bind(this));
		}
	}

	private async handleSubmit(e: Event): Promise<void> {
		e.preventDefault();

		const inputs = Array.from(this.shadowRoot!.querySelectorAll('ui-input')) as unknown as Array<{
			reportValidity: () => boolean;
			value: string;
		}>;

		let allValid = true;

		for (const input of inputs) {
			const valid = input.reportValidity();
			if (!valid) {
				allValid = false;
			}
		}

		if (this.statusSpan) {
			this.statusSpan.textContent = allValid ? 'Valid' : 'Invalid';
			this.statusSpan.className = `result-value ${allValid ? 'valid' : 'invalid'}`;
		}
	}

	private handleReset(): void {
		const inputs = this.shadowRoot!.querySelectorAll('ui-input');
		inputs.forEach(input => {
			(input as any).value = '';
		});

		if (this.statusSpan) {
			this.statusSpan.textContent = 'Not validated';
			this.statusSpan.className = 'result-value';
		}
	}
}

customElements.define('input-demo', InputDemo);

export { InputDemo };
