import { BaseComponent } from '../../core/base-component';
import '../../layouts/app-layout';
import '../../shared/components/date-picker';
import '../../shared/components/button';
import template from './date-picker-demo.html?raw';
import styles from './date-picker-demo.css?inline';

class DatePickerDemo extends BaseComponent {
	connectedCallback(): void {
		super.connectedCallback();
		this.attachEventListeners();
	}

	private attachEventListeners(): void {
		if (!this.shadowRoot) return;

		// Listen to date change events
		const pickers = this.shadowRoot.querySelectorAll('ui-date-picker');
		pickers.forEach((picker) => {
			picker.addEventListener('date-change', ((e: CustomEvent) => {
				const output = this.shadowRoot?.querySelector(`#output-${picker.id}`);
				if (output) {
					output.textContent = JSON.stringify(e.detail, null, 2);
				}
			}) as EventListener);
		});

		// Clear button functionality
		this.shadowRoot.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.closest('.clear-btn')) {
				const pickerId = target.closest('.clear-btn')?.getAttribute('data-picker');
				const picker = this.shadowRoot?.querySelector(`#${pickerId}`) as any;
				if (picker && picker.clear) {
					picker.clear();
				}
			}
		});
	}

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			${template}
		`;
	}
}

customElements.define('date-picker-demo', DatePickerDemo);

export { DatePickerDemo };
