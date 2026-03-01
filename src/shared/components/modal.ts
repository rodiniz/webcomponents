import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-modal')
export class UIModal extends LitElement {
  static styles = [
    unsafeCSS(themeStyles),
    css`
      :host {
        display: contents;
      }
      :host([open]) {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 10000;
      }
    `
  ];

  // fields to remember where this element originally lived so we can
  // restore it after closing (we portal to body while open)
  private _originalParent?: Node | null;
  private _originalNextSibling?: Node | null;

  @property({ type: String }) title: string = '';
  @property({ type: String }) size: string = 'md';
  @property({ type: Boolean, reflect: true, attribute: 'open' }) isOpen: boolean = false;
  @property({ type: Boolean, attribute: 'no-close-on-escape' }) noCloseOnEscape: boolean = false;
  @property({ type: Boolean, attribute: 'no-close-on-backdrop' }) noCloseOnBackdrop: boolean = false;

  connectedCallback(): void {
    // move element into document.body so backdrops and fixed positioning
    // are not confined by an ancestor with overflow/scrolling. this keeps
    // the modal demo from appearing "cut off" inside the layout container.
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
    // Portal to body at open time so the modal isn't clipped by layout
    // containers, but allow the element to remain in its original place
    // until the user actually opens it (so demo code can query it by id).
    const parent = this.parentNode;
    if (parent && parent !== document.body) {
      this._originalParent = parent;
      this._originalNextSibling = this.nextSibling;
      document.body.appendChild(this);
    }

    this.isOpen = true;
    this.dispatchEvent(new CustomEvent('modal-open', { bubbles: true, composed: true }));
  }

  public close(): void {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('modal-close', { bubbles: true, composed: true }));

    // restore to original location if we moved it
    if (this._originalParent) {
      try {
        if (this._originalNextSibling && this._originalNextSibling.parentNode === this._originalParent) {
          this._originalParent.insertBefore(this, this._originalNextSibling as Node);
        } else {
          this._originalParent.appendChild(this);
        }
      } catch (err) {
        // if reinsertion fails silently continue
        console.error('Modal restoration failed:', err);
      }
      this._originalParent = undefined;
      this._originalNextSibling = undefined;
    }
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
          <div class="modal-header">
            ${this.title ? html`<h2 id="modal-title" class="modal-title">${this.title}</h2>` : html`<div></div>`}
            <button class="modal-close" @click=${this.close} aria-label="Close modal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
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
