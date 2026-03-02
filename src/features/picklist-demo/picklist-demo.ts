import { BaseComponent } from '../../core/base-component';
import '../../shared/components/picklist';
import '../../shared/components/button';
import { queryPicklist } from '../../core/dom-helpers';
import template from './picklist-demo.html?raw';
import styles from './picklist-demo.css?inline';
import '../../layouts/app-layout';

const initialAvailable = [
	{ value: 'javascript', label: 'JavaScript' },
	{ value: 'typescript', label: 'TypeScript' },
	{ value: 'python', label: 'Python' },
	{ value: 'rust', label: 'Rust' },
	{ value: 'go', label: 'Go' },
	{ value: 'java', label: 'Java' },
	{ value: 'csharp', label: 'C#' },
	{ value: 'cpp', label: 'C++' }
];

class PicklistDemo extends BaseComponent {
	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			${template}
		`;

		const picklist = queryPicklist(this.shadowRoot, '#basic-picklist');

		if (picklist) {
			picklist.setAvailableItems(initialAvailable);
			picklist.setSelectedItems([]);
		}

		const getValueBtn = this.shadowRoot!.querySelector('#get-value-btn');
		const resetBtn = this.shadowRoot!.querySelector('#reset-btn');
		const resultValue = this.shadowRoot!.querySelector('#result-value');

		getValueBtn?.addEventListener('click', () => {
			if (picklist && resultValue) {
				const value = picklist.getValue();
				resultValue.textContent = JSON.stringify(value, null, 2);
			}
		});

		resetBtn?.addEventListener('click', () => {
			if (picklist) {
				picklist.setAvailableItems(initialAvailable);
				picklist.setSelectedItems([]);
				if (resultValue) {
					resultValue.textContent = 'Click "Get Value" to see selected items';
				}
			}
		});
	}
}

customElements.define('picklist-demo', PicklistDemo);

export { PicklistDemo };
