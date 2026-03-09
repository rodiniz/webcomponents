import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import { createEnumValidator } from '../../core/validators';
import themeStyles from '../../styles/theme.css?inline';

type LinkVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

@customElement('ui-link')
export class UILink extends UIComponentBase {
  static styles = [unsafeCSS(themeStyles)];

  private validateVariant = createEnumValidator<LinkVariant>(
    ['primary', 'secondary', 'ghost', 'danger'],
    'primary',
    'variant',
    'UILink'
  );
  private _variant: LinkVariant = 'primary';

  @property({ type: String, reflect: true })
  get variant(): LinkVariant { return this._variant; }
  set variant(value: LinkVariant) {
    const old = this._variant;
    this._variant = this.validateVariant(value);
    this.requestUpdate('variant', old);
  }

  @property({ type: String }) href: string = '#';
  @property({ type: String }) target: string = '';
  @property({ type: String }) rel: string = '';
  @property({ type: Boolean, reflect: true }) underline: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  private handleClick = (e: Event): void => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  render() {
    const classes = classMap({
      'link': true,
      [this.variant]: true,
      'underline': this.underline,
      'disabled': this.disabled
    });

    return html`
      <a
        part="link"
        class=${classes}
        href=${this.disabled ? '#' : this.href}
        target=${this.target}
        rel=${this.rel}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot></slot>
      </a>
    `;
  }
}

export type { LinkVariant };
