import { BaseComponent } from '../../core/base-component';
import formDemoHTML from './form-demo-page.html?raw';
import { formDemoCSS } from './form-demo-page.css';
import { getFormValues, queryElement } from '../../core/dom-helpers';
import '../../shared/components/button';
import '../../shared/components/input';
import '../../shared/components/select';
import '../../shared/components/checkbox';
import '../../shared/components/date-picker';
import '../../shared/components/upload';
import '../../layouts/app-layout';

const roles = [
	{ value: 'admin', label: 'Administrator' },
	{ value: 'manager', label: 'Manager' },
	{ value: 'developer', label: 'Developer' },
	{ value: 'designer', label: 'Designer' }
];

const regions = [
	{ value: 'us-east', label: 'US East' },
	{ value: 'us-west', label: 'US West' },
	{ value: 'eu-west', label: 'EU West' },
	{ value: 'apac', label: 'APAC' }
];

class FormDemoPage extends BaseComponent {
	async connectedCallback(): Promise<void> {
		super.connectedCallback();
		// Wait for render to complete
		await new Promise(resolve => requestAnimationFrame(resolve));
		// Wait for custom elements to be defined
		await Promise.all([
			customElements.whenDefined('ui-select'),
			customElements.whenDefined('ui-upload'),
			customElements.whenDefined('ui-input'),
			customElements.whenDefined('ui-checkbox'),
			customElements.whenDefined('ui-date-picker')
		]);
		await new Promise(resolve => setTimeout(resolve, 50));
		this.setupSelects();
		this.setupForm();
	}

	private setupSelects(): void {
		const roleSelect = queryElement<HTMLElement>(this.shadowRoot, '#roleSelect') ;
		const regionSelect = queryElement<HTMLElement>(this.shadowRoot, '#regionSelect') ;

		if (roleSelect) roleSelect.setAttribute('options', JSON.stringify(roles));
		if (regionSelect) regionSelect.setAttribute('options', JSON.stringify(regions));
	}

	private setupForm(): void {
		const form = queryElement<HTMLFormElement>(this.shadowRoot, '#formLab') ;
		const output = queryElement<HTMLPreElement>(this.shadowRoot, '#formResult') ;
		const reset = queryElement<HTMLButtonElement>(this.shadowRoot, '#resetForm') ;

		if (!form) {
			console.error('Form not found');
			return;
		}   

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			if (!output) return;

			const values = getFormValues(form, { includeEmpty: false });
			const serialized = JSON.stringify(values, (_key: string, value: any) => {
				if (value instanceof File) return `File: ${value.name} (${(value.size / 1024).toFixed(1)} KB)`;
				return value;
			}, 2);
			output.textContent = serialized;
		});

		reset?.addEventListener('click', () => {
			form?.reset();
			if (output) output.textContent = 'Submit the form to see values.';
			this.shadowRoot?.querySelectorAll('ui-input').forEach(input => {
				(input as { value?: string }).value = '';
			});
			this.shadowRoot?.querySelectorAll('ui-select').forEach(select => {
				select.removeAttribute('value');
			});
			this.shadowRoot?.querySelectorAll('ui-checkbox').forEach(checkbox => {
				(checkbox as { setChecked?: (value: boolean) => void }).setChecked?.(false);
			});
			this.shadowRoot?.querySelectorAll('ui-date-picker').forEach(datePicker => {
				datePicker.removeAttribute('value');
			});
			this.shadowRoot?.querySelectorAll('ui-upload').forEach(upload => {
				(upload as { clear?: () => void }).clear?.();
			});
		});
	}

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${formDemoCSS}</style>
			${formDemoHTML}
		`;
	}
}

customElements.define('form-demo-page', FormDemoPage);
