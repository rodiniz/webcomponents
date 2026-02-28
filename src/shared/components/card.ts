import { BaseComponent } from '../../core/base-component';
import { html, render } from 'lit-html';
import { classMap, styleMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';
import cardStyles from './card.css?inline';

class UICard extends BaseComponent {
  connectedCallback(): void {
    this.setAttribute('data-ui', 'card');
    super.connectedCallback();
  }

  static get observedAttributes(): string[] {
    return ['shadow', 'shadow-color', 'rounded', 'variant', 'elevation'];
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private getShadow(): boolean {
    return this.hasAttribute('shadow') && this.getAttribute('shadow') !== 'false';
  }

  private getShadowColor(): string {
    return this.getAttribute('shadow-color') ?? '0, 0, 0';
  }

  private getRounded(): boolean {
    const value = this.getAttribute('rounded');
    return value !== 'false';
  }

  private getVariant(): 'default' | 'elevated' | 'bordered' | 'ghost' {
    const value = this.getAttribute('variant');
    if (value === 'elevated' || value === 'bordered' || value === 'ghost') return value;
    return 'default';
  }

  private getElevation(): 'none' | 'sm' | 'md' | 'lg' | 'xl' {
    const value = this.getAttribute('elevation');
    if (value === 'none' || value === 'sm' || value === 'md' || value === 'lg' || value === 'xl') return value;
    return 'sm';
  }

  private getShadowValue(): string {
    const hasShadow = this.getShadow();
    const shadowColor = this.getShadowColor();
    const elevation = this.getElevation();
    
    if (!hasShadow) return 'none';
    
    switch (elevation) {
      case 'sm':
        return `0 1px 2px rgba(${shadowColor}, 0.05), 0 1px 3px rgba(${shadowColor}, 0.1)`;
      case 'md':
        return `0 4px 6px rgba(${shadowColor}, 0.07), 0 2px 4px rgba(${shadowColor}, 0.06)`;
      case 'lg':
        return `0 10px 15px rgba(${shadowColor}, 0.1), 0 4px 6px rgba(${shadowColor}, 0.05)`;
      case 'xl':
        return `0 20px 25px rgba(${shadowColor}, 0.15), 0 10px 10px rgba(${shadowColor}, 0.04)`;
      default:
        return 'none';
    }
  }

  render(): void {
    const hasShadow = this.getShadow();
    const rounded = this.getRounded();
    const variant = this.getVariant();
    const elevation = this.getElevation();
    const shadowValue = this.getShadowValue();

    const classes = classMap({
      'card': true,
      [variant]: true,
      'rounded': rounded,
      'square': !rounded,
      'custom-shadow': hasShadow,
      'no-shadow': !hasShadow
    });

    const cardStyles = this.getShadowStyle(shadowValue, hasShadow, elevation);

    const template = html`
      <style>
        ${themeStyles}
        ${cardStyles}
      </style>
      <div class=${classes} style=${styleMap({ 'box-shadow': hasShadow ? shadowValue : 'none' })}>
        <slot></slot>
      </div>
    `;

    render(template, this.shadowRoot!);
  }

  private getShadowStyle(shadowValue: string, hasShadow: boolean, elevation: string): string {
    if (!hasShadow || elevation === 'none') return '';
    
    const hoverShadow = shadowValue.replace(/rgba\(([^)]+), ([\d.]+)\)/g, (_match, rgb, opacity) => 
      `rgba(${rgb}, ${Math.min(parseFloat(opacity) * 1.3, 0.25)})`
    );
    
    return `
      .card.custom-shadow:hover {
        box-shadow: ${hoverShadow};
      }
    `;
  }
}

customElements.define('ui-card', UICard);

export { UICard };
