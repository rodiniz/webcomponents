import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { nothing } from 'lit';
import { UIComponentBase } from '../../core/ui-component-base';
import { renderOptionalLabel } from '../../core/form-helpers';
import { useClickOutside } from '../../core/click-outside';
import themeStyles from '../../styles/theme.css?inline';

export type DateFormat = 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY';

@customElement('ui-date-picker')
export class UIDatePicker extends UIComponentBase {
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
  @state() private isOpen: boolean = false;

  private clickOutsideHandler = useClickOutside(this, () => {
    if (this.isOpen) {
      this.isOpen = false;
    }
  });

  connectedCallback(): void {
    super.connectedCallback();
    if (this.value) {
      this.selectedDate = this.value;
      this.currentMonth = new Date(this.value);
    }
    this.clickOutsideHandler.attach();
  }

  willUpdate(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('value')) {
      this.selectedDate = this.value || '';
      if (this.value) {
        this.currentMonth = new Date(this.value);
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clickOutsideHandler.detach();
  }

  private toggleDropdown = (): void => {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.selectedDate) {
      this.currentMonth = new Date(this.selectedDate);
    }
  };

  private changeMonth(offset: number): void {
    const newDate = new Date(this.currentMonth);
    newDate.setMonth(newDate.getMonth() + offset);
    this.currentMonth = newDate;
  }

  private selectDate(day: number, isOtherMonth: boolean = false): void {
    const newDate = new Date(this.currentMonth);
    if (isOtherMonth) {
      newDate.setMonth(newDate.getMonth() + (day > 15 ? -1 : 1));
    }
    newDate.setDate(day);

    // Format as YYYY-MM-DD for consistency
    const y = newDate.getFullYear();
    const m = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const d = newDate.getDate().toString().padStart(2, '0');
    const newVal = `${y}-${m}-${d}`;

    this.selectedDate = newVal;
    this.value = newVal;
    this.isOpen = false;

    this.emit('change', { value: newVal });
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

  private renderCalendar() {
    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

    const month = this.currentMonth.getMonth();
    const year = this.currentMonth.getFullYear();
    const totalDays = daysInMonth(month, year);
    const startDay = firstDayOfMonth(month, year);

    const prevMonthTotalDays = daysInMonth(month - 1, year);
    const days = [];

    // Previous month filler
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthTotalDays - i, otherMonth: true });
    }

    // Current month
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, otherMonth: false });
    }

    // Next month filler
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, otherMonth: true });
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    return html`
      <div class="calendar-dropdown">
        <div class="calendar-header">
          <div class="calendar-title">${monthNames[month]} ${year}</div>
          <div class="calendar-nav">
            <button class="calendar-nav-btn" @click=${() => this.changeMonth(-1)}>&lt;</button>
            <button class="calendar-nav-btn" @click=${() => this.changeMonth(1)}>&gt;</button>
          </div>
        </div>
        <div class="calendar-grid">
          ${["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => html`<div class="calendar-day-label">${d}</div>`)}
          ${days.map(d => {
      const dateObj = new Date(year, month + (d.otherMonth ? (d.day > 15 ? -1 : 1) : 0), d.day);
      const dateStr = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
      const isSelected = dateStr === this.selectedDate;
      const isToday = dateStr === todayStr;

      return html`
              <div 
                class="calendar-day ${classMap({ 'other-month': d.otherMonth, 'selected': isSelected, 'today': isToday })}"
                @click=${() => this.selectDate(d.day, d.otherMonth)}
              >
                ${d.day}
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class=${classMap({ 'date-picker-container': true, 'is-open': this.isOpen })}>
        ${renderOptionalLabel(this.label, { className: 'date-picker-label' })}
        <div class="date-input-wrapper" @click=${this.toggleDropdown}>
          <input
            type="text"
            class="formatted-input"
            placeholder=${this.placeholder}
            .value=${this.formatDateDisplay(this.selectedDate)}
            ?disabled=${this.disabled}
            readonly
          />
          <button type="button" class="calendar-btn" ?disabled=${this.disabled}>
            <svg class="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </button>
        </div>
        ${this.isOpen ? this.renderCalendar() : ''}
      </div>
    `;
  }
}
