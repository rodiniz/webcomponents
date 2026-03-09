import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { nothing } from 'lit';
import { UIComponentBase } from '../../core/ui-component-base';
import { useClickOutside } from '../../core/click-outside';
import themeStyles from '../../styles/theme.css?inline';

export interface SelectOption {
  value: string;
  label: string;
}

@customElement('ui-select')
export class UISelect extends UIComponentBase {
  static styles = [
    unsafeCSS(themeStyles),
    css`
      :host {
        display: block;
        width: 100%;
        font-family: inherit;
      }

      .select-container {
        position: relative;
        width: 100%;
      }

      .select-label {
        display: block;
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--color-ink);
        margin-bottom: 0.5rem;
      }

      .select-display {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.65rem 1rem;
        background: var(--color-page-bg, hsl(var(--background)));
        border: 2px solid var(--color-border, hsl(var(--border)));
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        min-height: 42px;
        box-sizing: border-box;
      }

      .select-container.open .select-display {
        border-color: var(--color-primary, hsl(var(--primary)));
        box-shadow: 0 0 0 4px rgba(36, 236, 113, 0.1);
      }

      .select-container.disabled .select-display {
        background: var(--color-muted, hsl(var(--muted)));
        cursor: not-allowed;
        opacity: 0.7;
      }

      .select-value {
        font-size: 0.95rem;
        color: var(--color-ink, hsl(var(--foreground)));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
      }

      .select-container:not(.has-value) .select-value {
        color: var(--color-text-muted, hsl(var(--muted-foreground)));
      }

      .select-arrow {
        width: 18px;
        height: 18px;
        color: var(--color-text-muted, hsl(var(--muted-foreground)));
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        margin-left: 0.75rem;
        flex-shrink: 0;
      }

      .select-container.open .select-arrow {
        transform: rotate(180deg);
        color: var(--color-primary, hsl(var(--primary)));
      }

      .select-dropdown {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        background: white;
        border: 1px solid var(--color-border-strong);
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        animation: dropdownScale 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: top;
      }

      @keyframes dropdownScale {
        from { transform: scaleY(0.9); opacity: 0; }
        to { transform: scaleY(1); opacity: 1; }
      }

      .select-search {
        padding: 0.75rem;
        border-bottom: 1px solid var(--color-border);
        background: #fcfdfe;
      }

      .select-input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1.5px solid var(--color-border);
        border-radius: 6px;
        font-size: 0.9rem;
        outline: none;
        transition: all 0.2s;
        box-sizing: border-box;
      }

      .select-input:focus {
        border-color: var(--color-primary);
      }

      .select-options {
        max-height: 240px;
        overflow-y: auto;
        padding: 0.4rem;
      }

      .select-option {
        padding: 0.65rem 0.75rem;
        font-size: 0.9rem;
        color: var(--color-ink);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .select-option:hover {
        background: rgba(36, 236, 113, 0.08);
      }

      .select-option.selected {
        background: var(--color-primary);
        color: white;
        font-weight: 600;
      }

      .select-no-results {
        padding: 1.5rem;
        text-align: center;
        color: #94a3b8;
        font-size: 0.9rem;
      }

      /* Custom scrollbar */
      .select-options::-webkit-scrollbar {
        width: 6px;
      }
      .select-options::-webkit-scrollbar-track {
        background: transparent;
      }
      .select-options::-webkit-scrollbar-thumb {
        background: #e2e8f0;
        border-radius: 10px;
      }
      .select-options::-webkit-scrollbar-thumb:hover {
        background: #cbd5e1;
      }
    `
  ];

  @property({ type: String }) value: string = '';
  @property({ type: String }) label: string = '';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) searchable: boolean = false;
  @property({ type: String }) placeholder: string = 'Select an option';
  @property({ type: Array }) options: SelectOption[] = [];

  @state() private isOpen: boolean = false;
  @state() private searchTerm: string = '';

  private clickOutsideHandler = useClickOutside(this, () => {
    if (this.isOpen) {
      this.isOpen = false;
    }
  });

  connectedCallback(): void {
    super.connectedCallback();
    this.clickOutsideHandler.attach();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clickOutsideHandler.detach();
  }

  private getSelectedLabel(): string {
    const selected = this.options.find(opt => opt.value === this.value);
    return selected?.label || this.placeholder;
  }

  private toggleOpen(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchTerm = '';
      setTimeout(() => {
        const input = this.shadowRoot?.querySelector('.select-input') as HTMLInputElement;
        input?.focus();
      }, 0);
    }
  }

  private selectOption(opt: SelectOption): void {
    this.value = opt.value;
    this.isOpen = false;
    this.emit('select-change', { value: opt.value, option: opt });
  }

  render() {
    const containerClass = classMap({
      'select-container': true,
      'open': this.isOpen,
      'disabled': this.disabled,
      'has-value': !!this.value && this.value !== ''
    });

    const filteredOptions = this.options.filter(opt =>
      opt.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    return html`
      ${this.label ? html`<label class="select-label">${this.label}</label>` : nothing}
      
      <div class=${containerClass}>
        <div class="select-display" @click=${this.toggleOpen}>
          <span class="select-value">${this.getSelectedLabel()}</span>
          <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        ${this.isOpen ? html`
          <div class="select-dropdown">
            ${this.searchable ? html`
              <div class="select-search">
                <input
                  type="text"
                  class="select-input"
                  placeholder="Search options..."
                  .value=${this.searchTerm}
                  @input=${(e: Event) => this.searchTerm = (e.target as HTMLInputElement).value}
                  @click=${(e: Event) => e.stopPropagation()}
                />
              </div>
            ` : nothing}
            
            <div class="select-options">
              ${filteredOptions.length > 0 ? filteredOptions.map(opt => html`
                <div 
                  class="select-option ${opt.value === this.value ? 'selected' : ''}"
                  @click=${(e: Event) => { e.stopPropagation(); this.selectOption(opt); }}
                >
                  ${opt.label}
                </div>
              `) : html`<div class="select-no-results">No results found</div>`}
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }
}
