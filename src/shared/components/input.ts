import { BaseComponent } from '../../core/base-component';
import styles from '../../styles/theme.css?inline';

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

class UIInput extends BaseComponent<{
	value: string;
	valid: boolean;
	touched: boolean;
	error: string;
}> {
	private inputEl: HTMLInputElement | null = null;
	private customValidator: CustomValidator | null = null;
	private validationRule: ValidationRule | null = null;

	static get observedAttributes(): string[] {
		return ['type', 'label', 'placeholder', 'required', 'pattern', 'minlength', 'maxlength', 'min', 'max', 'error-message', 'custom-error', 'disabled', 'name', 'validate'];
	}

	constructor() {
		super();
		this.state = {
			value: '',
			valid: true,
			touched: false,
			error: ''
		};
	}

	connectedCallback(): void {
		this.setAttribute('data-ui', 'input');
		super.connectedCallback();
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if (oldValue === newValue) return;
		if (name === 'value') return;
		this.render();
	}

	setCustomValidator(validator: CustomValidator): void {
		this.customValidator = validator;
		this.validate();
	}

	get value(): string {
		return this.state.value;
	}

	set value(val: string) {
		this.state.value = val;
		if (this.inputEl && this.inputEl.value !== val) {
			this.inputEl.value = val;
		}
		this.validate();
	}

	get isValid(): boolean {
		return this.state.valid;
	}

	checkValidity(): boolean {
		this.state.touched = true;
		return this.validate();
	}

	reportValidity(): boolean {
		this.state.touched = true;
		const valid = this.validate();
		this.updateErrorDisplay();
		if (!valid && this.inputEl) {
			this.inputEl.focus();
		}
		return valid;
	}

	private getType(): InputType {
		const type = this.getAttribute('type');
		if (['text', 'email', 'password', 'number', 'tel', 'url'].includes(type || '')) {
			return type as InputType;
		}
		return 'text';
	}

	private getLabel(): string {
		return this.getAttribute('label') || '';
	}

	private getPlaceholder(): string {
		return this.getAttribute('placeholder') || '';
	}

	private getName(): string {
		return this.getAttribute('name') || '';
	}

	private getErrorMessage(): string {
		if (this.state.error) return this.state.error;
		return this.getAttribute('error-message') || this.getAttribute('custom-error') || '';
	}

	private getCustomError(): string {
		return this.getAttribute('custom-error') || '';
	}

	private parseValidationRule(rule: string): ValidationRule | null {
		if (rule.startsWith('email:')) {
			return { type: 'emailDomain', domain: rule.slice(6) };
		}
		if (rule.startsWith('match:')) {
			return { type: 'match', selector: rule.slice(6) };
		}
		if (rule.startsWith('min:')) {
			return { type: 'minLength', length: parseInt(rule.slice(4), 10) };
		}
		if (rule.startsWith('max:')) {
			return { type: 'maxLength', length: parseInt(rule.slice(4), 10) };
		}
		if (rule.startsWith('regex:')) {
			return { type: 'regex', pattern: rule.slice(6) };
		}
		return null;
	}

	private applyValidationRule(rule: ValidationRule): ValidationResult {
		const value = this.state.value;
		
		switch (rule.type) {
			case 'emailDomain':
				if (!value.endsWith(`@${rule.domain}`)) {
					return { valid: false, message: `Must end with @${rule.domain}` };
				}
				break;
			case 'match':
				const targetInput = document.querySelector(rule.selector) as HTMLInputElement | null;
				if (targetInput && value !== targetInput.value) {
					return { valid: false, message: 'Values do not match' };
				}
				break;
			case 'minLength':
				if (value.length < rule.length) {
					return { valid: false, message: `Must be at least ${rule.length} characters` };
				}
				break;
			case 'maxLength':
				if (value.length > rule.length) {
					return { valid: false, message: `Must be no more than ${rule.length} characters` };
				}
				break;
			case 'regex':
				try {
					const regex = new RegExp(rule.pattern);
					if (!regex.test(value)) {
						return { valid: false, message: 'Invalid format' };
					}
				} catch {
					return { valid: false, message: 'Invalid validation pattern' };
				}
				break;
		}
		return { valid: true };
	}

	private validate(): boolean {
		if (!this.inputEl) return true;

		const validateAttr = this.getAttribute('validate');
		if (validateAttr) {
			if (!this.validationRule) {
				this.validationRule = this.parseValidationRule(validateAttr);
			}
			if (this.validationRule) {
				const result = this.applyValidationRule(this.validationRule);
				this.state.valid = result.valid;
				if (!result.valid && result.message) {
					this.state.error = result.message;
				}
				return this.state.valid;
			}
		}

		if (this.customValidator) {
			const result = this.customValidator(this.state.value, this.inputEl);
			this.state.valid = result.valid;
			if (!result.valid && result.message) {
				this.state.error = result.message;
			}
		} else {
			const valid = this.inputEl.checkValidity();
			this.state.valid = valid;
			if (!valid && this.state.touched) {
				this.state.error = this.inputEl.validationMessage || this.getErrorMessage();
			}
			if (valid) {
				this.state.error = '';
			}
		}

		return this.state.valid;
	}

	private handleInput(e: Event): void {
		const target = e.target as HTMLInputElement;
		this.state.value = target.value;
		this.state.touched = true;
		this.validate();
		this.updateErrorDisplay();
	}

	private handleBlur(): void {
		this.state.touched = true;
		this.validate();
		this.updateErrorDisplay();
	}

	private updateErrorDisplay(): void {
		if (!this.inputEl) return;
		
		const errorEl = this.shadowRoot!.querySelector('.input-error');
		const wrapper = this.shadowRoot!.querySelector('.input-wrapper');
		const name = this.getName();
		
		if (wrapper) {
			wrapper.classList.toggle('invalid', !this.state.valid && this.state.touched);
		}
		
		if (errorEl) {
			if (!this.state.valid && this.state.touched && this.state.error) {
				errorEl.textContent = this.state.error;
				errorEl.classList.remove('hidden');
			} else {
				errorEl.classList.add('hidden');
			}
		}
		
		this.inputEl.setAttribute('aria-invalid', String(!this.state.valid && this.state.touched));
		if (name) {
			this.inputEl.setAttribute('aria-describedby', `${name}-error`);
		}
	}

	private needsRender(): boolean {
		return this.hasAttribute('type') || this.hasAttribute('label') || this.hasAttribute('placeholder') 
			|| this.hasAttribute('required') || this.hasAttribute('pattern') || this.hasAttribute('disabled')
			|| this.hasAttribute('name') || this.hasAttribute('minlength') || this.hasAttribute('maxlength')
			|| this.hasAttribute('min') || this.hasAttribute('max') || this.hasAttribute('error-message')
			|| this.hasAttribute('custom-error') || this.hasAttribute('validate');
	}

	render(): void {
		const type = this.getType();
		const label = this.getLabel();
		const placeholder = this.getPlaceholder();
		const name = this.getName();
		const errorMessage = this.getErrorMessage();
		const required = this.hasAttribute('required');
		const pattern = this.getAttribute('pattern');
		const minlength = this.getAttribute('minlength');
		const maxlength = this.getAttribute('maxlength');
		const min = this.getAttribute('min');
		const max = this.getAttribute('max');
		const disabled = this.hasAttribute('disabled');

		const isInvalid = !this.state.valid && this.state.touched;
		const hasLabel = label !== '';

		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			<div class="input-wrapper${isInvalid ? ' invalid' : ''}${disabled ? ' disabled' : ''}">
				${hasLabel ? `<label class="input-label">${label}${required ? ' *' : ''}</label>` : ''}
				<input
					part="input"
					class="input-field"
					type="${type}"
					placeholder="${placeholder}"
					name="${name}"
					.value="${this.state.value}"
					${required ? 'required' : ''}
					${pattern ? `pattern="${pattern}"` : ''}
					${minlength ? `minlength="${minlength}"` : ''}
					${maxlength ? `maxlength="${maxlength}"` : ''}
					${min ? `min="${min}"` : ''}
					${max ? `max="${max}"` : ''}
					${disabled ? 'disabled' : ''}
					aria-invalid="${isInvalid}"
					aria-describedby="${name}-error"
				/>
				<span class="input-error${isInvalid && errorMessage ? '' : ' hidden'}" id="${name}-error" role="alert">${errorMessage}</span>
			</div>
		`;

		this.inputEl = this.shadowRoot!.querySelector('.input-field');
		if (this.inputEl) {
			this.inputEl.addEventListener('input', this.handleInput.bind(this));
			this.inputEl.addEventListener('blur', this.handleBlur.bind(this));
		}
	}
}

export { UIInput };
export type { InputType, ValidationResult, CustomValidator, ValidationRule };

customElements.define('ui-input', UIInput);
