import { BaseComponent } from '../../core/base-component';
import { selectDemoHTML } from './select-demo-page.html';
import { selectDemoCSS } from './select-demo-page.css';
import '../../shared/components/button';
import '../../shared/components/select';
import '../../layouts/app-layout';
class SelectDemoPage extends BaseComponent {
	async connectedCallback(): Promise<void> {
		super.connectedCallback();
		// Wait for ui-select to be defined before setting up
		await customElements.whenDefined('ui-select');
		// Small delay to ensure elements are connected
		await new Promise(resolve => setTimeout(resolve, 10));
		this.setupSelects();
		this.setupEventListeners();
	}

	private setupSelects(): void {
		// Basic select options
		const basicSelect = this.shadowRoot!.getElementById('basicSelect') as any;
		const disabledSelect = this.shadowRoot!.getElementById('disabledSelect') as any;
		
		const fruits = [
			{ value: 'apple', label: '🍎 Apple' },
			{ value: 'banana', label: '🍌 Banana' },
			{ value: 'orange', label: '🍊 Orange' },
			{ value: 'grape', label: '🍇 Grape' },
			{ value: 'strawberry', label: '🍓 Strawberry' },
			{ value: 'watermelon', label: '🍉 Watermelon' }
		];

		if (basicSelect) basicSelect.setAttribute('options', JSON.stringify(fruits));
		if (disabledSelect) disabledSelect.setAttribute('options', JSON.stringify(fruits));

		// Searchable select with countries
		const searchableSelect = this.shadowRoot!.getElementById('searchableSelect') as any;
		const countries = [
			{ value: 'us', label: 'United States' },
			{ value: 'uk', label: 'United Kingdom' },
			{ value: 'ca', label: 'Canada' },
			{ value: 'au', label: 'Australia' },
			{ value: 'de', label: 'Germany' },
			{ value: 'fr', label: 'France' },
			{ value: 'jp', label: 'Japan' },
			{ value: 'br', label: 'Brazil' },
			{ value: 'in', label: 'India' },
			{ value: 'cn', label: 'China' }
		];

		if (searchableSelect) searchableSelect.setAttribute('options', JSON.stringify(countries));

		// Preselected select
		const preselectedSelect = this.shadowRoot!.getElementById('preselectedSelect') as any;
		const languages = [
			{ value: 'javascript', label: 'JavaScript' },
			{ value: 'typescript', label: 'TypeScript' },
			{ value: 'python', label: 'Python' },
			{ value: 'java', label: 'Java' },
			{ value: 'csharp', label: 'C#' },
			{ value: 'go', label: 'Go' },
			{ value: 'rust', label: 'Rust' }
		];

		if (preselectedSelect) preselectedSelect.setAttribute('options', JSON.stringify(languages));

		// Form selects
		const roleSelect = this.shadowRoot!.getElementById('roleSelect') as any;
		const roles = [
			{ value: 'admin', label: 'Administrator' },
			{ value: 'manager', label: 'Manager' },
			{ value: 'developer', label: 'Developer' },
			{ value: 'designer', label: 'Designer' },
			{ value: 'user', label: 'User' }
		];

		if (roleSelect) roleSelect.setAttribute('options', JSON.stringify(roles));

		const departmentSelect = this.shadowRoot!.getElementById('departmentSelect') as any;
		const departments = [
			{ value: 'engineering', label: 'Engineering' },
			{ value: 'design', label: 'Design' },
			{ value: 'marketing', label: 'Marketing' },
			{ value: 'sales', label: 'Sales' },
			{ value: 'hr', label: 'Human Resources' }
		];

		if (departmentSelect) departmentSelect.setAttribute('options', JSON.stringify(departments));
	}

	private setupEventListeners(): void {
		// Basic select change
		const basicSelect = this.shadowRoot!.getElementById('basicSelect');
		const basicResult = this.shadowRoot!.getElementById('basicResult');
		const basicValue = this.shadowRoot!.getElementById('basicValue');

		basicSelect?.addEventListener('select-change', ((e: CustomEvent) => {
			if (basicResult && basicValue) {
				basicResult.style.display = 'block';
				basicValue.textContent = `${e.detail.option.label} (${e.detail.value})`;
			}
		}) as EventListener);

		// Searchable select change
		const searchableSelect = this.shadowRoot!.getElementById('searchableSelect');
		const searchResult = this.shadowRoot!.getElementById('searchResult');
		const searchValue = this.shadowRoot!.getElementById('searchValue');

		searchableSelect?.addEventListener('select-change', ((e: CustomEvent) => {
			if (searchResult && searchValue) {
				searchResult.style.display = 'block';
				searchValue.textContent = `${e.detail.option.label} (${e.detail.value})`;
			}
		}) as EventListener);

		// Preselected select change
		const preselectedSelect = this.shadowRoot!.getElementById('preselectedSelect');
		const preselectedResult = this.shadowRoot!.getElementById('preselectedResult');
		const preselectedValue = this.shadowRoot!.getElementById('preselectedValue');

		preselectedSelect?.addEventListener('select-change', ((e: CustomEvent) => {
			if (preselectedResult && preselectedValue) {
				preselectedResult.style.display = 'block';
				preselectedValue.textContent = `${e.detail.option.label} (${e.detail.value})`;
			}
		}) as EventListener);

		// Form submit
		const userForm = this.shadowRoot!.getElementById('userForm') as HTMLFormElement;
		const roleSelect = this.shadowRoot!.getElementById('roleSelect') as any;
		const departmentSelect = this.shadowRoot!.getElementById('departmentSelect') as any;
		const formResult = this.shadowRoot!.getElementById('formResult');
		const formValue = this.shadowRoot!.getElementById('formValue');
		const resetBtn = this.shadowRoot!.getElementById('resetForm');

		userForm?.addEventListener('submit', (e) => {
			e.preventDefault();
			
			const roleValue = roleSelect?.getAttribute('value') || 'Not selected';
			const deptValue = departmentSelect?.getAttribute('value') || 'Not selected';

			if (formResult && formValue) {
				formResult.style.display = 'block';
				formValue.innerHTML = `Role: <strong>${roleValue}</strong><br>Department: <strong>${deptValue}</strong>`;
			}
		});

		resetBtn?.addEventListener('click', () => {
			roleSelect?.removeAttribute('value');
			departmentSelect?.removeAttribute('value');
			if (formResult) formResult.style.display = 'none';
		});
	}

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${selectDemoCSS}</style>
			${selectDemoHTML}
		`;
	}
}

customElements.define('select-demo-page', SelectDemoPage);
