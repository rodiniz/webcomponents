import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import styles from '../../styles/theme.css?inline';
import { UIComponentBase } from '../../core/ui-component-base';
import { renderIcon } from '../../core/icon-helpers';
import { buildSizeClasses, buildVariantClasses, buildIconClasses, combineClasses } from '../../core/class-builders';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

@customElement('ui-button')
export class UIButton extends UIComponentBase {
  static styles = [css`:host { display: inline-block; }`, unsafeCSS(styles)];

  @property({ type: String, reflect: true }) variant: ButtonVariant = 'primary';
  @property({ type: String, reflect: true }) size: ButtonSize = 'md';
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: String }) icon: string = '';
  @property({ type: String }) iconPosition: 'left' | 'right' = 'left';
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  private buttonEl: HTMLButtonElement | null = null;
  @state() private hasLabelContent: boolean = false;

  // connectedCallback handled by UIComponentBase

  private handleSlotChange = (e: Event): void => {
    const slot = e.target as HTMLSlotElement;
    const hasContent = slot
      .assignedNodes({ flatten: true })
      .some(node => node.textContent?.trim().length);

    if (hasContent !== this.hasLabelContent) {
      this.hasLabelContent = hasContent;
    }
  };

  // Icon rendering now handled by renderIcon utility

  private handleClick = (e: Event): void => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (this.type === 'submit') {
      e.preventDefault();
      e.stopPropagation();
      
      let form = this.closest('form');
      
      if (!form) {
        let parent = this.parentElement;
        while (parent) {
          if (parent.tagName === 'FORM') {
            form = parent as HTMLFormElement;
            break;
          }
          parent = parent.parentElement;
        }
      }
      
      if (form) {
        const submitEvent = new Event('submit', {
          bubbles: true,
          cancelable: true
        });
        form.dispatchEvent(submitEvent);
      }
    }
  };

  render() {
    const hasIcon = !!this.icon;
    const isIconOnly = hasIcon && !this.hasLabelContent;

    // Using class builder utilities for cleaner class management
    const classes = classMap(
      combineClasses(
        { 'btn': true },
        buildVariantClasses(this.variant),
        buildSizeClasses(this.size),
        buildIconClasses(hasIcon, this.iconPosition, this.hasLabelContent)
      )
    );

    const slotEl = html`<slot @slotchange=${this.handleSlotChange}></slot>`;

    const renderContent = () => {
      if (hasIcon && this.hasLabelContent) {
        const iconEl = html`<span class="btn-icon">${renderIcon(this.icon)}</span>`;
        return this.iconPosition === 'left' 
          ? html`${iconEl}${slotEl}`
          : html`${slotEl}${iconEl}`;
      } else if (hasIcon) {
        return html`<span class="btn-icon">${renderIcon(this.icon)}</span>`;
      }
      return slotEl;
    };

    return html`
      <button
        part="button"
        class=${classes}
        type=${this.type}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        ${renderContent()}
      </button>
    `;
  }
}

export type { ButtonVariant, ButtonSize };
