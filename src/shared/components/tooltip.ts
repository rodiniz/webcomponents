import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipTrigger = 'hover' | 'click';

@customElement('ui-tooltip')
export class UITooltip extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: String }) text: string = '';
  @property({ type: String, reflect: true }) position: TooltipPosition = 'top';
  @property({ type: String, reflect: true }) trigger: TooltipTrigger = 'hover';
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @state() private isVisible: boolean = false;

  private triggerElement: HTMLElement | null = null;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'tooltip');
    super.connectedCallback();
  }

  protected firstUpdated(): void {
    this.triggerElement = this.parentElement;
    
    if (this.triggerElement && !this.disabled) {
      if (this.trigger === 'hover') {
        this.triggerElement.addEventListener('mouseenter', () => this.show());
        this.triggerElement.addEventListener('mouseleave', () => this.hide());
      } else if (this.trigger === 'click') {
        this.triggerElement.addEventListener('click', (e) => {
          e.stopPropagation();
          this.isVisible ? this.hide() : this.show();
        });
        document.addEventListener('click', () => this.hide());
      }
    }
  }

  private show(): void {
    if (!this.disabled) {
      this.isVisible = true;
    }
  }

  private hide(): void {
    this.isVisible = false;
  }

  render() {
    const classes = classMap({
      'tooltip': true,
      [this.position]: true,
      'visible': this.isVisible,
      'disabled': this.disabled
    });

    return html`
      <div class=${classes}>
        <div class="tooltip-content">${this.text}</div>
        <div class="tooltip-arrow"></div>
      </div>
    `;
  }
}

export type { TooltipPosition, TooltipTrigger };
