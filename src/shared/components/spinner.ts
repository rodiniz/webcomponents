import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerVariant = 'primary' | 'secondary' | 'success' | 'danger';

@customElement('ui-spinner')
export class UISpinner extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: String, reflect: true }) size: SpinnerSize = 'md';
  @property({ type: String, reflect: true }) variant: SpinnerVariant = 'primary';
  @property({ type: String }) label: string = 'Loading...';
  @property({ type: Boolean, reflect: true }) showLabel: boolean = true;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'spinner');
    super.connectedCallback();
  }

  render() {
    const classes = classMap({
      'spinner': true,
      [this.size]: true,
      [this.variant]: true
    });

    return html`
      <div class=${classes}>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      ${this.showLabel ? html`<div class="spinner-label">${this.label}</div>` : ''}
    `;
  }
}

export type { SpinnerSize, SpinnerVariant };
