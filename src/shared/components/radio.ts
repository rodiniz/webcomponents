import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';

export interface RadioChangeDetail {
    value: string;
    name: string;
}

@customElement('ui-radio')
export class UIRadio extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
    }

    .radio-container {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      user-select: none;
      outline: none;
    }

    .radio-container.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Hide native input visually but keep it accessible */
    .radio-container input[type="radio"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    /* Custom radio circle */
    .radio-ring {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border-radius: 50%;
      background: var(--color-page-bg, hsl(var(--background)));
      border: 2px solid var(--color-border, hsl(var(--border)));
      transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-sizing: border-box;
    }

    /* Size variants */
    .radio-ring.size-sm { width: 16px; height: 16px; }
    .radio-ring.size-md { width: 20px; height: 20px; }
    .radio-ring.size-lg { width: 24px; height: 24px; }

    /* Dot */
    .radio-dot {
      border-radius: 50%;
      background: var(--color-primary, hsl(var(--primary)));
      transform: scale(0);
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .radio-ring.size-sm .radio-dot { width: 6px;  height: 6px; }
    .radio-ring.size-md .radio-dot { width: 8px;  height: 8px; }
    .radio-ring.size-lg .radio-dot { width: 10px; height: 10px; }

    /* Checked state */
    .radio-ring.checked {
      border-color: var(--color-primary, hsl(var(--primary)));
    }

    .radio-ring.checked .radio-dot {
      transform: scale(1);
    }

    /* Hover — only when not disabled */
    .radio-container:not(.disabled):hover .radio-ring {
      border-color: var(--color-primary, hsl(var(--primary)));
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary, #24ec71) 15%, transparent);
    }

    /* Focus ring via keyboard */
    .radio-container:focus-visible .radio-ring {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary, #24ec71) 25%, transparent);
    }

    /* Label */
    .radio-label {
      font-size: 0.9375rem;
      line-height: 1.5;
      color: var(--color-ink, hsl(var(--foreground)));
    }

    .radio-container.size-sm .radio-label { font-size: 0.8125rem; }
    .radio-container.size-lg .radio-label { font-size: 1rem; }

    /* Description */
    .radio-description {
      display: block;
      font-size: 0.8125rem;
      color: var(--color-text-muted, hsl(var(--muted-foreground)));
      line-height: 1.4;
      margin-top: 2px;
    }

    .radio-text {
      display: flex;
      flex-direction: column;
    }
  `;

    @property({ type: String }) value: string = '';
    @property({ type: String }) name: string = '';
    @property({ type: String }) label: string = '';
    @property({ type: String }) description: string = '';
    @property({ type: Boolean, reflect: true }) checked: boolean = false;
    @property({ type: Boolean, reflect: true }) disabled: boolean = false;

    private _size: 'sm' | 'md' | 'lg' = 'md';

    @property({ type: String })
    get size(): 'sm' | 'md' | 'lg' { return this._size; }
    set size(v: 'sm' | 'md' | 'lg') {
        const valid: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
        const old = this._size;
        this._size = valid.includes(v) ? v : 'md';
        this.requestUpdate('size', old);
    }

    connectedCallback(): void {
        this.setAttribute('data-ui', 'radio');
        super.connectedCallback();
    }

    private handleChange = (e: Event): void => {
        if (this.disabled) return;
        const input = e.target as HTMLInputElement;
        this.checked = input.checked;

        this.dispatchEvent(new CustomEvent<RadioChangeDetail>('radio-change', {
            bubbles: true,
            composed: true,
            detail: { value: this.value, name: this.name }
        }));
    };

    private handleKeyDown = (e: KeyboardEvent): void => {
        if (this.disabled) return;
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!this.checked) {
                this.checked = true;
                this.dispatchEvent(new CustomEvent<RadioChangeDetail>('radio-change', {
                    bubbles: true,
                    composed: true,
                    detail: { value: this.value, name: this.name }
                }));
            }
        }
    };

    render() {
        const containerClass = classMap({
            'radio-container': true,
            [`size-${this.size}`]: true,
            'disabled': this.disabled,
        });

        const ringClass = classMap({
            'radio-ring': true,
            [`size-${this.size}`]: true,
            'checked': this.checked,
        });

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
