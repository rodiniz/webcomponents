import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';

export interface DropdownItem {
  id: string;
  label: string;
  disabled: boolean;
}

type DropdownSize = 'sm' | 'md' | 'lg';

@customElement('ui-dropdown')
export class UIDropdown extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: String }) label: string = 'Menu';
  @property({ type: Array }) items: DropdownItem[] = [];
  @property({ type: String, reflect: true }) size: DropdownSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @state() private isOpen: boolean = false;

  private triggerButton: HTMLElement | null = null;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'dropdown');
    super.connectedCallback();
  }

  protected firstUpdated(): void {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target as Node)) {
        this.isOpen = false;
      }
    });
  }

  private toggleDropdown = (): void => {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  };

  private handleItemClick = (itemId: string): void => {
    const item = this.items.find(i => i.id === itemId);
    if (item && !item.disabled) {
      this.dispatchEvent(
        new CustomEvent('dropdown-select', {
          detail: { id: itemId, label: item.label },
          bubbles: true,
          composed: true
        })
      );
      this.isOpen = false;
    }
  };

  render() {
    const buttonClasses = classMap({
      'dropdown-trigger': true,
      [this.size]: true,
      'is-open': this.isOpen,
      'disabled': this.disabled
    });

    return html`
      <div class="dropdown-container">
        <button
          class=${buttonClasses}
          @click=${this.toggleDropdown}
          ?disabled=${this.disabled}
          aria-expanded=${this.isOpen}
          aria-haspopup="menu"
        >
          <span class="dropdown-label">${this.label}</span>
          <span class="dropdown-chevron">
            <svg class="feather" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>

        <div class=${classMap({
          'dropdown-menu': true,
          'is-visible': this.isOpen
        })}>
          ${this.items.length > 0
            ? this.items.map(item => html`
                <button
                  class=${classMap({
                    'dropdown-item': true,
                    'disabled': item.disabled
                  })}
                  @click=${() => this.handleItemClick(item.id)}
                  ?disabled=${item.disabled}
                >
                  ${item.label}
                </button>
              `)
            : html`<div class="dropdown-empty">No items</div>`
          }
        </div>
      </div>
    `;
  }
}

export type { DropdownSize };


