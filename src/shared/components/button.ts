import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import styles from '../../styles/theme.css?inline';
import { UIComponentBase } from '../../core/ui-component-base';
import { renderIcon } from '../../core/icon-helpers';
import { buildSizeClasses, buildVariantClasses, buildIconClasses, combineClasses } from '../../core/class-builders';
import { slotHasContentFromEvent } from '../../core/slot-helpers';

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
  @property({ type: Boolean, reflect: true, attribute: 'is-processing' }) isProcessing: boolean = false;

  private formEl: HTMLFormElement | null = null;
  private formKeydownCleanup: (() => void) | null = null;
  @state() private hasLabelContent: boolean = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.attachFormKeydownListener();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('type')) {
      this.detachFormKeydownListener();
      this.attachFormKeydownListener();
    }
  }

  private resolveForm(): HTMLFormElement | null {
    return this.closest('form');
  }

  private attachFormKeydownListener(): void {
    if (this.type !== 'submit') return;

    const form = this.resolveForm();
    if (!form) return;

    this.formEl = form;
    this.formKeydownCleanup = this.addManagedEventListener(this.formEl, 'keydown', this.handleFormKeydown);
  }

  private detachFormKeydownListener(): void {
    this.formKeydownCleanup?.();
    this.formKeydownCleanup = null;
    this.formEl = null;
  }

  private submitForm(form: HTMLFormElement): void {
    if (typeof form.requestSubmit === 'function') {
      form.requestSubmit();
      return;
    }

    const submitEvent = new Event('submit', {
      bubbles: true,
      cancelable: true
    });
    form.dispatchEvent(submitEvent);
  }

  private getPrimarySubmitButton(form: HTMLFormElement): Element | null {
    return form.querySelector('ui-button[type="submit"]:not([disabled]):not([is-processing])');
  }

  private shouldHandleEnterSubmit(event: KeyboardEvent): boolean {
    if (event.key !== 'Enter' || event.defaultPrevented) return false;
    if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return false;

    const eventTarget = event.composedPath().find(target => target instanceof HTMLElement) as HTMLElement | undefined;
    if (!eventTarget) return false;

    const tagName = eventTarget.tagName.toLowerCase();

    if (tagName === 'textarea' || tagName === 'ui-textarea') return false;
    if (eventTarget.isContentEditable) return false;

    if (eventTarget instanceof HTMLInputElement) {
      const blockedTypes = ['button', 'submit', 'reset', 'checkbox', 'radio', 'file', 'range', 'color', 'image'];
      if (blockedTypes.includes(eventTarget.type)) return false;
    }

    return true;
  }

  private handleFormKeydown = (event: KeyboardEvent): void => {
    if (this.disabled || this.isProcessing || this.type !== 'submit') return;
    if (!this.shouldHandleEnterSubmit(event)) return;

    const form = this.resolveForm();
    if (!form) return;

    const primarySubmitButton = this.getPrimarySubmitButton(form);
    if (primarySubmitButton !== this) return;

    event.preventDefault();
    this.submitForm(form);
  };

  private handleSlotChange = (e: Event): void => {
    const hasContent = slotHasContentFromEvent(e, { textOnly: true });

    if (hasContent !== this.hasLabelContent) {
      this.hasLabelContent = hasContent;
    }
  };

  // Icon rendering now handled by renderIcon utility

  private handleClick = (e: Event): void => {
    if (this.disabled || this.isProcessing) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (this.type === 'submit') {
      e.preventDefault();
      e.stopPropagation();

      const form = this.resolveForm();

      if (form) {
        this.submitForm(form);
      }
    }
  };

  render() {
    const isDisabled = this.disabled || this.isProcessing;
    const hasIcon = !!this.icon;
    const hasLeadingVisual = hasIcon || this.isProcessing;

    // Using class builder utilities for cleaner class management
    const classes = classMap(
      combineClasses(
        { 'btn': true },
        buildVariantClasses(this.variant),
        buildSizeClasses(this.size, ''),
        buildIconClasses(hasLeadingVisual, this.iconPosition, this.hasLabelContent)
      )
    );

    const slotEl = html`<slot @slotchange=${this.handleSlotChange}></slot>`;

    const renderContent = () => {
      if (this.isProcessing) {
        const spinnerEl = html`
          <span class="btn-spinner" aria-hidden="true">
            <span class="btn-spinner-ring"></span>
          </span>
        `;

        if (this.hasLabelContent) {
          return this.iconPosition === 'left'
            ? html`${spinnerEl}${slotEl}`
            : html`${slotEl}${spinnerEl}`;
        }

        return spinnerEl;
      }

      if (hasIcon) {
        const iconEl = html`<span class="btn-icon">${renderIcon(this.icon)}</span>`;
        return this.iconPosition === 'left' 
          ? html`${iconEl}${slotEl}`
          : html`${slotEl}${iconEl}`;
      }
      return slotEl;
    };

    return html`
      <button
        part="button"
        class=${classes}
        type=${this.type}
        ?disabled=${isDisabled}
        aria-busy=${this.isProcessing ? 'true' : 'false'}
        @click=${this.handleClick}
      >
        ${renderContent()}
      </button>
    `;
  }
}

export type { ButtonVariant, ButtonSize };
