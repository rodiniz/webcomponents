import { html, css, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { UIComponentBase } from '../../core/ui-component-base';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-textarea')
export class UITextarea extends UIComponentBase {
  static styles = [
    unsafeCSS(themeStyles),
    css`
      :host {
        display: block;
        margin-bottom: 1rem;
      }
    `
  ];

  @property({ type: String }) label: string = '';
  @property({ type: String }) placeholder: string = '';
  @property({ type: String }) name: string = '';
  @property({ type: Number }) rows: number = 4;
  @property({ type: Number }) minlength: number | null = null;
  @property({ type: Number }) maxlength: number | null = null;
  @property({ type: Boolean }) required: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) value: string = '';

  @query('.textarea-field') textareaEl!: HTMLTextAreaElement;

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('minlength') || changedProperties.has('maxlength')) {
      this.syncLengthConstraints();
    }
  }

  checkValidity(): boolean {
    if (!this.textareaEl) return true;
    return this.textareaEl.checkValidity();
  }

  reportValidity(): boolean {
    if (!this.textareaEl) return true;
    return this.textareaEl.reportValidity();
  }

  private enforceMaxLength(nextValue: string): string {
    if (this.maxlength === null || this.maxlength < 0) return nextValue;
    if (nextValue.length <= this.maxlength) return nextValue;
    return nextValue.slice(0, this.maxlength);
  }

  private syncLengthConstraints(): void {
    if (!this.textareaEl) return;

    if (this.minlength === null) {
      this.textareaEl.removeAttribute('minlength');
    } else {
      this.textareaEl.minLength = this.minlength;
    }

    if (this.maxlength === null) {
      this.textareaEl.removeAttribute('maxlength');
    } else {
      this.textareaEl.maxLength = this.maxlength;
    }
  }

  private handleInput = (event: Event): void => {
    const target = event.target as HTMLTextAreaElement;
    const nextValue = this.enforceMaxLength(target.value);

    if (nextValue !== target.value) {
      target.value = nextValue;
    }

    this.value = nextValue;
    this.emit('input', { value: this.value });
  };

  private handleChange = (): void => {
    this.emit('change', { value: this.value });
  };

  render() {
    const hasLabel = this.label !== '';

    return html`
      <div class="input-wrapper${this.disabled ? ' disabled' : ''}">
        ${hasLabel ? html`<label class="input-label">${this.label}${this.required ? ' *' : ''}</label>` : ''}
        <textarea
          part="textarea"
          class="textarea-field"
          placeholder=${this.placeholder}
          name=${this.name}
          rows=${this.rows}
          ?required=${this.required}
          ?disabled=${this.disabled}
          .value=${this.value}
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
      </div>
    `;
  }
}
