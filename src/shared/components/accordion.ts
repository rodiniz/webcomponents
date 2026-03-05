import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';
import feather from 'feather-icons';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

@customElement('ui-accordion')
export class UIAccordion extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: Array }) items: AccordionItem[] = [];
  @property({ type: Boolean, reflect: true }) allowMultiple: boolean = false;
  @property({ type: String }) openItemId: string = '';
  @state() private openItems: Set<string> = new Set();

  connectedCallback(): void {
    this.setAttribute('data-ui', 'accordion');
    super.connectedCallback();
    if (this.openItemId) {
      this.openItems.add(this.openItemId);
    }
  }

  updated(changedProperties: Map<string, any>): void {
    if (changedProperties.has('openItemId') && this.openItemId) {
      if (!this.allowMultiple) {
        this.openItems.clear();
      }
      this.openItems.add(this.openItemId);
    }
  }

  private toggleItem(itemId: string): void {
    if (this.openItems.has(itemId)) {
      this.openItems.delete(itemId);
    } else {
      if (!this.allowMultiple) {
        this.openItems.clear();
      }
      this.openItems.add(itemId);
    }
    this.openItems = new Set(this.openItems);
    
    const detail = { openItems: Array.from(this.openItems) };
    this.dispatchEvent(
      new CustomEvent('accordion-change', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <div class="accordion">
        ${this.items.map(item => {
          const isOpen = this.openItems.has(item.id);
          const headerClasses = classMap({
            'accordion-header': true,
            'is-open': isOpen
          });
          const contentClasses = classMap({
            'accordion-content': true,
            'is-hidden': !isOpen
          });

          return html`
            <div class="accordion-item" data-item-id=${item.id}>
              <button
                class=${headerClasses}
                @click=${() => this.toggleItem(item.id)}
                aria-expanded=${isOpen}
                aria-controls="content-${item.id}"
              >
                <span class="accordion-title">${item.title}</span>
                <span class="accordion-icon">
                  <svg class="feather" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <div class=${contentClasses} id="content-${item.id}">
                <div class="accordion-body">${item.content}</div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
