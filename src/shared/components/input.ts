import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import themeStyles from '../../styles/theme.css?inline';

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

interface ValidationResult {
  valid: boolean;
  message?: string;
}

type CustomValidator = (value: string, input: HTMLInputElement) => ValidationResult;

type ValidationRule = 
  | { type: 'emailDomain'; domain: string }
  | { type: 'match'; selector: string }
  | { type: 'minLength'; length: number }
  | { type: 'maxLength'; length: number }
  | { type: 'regex'; pattern: string };

@customElement('ui-input')
export class UIInput extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

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

  @state() private value: string = '';
  @state() private valid: boolean = true;
  @state() private touched: boolean = false;
  @state() private error: string = '';

  @query('.input-field') inputEl!: HTMLInputElement;

  private customValidator: CustomValidator | null = null;
  private _validationRule: ValidationRule | null = null;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'input');
    super.connectedCallback();
  }

  setCustomValidator(validator: CustomValidator): void {
    this.customValidator = validator;
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
    this.updateErrorDisplay();
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
        }
        return this.valid;
      }
    }

    if (this.customValidator) {
      const result = this.customValidator(this.value, this.inputEl);
      this.valid = result.valid;
      if (!result.valid && result.message) {
        this.error = result.message;
      }
    } else {
      const valid = this.inputEl.checkValidity();
      this.valid = valid;
      if (!valid && this.touched) {
        this.error = this.inputEl.validationMessage || this.errorMessage || this.customError;
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
    this.updateErrorDisplay();
  };

  private handleBlur = (): void => {
    this.touched = true;
    this.doValidate();
    this.updateErrorDisplay();
  };

  private updateErrorDisplay(): void {
    const wrapper = this.shadowRoot?.querySelector('.input-wrapper');
    const errorEl = this.shadowRoot?.querySelector('.input-error');
    
    if (wrapper) {
      wrapper.classList.toggle('invalid', !this.valid && this.touched);
    }
    
    if (errorEl) {
      if (!this.valid && this.touched && this.error) {
        (errorEl as HTMLElement).textContent = this.error;
        errorEl.classList.remove('hidden');
      } else {
        errorEl.classList.add('hidden');
      }
    }
    
    if (this.inputEl) {
      this.inputEl.setAttribute('aria-invalid', String(!this.valid && this.touched));
      if (this.name) {
        this.inputEl.setAttribute('aria-describedby', `${this.name}-error`);
      }
    }
  }

  render() {
    const isInvalid = !this.valid && this.touched;
    const hasLabel = this.label !== '';

    return html`
      <div class="input-wrapper${isInvalid ? ' invalid' : ''}${this.disabled ? ' disabled' : ''}">
        ${hasLabel ? html`<label class="input-label">${this.label}${this.required ? ' *' : ''}</label>` : ''}
        <input
          part="input"
          class="input-field"
          type="${this.type}"
          placeholder="${this.placeholder}"
          name="${this.name}"
          .value=${this.value}
          ?required=${this.required}
          pattern="${this.pattern}"
          minlength=${this.minlength ?? nothing}
          maxlength=${this.maxlength ?? nothing}
          min=${this.min}
          max=${this.max}
          ?disabled=${this.disabled}
          aria-invalid="${isInvalid}"
          aria-describedby="${this.name}-error"
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        />
        <span class="input-error${isInvalid && this.error ? '' : ' hidden'}" id="${this.name}-error" role="alert">${this.error}</span>
      </div>
    `;
  }
}
