import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../shared/components/button';

@customElement('button-demo')
export class ButtonDemo extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: #0f172a;
    }

    h1 {
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    h2 {
      font-size: 1.4rem;
      margin: 2rem 0 1.5rem;
      font-weight: 600;
      border-bottom: 2px solid #24ec71;
      padding-bottom: 0.5rem;
    }

    p {
      line-height: 1.6;
      color: rgba(15, 23, 42, 0.75);
      margin: 0 0 1rem;
    }

    .demo-intro {
      background: linear-gradient(135deg, rgba(36, 236, 113, 0.08) 0%, rgba(52, 168, 235, 0.05) 100%);
      padding: 1.5rem;
      border-radius: 12px;
      border-left: 4px solid #24ec71;
      margin-bottom: 2rem;
    }

    .demo-section {
      margin-bottom: 3rem;
    }

    .button-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .button-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 1.5rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      text-align: center;
      transition: all 0.2s ease;
    }

    .button-item:hover {
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
      border-color: #cbd5e1;
    }

    .label {
      font-size: 0.8rem;
      color: rgba(15, 23, 42, 0.6);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    @media (max-width: 768px) {
      .button-group {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1rem;
      }

      .button-item {
        padding: 1rem;
      }

      h1 {
        font-size: 1.8rem;
      }

      h2 {
        font-size: 1.2rem;
      }
    }
  `;

  render() {
    return html`
      <h1>🔘 Button Component Demo</h1>

      <div class="demo-intro">
        <p>A flexible button component with multiple variants, sizes, and icon support.</p>
      </div>

      <div class="demo-section">
        <h2>Variants</h2>
        <div class="button-group">
          <div class="button-item">
            <ui-button variant="primary">Primary</ui-button>
            <span class="label">primary</span>
          </div>
          <div class="button-item">
            <ui-button variant="secondary">Secondary</ui-button>
            <span class="label">secondary</span>
          </div>
          <div class="button-item">
            <ui-button variant="ghost">Ghost</ui-button>
            <span class="label">ghost</span>
          </div>
          <div class="button-item">
            <ui-button variant="danger">Danger</ui-button>
            <span class="label">danger</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h2>Sizes</h2>
        <div class="button-group">
          <div class="button-item">
            <ui-button size="sm">Small</ui-button>
            <span class="label">size="sm"</span>
          </div>
          <div class="button-item">
            <ui-button size="md">Medium</ui-button>
            <span class="label">size="md" (default)</span>
          </div>
          <div class="button-item">
            <ui-button size="lg">Large</ui-button>
            <span class="label">size="lg"</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h2>With Icons</h2>
        <div class="button-group">
          <div class="button-item">
            <ui-button icon="check">Save</ui-button>
            <span class="label">icon="check"</span>
          </div>
          <div class="button-item">
            <ui-button icon="trash-2" variant="danger">Delete</ui-button>
            <span class="label">icon="trash-2"</span>
          </div>
          <div class="button-item">
            <ui-button icon="arrow-right" icon-position="right">Next</ui-button>
            <span class="label">icon-position="right"</span>
          </div>
          <div class="button-item">
            <ui-button icon="download">Download</ui-button>
            <span class="label">icon with text</span>
          </div>
           <div class="button-item">
            <ui-button icon="download"></ui-button>
            <span class="label">icon only</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h2>States</h2>
        <div class="button-group">
          <div class="button-item">
            <ui-button variant="primary">Active</ui-button>
            <span class="label">default state</span>
          </div>
          <div class="button-item">
            <ui-button variant="primary" disabled>Disabled</ui-button>
            <span class="label">disabled</span>
          </div>
          <div class="button-item">
            <ui-button variant="secondary" disabled>Disabled</ui-button>
            <span class="label">disabled (secondary)</span>
          </div>
        </div>
      </div>          
    `;
  }
}
