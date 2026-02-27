import { BaseComponent } from '../../core/base-component';
import '../../shared/components/card';

class CardDemoPage extends BaseComponent {
  render(): void {
    this.shadowRoot!.innerHTML = `
      <style>
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
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card-content h3 {
          font: 600 18px/1.3 "Sora", system-ui, sans-serif;
          color: #0f172a;
          margin: 0;
        }

        .card-content p {
          font: 400 14px/1.6 "Inter", system-ui, sans-serif;
          color: #6b7280;
          margin: 0;
        }

        .tag {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 6px;
          font: 500 12px/1.4 "Inter", system-ui, sans-serif;
          background: #f0f9ff;
          color: #0284c7;
          border: 1px solid #bae6fd;
        }

        .tag.success {
          background: #f0fdf4;
          color: #15803d;
          border-color: #bbf7d0;
        }

        .tag.warning {
          background: #fef3c7;
          color: #ca8a04;
          border-color: #fde68a;
        }

        .tag.error {
          background: #fee2e2;
          color: #dc2626;
          border-color: #fecaca;
        }
      </style>

      <div class="demo-section">
        <h2>Card Component Demo</h2>
        <p>Flexible card component with customizable shadows, colors, and variants.</p>
      </div>

      <div class="demo-section">
        <h2>Default Cards</h2>
        <p>Standard card with minimal shadow.</p>
        <div class="card-grid">
          <ui-card shadow elevation="sm">
            <div class="card-content">
              <h3>Default Card</h3>
              <p>This is a default card with rounded corners and a subtle shadow.</p>
              <span class="tag">Default</span>
            </div>
          </ui-card>

          <ui-card shadow elevation="md">
            <div class="card-content">
              <h3>Medium Elevation</h3>
              <p>Card with medium elevation for more prominence.</p>
              <span class="tag success">Elevated</span>
            </div>
          </ui-card>

          <ui-card shadow elevation="lg">
            <div class="card-content">
              <h3>High Elevation</h3>
              <p>High elevation for important content that needs attention.</p>
              <span class="tag warning">Important</span>
            </div>
          </ui-card>
        </div>
      </div>

      <div class="demo-section">
        <h2>Card Variants</h2>
        <p>Different visual styles for various use cases.</p>
        <div class="card-grid">
          <ui-card variant="default" shadow elevation="sm">
            <div class="card-content">
              <h3>Default Variant</h3>
              <p>Standard card style with border and background.</p>
            </div>
          </ui-card>

          <ui-card variant="elevated" shadow elevation="md">
            <div class="card-content">
              <h3>Elevated Variant</h3>
              <p>Premium look with gradient background and glow effect on hover.</p>
            </div>
          </ui-card>

          <ui-card variant="bordered" shadow elevation="sm">
            <div class="card-content">
              <h3>Bordered Variant</h3>
              <p>Strong border for emphasis and structure.</p>
            </div>
          </ui-card>

          <ui-card variant="ghost">
            <div class="card-content">
              <h3>Ghost Variant</h3>
              <p>Subtle dashed border with transparent background.</p>
            </div>
          </ui-card>
        </div>
      </div>

      <div class="demo-section">
        <h2>Custom Shadow Colors</h2>
        <p>Cards with colored shadows for creative effects.</p>
        <div class="card-grid">
          <ui-card shadow shadow-color="99, 102, 241" elevation="lg">
            <div class="card-content">
              <h3>Blue Shadow</h3>
              <p>Card with a blue-tinted shadow for a cool, modern look.</p>
              <span class="tag">RGB: 99, 102, 241</span>
            </div>
          </ui-card>

          <ui-card shadow shadow-color="236, 72, 153" elevation="lg">
            <div class="card-content">
              <h3>Pink Shadow</h3>
              <p>Vibrant pink shadow creates an energetic, playful aesthetic.</p>
              <span class="tag error">RGB: 236, 72, 153</span>
            </div>
          </ui-card>

          <ui-card shadow shadow-color="16, 185, 129" elevation="lg">
            <div class="card-content">
              <h3>Green Shadow</h3>
              <p>Fresh green shadow perfect for success states and nature themes.</p>
              <span class="tag success">RGB: 16, 185, 129</span>
            </div>
          </ui-card>

          <ui-card shadow shadow-color="251, 146, 60" elevation="lg">
            <div class="card-content">
              <h3>Orange Shadow</h3>
              <p>Warm orange shadow adds energy and attention-grabbing appeal.</p>
              <span class="tag warning">RGB: 251, 146, 60</span>
            </div>
          </ui-card>
        </div>
      </div>

      <div class="demo-section">
        <h2>Rounded Options</h2>
        <p>Control corner radius with the rounded attribute.</p>
        <div class="card-grid">
          <ui-card rounded="true" shadow elevation="md">
            <div class="card-content">
              <h3>Rounded Card</h3>
              <p>Default rounded corners (16px radius) for a soft, friendly appearance.</p>
            </div>
          </ui-card>

          <ui-card rounded="false" shadow elevation="md">
            <div class="card-content">
              <h3>Square Card</h3>
              <p>Sharp corners for a modern, geometric aesthetic.</p>
            </div>
          </ui-card>
        </div>
      </div>

      <div class="demo-section">
        <h2>No Shadow</h2>
        <p>Cards without shadow for minimal designs.</p>
        <div class="card-grid">
          <ui-card>
            <div class="card-content">
              <h3>Flat Card</h3>
              <p>Minimal card with no shadow, perfect for clean, flat design systems.</p>
            </div>
          </ui-card>

          <ui-card rounded="false">
            <div class="card-content">
              <h3>Flat Square Card</h3>
              <p>Flat card with square corners for brutalist or industrial aesthetics.</p>
            </div>
          </ui-card>
        </div>
      </div>
    `;
  }
}

customElements.define('card-demo-page', CardDemoPage);
