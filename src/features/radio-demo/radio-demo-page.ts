import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../shared/components/radio';
import '../../shared/components/radio-group';
import type { RadioOption } from '../../shared/components/radio-group';

const planOptions: RadioOption[] = [
    { value: 'hobby', label: 'Hobby', description: 'For personal projects and experimentation.' },
    { value: 'pro', label: 'Pro', description: 'Unlocks analytics, custom domains, and priority support.' },
    { value: 'enterprise', label: 'Enterprise', description: 'SSO, audit logs, and a dedicated SLA.' },
];

const regionOptions: RadioOption[] = [
    { value: 'us-east', label: 'US East', description: 'Virginia · < 20 ms' },
    { value: 'eu-west', label: 'EU West', description: 'Frankfurt · < 25 ms' },
    { value: 'ap-south', label: 'AP South', description: 'Singapore · < 40 ms' },
    { value: 'au', label: 'Australia', description: 'Sydney · < 55 ms', disabled: true },
];

const notifOptions: RadioOption[] = [
    { value: 'all', label: 'All activity' },
    { value: 'mentions', label: 'Mentions only' },
    { value: 'none', label: 'None' },
];

const roleOptions: RadioOption[] = [
    { value: 'viewer', label: 'Viewer' },
    { value: 'editor', label: 'Editor' },
    { value: 'admin', label: 'Admin' },
];

@customElement('radio-demo-page')
export class RadioDemoPage extends LitElement {
    @state() private selectedPlan: string = 'pro';
    @state() private selectedRegion: string = 'us-east';
    @state() private selectedNotif: string = 'mentions';
    @state() private selectedRole: string = 'editor';
    @state() private standalone: string = '';

    static styles = css`
    :host {
      display: block;
      font-family: "Inter", system-ui, sans-serif;
    }

    /* ── Hero ───────────────────────────────── */
    .hero {
      padding: 3rem 2rem;
      background: linear-gradient(135deg,
        color-mix(in srgb, var(--color-primary, #24ec71) 8%, transparent) 0%,
        color-mix(in srgb, #818cf8 5%, transparent) 100%);
      border-radius: 16px;
      margin-bottom: 2.5rem;
    }

    .eyebrow {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #64748b;
      margin: 0 0 0.5rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin: 0 0 0.5rem;
      color: #0f172a;
    }

    .hero-sub {
      color: #64748b;
      font-size: 1.05rem;
      margin: 0;
    }

    /* ── Layout ─────────────────────────────── */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    /* ── Section titles ─────────────────────── */
    .section-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.35rem;
    }

    .section-sub {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0 0 1.25rem;
    }

    /* ── Cards ──────────────────────────────── */
    .card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 1.75rem;
    }

    /* ── Event log ──────────────────────────── */
    .event-log {
      background: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 1rem 1.25rem;
      font-family: "Fira Code", "Cascadia Code", monospace;
      font-size: 0.8125rem;
      color: #475569;
      margin-top: 1.25rem;
      line-height: 1.6;
    }

    .event-log span {
      color: #0f172a;
      font-weight: 600;
    }

    /* ── Dividers ───────────────────────────── */
    .full {
      margin-bottom: 1.5rem;
    }
  `;

    private logEntry(label: string, val: string): string {
        return `group-change → { label: "${label}", value: "${val}" }`;
    }

    render() {
        return html`
      <!-- Hero -->
      <header class="hero">
        <p class="eyebrow">Forms · Selection</p>
        <h1>Radio</h1>
        <p class="hero-sub">Single-selection control for mutually exclusive choices — with card, inline, and list variants.</p>
      </header>

      <!-- Row 1: Card variant + Standard list -->
      <div class="grid">
        <!-- Card variant -->
        <div class="card">
          <h2 class="section-title">Card variant</h2>
          <p class="section-sub">Each option is a tappable card. Great for plan or tier selection.</p>
          <ui-radio-group
            label="Choose your plan"
            name="plan"
            variant="card"
            .options=${planOptions}
            .value=${this.selectedPlan}
            @group-change=${(e: CustomEvent) => { this.selectedPlan = e.detail.value; }}
          ></ui-radio-group>
          <div class="event-log">→ selected: <span>${this.selectedPlan}</span></div>
        </div>

        <!-- Standard vertical list -->
        <div class="card">
          <h2 class="section-title">Default list</h2>
          <p class="section-sub">Classic radio list with label and description per option.</p>
          <ui-radio-group
            label="Deployment region"
            name="region"
            .options=${regionOptions}
            .value=${this.selectedRegion}
            @group-change=${(e: CustomEvent) => { this.selectedRegion = e.detail.value; }}
          ></ui-radio-group>
          <div class="event-log">→ selected: <span>${this.selectedRegion}</span></div>
        </div>
      </div>

      <!-- Row 2: Horizontal inline + Sizes -->
      <div class="grid">
        <!-- Horizontal -->
        <div class="card">
          <h2 class="section-title">Horizontal layout</h2>
          <p class="section-sub">Use <code>orientation="horizontal"</code> for compact inline groups.</p>
          <ui-radio-group
            label="Notifications"
            name="notif"
            orientation="horizontal"
            .options=${notifOptions}
            .value=${this.selectedNotif}
            @group-change=${(e: CustomEvent) => { this.selectedNotif = e.detail.value; }}
          ></ui-radio-group>
          <div class="event-log">→ selected: <span>${this.selectedNotif}</span></div>
          <br/>
          <ui-radio-group
            label="Role"
            name="role"
            orientation="horizontal"
            size="sm"
            .options=${roleOptions}
            .value=${this.selectedRole}
            @group-change=${(e: CustomEvent) => { this.selectedRole = e.detail.value; }}
          ></ui-radio-group>
          <div class="event-log">→ selected: <span>${this.selectedRole}</span></div>
        </div>

        <!-- Sizes -->
        <div class="card">
          <h2 class="section-title">Size variants</h2>
          <p class="section-sub">Three sizes — <code>sm</code>, <code>md</code> (default), <code>lg</code>.</p>

          <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.5rem;">Small</p>
          <ui-radio name="size-demo" value="sm" label="Small radio" size="sm"
            ?checked=${this.standalone === 'sm'}
            @radio-change=${() => { this.standalone = 'sm'; }}></ui-radio>

          <p style="font-size:0.8rem;color:#64748b;margin:1rem 0 0.5rem;">Medium (default)</p>
          <ui-radio name="size-demo" value="md" label="Medium radio" size="md"
            ?checked=${this.standalone === 'md'}
            @radio-change=${() => { this.standalone = 'md'; }}></ui-radio>

          <p style="font-size:0.8rem;color:#64748b;margin:1rem 0 0.5rem;">Large</p>
          <ui-radio name="size-demo" value="lg" label="Large radio" size="lg"
            ?checked=${this.standalone === 'lg'}
            @radio-change=${() => { this.standalone = 'lg'; }}></ui-radio>
        </div>
      </div>

      <!-- Row 3: States -->
      <div class="card full">
        <h2 class="section-title">Edge cases &amp; states</h2>
        <p class="section-sub">Disabled options and fully disabled groups.</p>

        <div style="display:flex;gap:2.5rem;flex-wrap:wrap;">
          <div>
            <p style="font-size:0.8rem;font-weight:600;color:#64748b;margin:0 0 0.75rem;">Unchecked disabled</p>
            <ui-radio name="state" value="a" label="Unavailable option" disabled></ui-radio>
          </div>
          <div>
            <p style="font-size:0.8rem;font-weight:600;color:#64748b;margin:0 0 0.75rem;">Checked disabled</p>
            <ui-radio name="state" value="b" label="Locked selection" checked disabled></ui-radio>
          </div>
          <div>
            <p style="font-size:0.8rem;font-weight:600;color:#64748b;margin:0 0 0.75rem;">Fully disabled group</p>
            <ui-radio-group
              name="disabled-group"
              disabled
              orientation="horizontal"
              value="x"
              .options=${[
                { value: 'x', label: 'Option X' },
                { value: 'y', label: 'Option Y' },
            ]}
            ></ui-radio-group>
          </div>
        </div>
      </div>
    `;
    }
}
