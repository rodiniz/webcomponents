import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../shared/components/button';
import '../../shared/components/stepper';
import type { StepperStep } from '../../shared/components/stepper';

const interactiveSteps: StepperStep[] = [
  { title: 'Project setup', description: 'Name, team, and scope' },
  { title: 'Permissions', description: 'Invite collaborators' },
  { title: 'Brand kit', description: 'Logo and colors' },
  { title: 'Integrations', description: 'Connect tools' },
  { title: 'Launch', description: 'Review and publish' }
];

const compactSteps: StepperStep[] = [
  { title: 'Connect' },
  { title: 'Customize' },
  { title: 'Publish' }
];

const verticalSteps: StepperStep[] = [
  { title: 'Account details', description: 'Personal information' },
  { title: 'Billing', description: 'Plan and payment method' },
  { title: 'Security', description: 'Password and MFA' },
  { title: 'Preferences', description: 'Notifications and access' }
];

const statusSteps: StepperStep[] = [
  { title: 'Collect data', description: 'Import the latest dataset', state: 'complete' },
  { title: 'Validate', description: 'Spot missing fields', state: 'warning' },
  { title: 'Resolve issues', description: 'Fix invalid entries', state: 'error' },
  { title: 'Publish', description: 'Share with the team', state: 'upcoming' }
];

const interactiveContent = [
  {
    title: 'Project setup',
    copy: 'Create the workspace, define the team, and lock in the scope.',
    bullets: ['Workspace name + region', 'Invite core collaborators', 'Set the delivery timeline']
  },
  {
    title: 'Permissions',
    copy: 'Assign roles and access boundaries for internal and external teams.',
    bullets: ['Owner and editor roles', 'Approval workflows', 'Audit logging enabled']
  },
  {
    title: 'Brand kit',
    copy: 'Upload logo assets and align the design system palette.',
    bullets: ['Primary + accent colors', 'Typography presets', 'Asset library sync']
  },
  {
    title: 'Integrations',
    copy: 'Connect your analytics, CRM, and deployment pipelines.',
    bullets: ['Analytics provider', 'CRM webhooks', 'CI/CD automation']
  },
  {
    title: 'Launch',
    copy: 'Finalize content and publish to production.',
    bullets: ['Final review checklist', 'Stakeholder sign-off', 'Go-live switch']
  }
];

@customElement('stepper-demo-page')
export class StepperDemoPage extends LitElement {
  @state() private activeIndex = 2;

  static styles = css`
    .stepper-hero {
      padding: 3rem 2rem;
      background: linear-gradient(135deg, rgba(36, 236, 113, 0.08) 0%, rgba(52, 168, 235, 0.05) 100%);
      border-radius: 16px;
      margin-bottom: 2rem;
    }

    .eyebrow {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #64748b;
      margin: 0 0 0.5rem;
    }

    h1 {
      font-size: 2.5rem;
      margin: 0 0 0.5rem;
      color: #0f172a;
    }

    .hero-subtitle {
      color: #64748b;
      margin: 0;
      font-size: 1.1rem;
    }

    .stepper-section {
      margin-bottom: 2rem;
    }

    .stepper-section.grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .section-head {
      margin-bottom: 1rem;
    }

    .section-head h2 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      color: #0f172a;
    }

    .section-head p {
      color: #64748b;
      font-size: 0.875rem;
      margin: 0;
    }

    .stepper-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 1.5rem;
    }

    .stepper-preview {
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 8px;
    }

    .stepper-preview h3 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
      color: #0f172a;
    }

    .stepper-preview p {
      color: #64748b;
      margin: 0 0 1rem;
    }

    .stepper-preview ul {
      margin: 0;
      padding-left: 1.25rem;
      color: #64748b;
    }

    .stepper-preview li {
      margin-bottom: 0.25rem;
    }

    .stepper-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5rem;
    }

    .status-pill {
      font-size: 0.875rem;
      color: #64748b;
      background: #f1f5f9;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }
  `;

  private handlePrev = (): void => {
    this.activeIndex = Math.max(1, this.activeIndex - 1);
  };

  private handleNext = (): void => {
    this.activeIndex = Math.min(interactiveSteps.length, this.activeIndex + 1);
  };

  private handleStepChange = (e: CustomEvent): void => {
    if (e.detail?.index) {
      this.activeIndex = e.detail.index;
    }
  };

  render() {
    const currentContent = interactiveContent[this.activeIndex - 1];

    return html`
      <section class="stepper-hero">
        <div>
          <p class="eyebrow">Flow control</p>
          <h1>Stepper</h1>
          <p class="hero-subtitle">
            Guide users across multi-step journeys with clear progress, states, and actions.
          </p>
        </div>		
      </section>

      <section class="stepper-section">
        <div class="section-head">
          <h2>Interactive progress</h2>
          <p>Move between steps to preview states and content density.</p>
        </div>
        <div class="stepper-card">
          <ui-stepper 
            id="interactiveStepper"
            size="md"
            .steps=${interactiveSteps}
            .active=${this.activeIndex}
            @step-change=${this.handleStepChange}
          ></ui-stepper>
          <div class="stepper-preview">
            <h3>${currentContent.title}</h3>
            <p>${currentContent.copy}</p>
            <ul>
              ${currentContent.bullets.map(item => html`<li>${item}</li>`)}
            </ul>
          </div>
          <div class="stepper-controls">
            <div class="status-pill">Step ${this.activeIndex} of ${interactiveSteps.length}</div>
            <div class="actions">
              <ui-button variant="secondary" size="sm" @click=${this.handlePrev}>Previous</ui-button>
              <ui-button variant="primary" size="sm" @click=${this.handleNext}>Next</ui-button>
            </div>
          </div>
        </div>
      </section>

      <section class="stepper-section grid">
        <div class="stepper-card">
          <div class="section-head">
            <h2>Compact workflow</h2>
            <p>Small size for tight layouts or onboarding drawers.</p>
          </div>
          <ui-stepper 
            id="compactStepper"
            size="sm"
            .steps=${compactSteps}
            active="2"
          ></ui-stepper>
        </div>
        <div class="stepper-card">
          <div class="section-head">
            <h2>Vertical journey</h2>
            <p>Perfect for forms, checklists, and long content.</p>
          </div>
          <ui-stepper 
            id="verticalStepper"
            orientation="vertical"
            size="lg"
            .steps=${verticalSteps}
            active="3"
          ></ui-stepper>
        </div>
      </section>

      <section class="stepper-section">
        <div class="section-head">
          <h2>Status flavors</h2>
          <p>Explicit states like warning and error bring clarity to complex flows.</p>
        </div>
        <div class="stepper-card">
          <ui-stepper 
            id="statusStepper"
            size="md"
            .steps=${statusSteps}
            active="2"
          ></ui-stepper>
        </div>
      </section>
    `;
  }
}
