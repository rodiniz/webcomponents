import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-modal')
export class UIModal extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: String }) title: string = '';
  @property({ type: String }) size: string = 'md';
  @property({ type: Boolean, reflect: true, attribute: 'open' }) isOpen: boolean = false;
  @property({ type: Boolean, attribute: 'no-close-on-escape' }) noCloseOnEscape: boolean = false;
  @property({ type: Boolean, attribute: 'no-close-on-backdrop' }) noCloseOnBackdrop: boolean = false;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'modal');
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeydown);
  }

  willUpdate(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('isOpen')) {
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  private handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.isOpen && !this.noCloseOnEscape) {
      this.close();
    }
  };

  public open(): void {
    this.isOpen = true;
    this.dispatchEvent(new CustomEvent('modal-open', { bubbles: true, composed: true }));
  }

  public close(): void {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('modal-close', { bubbles: true, composed: true }));
  }

  private handleBackdropClick(e: Event): void {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop') && !this.noCloseOnBackdrop) {
      this.close();
    }
  }

  render() {
    const sizeClass = `modal-${this.size}`;
    const backdropClasses = classMap({
      'modal-backdrop': true,
      'open': this.isOpen
    });

    return html`
      <div class=${backdropClasses} @click=${this.handleBackdropClick}>
        <div class="modal-container ${sizeClass}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          ${this.title ? html`
            <div class="modal-header">
              <h2 id="modal-title" class="modal-title">${this.title}</h2>
              <button class="modal-close" @click=${this.close} aria-label="Close modal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ` : ''}
          <div class="modal-content">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
