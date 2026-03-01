import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
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
      min-height: 140px;
    }
  `;

  render() {
    return html`
      <div class="demo-section">
        <h2>Card Component Demo</h2>
        <p>Flexible card component with customizable shadows, colors, and variants.</p>
      </div>

      <div class="demo-section">
        <h2>Default Cards</h2>
        <p>Standard card with minimal shadow.</p>
        <div class="card-grid">
          <ui-card shadow elevation="sm">
            <h3>Default Card</h3>
            <p>This is a default card with rounded corners and a subtle shadow.</p>
          </ui-card>

          <ui-card shadow elevation="md">
            <h3>Medium Elevation</h3>
            <p>Card with medium elevation for more prominence.</p>
          </ui-card>

          <ui-card shadow elevation="lg">
            <h3>High Elevation</h3>
            <p>High elevation for important content that needs attention.</p>
          </ui-card>
        </div>
      </div>

      <div class="demo-section">
        <h2>Card Variants</h2>
        <p>Different visual styles for various use cases.</p>
        <div class="card-grid">
          <ui-card variant="default" shadow elevation="sm">
            <h3>Default Variant</h3>
            <p>Standard card style with border and background.</p>
          </ui-card>

          <ui-card variant="elevated" shadow elevation="md">
            <h3>Elevated Variant</h3>
            <p>Premium look with gradient background and glow effect on hover.</p>
          </ui-card>

          <ui-card variant="bordered" shadow elevation="sm">
            <h3>Bordered Variant</h3>
            <p>Strong border for emphasis and structure.</p>
          </ui-card>

          <ui-card variant="ghost">
            <h3>Ghost Variant</h3>
            <p>Subtle dashed border with transparent background.</p>
          </ui-card>
        </div>
      </div>

      <div class="demo-section">
        <h2>Custom Shadow Colors</h2>
        <p>Cards with colored shadows for creative effects.</p>
        <div class="card-grid">
          <ui-card shadow shadow-color="99, 102, 241" elevation="lg">
            <h3>Blue Shadow</h3>
            <p>Card with a blue-tinted shadow for a cool, modern look.</p>
          </ui-card>

          <ui-card shadow shadow-color="236, 72, 153" elevation="lg">
            <h3>Pink Shadow</h3>
            <p>Vibrant pink shadow creates an energetic, playful aesthetic.</p>
          </ui-card>

          <ui-card shadow shadow-color="16, 185, 129" elevation="lg">
            <h3>Green Shadow</h3>
            <p>Fresh green shadow perfect for success states and nature themes.</p>
          </ui-card>

          <ui-card shadow shadow-color="251, 146, 60" elevation="lg">
            <h3>Orange Shadow</h3>
            <p>Warm orange shadow adds energy and attention-grabbing appeal.</p>
          </ui-card>
        </div>
      </div>
      <div class="demo-section">
        <h2>No Shadow</h2>
        <p>Cards without shadow for minimal designs.</p>
        <div class="card-grid">
          <ui-card>
            <h3>Flat Card</h3>
            <p>Minimal card with no shadow, perfect for clean, flat design systems.</p>
          </ui-card>

          <ui-card rounded="false">
            <h3>Flat Square Card</h3>
            <p>Flat card with square corners for brutalist or industrial aesthetics.</p>
          </ui-card>
        </div>
      </div>      

      <div class="demo-section">
        <h2>Color Palette</h2>
        <p>Full color spectrum available for custom theming.</p>
        <div class="card-grid">
          <ui-card bg="secondary" shadow elevation="sm">
            <h3>Secondary</h3>
            <p>Complementary accent color.</p>
          </ui-card>

          <ui-card bg="indigo" shadow elevation="sm">
            <h3>Indigo</h3>
            <p>Deep blue-purple accent.</p>
          </ui-card>

          <ui-card bg="violet" shadow elevation="sm">
            <h3>Violet</h3>
            <p>Rich purple tones.</p>
          </ui-card>

          <ui-card bg="pink" shadow elevation="sm">
            <h3>Pink</h3>
            <p>Playful pink accent.</p>
          </ui-card>

          <ui-card bg="rose" shadow elevation="sm">
            <h3>Rose</h3>
            <p>Vibrant red-pink.</p>
          </ui-card>

          <ui-card bg="fuchsia" shadow elevation="sm">
            <h3>Fuchsia</h3>
            <p>Bold magenta tones.</p>
          </ui-card>

          <ui-card bg="cyan" shadow elevation="sm">
            <h3>Cyan</h3>
            <p>Cool blue-green accent.</p>
          </ui-card>

          <ui-card bg="emerald" shadow elevation="sm">
            <h3>Emerald</h3>
            <p>Rich green tones.</p>
          </ui-card>

          <ui-card bg="lime" shadow elevation="sm">
            <h3>Lime</h3>
            <p>Fresh green-yellow accent.</p>
          </ui-card>

          <ui-card bg="amber" shadow elevation="sm">
            <h3>Amber</h3>
            <p>Warm golden tones.</p>
          </ui-card>

          <ui-card bg="orange" shadow elevation="sm">
            <h3>Orange</h3>
            <p>Energetic orange accent.</p>
          </ui-card>

          <ui-card bg="blue" shadow elevation="sm">
            <h3>Blue</h3>
            <p>Classic blue accent.</p>
          </ui-card>
        </div>
      </div>
    `;
  }
}
