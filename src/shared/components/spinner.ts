import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import { createEnumValidator } from '../../core/validators';
import themeStyles from '../../styles/theme.css?inline';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerVariant = 'primary' | 'secondary' | 'success' | 'danger';

@customElement('ui-spinner')
export class UISpinner extends UIComponentBase {
  static styles = [unsafeCSS(themeStyles)];

  private validateSize = createEnumValidator<SpinnerSize>(['sm', 'md', 'lg'], 'md', 'size', 'UISpinner');
  private validateVariant = createEnumValidator<SpinnerVariant>(['primary', 'secondary', 'success', 'danger'], 'primary', 'variant', 'UISpinner');
  private _size: SpinnerSize = 'md';
  private _variant: SpinnerVariant = 'primary';

  @property({ type: String, reflect: true })
  get size(): SpinnerSize { return this._size; }
  set size(value: SpinnerSize) {
    const old = this._size;
    this._size = this.validateSize(value);
    this.requestUpdate('size', old);
  }

  @property({ type: String, reflect: true })
  get variant(): SpinnerVariant { return this._variant; }
  set variant(value: SpinnerVariant) {
    const old = this._variant;
    this._variant = this.validateVariant(value);
    this.requestUpdate('variant', old);
  }

  @property({ type: String }) label: string = 'Loading...';
  @property({ type: Boolean, reflect: true }) showLabel: boolean = true;

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
