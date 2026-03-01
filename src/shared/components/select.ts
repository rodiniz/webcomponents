import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { nothing } from 'lit';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-select')
export class UISelect extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) placeholder: string = 'Select an option';
  @property({ type: String }) options: string = '[]';

  @state() private isOpen: boolean = false;
  @state() private searchTerm: string = '';
  @state() private _options: SelectOption[] = [];
  @query('.select-input') selectInput!: HTMLInputElement;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'select');
    super.connectedCallback();
    this.parseOptions();
    document.addEventListener('click', this.handleClickOutside);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
  }

  willUpdate(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('options')) {
      this.parseOptions();
    }
  }

  private parseOptions(): void {
    try {
      this._options = JSON.parse(this.options);
    } catch (e) {
      this._options = [];
    }
  }

  private handleClickOutside = (e: Event): void => {
    const path = e.composedPath();
    const clickedInside = path.includes(this);
    
    if (!clickedInside && this.isOpen) {
      this.isOpen = false;
    }
  };

  private getSelectedLabel(): string {
    const selected = this._options.find(opt => opt.value === this.value);
    return selected?.label || this.placeholder;
  }

  private toggleOpen(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
  }

  private selectOption(value: string): void {
    this.value = value;
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const containerClass = classMap({
      'select-container': true,
      'open': this.isOpen,
      'disabled': this.disabled,
      'has-value': !!this.value
    });

    const filteredOptions = this._options.filter(opt => 
      opt.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    return html`
      <div class=${containerClass} @click=${this.toggleOpen}>
        <div class="select-display">
          <span class="select-value">${this.getSelectedLabel()}</span>
          <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        ${this.isOpen ? html`
          <div class="select-dropdown">
            <div class="select-search">
              <input
                type="text"
                class="select-input"
                placeholder="Search..."
                .value=${this.searchTerm}
                @input=${(e: Event) => this.searchTerm = (e.target as HTMLInputElement).value}
                @click=${(e: Event) => e.stopPropagation()}
              />
            </div>
            <div class="select-options">
              ${filteredOptions.length > 0 ? filteredOptions.map(opt => html`
                <div 
                  class="select-option ${opt.value === this.value ? 'selected' : ''}"
                  @click=${(e: Event) => { e.stopPropagation(); this.selectOption(opt.value); }}
                >
                  ${opt.label}
                </div>
              `) : html`<div class="select-no-results">No results</div>`}
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }
}
