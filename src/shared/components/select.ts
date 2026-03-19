import { html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import { renderOptionalLabel } from '../../core/form-helpers';
import { useClickOutside } from '../../core/click-outside';
import themeStyles from '../../styles/theme.css?inline';
import selectStyles from './select.css?inline';

export interface SelectOption {
  value: string;
  label: string;
}

@customElement('ui-select')
export class UISelect extends UIComponentBase {
  static styles = [unsafeCSS(themeStyles), unsafeCSS(selectStyles)];

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
    this.registerCleanup(() => this.clickOutsideHandler.detach());
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
      ${renderOptionalLabel(this.label, { className: 'select-label' })}
      
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
