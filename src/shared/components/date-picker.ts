import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { nothing } from 'lit';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-date-picker')
export class UIDatePicker extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: String }) value: string = '';
  @property({ type: String }) format: DateFormat = 'YYYY-MM-DD';
  @property({ type: String }) min: string = '';
  @property({ type: String }) max: string = '';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) placeholder: string = 'Select date';
  @property({ type: String }) label: string = '';

  @state() private currentMonth: Date = new Date();
  @state() private selectedDate: string = '';

  @query('.formatted-input') formattedInput!: HTMLInputElement;
  @query('input[type="date"]') dateInput!: HTMLInputElement;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'date-picker');
    super.connectedCallback();
    if (this.value) {
      this.selectedDate = this.value;
    }
  }

  willUpdate(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('value') && this.value) {
      this.selectedDate = this.value;
      if (this.value) {
        this.currentMonth = new Date(this.value);
      }
    }
  }

  private formatDateDisplay(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    switch (this.format) {
      case 'DD/MM/YYYY': return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY': return `${month}/${day}/${year}`;
      case 'DD-MM-YYYY': return `${day}-${month}-${year}`;
      case 'MM-DD-YYYY': return `${month}-${day}-${year}`;
      default: return `${year}-${month}-${day}`;
    }
  }

  private handleInputChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.selectedDate = input.value;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: input.value },
      bubbles: true,
      composed: true
    }));
  }

  private showPicker(): void {
    if (this.dateInput) {
      this.dateInput.showPicker();
    }
  }

  render() {
    return html`
      <div class="date-picker-container">
        ${this.label ? html`<label class="date-picker-label">${this.label}</label>` : ''}
        <div class="date-input-wrapper">
          <input
            type="text"
            class="formatted-input"
            placeholder=${this.placeholder}
            .value=${this.formatDateDisplay(this.selectedDate)}
            ?disabled=${this.disabled}
            readonly
            @click=${this.showPicker}
          />
          <input
            type="date"
            class="hidden-date-input"
            .value=${this.selectedDate}
            ?disabled=${this.disabled}
            min=${this.min}
            max=${this.max}
            @change=${this.handleInputChange}
          />
          <button type="button" class="calendar-btn" @click=${this.showPicker} ?disabled=${this.disabled}>
            <svg class="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </button>
        </div>
      </div>
    `;
  }
}
