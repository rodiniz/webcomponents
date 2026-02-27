import { BaseComponent } from '../../core/base-component';
import themeStyles from '../../styles/theme.css?inline';
import topBarStyles from './top-bar.css?inline';

class UITopBar extends BaseComponent {
  connectedCallback(): void {
    this.setAttribute('data-ui', 'top-bar');
    super.connectedCallback();
  }

  static get observedAttributes(): string[] {
    return ['title', 'subtitle', 'bg-color'];
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private getTitle(): string {
    return this.getAttribute('title') ?? 'Dashboard';
  }

  private getSubtitle(): string {
    return this.getAttribute('subtitle') ?? '';
  }

  private getBgColor(): string {
    return this.getAttribute('bg-color') ?? 'var(--color-header)';
  }

  render(): void {
    const subtitle = this.getSubtitle();
    const bgColor = this.getBgColor();
    
    this.shadowRoot!.innerHTML = `
      <style>
        ${themeStyles}
        ${topBarStyles}
        :host {
          background: ${bgColor};
        }
      </style>
      <div class="top-bar">
        <div class="title-section">
          <h1 class="page-title">${this.getTitle()}</h1>
          ${subtitle ? `<p class="page-subtitle">${subtitle}</p>` : ''}
        </div>
        <div class="actions-slot">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('ui-top-bar', UITopBar);

export { UITopBar };
