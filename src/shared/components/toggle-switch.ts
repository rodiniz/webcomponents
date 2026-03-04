import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-toggle-switch')
export class UIToggleSwitch extends LitElement {
  static styles = [
    unsafeCSS(themeStyles),
    css`
      :host {
        display: inline-block;
      }

      .toggle-container {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        user-select: none;
      }

      .toggle-container.disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        pointer-events: none;
      }

      .toggle-track {
        position: relative;
        display: inline-block;
        width: 2.75rem;
        height: 1.5rem;
        background: hsl(var(--muted));
        border: 1px solid hsl(var(--border));
        border-radius: 1.5rem;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
      }

      .toggle-track:hover:not(.disabled) {
        border-color: hsl(var(--ring));
      }

      .toggle-track.checked {
        background: hsl(var(--primary));
        border-color: hsl(var(--primary));
      }

      .toggle-thumb {
        position: absolute;
        top: 0.125rem;
        left: 0.125rem;
        width: 1.125rem;
        height: 1.125rem;
        background: white;
        border-radius: 50%;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
      }

      .toggle-track.checked .toggle-thumb {
        transform: translateX(1.25rem);
      }

      .toggle-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: hsl(var(--foreground));
        line-height: 1.5;
      }

      /* Size variants */
      .toggle-container.size-sm .toggle-track {
        width: 2.25rem;
        height: 1.25rem;
      }

      .toggle-container.size-sm .toggle-thumb {
        width: 0.875rem;
        height: 0.875rem;
        top: 0.125rem;
        left: 0.125rem;
      }

      .toggle-container.size-sm .toggle-track.checked .toggle-thumb {
        transform: translateX(1rem);
      }

      .toggle-container.size-sm .toggle-label {
        font-size: 0.8125rem;
      }

      .toggle-container.size-lg .toggle-track {
        width: 3.5rem;
        height: 1.875rem;
      }

      .toggle-container.size-lg .toggle-thumb {
        width: 1.5rem;
        height: 1.5rem;
        top: 0.125rem;
        left: 0.125rem;
      }

      .toggle-container.size-lg .toggle-track.checked .toggle-thumb {
        transform: translateX(1.625rem);
      }

      .toggle-container.size-lg .toggle-label {
        font-size: 0.9375rem;
      }

      /* Focus styles */
      input:focus-visible + .toggle-track {
        outline: 2px solid hsl(var(--ring));
        outline-offset: 2px;
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) checked: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: String }) label: string = '';
  @property({ type: String }) name: string = '';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

  private isUserInteraction: boolean = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'switch');
    this.setAttribute('aria-checked', String(this.checked));
  }

  updated(changedProperties: Map<string, any>): void {
    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', String(this.checked));
      if (this.isUserInteraction) {
        this.dispatchEvent(new CustomEvent('toggle-change', {
          detail: { checked: this.checked },
          bubbles: true,
          composed: true
        }));
        this.isUserInteraction = false;
      }
    }
  }

  private handleToggle = (e: Event): void => {
    if (this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this.isUserInteraction = true;
    this.checked = !this.checked;
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.isUserInteraction = true;
      this.checked = !this.checked;
    }
  };

  get value(): boolean {
    return this.checked;
  }

  set value(val: boolean) {
    this.checked = val;
  }

  render() {
    const containerClasses = classMap({
      'toggle-container': true,
      'disabled': this.disabled,
      [`size-${this.size}`]: true
    });

    const trackClasses = classMap({
      'toggle-track': true,
      'checked': this.checked,
      'disabled': this.disabled
    });

    return html`
      <div 
        class=${containerClasses}
        @click=${this.handleToggle}
        @keydown=${this.handleKeyDown}
        tabindex="${this.disabled ? -1 : 0}"
      >
        <input
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name}
          aria-hidden="true"
          tabindex="-1"
        />
        <span class=${trackClasses}>
          <span class="toggle-thumb"></span>
        </span>
        ${this.label ? html`<span class="toggle-label">${this.label}</span>` : ''}
      </div>
    `;
  }
}
