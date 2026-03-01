import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';

@customElement('ui-checkbox')
export class UICheckbox extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    .checkbox-container {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      user-select: none;
    }
    .checkbox-container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .checkbox-box {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      /* default size ensures a visible container even if size class is missing */
      width: 18px;
      height: 18px;
      border: 2px solid var(--color-border, hsl(var(--border)));
      border-radius: 4px;
      background: var(--color-page-bg, hsl(var(--background)));
      transition: all 0.2s;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .checkbox-box.size-sm {
      width: 16px;
      height: 16px;
    }
    .checkbox-box.size-md {
      width: 18px;
      height: 18px;
    }
    .checkbox-box.size-lg {
      width: 20px;
      height: 20px;
    }
    .checkbox-box:hover:not(.disabled) {
      border-color: var(--color-primary, hsl(var(--primary)));
    }
    .checkbox-box.checked,
    .checkbox-box.indeterminate {
      background: var(--color-primary, hsl(var(--primary)));
      border-color: var(--color-primary, hsl(var(--primary)));
    }
    .checkbox-box.disabled {
      background: var(--color-muted, hsl(var(--muted)));
      cursor: not-allowed;
    }
    .checkbox-icon {
      display: none;
      color: var(--color-primary-contrast, hsl(var(--primary-foreground)));
      position: absolute;
    }
    .checkbox-box.checked .checkbox-icon.check,
    .checkbox-box.indeterminate .checkbox-icon.minus {
      display: block;
    }
    .checkbox-icon.check {
      width: 10px;
      height: 10px;
    }
    .checkbox-icon.minus {
      width: 8px;
      height: 8px;
    }
    .checkbox-label {
      font-size: 0.95rem;
      color: var(--color-ink, hsl(var(--foreground)));
      line-height: 1.5;
    }
    .checkbox-container.size-sm .checkbox-label {
      font-size: 0.875rem;
    }
    .checkbox-container.size-lg .checkbox-label {
      font-size: 1rem;
    }
  `;

  @property({ type: Boolean, reflect: true }) checked: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: Boolean, reflect: true }) indeterminate: boolean = false;
  @property({ type: String }) label: string = '';
  // size is validated through the accessor so external invalid values don't break layout
  private _size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String })
  get size() {
    return this._size;
  }
  set size(value: 'sm' | 'md' | 'lg') {
    const valid = ['sm', 'md', 'lg'];
    const newVal = valid.includes(value) ? value : 'md';
    if (value && !valid.includes(value)) {
      console.warn(`ui-checkbox received invalid size "${value}"; falling back to \"md\"`);
    }
    const old = this._size;
    this._size = newVal as 'sm' | 'md' | 'lg';
    this.requestUpdate('size', old);
  }



  connectedCallback(): void {
    this.setAttribute('data-ui', 'checkbox');
    super.connectedCallback();
  }



  private handleChange = (e: Event): void => {
    if (this.disabled) return;

    const input = e.target as HTMLInputElement;
    const isChecked = input.checked;

    if (this.indeterminate) {
      this.indeterminate = false;
    }

    this.checked = isChecked;

    this.dispatchEvent(new CustomEvent('checkbox-change', {
      bubbles: true,
      composed: true,
      detail: { checked: isChecked }
    }));
  };

  public setChecked(checked: boolean): void {
    this.checked = checked;
    this.indeterminate = false;
  }

  public setIndeterminate(indeterminate: boolean): void {
    this.indeterminate = indeterminate;
  }

  render() {
    const containerClasses = classMap({
      'checkbox-container': true,
      'size-sm': this.size === 'sm',
      'size-md': this.size === 'md',
      'size-lg': this.size === 'lg'
    });

    const boxClasses = classMap({
      'checkbox-box': true,
      'size-sm': this.size === 'sm',
      'size-md': this.size === 'md',
      'size-lg': this.size === 'lg',
      'checked': this.checked,
      'indeterminate': this.indeterminate,
      'disabled': this.disabled
    });

    return html`
      <label class=${containerClasses}>
        <input type="checkbox" .checked=${this.checked} .indeterminate=${this.indeterminate} ?disabled=${this.disabled} @change=${this.handleChange}>
        <div class=${boxClasses}>
          <svg class="checkbox-icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <svg class="checkbox-icon minus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        ${this.label ? html`<span class="checkbox-label">${this.label}</span>` : html`<slot></slot>`}
      </label>
    `;
  }
}
