import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap, styleMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-card')
export class UICard extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: Boolean, reflect: true }) shadow: boolean = false;
  @property({ type: String }) shadowColor: string = '0, 0, 0';
  @property({ type: Boolean, reflect: true }) rounded: boolean = true;
  @property({ type: String, reflect: true }) variant: 'default' | 'elevated' | 'bordered' | 'ghost' | 'glass' = 'default';
  @property({ type: String }) elevation: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
  @property({ type: Boolean, reflect: true }) interactive: boolean = false;
  @property({ type: Boolean, reflect: true }) animated: boolean = false;
  @property({ type: String, attribute: 'bg' }) bg: string = 'default';

  @state() private hasHeader: boolean = false;
  @state() private hasFooter: boolean = false;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'card');
    super.connectedCallback();
  }

  private getShadowValue(): string {
    if (!this.shadow) return 'none';
    
    switch (this.elevation) {
      case 'sm':
        return `0 1px 2px rgba(${this.shadowColor}, 0.05), 0 1px 3px rgba(${this.shadowColor}, 0.1)`;
      case 'md':
        return `0 4px 6px rgba(${this.shadowColor}, 0.07), 0 2px 4px rgba(${this.shadowColor}, 0.06)`;
      case 'lg':
        return `0 10px 15px rgba(${this.shadowColor}, 0.1), 0 4px 6px rgba(${this.shadowColor}, 0.05)`;
      case 'xl':
        return `0 20px 25px rgba(${this.shadowColor}, 0.15), 0 10px 10px rgba(${this.shadowColor}, 0.04)`;
      default:
        return 'none';
    }
  }

  private handleHeaderSlotChange = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    this.hasHeader = slot.assignedNodes({ flatten: true }).length > 0;
  };

  private handleFooterSlotChange = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    this.hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  };

  render() {
    const classes = classMap({
      'card': true,
      [this.variant]: true,
      'rounded': this.rounded,
      'square': !this.rounded,
      'custom-shadow': this.shadow,
      'no-shadow': !this.shadow,
      'interactive': this.interactive,
      'animated': this.animated,
      [`bg-${this.bg}`]: true
    });

    const headerClasses = classMap({
      'card-header': true,
      'is-empty': !this.hasHeader
    });

    const footerClasses = classMap({
      'card-footer': true,
      'is-empty': !this.hasFooter
    });

    return html`
      <div class=${classes} style=${styleMap({ 'box-shadow': this.shadow ? this.getShadowValue() : 'none' })}>
        <div class=${headerClasses}>
          <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
        </div>
        <div class="card-content">
          <slot name="content"><slot></slot></slot>
        </div>
        <div class=${footerClasses}>
          <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
}
