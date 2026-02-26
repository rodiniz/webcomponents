import { BaseComponent } from '../../core/base-component';
import { checkboxDemoHTML } from './checkbox-demo-page.html';
import { checkboxDemoCSS } from './checkbox-demo-page.css';
import '../../shared/components/button';
import '../../shared/components/checkbox';
import '../../layouts/app-layout';
class CheckboxDemoPage extends BaseComponent {
	async connectedCallback(): Promise<void> {
		super.connectedCallback();
		// Wait for ui-checkbox and ui-button to be defined
		await Promise.all([
			customElements.whenDefined('ui-checkbox'),
			customElements.whenDefined('ui-button')
		]);
		await new Promise(resolve => setTimeout(resolve, 10));
		this.setupEventListeners();
	}

	private setupEventListeners(): void {
		// Select All functionality
		const selectAll = this.shadowRoot!.getElementById('selectAll') as any;
		const itemCheckboxes = this.shadowRoot!.querySelectorAll('.item-checkbox');

		const updateSelectAllState = () => {
			const checkedCount = Array.from(itemCheckboxes).filter((cb: any) => 
				cb.hasAttribute('checked')
			).length;

			if (checkedCount === 0) {
				selectAll?.setChecked(false);
			} else if (checkedCount === itemCheckboxes.length) {
				selectAll?.setChecked(true);
			} else {
				selectAll?.setIndeterminate(true);
			}
		};

		selectAll?.addEventListener('checkbox-change', ((e: CustomEvent) => {
			const checked = e.detail.checked;
			itemCheckboxes.forEach((cb: any) => {
				cb.setChecked(checked);
			});
		}) as EventListener);

		itemCheckboxes.forEach((cb) => {
			cb.addEventListener('checkbox-change', updateSelectAllState as EventListener);
		});

		// Initialize select all state
		updateSelectAllState();

		// Form handling
		const form = this.shadowRoot!.getElementById('preferencesForm') as HTMLFormElement;
		const formResult = this.shadowRoot!.getElementById('formResult');
		const formValue = this.shadowRoot!.getElementById('formValue');
		const resetBtn = this.shadowRoot!.getElementById('resetPreferences');

		const emailNotif = this.shadowRoot!.getElementById('emailNotif') as any;
		const smsNotif = this.shadowRoot!.getElementById('smsNotif') as any;
		const pushNotif = this.shadowRoot!.getElementById('pushNotif') as any;
		const weeklyDigest = this.shadowRoot!.getElementById('weeklyDigest') as any;

		form?.addEventListener('submit', (e) => {
			e.preventDefault();

			const preferences = {
				email: emailNotif?.hasAttribute('checked') || false,
				sms: smsNotif?.hasAttribute('checked') || false,
				push: pushNotif?.hasAttribute('checked') || false,
				weekly: weeklyDigest?.hasAttribute('checked') || false
			};

			if (formResult && formValue) {
				formResult.style.display = 'block';
				formValue.innerHTML = `
					Email: <strong>${preferences.email ? '✓ Enabled' : '✗ Disabled'}</strong><br>
					SMS: <strong>${preferences.sms ? '✓ Enabled' : '✗ Disabled'}</strong><br>
					Push: <strong>${preferences.push ? '✓ Enabled' : '✗ Disabled'}</strong><br>
					Weekly Digest: <strong>${preferences.weekly ? '✓ Enabled' : '✗ Disabled'}</strong>
				`;
			}
		});

		resetBtn?.addEventListener('click', () => {
			emailNotif?.setChecked(true);
			smsNotif?.setChecked(false);
			pushNotif?.setChecked(true);
			weeklyDigest?.setChecked(false);
			if (formResult) formResult.style.display = 'none';
		});

		// Event logging
		const eventCheckbox = this.shadowRoot!.getElementById('eventCheckbox');
		const eventResult = this.shadowRoot!.getElementById('eventResult');
		const eventLog = this.shadowRoot!.getElementById('eventLog');
		let eventCount = 0;

		eventCheckbox?.addEventListener('checkbox-change', ((e: CustomEvent) => {
			eventCount++;
			const timestamp = new Date().toLocaleTimeString();
			const status = e.detail.checked ? 'checked' : 'unchecked';
			
			if (eventResult && eventLog) {
				eventResult.style.display = 'block';
				const logEntry = document.createElement('div');
				logEntry.style.color = e.detail.checked ? 'var(--color-primary)' : 'var(--color-text-muted)';
				logEntry.textContent = `[${timestamp}] Event #${eventCount}: ${status}`;
				eventLog.prepend(logEntry);

				// Keep only last 5 events
				while (eventLog.children.length > 5) {
					eventLog.removeChild(eventLog.lastChild!);
				}
			}
		}) as EventListener);
	}

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${checkboxDemoCSS}</style>
			${checkboxDemoHTML}
		`;
	}
}

customElements.define('checkbox-demo-page', CheckboxDemoPage);
