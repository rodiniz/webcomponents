import { BaseComponent } from '../../core/base-component';
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

  render(): void {
    const hasShadow = this.getShadow();
    const shadowColor = this.getShadowColor();
    const rounded = this.getRounded();
    const variant = this.getVariant();
    const elevation = this.getElevation();

    // Generate dynamic shadow based on color and elevation
    let shadowValue = 'none';
    if (hasShadow) {
      switch (elevation) {
        case 'sm':
          shadowValue = `0 1px 2px rgba(${shadowColor}, 0.05), 0 1px 3px rgba(${shadowColor}, 0.1)`;
          break;
        case 'md':
          shadowValue = `0 4px 6px rgba(${shadowColor}, 0.07), 0 2px 4px rgba(${shadowColor}, 0.06)`;
          break;
        case 'lg':
          shadowValue = `0 10px 15px rgba(${shadowColor}, 0.1), 0 4px 6px rgba(${shadowColor}, 0.05)`;
          break;
        case 'xl':
          shadowValue = `0 20px 25px rgba(${shadowColor}, 0.15), 0 10px 10px rgba(${shadowColor}, 0.04)`;
          break;
        default:
          shadowValue = 'none';
      }
    }

    this.shadowRoot!.innerHTML = `
      <style>
        ${themeStyles}
        ${cardStyles}
        
        .card.custom-shadow {
          box-shadow: ${shadowValue};
        }

        .card.custom-shadow:hover {
          box-shadow: ${hasShadow && elevation !== 'none' 
            ? shadowValue.replace(/rgba\(([^)]+), ([\d.]+)\)/g, (match, rgb, opacity) => 
                `rgba(${rgb}, ${Math.min(parseFloat(opacity) * 1.3, 0.25)})`)
            : 'none'};
        }
      </style>
      <div class="card ${variant} ${rounded ? 'rounded' : 'square'} ${hasShadow ? 'custom-shadow' : 'no-shadow'}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ui-card', UICard);

export { UICard };
