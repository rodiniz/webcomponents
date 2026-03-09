import { html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import { createEnumValidator } from '../../core/validators';
import themeStyles from '../../styles/theme.css?inline';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipTrigger = 'hover' | 'click';

@customElement('ui-tooltip')
export class UITooltip extends UIComponentBase {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: String }) text: string = '';
  private validatePosition = createEnumValidator<TooltipPosition>(['top', 'bottom', 'left', 'right'], 'top', 'position', 'UITooltip');
  private validateTrigger = createEnumValidator<TooltipTrigger>(['hover', 'click'], 'hover', 'trigger', 'UITooltip');
  private _position: TooltipPosition = 'top';
  private _trigger: TooltipTrigger = 'hover';

  @property({ type: String, reflect: true })
  get position(): TooltipPosition { return this._position; }
  set position(value: TooltipPosition) {
    const old = this._position;
    this._position = this.validatePosition(value);
    this.requestUpdate('position', old);
  }

  @property({ type: String, reflect: true })
  get trigger(): TooltipTrigger { return this._trigger; }
  set trigger(value: TooltipTrigger) {
    const old = this._trigger;
    this._trigger = this.validateTrigger(value);
    this.requestUpdate('trigger', old);
  }

  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @state() private isVisible: boolean = false;

  private triggerElement: HTMLElement | null = null;
  private onMouseEnter = (): void => this.show();
  private onMouseLeave = (): void => this.hide();
  private onTriggerClick = (e: Event): void => {
    e.stopPropagation();
    this.isVisible ? this.hide() : this.show();
  };
  private onDocumentClick = (): void => this.hide();

  protected firstUpdated(): void {
    this.triggerElement = this.parentElement;
    this.attachTriggerListeners();
  }

  disconnectedCallback(): void {
    this.detachTriggerListeners();
    super.disconnectedCallback();
  }

  private attachTriggerListeners(): void {
    if (!this.triggerElement || this.disabled) return;

    if (this.trigger === 'hover') {
      this.triggerElement.addEventListener('mouseenter', this.onMouseEnter);
      this.triggerElement.addEventListener('mouseleave', this.onMouseLeave);
      return;
    }

    this.triggerElement.addEventListener('click', this.onTriggerClick);
    document.addEventListener('click', this.onDocumentClick);
  }

  private detachTriggerListeners(): void {
    if (!this.triggerElement) return;

    this.triggerElement.removeEventListener('mouseenter', this.onMouseEnter);
    this.triggerElement.removeEventListener('mouseleave', this.onMouseLeave);
    this.triggerElement.removeEventListener('click', this.onTriggerClick);
    document.removeEventListener('click', this.onDocumentClick);
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
