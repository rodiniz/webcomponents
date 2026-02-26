import { BaseComponent } from '../../core/base-component';
import styles from '../../styles/theme.css?inline';

type DateFormat = 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY';

class UIDatePicker extends BaseComponent {
	private inputElement: HTMLInputElement | null = null;

	connectedCallback(): void {
		this.setAttribute('data-ui', 'date-picker');
		super.connectedCallback();
		this.attachEventListeners();
	}

	static get observedAttributes(): string[] {
		return ['value', 'format', 'min', 'max', 'disabled', 'placeholder'];
	}

	attributeChangedCallback(): void {
		this.render();
		this.attachEventListeners();
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

	private isDisabled(): boolean {
		return this.hasAttribute('disabled');
	}

	/**
	 * Convert date from ISO format (YYYY-MM-DD) to specified format
	 */
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

	/**
	 * Convert date from specified format to ISO format (YYYY-MM-DD)
	 */
	private parseDate(formattedDate: string, format: DateFormat): string {
		if (!formattedDate) return '';

		let parts: string[];
		let year: string, month: string, day: string;

		switch (format) {
			case 'DD/MM/YYYY':
				parts = formattedDate.split('/');
				if (parts.length !== 3) return '';
				[day, month, year] = parts;
				break;
			case 'MM/DD/YYYY':
				parts = formattedDate.split('/');
				if (parts.length !== 3) return '';
				[month, day, year] = parts;
				break;
			case 'DD-MM-YYYY':
				parts = formattedDate.split('-');
				if (parts.length !== 3) return '';
				[day, month, year] = parts;
				break;
			case 'MM-DD-YYYY':
				parts = formattedDate.split('-');
				if (parts.length !== 3) return '';
				[month, day, year] = parts;
				break;
			case 'YYYY-MM-DD':
			default:
				return formattedDate;
		}

		// Pad with zeros if needed
		month = month.padStart(2, '0');
		day = day.padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	private attachEventListeners(): void {
		if (!this.shadowRoot) return;

		const textInput = this.shadowRoot.querySelector('.formatted-input') as HTMLInputElement;
		const hiddenInput = this.shadowRoot.querySelector('input[type="date"]') as HTMLInputElement;
		const calendarBtn = this.shadowRoot.querySelector('.calendar-btn') as HTMLElement;

		if (!textInput || !hiddenInput) return;

		// Text input for formatted display
		const handleTextInput = () => {
			const formatted = textInput.value;
			const format = this.getFormat();
			const isoDate = this.parseDate(formatted, format);

			if (this.isValidDate(isoDate)) {
				hiddenInput.value = isoDate;
				textInput.classList.remove('invalid');
				this.dispatchDateChange(isoDate);
			} else if (formatted === '') {
				hiddenInput.value = '';
				textInput.classList.remove('invalid');
				this.dispatchDateChange('');
			} else {
				textInput.classList.add('invalid');
			}
		};

		textInput.addEventListener('blur', handleTextInput);
		textInput.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				handleTextInput();
				textInput.blur();
			}
		});

		// Hidden date input for calendar picker
		hiddenInput.addEventListener('change', (e) => {
			const target = e.target as HTMLInputElement;
			const isoDate = target.value;
			const format = this.getFormat();
			const formattedDate = this.formatDate(isoDate, format);
			
			textInput.value = formattedDate;
			textInput.classList.remove('invalid');
			this.dispatchDateChange(isoDate);
		});

		// Calendar button to trigger native picker
		if (calendarBtn) {
			calendarBtn.addEventListener('click', () => {
				hiddenInput.showPicker?.();
			});
		}
	}

	private isValidDate(isoDate: string): boolean {
		if (!isoDate) return false;
		const date = new Date(isoDate);
		return date instanceof Date && !isNaN(date.getTime());
	}

	private dispatchDateChange(isoDate: string): void {
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

		// Update attribute
		this.setAttribute('value', isoDate);
	}

	/**
	 * Get the current value in ISO format (YYYY-MM-DD)
	 */
	getISOValue(): string {
		return this.getValue();
	}

	/**
	 * Get the current value in the specified format
	 */
	getFormattedValue(): string {
		const isoDate = this.getValue();
		const format = this.getFormat();
		return this.formatDate(isoDate, format);
	}

	/**
	 * Set the date value (accepts ISO format)
	 */
	setValue(isoDate: string): void {
		this.setAttribute('value', isoDate);
	}

	/**
	 * Clear the date value
	 */
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
		const formattedValue = this.formatDate(value, format);

		this.shadowRoot!.innerHTML = `
			<style>
				${styles}

				:host {
					display: inline-block;
					width: 100%;
					max-width: 300px;
				}

				.date-picker-container {
					position: relative;
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}

				.date-input-wrapper {
					position: relative;
					display: flex;
					align-items: center;
					border: 1px solid var(--color-border);
					border-radius: var(--radius-md);
					background: white;
					transition: all 0.2s ease;
				}

				.date-input-wrapper:hover:not(.disabled) {
					border-color: var(--color-border-strong);
				}

				.date-input-wrapper:focus-within {
					border-color: var(--color-primary);
					box-shadow: 0 0 0 3px rgba(36, 236, 113, 0.1);
					outline: none;
				}

				.date-input-wrapper.disabled {
					background: var(--color-muted);
					cursor: not-allowed;
					opacity: 0.6;
				}

				.formatted-input {
					flex: 1;
					border: none;
					padding: 0.75rem 1rem;
					font-size: 0.95rem;
					font-family: inherit;
					background: transparent;
					color: var(--color-ink);
					outline: none;
				}

				.formatted-input:disabled {
					cursor: not-allowed;
					color: var(--color-ink);
					opacity: 0.7;
				}

				.formatted-input::placeholder {
					color: #94a3b8;
					opacity: 0.7;
				}

				.formatted-input.invalid {
					color: #dc2626;
				}

				.hidden-date-input {
					position: absolute;
					opacity: 0;
					pointer-events: none;
					width: 0;
					height: 0;
				}

				.calendar-btn {
					padding: 0.5rem;
					margin-right: 0.5rem;
					border: none;
					background: transparent;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					color: var(--color-ink);
					opacity: 0.6;
					transition: all 0.2s ease;
					border-radius: 6px;
				}

				.calendar-btn:hover:not(:disabled) {
					background: var(--color-muted);
					opacity: 1;
				}

				.calendar-btn:disabled {
					cursor: not-allowed;
					opacity: 0.3;
				}

				.calendar-icon {
					width: 20px;
					height: 20px;
				}

				.format-label {
					font-size: 0.75rem;
					color: var(--color-ink);
					opacity: 0.6;
					padding: 0 0.25rem;
					font-weight: 500;
				}
			</style>
			<div class="date-picker-container">
				<div class="date-input-wrapper ${disabled ? 'disabled' : ''}">
					<input
						type="text"
						class="formatted-input"
						part="input"
						value="${formattedValue}"
						placeholder="${placeholder}"
						${disabled ? 'disabled' : ''}
					/>
					<button 
						class="calendar-btn" 
						type="button"
						${disabled ? 'disabled' : ''}
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
						${min ? `min="${min}"` : ''}
						${max ? `max="${max}"` : ''}
						${disabled ? 'disabled' : ''}
					/>
				</div>
				<div class="format-label">Format: ${format}</div>
			</div>
		`;
	}
}

customElements.define('ui-date-picker', UIDatePicker);

export { UIDatePicker };
