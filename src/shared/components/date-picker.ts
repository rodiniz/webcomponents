import { BaseComponent } from '../../core/base-component';
import styles from '../../styles/theme.css?inline';

type DateFormat = 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY';

class UIDatePicker extends BaseComponent {
	private inputElement: HTMLInputElement | null = null;

	private isConnected = false;
	private isInternalUpdate = false;
	private hasRendered = false;

	connectedCallback(): void {
		this.setAttribute('data-ui', 'date-picker');
		super.connectedCallback();
		this.isConnected = true;
	}

	static get observedAttributes(): string[] {
		return ['value', 'format', 'min', 'max', 'disabled', 'placeholder', 'label'];
	}

	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
		if (!this.isConnected || oldValue === newValue) return;
		
		// Skip re-render if this is an internal update of the value
		if (this.isInternalUpdate && name === 'value') {
			this.isInternalUpdate = false;
			return;
		}
		
		// For value changes from outside, just update the inputs without full re-render
		if (name === 'value') {
			this.updateInputValues();
		} else {
			// For other attribute changes, do a full re-render
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
			calendarBtn.addEventListener('click', async (e) => {
				e.preventDefault();
				e.stopPropagation();
				
				// Temporarily enable pointer events for the click
				hiddenInput.style.pointerEvents = 'auto';
				
				try {
					// Try modern showPicker API first
					if (typeof hiddenInput.showPicker === 'function') {
						hiddenInput.showPicker();
					} else {
						// Fallback: focus and click
						hiddenInput.focus();
						hiddenInput.click();
					}
				} catch (error) {
					console.log('Date picker error:', error);
					// Last resort fallback
					hiddenInput.focus();
					hiddenInput.click();
				} finally {
					// Restore pointer events
					setTimeout(() => {
						hiddenInput.style.pointerEvents = 'none';
					}, 100);
				}
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

		// Update attribute without triggering re-render
		this.isInternalUpdate = true;
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
		const label = this.getLabel();
		const formattedValue = this.formatDate(value, format);
		const hasLabel = label !== '';

		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			<div class="date-picker-container">
				${hasLabel ? `<label class="date-picker-label">${label}</label>` : ''}
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
		
		// Attach event listeners after DOM is created
		this.attachEventListeners();
		this.hasRendered = true;
	}
}

customElements.define('ui-date-picker', UIDatePicker);

export { UIDatePicker };
