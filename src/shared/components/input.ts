import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { UIComponentBase } from '../../core/ui-component-base';
import { renderIcon } from '../../core/icon-helpers';
import { renderOptionalLabel } from '../../core/form-helpers';
import themeStyles from '../../styles/theme.css?inline';
import { IconName } from '../../lib/icons';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

interface ValidationResult {
  valid: boolean;
  message?: string;
}

export type CustomValidator = (value: string, input: HTMLInputElement) => ValidationResult;

export type ValidationRule =
  | { type: 'emailDomain'; domain: string }
  | { type: 'match'; selector: string }
  | { type: 'minLength'; length: number }
  | { type: 'maxLength'; length: number }
  | { type: 'regex'; pattern: string };

@customElement('ui-input')
export class UIInput extends UIComponentBase {
  static styles = [
    unsafeCSS(themeStyles),
    css`
      :host {
        display: block;
        margin-bottom: 1rem;
      }

      .input-container {
        position: relative;
        display: flex;
        align-items: center;
      }

      .input-icon {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        color: hsl(var(--muted-foreground));
        transition: color 0.15s ease;
      }

      .input-icon svg {
        width: 16px;
        height: 16px;
      }

      .input-icon.left {
        left: 0.75rem;
      }

      .input-icon.right {
        right: 0.75rem;
      }

      .input-field.has-icon-left {
        padding-left: 2.5rem;
      }

      .input-field.has-icon-right {
        padding-right: 2.5rem;
      }

      .input-wrapper:focus-within .input-icon {
        color: hsl(var(--ring));
      }

      .input-error {
        color: hsl(0, 84.2%, 60.2%);
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      }

      .input-error.hidden {
        display: none;
      }
    `
  ];

  @property({ type: String }) type: InputType = 'text';
  @property({ type: String }) label: string = '';
  @property({ type: String }) placeholder: string = '';
  @property({ type: Boolean }) required: boolean = false;
  @property({ type: String }) pattern: string = '';
  @property({ type: Number }) minlength: number | null = null;
  @property({ type: Number }) maxlength: number | null = null;
  @property({ type: String }) min: string = '';
  @property({ type: String }) max: string = '';
  @property({ type: String }) errorMessage: string = '';
  @property({ type: String }) customError: string = '';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) name: string = '';
  @property({ type: String }) validationRule: string = '';
  @property({ type: String }) icon: IconName | '' = '';
  @property({ type: String }) iconPosition: 'left' | 'right' = 'left';

  @state() private value: string = '';
  @state() private valid: boolean = true;
  @state() private touched: boolean = false;
  @state() private error: string = '';

  @query('.input-field') inputEl!: HTMLInputElement;

  private customValidator: CustomValidator | null = null;
  private _validationRule: ValidationRule | null = null;

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    // Revalidate when type changes to ensure validity state is updated
    if (changedProperties.has('type')) {
      this.doValidate();
    }
  }

  setCustomValidator(validator: CustomValidator): void {
    this.customValidator = validator;
    this.touched = true;
    this.doValidate();
  }

  get isValid(): boolean {
    return this.valid;
  }

  checkValidity(): void {
    this.touched = true;
    this.doValidate();
  }

  reportValidity(): boolean {
    this.touched = true;
    const valid = this.doValidate();
    if (!valid && this.inputEl) {
      this.inputEl.focus();
    }
    return valid;
  }

  private doValidate(): boolean {

    if (!this.inputEl) return true;

    if (this.validationRule) {
      if (!this._validationRule) {
        this._validationRule = this.parseValidationRule(this.validationRule);
      }
      if (this._validationRule) {
        const result = this.applyValidationRule(this._validationRule);
        this.valid = result.valid;
        if (!result.valid && result.message) {
          this.error = result.message;
        } else {
          this.error = '';
        }
        return this.valid;
      }
    }

    if (this.customValidator) {
      const result = this.customValidator(this.value, this.inputEl);
      this.valid = result.valid;
      if (!result.valid && result.message) {
        this.error = result.message;
      } else {
        this.error = '';
      }
    } else {
      const valid = this.inputEl.checkValidity();
      this.valid = valid;
      if (!valid && this.touched) {
        this.error = this.errorMessage || this.customError || this.inputEl.validationMessage || '';
      }
      if (valid) {
        this.error = '';
      }
    }

    return this.valid;
  }

  private handleInput = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.touched = true;
    this.doValidate();
  };

  private handleBlur = (): void => {
    this.touched = true;
    this.doValidate();
  };

  private parseValidationRule(rule: string): ValidationRule | null {
    try {
      return JSON.parse(rule) as ValidationRule;
    } catch (e) {
      return null;
    }
  }

  private applyValidationRule(rule: ValidationRule): ValidationResult {
    const value = this.value;
    switch (rule.type) {
      case 'emailDomain':
        return {
          valid: value.endsWith(`@${rule.domain}`),
          message: `Email must be from ${rule.domain}`
        };
      case 'match':
        const otherInput = document.querySelector(rule.selector) as (HTMLInputElement | any);
        if (!otherInput) return { valid: true };
        const otherValue = otherInput.value ?? '';
        return {
          valid: value === otherValue,
          message: `Values do not match`
        };
      case 'minLength':
        return {
          valid: value.length >= rule.length,
          message: `Minimum length is ${rule.length}`
        };
      case 'maxLength':
        return {
          valid: value.length <= rule.length,
          message: `Maximum length is ${rule.length}`
        };
      case 'regex':
        return {
          valid: new RegExp(rule.pattern).test(value),
          message: `Invalid format`
        };
      default:
        return { valid: true };
    }
  }

  render() {
    const isInvalid = !this.valid && this.touched;
    const hasIcon = !!this.icon;
    const iconClass = hasIcon ? `has-icon-${this.iconPosition}` : '';

    return html`
      <div class="input-wrapper${isInvalid ? ' invalid' : ''}${this.disabled ? ' disabled' : ''}">
        ${renderOptionalLabel(this.label, { required: this.required })}
        <div class="input-container">
          ${hasIcon && this.iconPosition === 'left' ? html`<span class="input-icon left">${renderIcon(this.icon, { width: 16, height: 16 })}</span>` : ''}
          <input
            part="input"
            class="input-field ${iconClass}"
            type="${this.type}"
            placeholder="${this.placeholder}"
            name="${this.name}"
            .value=${this.value}
            ?required=${this.required}
            ?pattern="${this.pattern}"
            ?minlength=${this.minlength !== null ? this.minlength : undefined}
            ?maxlength=${this.maxlength !== null ? this.maxlength : undefined}
            min=${this.min}
            max=${this.max}
            ?disabled=${this.disabled}
            aria-invalid="${isInvalid}"
            aria-describedby="${this.name}-error"
            @input=${this.handleInput}
            @blur=${this.handleBlur}
          />
          ${hasIcon && this.iconPosition === 'right' ? html`<span class="input-icon right">${renderIcon(this.icon, { width: 16, height: 16 })}</span>` : ''}
        </div>
        <span class="input-error${isInvalid && this.error ? '' : ' hidden'}" id="${this.name}-error" role="alert">${this.error}</span>
      </div>
    `;
  }
}
