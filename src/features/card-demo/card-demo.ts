import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../shared/components/button';
import '../../shared/components/card';

@customElement('card-demo-page')
export class CardDemoPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .demo-section {
      margin-bottom: 48px;
    }

    .demo-section h2 {
      font: 600 24px/1.3 "Sora", system-ui, sans-serif;
      color: #0f172a;
      margin: 0 0 8px 0;
      letter-spacing: -0.02em;
    }

    .demo-section p {
      font: 400 14px/1.5 "Inter", system-ui, sans-serif;
      color: #6b7280;
      margin: 0 0 24px 0;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .card-grid ui-card {
      min-height: 220px;
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
      width: 100%;
    }
  `;

  render() {
    return html`
      <div class="demo-section">
        <h2>Card Component Demo</h2>
        <p>Cards composed with header, content, and footer slots.</p>
      </div>
      <div class="card-grid">
        <ui-card shadow elevation="sm">
          <div slot="header">
            <strong>Release summary</strong>
          </div>
          <div slot="content">
            <p>Track the latest UI and routing updates from the core library.</p>
          </div>
          <div slot="footer" class="card-actions">
            <ui-button variant="ghost">Dismiss</ui-button>
            <ui-button variant="primary">View notes</ui-button>
          </div>
        </ui-card>

        <ui-card variant="elevated" shadow elevation="md">
          <div slot="header">
            <strong>State overview</strong>
          </div>
          <div slot="content">
            <p>Signals keep local views responsive while the store handles global state.</p>
          </div>
          <div slot="footer" class="card-actions">
            <ui-button variant="primary">Open dashboard</ui-button>
          </div>
        </ui-card>

        <ui-card variant="bordered" shadow elevation="sm">
          <div slot="header">
            <strong>Component health</strong>
          </div>
          <div slot="content">
            <p>Accessibility checks and theme tokens are validated automatically.</p>
          </div>
          <div slot="footer" class="card-actions">
            <ui-button variant="ghost">Review</ui-button>
            <ui-button variant="primary">Run scan</ui-button>
          </div>
        </ui-card>
      </div>
    `;
  }
}
