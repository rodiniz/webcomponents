import { BaseComponent } from '../../core/base-component';
import { html, render } from 'lit-html';
import { classMap } from '../../core/template';
import styles from '../../styles/theme.css?inline';

class UICheckbox extends BaseComponent {
	private checked = this.useSignal(false);
	private indeterminate = this.useSignal(false);
	private checkboxEl: HTMLInputElement | null = null;

	connectedCallback(): void {
		this.setAttribute('data-ui', 'checkbox');
		super.connectedCallback();
	}

	static get observedAttributes(): string[] {
		return ['checked', 'disabled', 'indeterminate', 'label', 'size'];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if (name === 'checked' && oldValue !== newValue) {
			this.checked.set(newValue !== null);
		}
		if (name === 'indeterminate' && oldValue !== newValue) {
			this.indeterminate.set(newValue !== null);
		}
		this.render();
	}

	private handleChange = (): void => {
		if (this.hasAttribute('disabled')) return;

		if (this.indeterminate.get()) {
			this.indeterminate.set(false);
			this.removeAttribute('indeterminate');
		}

		const newChecked = !this.checked.get();
		this.checked.set(newChecked);

		if (newChecked) {
			this.setAttribute('checked', '');
		} else {
			this.removeAttribute('checked');
		}

		this.dispatchEvent(new CustomEvent('checkbox-change', {
			bubbles: true,
			composed: true,
			detail: { checked: newChecked }
		}));
	};

	public setChecked(checked: boolean): void {
		this.checked.set(checked);
		if (checked) {
			this.setAttribute('checked', '');
		} else {
			this.removeAttribute('checked');
		}
		this.indeterminate.set(false);
		this.removeAttribute('indeterminate');
	}

	public setIndeterminate(indeterminate: boolean): void {
		this.indeterminate.set(indeterminate);
		if (indeterminate) {
			this.setAttribute('indeterminate', '');
		} else {
			this.removeAttribute('indeterminate');
		}
	}

	render(): void {
		const checked = this.checked.get();
		const indeterminate = this.indeterminate.get();
		const disabled = this.hasAttribute('disabled');
		const label = this.getAttribute('label') || '';
		const size = this.getAttribute('size') || 'md';

		const containerClasses = classMap({
			'checkbox-container': true,
			'size-sm': size === 'sm',
			'size-md': size === 'md',
			'size-lg': size === 'lg'
		});

		const boxClasses = classMap({
			'checkbox-box': true,
			'size-sm': size === 'sm',
			'size-md': size === 'md',
			'size-lg': size === 'lg',
			'checked': checked,
			'indeterminate': indeterminate,
			'disabled': disabled
		});

		const template = html`
			<style>${styles}</style>

			<label class=${containerClasses}>
				<input 
					type="checkbox" 
					?checked=${checked}
					?disabled=${disabled}
				>
				<div class=${boxClasses} part="checkbox">
					<svg class="checkbox-icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"></polyline>
					</svg>
					<svg class="checkbox-icon minus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<line x1="5" y1="12" x2="19" y2="12"></line>
					</svg>
				</div>
				${label ? html`<span class="checkbox-label">${label}</span>` : html`<slot></slot>`}
			</label>
		`;

		render(template, this.shadowRoot!);
		
		const container = this.shadowRoot!.querySelector('.checkbox-container');
		container?.addEventListener('click', (e) => {
			e.preventDefault();
			this.handleChange();
		});
	}
}

export { UICheckbox };

customElements.define('ui-checkbox', UICheckbox);
