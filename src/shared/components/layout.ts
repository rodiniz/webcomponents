import { html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import { createEnumValidator } from '../../core/validators';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-layout')
export class UILayout extends UIComponentBase {
  static styles = [unsafeCSS(themeStyles)];

  private validateDirection = createEnumValidator<'horizontal' | 'vertical' | 'auto'>(
    ['horizontal', 'vertical', 'auto'],
    'auto',
    'direction',
    'UILayout'
  );
  private _direction: 'horizontal' | 'vertical' | 'auto' = 'auto';

  @property({ type: String })
  get direction(): 'horizontal' | 'vertical' | 'auto' { return this._direction; }
  set direction(value: 'horizontal' | 'vertical' | 'auto') {
    const old = this._direction;
    this._direction = this.validateDirection(value);
    this.requestUpdate('direction', old);
  }

  private detectDirection(): 'horizontal' | 'vertical' {
    if (this.direction !== 'auto') return this.direction;

    const hasHeader = this.querySelector('ui-layout-header');
    const hasFooter = this.querySelector('ui-layout-footer');
    const hasSidebar = this.querySelector('ui-layout-sidebar');

    if (hasSidebar) return 'horizontal';
    if (hasHeader || hasFooter) return 'vertical';

    return 'vertical';
  }

  render() {
    const flexDirection = this.detectDirection() === 'horizontal' ? 'row' : 'column';

    return html`
      <div class="layout-container" style=${styleMap({ 'flex-direction': flexDirection })}>
        <slot></slot>
      </div>
    `;
  }
}

@customElement('ui-layout-header')
export class UILayoutHeader extends UIComponentBase {
  static styles = css`
    :host {
      display: block;
      background: var(--color-header, hsl(var(--background)));
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      padding: 12px 24px;
    }
  `;
  render() {
    return html`<slot></slot>`;
  }
}

@customElement('ui-layout-main')
export class UILayoutMain extends UIComponentBase {
  static styles = css`
    :host { display: block; flex: 1; }
  `;
  render() {
    return html`<slot></slot>`;
  }
}
export { UILayoutMain as UILayoutContent };

@customElement('ui-layout-sidebar')
export class UILayoutSidebar extends UIComponentBase {
  static styles = css`
    :host {
      display: block;
      background: linear-gradient(180deg, var(--color-nav-bg, #1f2937) 0%, var(--color-nav-bg, #111827) 100%);
      color: rgba(255, 255, 255, 0.7);
      padding: 16px 12px;
      box-sizing: border-box;
    }
    ::slotted(.sidebar-section) {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    ::slotted(.sidebar-label) {
      font: 600 11px/1 "Inter", system-ui, sans-serif;
      color: rgba(255, 255, 255, 0.35);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 12px 8px 6px;
    }
    ::slotted(.sidebar-item) {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.7);
      font: 500 14px/1.4 "Inter", system-ui, sans-serif;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    ::slotted(.sidebar-item:hover) {
      background: rgba(255, 255, 255, 0.06);
      color: var(--color-nav-text, #ffffff);
    }
  `;
  render() {
    return html`<slot></slot>`;
  }
}

@customElement('ui-layout-footer')
export class UILayoutFooter extends UIComponentBase {
  static styles = css`
    :host {
      display: block;
      background: var(--color-footer, hsl(var(--background)));
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      padding: 12px 24px;
    }
  `;
  render() {
    return html`<slot></slot>`;
  }
}
