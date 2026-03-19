import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import { buildSizeClasses, buildStateClasses, combineClasses } from '../../core/class-builders';
import { createSizeValidator } from '../../core/validators';
import { ariaChecked } from '../../core/aria-helpers';
import checkboxStyles from './checkbox.css?inline';

@customElement('ui-checkbox')
export class UICheckbox extends UIComponentBase {
  static styles = [unsafeCSS(checkboxStyles)];

  @property({ type: Boolean, reflect: true }) checked: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: Boolean, reflect: true }) indeterminate: boolean = false;
  @property({ type: String }) label: string = '';
  
  // Size validation using validator utility
  private _size: 'sm' | 'md' | 'lg' = 'md';
  private validateSize = createSizeValidator(['sm', 'md', 'lg'] as const, 'md', 'UICheckbox');

  @property({ type: String })
  get size() {
    return this._size;
  }
  set size(value: 'sm' | 'md' | 'lg') {
    const old = this._size;
    this._size = this.validateSize(value);
    this.requestUpdate('size', old);
  }

  // connectedCallback handled by UIComponentBase

  private handleChange = (e: Event): void => {
    if (this.disabled) return;

    const input = e.target as HTMLInputElement;
    const isChecked = input.checked;

    if (this.indeterminate) {
      this.indeterminate = false;
    }

    this.checked = isChecked;

    // Using emit() from UIComponentBase
    this.emit('checkbox-change', { checked: isChecked });
  };

  public setChecked(checked: boolean): void {
    this.checked = checked;
    this.indeterminate = false;
  }

  public setIndeterminate(indeterminate: boolean): void {
    this.indeterminate = indeterminate;
  }

  render() {
    // Using class builder utilities for cleaner class management
    const containerClasses = classMap(
      combineClasses(
        { 'checkbox-container': true },
        buildSizeClasses(this.size, 'size-')
      )
    );

    const boxClasses = classMap(
      combineClasses(
        { 'checkbox-box': true },
        buildSizeClasses(this.size, 'size-'),
        buildStateClasses({
          checked: this.checked,
          indeterminate: this.indeterminate,
          disabled: this.disabled
        })
      )
    );

    const ariaCheckedValue = this.indeterminate ? 'mixed' : String(this.checked);

    return html`
      <label class=${containerClasses}>
        <input 
          type="checkbox" 
          .checked=${this.checked} 
          .indeterminate=${this.indeterminate} 
          ?disabled=${this.disabled} 
          @change=${this.handleChange}
          aria-checked=${ariaCheckedValue}
        >
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
