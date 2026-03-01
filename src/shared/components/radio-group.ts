import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import './radio';

export interface RadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

@customElement('ui-radio-group')
export class UIRadioGroup extends LitElement {
    static styles = css`
    :host {
      display: block;
    }

    .group-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-ink, hsl(var(--foreground)));
      margin-bottom: 0.75rem;
    }

    .group-options {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    .group-options.horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1.25rem;
    }

    /* Card variant — each radio renders as a selectable card */
    .group-options.card {
      flex-direction: column;
      gap: 0.5rem;
    }

    .group-options.card ui-radio {
      display: block;
      padding: 0.875rem 1rem;
      border: 1.5px solid var(--color-border, hsl(var(--border)));
      border-radius: var(--radius, 0.5rem);
      transition: border-color 0.2s ease, box-shadow 0.15s ease;
      background: var(--color-page-bg, hsl(var(--background)));
      cursor: pointer;
    }

    .group-options.card ui-radio:hover:not([disabled]) {
      border-color: var(--color-primary, hsl(var(--primary)));
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary, #24ec71) 12%, transparent);
    }

    .group-options.card ui-radio[checked] {
      border-color: var(--color-primary, hsl(var(--primary)));
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary, #24ec71) 15%, transparent);
      background: color-mix(in srgb, var(--color-primary, #24ec71) 5%, white);
    }
  `;

    @property({ type: String }) label: string = '';
    @property({ type: String }) name: string = 'radio-group';
    @property({ type: String }) value: string = '';
    @property({ type: Array }) options: RadioOption[] = [];
    @property({ type: String }) orientation: 'vertical' | 'horizontal' = 'vertical';
    @property({ type: String }) variant: 'default' | 'card' = 'default';
    @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
    @property({ type: Boolean }) disabled: boolean = false;

    connectedCallback(): void {
        this.setAttribute('data-ui', 'radio-group');
        super.connectedCallback();
    }

    private handleRadioChange = (e: CustomEvent): void => {
        const selected = e.detail.value as string;
        this.value = selected;

        this.dispatchEvent(new CustomEvent('group-change', {
            bubbles: true,
            composed: true,
            detail: { value: selected, name: this.name }
        }));
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
