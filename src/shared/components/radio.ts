import { html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import { createSizeValidator } from '../../core/validators';
import { buildSizeClasses, combineClasses } from '../../core/class-builders';
import { onEnterOrSpace } from '../../core/keyboard-helpers';
import radioStyles from './radio.css?inline';

export interface RadioChangeDetail {
    value: string;
    name: string;
}

@customElement('ui-radio')
export class UIRadio extends UIComponentBase {
    static styles = [unsafeCSS(radioStyles)];

    @property({ type: String }) value: string = '';
    @property({ type: String }) name: string = '';
    @property({ type: String }) label: string = '';
    @property({ type: String }) description: string = '';
    @property({ type: Boolean, reflect: true }) checked: boolean = false;
    @property({ type: Boolean, reflect: true }) disabled: boolean = false;

    private validateSize = createSizeValidator<'sm' | 'md' | 'lg'>(['sm', 'md', 'lg'], 'md');

    private _size: 'sm' | 'md' | 'lg' = 'md';

    @property({ type: String })
    get size(): 'sm' | 'md' | 'lg' { return this._size; }
    set size(v: 'sm' | 'md' | 'lg') {
        const old = this._size;
        this._size = this.validateSize(v);
        this.requestUpdate('size', old);
    }

    private handleChange = (e: Event): void => {
        if (this.disabled) return;
        const input = e.target as HTMLInputElement;
        this.checked = input.checked;
        this.emit<RadioChangeDetail>('radio-change', { value: this.value, name: this.name });
    };

    private handleKeyDown = onEnterOrSpace((e: KeyboardEvent) => {
        if (this.disabled) return;
        e.preventDefault();
        if (!this.checked) {
            this.checked = true;
            this.emit<RadioChangeDetail>('radio-change', { value: this.value, name: this.name });
        }
    });

    render() {
        const containerClass = classMap(combineClasses(
            { 'radio-container': true, 'disabled': this.disabled },
            buildSizeClasses(this.size)
        ));

        const ringClass = classMap(combineClasses(
            { 'radio-ring': true, 'checked': this.checked },
            buildSizeClasses(this.size)
        ));

        return html`
      <label
        class=${containerClass}
        tabindex=${this.disabled ? -1 : 0}
        @keydown=${this.handleKeyDown}
        aria-checked=${this.checked}
        role="radio"
      >
        <input
          type="radio"
          .name=${this.name}
          .value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          tabindex="-1"
          @change=${this.handleChange}
        />
        <span class=${ringClass}>
          <span class="radio-dot"></span>
        </span>
        ${this.label || this.description ? html`
          <span class="radio-text">
            ${this.label ? html`<span class="radio-label">${this.label}</span>` : nothing}
            ${this.description ? html`<span class="radio-description">${this.description}</span>` : nothing}
          </span>
        ` : html`<slot></slot>`}
      </label>
    `;
    }
}
