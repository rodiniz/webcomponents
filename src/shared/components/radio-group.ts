import { html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import { createEnumValidator, createSizeValidator } from '../../core/validators';
import './radio';
import radioGroupStyles from './radio-group.css?inline';

export interface RadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

@customElement('ui-radio-group')
export class UIRadioGroup extends UIComponentBase {
    static styles = [unsafeCSS(radioGroupStyles)];

    @property({ type: String }) label: string = '';
    @property({ type: String }) name: string = 'radio-group';
    @property({ type: String }) value: string = '';
    @property({ type: Array }) options: RadioOption[] = [];
    private validateOrientation = createEnumValidator<'vertical' | 'horizontal'>(
      ['vertical', 'horizontal'],
      'vertical',
      'orientation',
      'UIRadioGroup'
    );
    private validateVariant = createEnumValidator<'default' | 'card'>(
      ['default', 'card'],
      'default',
      'variant',
      'UIRadioGroup'
    );
    private validateSize = createSizeValidator<'sm' | 'md' | 'lg'>(['sm', 'md', 'lg'], 'md', 'UIRadioGroup');
    private _orientation: 'vertical' | 'horizontal' = 'vertical';
    private _variant: 'default' | 'card' = 'default';
    private _size: 'sm' | 'md' | 'lg' = 'md';

    @property({ type: String })
    get orientation(): 'vertical' | 'horizontal' { return this._orientation; }
    set orientation(value: 'vertical' | 'horizontal') {
      const old = this._orientation;
      this._orientation = this.validateOrientation(value);
      this.requestUpdate('orientation', old);
    }

    @property({ type: String })
    get variant(): 'default' | 'card' { return this._variant; }
    set variant(value: 'default' | 'card') {
      const old = this._variant;
      this._variant = this.validateVariant(value);
      this.requestUpdate('variant', old);
    }

    @property({ type: String })
    get size(): 'sm' | 'md' | 'lg' { return this._size; }
    set size(value: 'sm' | 'md' | 'lg') {
      const old = this._size;
      this._size = this.validateSize(value);
      this.requestUpdate('size', old);
    }

    @property({ type: Boolean }) disabled: boolean = false;

    private handleRadioChange = (e: CustomEvent): void => {
        const selected = e.detail.value as string;
        this.value = selected;

        this.emit('group-change', { value: selected, name: this.name });
    };

    render() {
        const optionsClass = classMap({
            'group-options': true,
            'horizontal': this.orientation === 'horizontal',
            'card': this.variant === 'card',
        });

        return html`
      ${this.label ? html`<span class="group-label">${this.label}</span>` : nothing}
      <div class=${optionsClass} role="radiogroup" aria-label=${this.label || this.name}>
        ${this.options.map(opt => html`
          <ui-radio
            .name=${this.name}
            .value=${opt.value}
            .label=${opt.label}
            .description=${opt.description ?? ''}
            .size=${this.size}
            ?checked=${this.value === opt.value}
            ?disabled=${this.disabled || !!opt.disabled}
            @radio-change=${this.handleRadioChange}
          ></ui-radio>
        `)}
        <slot></slot>
      </div>
    `;
    }
}
