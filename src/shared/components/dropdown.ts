import { html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';
import { UIComponentBase } from '../../core/ui-component-base';
import { buildSizeClasses, buildStateClasses, combineClasses } from '../../core/class-builders';
import { useClickOutside } from '../../core/click-outside';
import { ariaExpanded, ariaHasPopup } from '../../core/aria-helpers';

export interface DropdownItem {
  id: string;
  label: string;
  disabled: boolean;
}

type DropdownSize = 'sm' | 'md' | 'lg';

@customElement('ui-dropdown')
export class UIDropdown extends UIComponentBase {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: String }) label: string = 'Menu';
  @property({ type: Array }) items: DropdownItem[] = [];
  @property({ type: String, reflect: true }) size: DropdownSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @state() private isOpen: boolean = false;

  private triggerButton: HTMLElement | null = null;
  private clickOutsideHandler = useClickOutside(
    this,
    () => this.isOpen = false,
    { enabled: () => this.isOpen }
  );

  // connectedCallback removed - now handled by UIComponentBase

  connectedCallback(): void {
    super.connectedCallback();
    this.clickOutsideHandler.attach();
  }

  disconnectedCallback(): void {
    this.clickOutsideHandler.detach();
    super.disconnectedCallback();
  }

  private toggleDropdown = (): void => {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  };

  private handleItemClick = (itemId: string): void => {
    const item = this.items.find(i => i.id === itemId);
    if (item && !item.disabled) {
      // Using emit() from UIComponentBase instead of dispatchEvent
      this.emit('dropdown-select', { id: itemId, label: item.label });
      this.isOpen = false;
    }
  };

  render() {
    // Using class builder utilities for cleaner class management
    const buttonClasses = classMap(
      combineClasses(
        { 'dropdown-trigger': true },
        buildSizeClasses(this.size, ''),
        buildStateClasses({
          'is-open': this.isOpen,
          disabled: this.disabled
        })
      )
    );

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

        <div class=${classMap(
          combineClasses(
            { 'dropdown-menu': true },
            buildStateClasses({ 'is-visible': this.isOpen })
          )
        )}>
          ${this.items.length > 0
            ? this.items.map(item => html`
                <button
                  class=${classMap(
                    combineClasses(
                      { 'dropdown-item': true },
                      buildStateClasses({ disabled: item.disabled })
                    )
                  )}
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


