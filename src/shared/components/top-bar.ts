import { BaseComponent } from '../../core/base-component';
import { html, render } from 'lit-html';
import { styleMap } from '../../core/template';
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
    const title = this.getTitle();
    const subtitle = this.getSubtitle();
    const bgColor = this.getBgColor();

    const template = html`
      <style>
        ${themeStyles}
        ${topBarStyles}
      </style>
      <div class="top-bar" style=${styleMap({ 'background': bgColor })}>
        <div class="title-section">
          <h1 class="page-title">${title}</h1>
          ${subtitle ? html`<p class="page-subtitle">${subtitle}</p>` : ''}
        </div>
        <div class="actions-slot">
          <slot></slot>
        </div>
      </div>
    `;

    render(template, this.shadowRoot!);
  }
}

customElements.define('ui-top-bar', UITopBar);

export { UITopBar };
