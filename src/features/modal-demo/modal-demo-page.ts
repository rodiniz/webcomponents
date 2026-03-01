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

  private getModal(id: string): any {
    return this.shadowRoot?.getElementById(id) || document.getElementById(id);
  }

  render() {
    return html`
      <div class="demo-container">
        <h1>Modal Component Demo</h1>
        <p>Interactive modals with various sizes and configurations.</p>

        <div class="demo-section">
          <h2>Basic Modals</h2>
          <div class="demo-controls">
            <ui-button variant="primary" @click=${() => this.getModal('basicModal')?.open()}>
              Open Basic Modal
            </ui-button>
            <ui-button variant="secondary" @click=${() => this.getModal('smallModal')?.open()}>
              Small Modal
            </ui-button>
            <ui-button variant="secondary" @click=${() => this.getModal('largeModal')?.open()}>
              Large Modal
            </ui-button>
          </div>
        </div>

        <div class="demo-section">
          <h2>Modal Behaviors</h2>
          <div class="demo-controls">
            <ui-button variant="ghost" @click=${() => this.getModal('noEscapeModal')?.open()}>
              No Close on Escape
            </ui-button>
            <ui-button variant="ghost" @click=${() => this.getModal('noBackdropModal')?.open()}>
              No Close on Backdrop
            </ui-button>
          </div>
        </div>

        <div class="demo-section">
          <h2>Confirmation Modal</h2>
          <div class="demo-controls">
            <ui-button variant="primary" @click=${() => this.getModal('confirmModal')?.open()}>
              Delete Item
            </ui-button>
          </div>
          ${this.confirmResult ? html`
            <div class="result-display" style="color: ${this.confirmColor}">
              <strong>Result:</strong> ${this.confirmResult}
            </div>
          ` : ''}
        </div>

        <ui-modal id="basicModal" title="Premium Feature Unlocked" size="md">
          <div class="demo-modal-hero">
            <div class="demo-modal-hero-content">
              <div class="demo-modal-hero-icon">⚡</div>
              <div class="demo-modal-hero-title">Experience Velocity</div>
              <div class="demo-modal-hero-subtitle">v2.0 UI Framework Integration</div>
            </div>
          </div>
          
          <div class="demo-modal-body-text">
            Experience the next generation of UI design with our premium web components. Precision-engineered for performance and aesthetics.
          </div>

          <div class="demo-modal-grid">
            <div class="demo-modal-card">
              <div class="demo-modal-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div class="demo-modal-card-title">Layered Design</div>
            </div>
            <div class="demo-modal-card">
              <div class="demo-modal-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              </div>
              <div class="demo-modal-card-title">Real-time Data</div>
            </div>
          </div>

          <div slot="footer">
            <ui-button variant="secondary" @click=${() => this.getModal('basicModal')?.close()}>Maybe Later</ui-button>
            <ui-button variant="primary" @click=${() => this.getModal('basicModal')?.close()}>Get Started</ui-button>
          </div>
        </ui-modal>

        <ui-modal id="smallModal" title="Quick Notification" size="sm">
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; padding: 1rem 0;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: #dcfce7; color: #166534; display: flex; align-items: center; justify-content: center;">
              <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.1rem;">Changes Saved</h3>
              <p style="margin: 0.5rem 0 0; color: #64748b;">Your preferences have been updated successfully.</p>
            </div>
          </div>
          <div slot="footer">
            <ui-button variant="primary" style="width: 100%;" @click=${() => this.getModal('smallModal')?.close()}>Awesome!</ui-button>
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
            <ui-button variant="primary" @click=${() => this.getModal('largeModal')?.close()}>Close</ui-button>
          </div>
        </ui-modal>

        <ui-modal id="noEscapeModal" title="No Escape Close" size="md" no-close-on-escape>
          <p>This modal cannot be closed by pressing the Escape key.</p>
          <p>You must click the close button or click outside.</p>
          <div slot="footer">
            <ui-button variant="primary" @click=${() => this.getModal('noEscapeModal')?.close()}>Close</ui-button>
          </div>
        </ui-modal>

        <ui-modal id="noBackdropModal" title="No Backdrop Close" size="md" no-close-on-backdrop>
          <p>This modal cannot be closed by clicking the backdrop.</p>
          <p>You must use the close button or press Escape.</p>
          <div slot="footer">
            <ui-button variant="primary" @click=${() => this.getModal('noBackdropModal')?.close()}>Close</ui-button>
          </div>
        </ui-modal>

        <ui-modal id="confirmModal" title="Confirm Delete" size="sm">
          <p>Are you sure you want to delete this item?</p>
          <p style="color: #ef4444; font-size: 0.875rem;">This action cannot be undone.</p>
          <div slot="footer">
            <ui-button variant="ghost" @click=${() => {
        this.getModal('confirmModal')?.close();
        this.confirmResult = 'Cancelled';
        this.confirmColor = '#64748b';
      }}>Cancel</ui-button>
            <ui-button variant="primary" @click=${() => {
        this.getModal('confirmModal')?.close();
        this.confirmResult = 'Item deleted!';
        this.confirmColor = '#ef4444';
      }}>Delete</ui-button>
          </div>
        </ui-modal>
      </div>
    `;
  }
}
