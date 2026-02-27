import { BaseComponent } from '../../core/base-component';
import themeStyles from '../../styles/theme.css?inline';
import toastStyles from './toast.css?inline';
import feather from 'feather-icons';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

interface ToastConfig {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number; // milliseconds, 0 = no auto-dismiss
  closable?: boolean;
}

class UIToast extends BaseComponent {
  private toasts: Map<string, { element: HTMLElement; timer?: number }> = new Map();
  private toastCounter = 0;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'toast');
    super.connectedCallback();
  }

  static get observedAttributes(): string[] {
    return ['position'];
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private getPosition(): ToastPosition {
    const value = this.getAttribute('position');
    if (
      value === 'top-left' ||
      value === 'bottom-right' ||
      value === 'bottom-left' ||
      value === 'top-center' ||
      value === 'bottom-center'
    ) {
      return value;
    }
    return 'top-right';
  }

  private getIcon(type: ToastType): string {
    const iconMap = {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'alert-triangle',
      info: 'info'
    };

    const iconName = iconMap[type];
    return feather.icons[iconName as keyof typeof feather.icons]?.toSvg() || '';
  }

  /**
   * Show a toast notification
   * @param config Toast configuration
   * @returns Toast ID for manual dismissal
   */
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

    const container = this.shadowRoot!.querySelector('.toast-container');
    if (container) {
      container.appendChild(toastElement);
    }

    // Setup close button
    if (closable) {
      const closeBtn = toastElement.querySelector('.toast-close');
      closeBtn?.addEventListener('click', () => this.dismiss(toastId));
    }

    // Auto-dismiss
    let timer: number | undefined;
    if (duration > 0) {
      timer = window.setTimeout(() => {
        this.dismiss(toastId);
      }, duration);
    }

    this.toasts.set(toastId, { element: toastElement, timer });

    // Dispatch event
    this.dispatchEvent(
      new CustomEvent('toast-show', {
        bubbles: true,
        composed: true,
        detail: { id: toastId, ...config }
      })
    );

    return toastId;
  }

  /**
   * Dismiss a specific toast
   */
  public dismiss(toastId: string): void {
    const toast = this.toasts.get(toastId);
    if (!toast) return;

    // Clear timer if exists
    if (toast.timer) {
      clearTimeout(toast.timer);
    }

    // Add closing animation
    toast.element.classList.add('closing');

    // Remove after animation
    setTimeout(() => {
      toast.element.remove();
      this.toasts.delete(toastId);

      this.dispatchEvent(
        new CustomEvent('toast-dismiss', {
          bubbles: true,
          composed: true,
          detail: { id: toastId }
        })
      );
    }, 300);
  }

  /**
   * Dismiss all toasts
   */
  public dismissAll(): void {
    const toastIds = Array.from(this.toasts.keys());
    toastIds.forEach(id => this.dismiss(id));
  }

  /**
   * Convenience methods for different toast types
   */
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

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  render(): void {
    const position = this.getPosition();

    this.shadowRoot!.innerHTML = `
      <style>
        ${themeStyles}
        ${toastStyles}
      </style>
      <div class="toast-container ${position}"></div>
    `;
  }
}

customElements.define('ui-toast', UIToast);

export { UIToast };
export type { ToastType, ToastPosition, ToastConfig };
