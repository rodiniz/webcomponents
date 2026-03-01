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
      border: 2px solid #cbd5e1;
      border-radius: 4px;
      background: white;
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
      border-color: #24ec71;
    }
    .checkbox-box.checked,
    .checkbox-box.indeterminate {
      background: #24ec71;
      border-color: #24ec71;
    }
    .checkbox-box.disabled {
      background: #f1f5f9;
      cursor: not-allowed;
    }
    .checkbox-icon {
      display: none;
      color: white;
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
      color: #0f172a;
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

  @state() private _internalChecked: boolean = false;
  @state() private _internalIndeterminate: boolean = false;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'checkbox');
    super.connectedCallback();
  }

  willUpdate(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('checked')) {
      this._internalChecked = this.checked;
    }
    if (changedProperties.has('indeterminate')) {
      this._internalIndeterminate = this.indeterminate;
    }
  }

  private handleChange = (): void => {
    if (this.disabled) return;

    if (this._internalIndeterminate) {
      this._internalIndeterminate = false;
      this.indeterminate = false;
    }

    this._internalChecked = !this._internalChecked;
    this.checked = this._internalChecked;

    this.dispatchEvent(new CustomEvent('checkbox-change', {
      bubbles: true,
      composed: true,
      detail: { checked: this._internalChecked }
    }));
  };

  public setChecked(checked: boolean): void {
    this._internalChecked = checked;
    this.checked = checked;
    this._internalIndeterminate = false;
    this.indeterminate = false;
  }

  public setIndeterminate(indeterminate: boolean): void {
    this._internalIndeterminate = indeterminate;
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
      'checked': this._internalChecked,
      'indeterminate': this._internalIndeterminate,
      'disabled': this.disabled
    });

    return html`
      <label class=${containerClasses} @click=${this.handleChange}>
        <input type="checkbox" ?checked=${this._internalChecked} ?disabled=${this.disabled}>
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
