import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';

type LinkVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

@customElement('ui-link')
export class UILink extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: String, reflect: true }) variant: LinkVariant = 'primary';
  @property({ type: String }) href: string = '#';
  @property({ type: String }) target: string = '';
  @property({ type: String }) rel: string = '';
  @property({ type: Boolean, reflect: true }) underline: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'link');
    super.connectedCallback();
  }

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
