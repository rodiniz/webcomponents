import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import '../../shared/components/button';
import '../../shared/components/toast';
import type { UIToast } from '../../shared/components/toast';

@customElement('toast-demo-page')
export class ToastDemoPage extends LitElement {
  @state() private position = 'top-right';
  @query('#toastContainer') toastContainer!: UIToast;

  static styles = css`
    .demo-container {
      padding: 2rem;
      max-width: 900px;
    }

    h1 {
      font-size: 2rem;
      margin: 0 0 0.5rem;
      color: #0f172a;
    }

    p {
      color: #64748b;
      margin-bottom: 2rem;
    }

    .demo-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
    }

    .demo-section h2 {
      margin: 0 0 1rem;
      font-size: 1.25rem;
      color: #0f172a;
    }

    .demo-hint {
      color: #64748b;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .demo-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .position-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 0.5rem;
    }

    .current-position {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #f1f5f9;
      border-radius: 8px;
      font-size: 0.875rem;
      color: #64748b;
    }

    .current-position strong {
      color: #0f172a;
    }
  `;

  private showSuccessDesc(): void {
    this.toastContainer?.success(
      'Changes saved!',
      'Your document has been successfully saved to the cloud.',
      5000
    );
  }

  private showErrorDesc(): void {
    this.toastContainer?.error(
      'Failed to connect',
      'Unable to reach the server. Please check your internet connection.',
      5000
    );
  }

  private showWarningDesc(): void {
    this.toastContainer?.warning(
      'Storage almost full',
      'You have used 95% of your available storage space.',
      5000
    );
  }

  private showQuick(): void {
    this.toastContainer?.info('Quick notification', 'This will disappear in 2 seconds', 2000);
  }

  private showNormal(): void {
    this.toastContainer?.info('Normal duration', 'This will disappear in 5 seconds', 5000);
  }

  private showLong(): void {
    this.toastContainer?.info('Long duration', 'This will disappear in 10 seconds', 10000);
  }

  private showPersistent(): void {
    this.toastContainer?.info(
      'Persistent notification',
      'This will stay until you close it manually',
      0
    );
  }

  private updatePosition(position: string): void {
    this.position = position;
    this.toastContainer?.setAttribute('position', position);
    this.toastContainer?.info('Position changed', `Toast position is now ${position}`, 3000);
  }

  private showMultiple(): void {
    setTimeout(() => this.toastContainer?.success('First notification', 'This is the first toast'), 0);
    setTimeout(() => this.toastContainer?.info('Second notification', 'This is the second toast'), 200);
    setTimeout(() => this.toastContainer?.warning('Third notification', 'This is the third toast'), 400);
    setTimeout(() => this.toastContainer?.error('Fourth notification', 'This is the fourth toast'), 600);
  }

  private dismissAll(): void {
    this.toastContainer?.dismissAll();
  }

  render() {
    return html`
      <div class="demo-container">
        <h1>Toast Component Demo</h1>
        <p>Elegant notification system with smooth animations and glassmorphic design.</p>

        <div class="demo-section">
          <h2>With Descriptions</h2>
          <div class="demo-controls">
            <ui-button variant="primary" @click=${this.showSuccessDesc}>
              Success with Details
            </ui-button>
            <ui-button variant="danger" @click=${this.showErrorDesc}>
              Error with Details
            </ui-button>
            <ui-button variant="secondary" @click=${this.showWarningDesc}>
              Warning with Details
            </ui-button>
          </div>
        </div>

        <div class="demo-section">
          <h2>Duration Options</h2>
          <div class="demo-controls">
            <ui-button variant="ghost" @click=${this.showQuick}>
              Quick (2s)
            </ui-button>
            <ui-button variant="ghost" @click=${this.showNormal}>
              Normal (5s)
            </ui-button>
            <ui-button variant="ghost" @click=${this.showLong}>
              Long (10s)
            </ui-button>
            <ui-button variant="ghost" @click=${this.showPersistent}>
              Persistent (No auto-dismiss)
            </ui-button>
          </div>
        </div>

        <div class="demo-section">
          <h2>Position Control</h2>
          <p class="demo-hint">Change toast container position</p>
          <div class="demo-controls position-grid">
            <ui-button variant="ghost" size="sm" @click=${() => this.updatePosition('top-left')}>
              Top Left
            </ui-button>
            <ui-button variant="ghost" size="sm" @click=${() => this.updatePosition('top-center')}>
              Top Center
            </ui-button>
            <ui-button variant="ghost" size="sm" @click=${() => this.updatePosition('top-right')}>
              Top Right
            </ui-button>
            <ui-button variant="ghost" size="sm" @click=${() => this.updatePosition('bottom-left')}>
              Bottom Left
            </ui-button>
            <ui-button variant="ghost" size="sm" @click=${() => this.updatePosition('bottom-center')}>
              Bottom Center
            </ui-button>
            <ui-button variant="ghost" size="sm" @click=${() => this.updatePosition('bottom-right')}>
              Bottom Right
            </ui-button>
          </div>
        </div>

        <div class="demo-section">
          <h2>Multiple Toasts</h2>
          <div class="demo-controls">
            <ui-button variant="primary" @click=${this.showMultiple}>
              Show Multiple Toasts
            </ui-button>
            <ui-button variant="danger" @click=${this.dismissAll}>
              Dismiss All
            </ui-button>
          </div>
        </div>

        <div class="current-position">
          Current position: <strong>${this.position}</strong>
        </div>
      </div>

      <ui-toast id="toastContainer" position=${this.position}></ui-toast>
    `;
  }
}
