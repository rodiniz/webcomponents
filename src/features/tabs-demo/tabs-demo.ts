import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../shared/components/tabs';

@customElement('tabs-demo')
export class TabsDemo extends LitElement {
  @state() private activeTab = 'details';
  @state() private showResult = false;

  static styles = css`
    h1 {
      font-size: 2rem;
      margin: 0 0 0.5rem;
      color: #0f172a;
    }

    .intro {
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

    .demo-section p {
      color: #64748b;
      line-height: 1.6;
    }

    .demo-section ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
      color: #64748b;
    }

    .demo-section li {
      margin-bottom: 0.25rem;
    }

    .result {
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      background: #f1f5f9;
      border-radius: 8px;
      font-size: 0.875rem;
      color: #64748b;
    }

    .result strong {
      color: #0f172a;
    }

    pre {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      overflow-x: auto;
    }
  `;

  private handleTabChange = (e: CustomEvent): void => {
    this.activeTab = e.detail.id;
    this.showResult = true;
  };

  render() {
    return html`
      <h1>Tabs Demo</h1>
      <p class="intro">A simple tabs component with slotted tabs and panels.</p>

      <div class="demo-section">
        <h2>Basic Tabs</h2>
        <ui-tabs id="basicTabs" active="overview" @tab-change=${this.handleTabChange}>
          <button slot="tab" data-tab="overview">Overview</button>
          <button slot="tab" data-tab="usage">Usage</button>
          <button slot="tab" data-tab="api">API</button>

          <div slot="panel" data-tab="overview">
            <p>Use tabs to group related content without navigating away.</p>
            <ul>
              <li>Accessible roles and ARIA labels</li>
              <li>Slotted tabs and panels</li>
              <li>Simple active state</li>
            </ul>
          </div>
          <div slot="panel" data-tab="usage">
            <p>Set the active tab by using the <code>active</code> attribute.</p>
            <pre><code>&lt;ui-tabs active="overview"&gt;...&lt;/ui-tabs&gt;</code></pre>
          </div>
          <div slot="panel" data-tab="api">
            <p>Listen for <code>tab-change</code> events to react to changes.</p>
          </div>
        </ui-tabs>
      </div>

      <div class="demo-section">
        <h2>Product Tabs</h2>
        <ui-tabs id="productTabs" active=${this.activeTab} @tab-change=${this.handleTabChange}>
          <button slot="tab" data-tab="details">Details</button>
          <button slot="tab" data-tab="specs">Specs</button>
          <button slot="tab" data-tab="shipping">Shipping</button>

          <div slot="panel" data-tab="details">
            <p><strong>Storm Speaker</strong> is built for portable, punchy sound.</p>
          </div>
          <div slot="panel" data-tab="specs">
            <ul>
              <li>Battery: 18 hours</li>
              <li>Water resistance: IPX5</li>
              <li>Bluetooth: 5.3</li>
            </ul>
          </div>
          <div slot="panel" data-tab="shipping">
            <p>Ships in 1-2 business days. Free returns within 30 days.</p>
          </div>
        </ui-tabs>
        ${this.showResult ? html`
          <div class="result">
            Active tab: <strong>${this.activeTab}</strong>
          </div>
        ` : ''}
      </div>
    `;
  }
}
