import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../shared/components/button';
import '../../shared/components/modal';

@customElement('modal-demo-page')
export class ModalDemoPage extends LitElement {
  @state() private confirmResult = '';
  @state() private confirmColor = '';

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

    .demo-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .result-display {
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      background: #f1f5f9;
      border-radius: 8px;
      font-size: 0.875rem;
    }
  `;

  render() {
    return html`
      <div class="demo-container">
        <h1>Modal Component Demo</h1>
        <p>Interactive modals with various sizes and configurations.</p>

        <div class="demo-section">
          <h2>Basic Modals</h2>
          <div class="demo-controls">
            <ui-button variant="primary" @click=${() => (this.shadowRoot?.getElementById('basicModal') as any)?.open()}>
              Open Basic Modal
            </ui-button>
            <ui-button variant="secondary" @click=${() => (this.shadowRoot?.getElementById('smallModal') as any)?.open()}>
              Small Modal
            </ui-button>
            <ui-button variant="secondary" @click=${() => (this.shadowRoot?.getElementById('largeModal') as any)?.open()}>
              Large Modal
            </ui-button>
          </div>
        </div>

        <div class="demo-section">
          <h2>Modal Behaviors</h2>
          <div class="demo-controls">
            <ui-button variant="ghost" @click=${() => (this.shadowRoot?.getElementById('noEscapeModal') as any)?.open()}>
              No Close on Escape
            </ui-button>
            <ui-button variant="ghost" @click=${() => (this.shadowRoot?.getElementById('noBackdropModal') as any)?.open()}>
              No Close on Backdrop
            </ui-button>
          </div>
        </div>

        <div class="demo-section">
          <h2>Confirmation Modal</h2>
          <div class="demo-controls">
            <ui-button variant="primary" @click=${() => (this.shadowRoot?.getElementById('confirmModal') as any)?.open()}>
              Delete Item
            </ui-button>
          </div>
          ${this.confirmResult ? html`
            <div class="result-display" style="color: ${this.confirmColor}">
              <strong>Result:</strong> ${this.confirmResult}
            </div>
          ` : ''}
        </div>

        <ui-modal id="basicModal" title="Welcome!" size="md">
          <p>This is a basic modal with a title and content.</p>
          <p>You can close it by:</p>
          <ul>
            <li>Clicking the X button</li>
            <li>Pressing the Escape key</li>
            <li>Clicking outside the modal</li>
          </ul>
          <div slot="footer">
            <ui-button variant="secondary" @click=${() => (this.shadowRoot?.getElementById('basicModal') as any)?.close()}>Close</ui-button>
            <ui-button variant="primary" @click=${() => (this.shadowRoot?.getElementById('basicModal') as any)?.close()}>Got it!</ui-button>
          </div>
        </ui-modal>

        <ui-modal id="smallModal" title="Small Modal" size="sm">
          <p>This is a small modal perfect for quick messages or confirmations.</p>
          <div slot="footer">
            <ui-button variant="primary" @click=${() => (this.shadowRoot?.getElementById('smallModal') as any)?.close()}>Close</ui-button>
          </div>
        </ui-modal>

        <ui-modal id="largeModal" title="Large Modal" size="lg">
          <p>This is a large modal that can contain more content.</p>
          <div style="height: 400px; background: #f1f5f9; border-radius: 8px; padding: 1rem; margin: 1rem 0; overflow-y: auto;">
            <p><strong>Scrollable Content Area</strong></p>
            <p>When content exceeds the modal height, it automatically becomes scrollable.</p>
            ${Array(20).fill(html`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`)}
          </div>
          <div slot="footer">
            <ui-button variant="primary" @click=${() => (this.shadowRoot?.getElementById('largeModal') as any)?.close()}>Close</ui-button>
          </div>
        </ui-modal>

        <ui-modal id="noEscapeModal" title="No Escape Close" size="md" no-close-on-escape>
          <p>This modal cannot be closed by pressing the Escape key.</p>
          <p>You must click the close button or click outside.</p>
          <div slot="footer">
            <ui-button variant="primary" @click=${() => (this.shadowRoot?.getElementById('noEscapeModal') as any)?.close()}>Close</ui-button>
          </div>
        </ui-modal>

        <ui-modal id="noBackdropModal" title="No Backdrop Close" size="md" no-close-on-backdrop>
          <p>This modal cannot be closed by clicking the backdrop.</p>
          <p>You must use the close button or press Escape.</p>
          <div slot="footer">
            <ui-button variant="primary" @click=${() => (this.shadowRoot?.getElementById('noBackdropModal') as any)?.close()}>Close</ui-button>
          </div>
        </ui-modal>

        <ui-modal id="confirmModal" title="Confirm Delete" size="sm">
          <p>Are you sure you want to delete this item?</p>
          <p style="color: #ef4444; font-size: 0.875rem;">This action cannot be undone.</p>
          <div slot="footer">
            <ui-button variant="ghost" @click=${() => {
              (this.shadowRoot?.getElementById('confirmModal') as any)?.close();
              this.confirmResult = 'Cancelled';
              this.confirmColor = '#64748b';
            }}>Cancel</ui-button>
            <ui-button variant="primary" @click=${() => {
              (this.shadowRoot?.getElementById('confirmModal') as any)?.close();
              this.confirmResult = 'Item deleted!';
              this.confirmColor = '#ef4444';
            }}>Delete</ui-button>
          </div>
        </ui-modal>
      </div>
    `;
  }
}
