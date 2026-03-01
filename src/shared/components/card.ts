import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

    return html`
      <div class=${classes} style=${styleMap({ 'box-shadow': this.shadow ? this.getShadowValue() : 'none' })}>
        <slot></slot>
      </div>
    `;
  }
}
