import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import themeStyles from '../../styles/theme.css?inline';
import toastStyles from './toast.css?inline';
import { UIComponentBase } from '../../core/ui-component-base';
import { getIconSvg } from '../../core/icon-helpers';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ToastConfig {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
}

interface ToastItem {
  id: string;
  element: HTMLElement;
  timer?: number;
}

@customElement('ui-toast')
export class UIToast extends UIComponentBase {
  static styles = [unsafeCSS(themeStyles), unsafeCSS(toastStyles)];

  @property({ type: String }) position: ToastPosition = 'top-right';

  @state() private toasts: ToastItem[] = [];
  private toastCounter = 0;

  // connectedCallback handled by UIComponentBase

  // Icon rendering now handled by getIconSvg utility
  private getIcon(type: ToastType): string {
    const iconMap = {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'alert-triangle',
      info: 'info'
    };

    return getIconSvg(iconMap[type]);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  public show(config: ToastConfig): string {
    const {
      title,
      description = '',
      type = 'info',
      duration = 5000,
      closable = true
    } = config;

    const toastId = `toast-${++this.toastCounter}`;
    const icon = this.getIcon(type);

    const toastElement = document.createElement('div');
    toastElement.className = `toast ${type}`;
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'polite');

    toastElement.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${this.escapeHtml(title)}</div>
        ${description ? `<div class="toast-description">${this.escapeHtml(description)}</div>` : ''}
      </div>
      ${closable ? `
        <button class="toast-close" aria-label="Close notification">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      ` : ''}
      ${duration > 0 ? `
        <div class="toast-progress">
          <div class="toast-progress-bar" style="--duration: ${duration}ms"></div>
        </div>
      ` : ''}
    `;

    const container = this.shadowRoot?.querySelector('.toast-container');
    if (container) {
      container.appendChild(toastElement);
    }

    if (closable) {
      const closeBtn = toastElement.querySelector('.toast-close');
      closeBtn?.addEventListener('click', () => this.dismiss(toastId));
    }

    let timer: number | undefined;
    if (duration > 0) {
      timer = window.setTimeout(() => {
        this.dismiss(toastId);
      }, duration);
    }

    const toastItem: ToastItem = { id: toastId, element: toastElement, timer };
    this.toasts = [...this.toasts, toastItem];

    this.dispatchEvent(
      new CustomEvent('toast-show', {
        bubbles: true,
        composed: true,
        detail: { id: toastId, ...config }
      })
    );

    return toastId;
  }

  public dismiss(toastId: string): void {
    const toast = this.toasts.find(t => t.id === toastId);
    if (!toast) return;

    if (toast.timer) {
      clearTimeout(toast.timer);
    }

    toast.element.classList.add('closing');

    setTimeout(() => {
      toast.element.remove();
      this.toasts = this.toasts.filter(t => t.id !== toastId);

      this.dispatchEvent(
        new CustomEvent('toast-dismiss', {
          bubbles: true,
          composed: true,
          detail: { id: toastId }
        })
      );
    }, 300);
  }

  public dismissAll(): void {
    const toastIds = this.toasts.map(t => t.id);
    toastIds.forEach(id => this.dismiss(id));
  }

  public success(title: string, description?: string, duration?: number): string {
    return this.show({ title, description, type: 'success', duration });
  }

  public error(title: string, description?: string, duration?: number): string {
    return this.show({ title, description, type: 'error', duration });
  }

  public warning(title: string, description?: string, duration?: number): string {
    return this.show({ title, description, type: 'warning', duration });
  }

  public info(title: string, description?: string, duration?: number): string {
    return this.show({ title, description, type: 'info', duration });
  }

  render() {
    return html`
      <div class="toast-container ${this.position}"></div>
    `;
  }
}


