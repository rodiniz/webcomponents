import { BaseComponent } from '../../core/base-component';
import { html, render } from 'lit-html';
import { classMap } from '../../core/template';
import styles from '../../styles/theme.css?inline';

type DateFormat = 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY';

class UIDatePicker extends BaseComponent {
	private inputElement: HTMLInputElement | null = null;

	private isComponentConnected = false;
	private isInternalUpdate = false;
	private hasRendered = false;

	connectedCallback(): void {
		this.setAttribute('data-ui', 'date-picker');
		super.connectedCallback();
		this.isComponentConnected = true;
	}

	static get observedAttributes(): string[] {
		return ['value', 'format', 'min', 'max', 'disabled', 'placeholder', 'label'];
	}

	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
		if (!this.isComponentConnected || oldValue === newValue) return;
		
		if (this.isInternalUpdate && name === 'value') {
			this.isInternalUpdate = false;
			return;
		}
		
		if (name === 'value') {
			this.updateInputValues();
		} else {
			this.render();
		}
	}

	private updateInputValues(): void {
		if (!this.shadowRoot) return;
		
		const textInput = this.shadowRoot.querySelector('.formatted-input') as HTMLInputElement;
		const hiddenInput = this.shadowRoot.querySelector('input[type="date"]') as HTMLInputElement;
		
		if (textInput && hiddenInput) {
			const value = this.getValue();
			const format = this.getFormat();
			const formattedValue = this.formatDate(value, format);
			
			textInput.value = formattedValue;
			hiddenInput.value = value;
		}
	}

	private getFormat(): DateFormat {
		const value = this.getAttribute('format');
		if (
			value === 'DD/MM/YYYY' ||
			value === 'MM/DD/YYYY' ||
			value === 'DD-MM-YYYY' ||
			value === 'MM-DD-YYYY'
		) {
			return value;
		}
		return 'YYYY-MM-DD';
	}

	private getValue(): string {
		return this.getAttribute('value') || '';
	}

	private getMin(): string {
		return this.getAttribute('min') || '';
	}

	private getMax(): string {
		return this.getAttribute('max') || '';
	}

	private getPlaceholder(): string {
		return this.getAttribute('placeholder') || this.getFormat();
	}

	private getLabel(): string {
		return this.getAttribute('label') || '';
	}

	private isDisabled(): boolean {
		return this.hasAttribute('disabled');
	}

	private formatDate(isoDate: string, format: DateFormat): string {
		if (!isoDate) return '';

		const parts = isoDate.split('-');
		if (parts.length !== 3) return isoDate;

		const [year, month, day] = parts;

		switch (format) {
			case 'DD/MM/YYYY':
				return `${day}/${month}/${year}`;
			case 'MM/DD/YYYY':
				return `${month}/${day}/${year}`;
			case 'DD-MM-YYYY':
				return `${day}-${month}-${year}`;
			case 'MM-DD-YYYY':
				return `${month}-${day}-${year}`;
			case 'YYYY-MM-DD':
			default:
				return isoDate;
		}
	}

	private attachEventListeners(): void {
		const textInput = this.shadowRoot!.querySelector('.formatted-input') as HTMLInputElement;
		const hiddenInput = this.shadowRoot!.querySelector('input[type="date"]') as HTMLInputElement;
		const calendarBtn = this.shadowRoot!.querySelector('.calendar-btn') as HTMLElement;

		if (!textInput || !hiddenInput) return;

		if (hiddenInput) {
			hiddenInput.style.pointerEvents = 'none';
		}

		const handleTextInput = () => {
			this.handleInput(textInput.value);
		};

		textInput.addEventListener('input', handleTextInput);
		textInput.addEventListener('blur', handleTextInput);

		if (calendarBtn) {
			calendarBtn.addEventListener('click', async (e) => {
				e.preventDefault();
				e.stopPropagation();
				
				if (this.isDisabled()) return;

				if (hiddenInput) {
					hiddenInput.style.pointerEvents = 'auto';
				}
				
				try {
					if (typeof hiddenInput?.showPicker === 'function') {
						hiddenInput?.showPicker();
					} else {
						hiddenInput?.focus();
						hiddenInput?.click();
					}
				} catch (error) {
					hiddenInput?.focus();
					hiddenInput?.click();
				} finally {
					setTimeout(() => {
						if (hiddenInput) {
							hiddenInput.style.pointerEvents = 'none';
						}
					}, 100);
				}
			});
		}

		hiddenInput?.addEventListener('change', () => {
			const isoDate = hiddenInput.value;
			this.handleDateChange(isoDate);
		});
	}

	private handleInput(value: string): void {
		const format = this.getFormat();
		
		const isoDate = this.parseDate(value, format);
		
		if (isoDate) {
			this.handleDateChange(isoDate);
		}
	}

	private parseDate(value: string, format: DateFormat): string | null {
		if (!value) return null;
		
		let day: number, month: number, year: number;
		
		if (format === 'YYYY-MM-DD') {
			const parts = value.split('-');
			if (parts.length !== 3) return null;
			[year, month, day] = parts.map(Number);
		} else if (format === 'DD/MM/YYYY' || format === 'DD-MM-YYYY') {
			const separator = format === 'DD/MM/YYYY' ? '/' : '-';
			const parts = value.split(separator);
			if (parts.length !== 3) return null;
			[day, month, year] = parts.map(Number);
		} else {
			const separator = format === 'MM/DD/YYYY' ? '/' : '-';
			const parts = value.split(separator);
			if (parts.length !== 3) return null;
			[month, day, year] = parts.map(Number);
		}
		
		if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
		
		const date = new Date(year, month - 1, day);
		if (isNaN(date.getTime())) return null;
		
		const fullYear = year < 100 ? 2000 + year : year;
		return `${fullYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
	}

	private handleDateChange(isoDate: string): void {
		if (!isoDate) return;
		
		const format = this.getFormat();
		const formattedDate = this.formatDate(isoDate, format);

		this.dispatchEvent(
			new CustomEvent('date-change', {
				detail: {
					value: isoDate,
					formattedValue: formattedDate,
					format: format,
				},
				bubbles: true,
				composed: true,
			})
		);

		this.isInternalUpdate = true;
		this.setAttribute('value', isoDate);
	}

	getISOValue(): string {
		return this.getValue();
	}

	getFormattedValue(): string {
		const isoDate = this.getValue();
		const format = this.getFormat();
		return this.formatDate(isoDate, format);
	}

	setValue(isoDate: string): void {
		this.setAttribute('value', isoDate);
	}

	clear(): void {
		this.setAttribute('value', '');
	}

	render(): void {
		const value = this.getValue();
		const format = this.getFormat();
		const min = this.getMin();
		const max = this.getMax();
		const disabled = this.isDisabled();
		const placeholder = this.getPlaceholder();
		const label = this.getLabel();
		const formattedValue = this.formatDate(value, format);
		const hasLabel = label !== '';

		const wrapperClasses = classMap({
			'date-input-wrapper': true,
			'disabled': disabled
		});

		const template = html`
			<style>${styles}</style>
			<div class="date-picker-container">
				${hasLabel ? html`<label class="date-picker-label">${label}</label>` : ''}
				<div class=${wrapperClasses}>
					<input
						type="text"
						class="formatted-input"
						part="input"
						value="${formattedValue}"
						placeholder="${placeholder}"
						?disabled=${disabled}
					/>
					<button 
						class="calendar-btn" 
						type="button"
						?disabled=${disabled}
						title="Open calendar"
					>
						<svg class="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
						</svg>
					</button>
					<input
						type="date"
						class="hidden-date-input"
						value="${value}"
						min=${min}
						max=${max}
						?disabled=${disabled}
					/>
				</div>
				<div class="format-label">Format: ${format}</div>
			</div>
		`;
		
		render(template, this.shadowRoot!);
		this.attachEventListeners();
		this.hasRendered = true;
	}
}

customElements.define('ui-date-picker', UIDatePicker);

export { UIDatePicker };
