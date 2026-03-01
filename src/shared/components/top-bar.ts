import { LitElement, html, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';
import topBarStyles from './top-bar.css?inline';

@customElement('ui-top-bar')
export class UITopBar extends LitElement {
  static styles = [unsafeCSS(themeStyles), unsafeCSS(topBarStyles)];

  @property({ type: String }) title: string = 'Dashboard';
  @property({ type: String }) subtitle: string = '';
  @property({ type: String, attribute: 'bg-color' }) bgColor: string = '';

  connectedCallback(): void {
    this.setAttribute('data-ui', 'top-bar');
    super.connectedCallback();
  }

  render() {
    const barStyle = this.bgColor ? styleMap({ background: this.bgColor }) : nothing;
    return html`
      <div class="top-bar" style=${barStyle}>
        <div class="title-section">
          <h1 class="page-title">${this.title}</h1>
          ${this.subtitle ? html`<p class="page-subtitle">${this.subtitle}</p>` : nothing}
        </div>
        <div class="actions-slot">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
