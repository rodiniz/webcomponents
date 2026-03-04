import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../shared/components/toggle-switch';
import '../../shared/components/button';

@customElement('toggle-switch-demo-page')
export class ToggleSwitchDemoPage extends LitElement {
  @state() private notificationsEnabled: boolean = true;
  @state() private darkModeEnabled: boolean = false;
  @state() private formResult: string = '';

  static styles = css`
    .demo-container {
      padding: 2rem;
      max-width: 1000px;
    }

    h1 {
      font-size: 2.2rem;
      margin: 0 0 0.5rem;
      color: #0f172a;
      font-weight: 700;
    }

    .demo-description {
      color: #64748b;
      margin: 0 0 2rem;
      font-size: 1.05rem;
      line-height: 1.6;
    }

    .demo-section {
      margin-bottom: 2.5rem;
      padding: 2rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.05);
    }

    .demo-section h2 {
      margin: 0 0 0.75rem;
      font-size: 1.4rem;
      color: #0f172a;
      font-weight: 600;
      border-bottom: 2px solid hsl(var(--primary));
      padding-bottom: 0.5rem;
    }

    .demo-section p {
      color: #64748b;
      margin: 0 0 1.5rem;
      font-size: 0.875rem;
    }

    .toggle-group {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .toggle-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      transition: all 0.2s;
    }

    .toggle-row:hover {
      border-color: hsl(var(--primary));
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .size-demo {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .size-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      min-width: 150px;
    }

    .size-label {
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .result-display {
      margin-top: 1.5rem;
      padding: 1.25rem;
      background: #f1f5f9;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
    }

    .result-display h3 {
      margin: 0 0 0.75rem;
      font-size: 0.875rem;
      color: #0f172a;
      font-weight: 600;
    }

    .result-display pre {
      margin: 0;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      color: #475569;
      white-space: pre-wrap;
    }

    .settings-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }

    .settings-item {
      padding: 1.25rem;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    .settings-title {
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 0.25rem;
      font-size: 0.9375rem;
    }

    .settings-desc {
      font-size: 0.8125rem;
      color: #64748b;
      margin-bottom: 0.875rem;
      line-height: 1.5;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    @media (max-width: 768px) {
      .demo-container {
        padding: 1rem;
      }

      h1 {
        font-size: 1.75rem;
      }

      .size-demo {
        gap: 1rem;
      }

      .settings-group {
        grid-template-columns: 1fr;
      }
    }
  `;

  private handleToggleChange = (e: Event): void => {
    const target = e.target as any;
    const customEvent = e as CustomEvent;
    const name = target.name;
    const checked = customEvent.detail.checked;
    
    if (name === 'notifications') {
      this.notificationsEnabled = checked;
    } else if (name === 'darkMode') {
      this.darkModeEnabled = checked;
    }
  };

  private handleFormSubmit = (e: Event): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const values: Record<string, any> = {};

    formData.forEach((value, key) => {
      values[key] = value === 'on' ? true : false;
    });

    // Get unchecked toggles
    const allToggles = form.querySelectorAll('ui-toggle-switch');
    allToggles.forEach((toggle: any) => {
      if (toggle.name && !formData.has(toggle.name)) {
        values[toggle.name] = false;
      }
    });

    this.formResult = JSON.stringify(values, null, 2);
  };

  private handleFormReset = (): void => {
    this.formResult = '';
    this.shadowRoot?.querySelectorAll('ui-toggle-switch').forEach((toggle: any) => {
      toggle.checked = false;
    });
  };

  render() {
    return html`
      <div class="demo-container">
        <h1>Toggle Switch Component</h1>
        <p class="demo-description">
          A modern toggle switch control for boolean values. Inspired by PrimeNG's toggle switch with smooth animations and accessibility support.
        </p>

        <!-- Basic Usage -->
        <section class="demo-section">
          <h2>Basic Usage</h2>
          <p>Simple toggle switches with labels</p>
          <div class="toggle-group">
            <div class="toggle-row">
              <ui-toggle-switch 
                id="notificationsToggle"
                label="Enable notifications"
                name="notifications"
                checked
                @toggle-change=${this.handleToggleChange}
              ></ui-toggle-switch>
            </div>
            <div class="toggle-row">
              <ui-toggle-switch 
                id="darkModeToggle"
                label="Dark mode"
                name="darkMode"
                @toggle-change=${this.handleToggleChange}
              ></ui-toggle-switch>
            </div>
            <div class="toggle-row">
              <ui-toggle-switch 
                label="Auto-save enabled"
                checked
              ></ui-toggle-switch>
            </div>
          </div>
          <div class="result-display">
            <h3>Current State:</h3>
            <pre>Notifications: ${this.notificationsEnabled ? 'ON' : 'OFF'}
Dark Mode: ${this.darkModeEnabled ? 'ON' : 'OFF'}</pre>
          </div>
        </section>

        <!-- Size Variants -->
        <section class="demo-section">
          <h2>Size Variants</h2>
          <p>Three size options: small, medium (default), and large</p>
          <div class="size-demo">
            <div class="size-item">
              <span class="size-label">Small</span>
              <ui-toggle-switch 
                label="Small"
                size="sm"
                checked
              ></ui-toggle-switch>
            </div>
            <div class="size-item">
              <span class="size-label">Medium (Default)</span>
              <ui-toggle-switch 
                label="Medium"
                size="md"
                checked
              ></ui-toggle-switch>
            </div>
            <div class="size-item">
              <span class="size-label">Large</span>
              <ui-toggle-switch 
                label="Large"
                size="lg"
                checked
              ></ui-toggle-switch>
            </div>
          </div>
        </section>

        <!-- Disabled State -->
        <section class="demo-section">
          <h2>Disabled State</h2>
          <p>Toggle switches can be disabled</p>
          <div class="toggle-group">
            <div class="toggle-row">
              <ui-toggle-switch 
                label="Disabled (Off)"
                disabled
              ></ui-toggle-switch>
            </div>
            <div class="toggle-row">
              <ui-toggle-switch 
                label="Disabled (On)"
                checked
                disabled
              ></ui-toggle-switch>
            </div>
          </div>
        </section>

        <!-- Without Labels -->
        <section class="demo-section">
          <h2>Without Labels</h2>
          <p>Toggle switches can be used without text labels</p>
          <div class="toggle-group">
            <div class="toggle-row">
              <ui-toggle-switch size="sm"></ui-toggle-switch>
              <ui-toggle-switch size="md"></ui-toggle-switch>
              <ui-toggle-switch size="lg"></ui-toggle-switch>
            </div>
          </div>
        </section>

        <!-- Settings Panel Example -->
        <section class="demo-section">
          <h2>Settings Panel Example</h2>
          <p>Common use case for toggle switches in settings interfaces</p>
          <div class="settings-group">
            <div class="settings-item">
              <div class="settings-title">Email Notifications</div>
              <div class="settings-desc">Receive email updates about your activity</div>
              <ui-toggle-switch checked></ui-toggle-switch>
            </div>
            <div class="settings-item">
              <div class="settings-title">Push Notifications</div>
              <div class="settings-desc">Receive push notifications on mobile</div>
              <ui-toggle-switch></ui-toggle-switch>
            </div>
            <div class="settings-item">
              <div class="settings-title">Two-Factor Authentication</div>
              <div class="settings-desc">Add an extra layer of security</div>
              <ui-toggle-switch checked></ui-toggle-switch>
            </div>
            <div class="settings-item">
              <div class="settings-title">Marketing Emails</div>
              <div class="settings-desc">Receive promotional content</div>
              <ui-toggle-switch></ui-toggle-switch>
            </div>
          </div>
        </section>

        <!-- Form Integration -->
        <section class="demo-section">
          <h2>Form Integration</h2>
          <p>Toggle switches work seamlessly with HTML forms</p>
          <form @submit=${this.handleFormSubmit}>
            <div class="toggle-group">
              <div class="toggle-row">
                <ui-toggle-switch 
                  label="Subscribe to newsletter"
                  name="newsletter"
                ></ui-toggle-switch>
              </div>
              <div class="toggle-row">
                <ui-toggle-switch 
                  label="Accept terms and conditions"
                  name="terms"
                ></ui-toggle-switch>
              </div>
              <div class="toggle-row">
                <ui-toggle-switch 
                  label="Enable analytics"
                  name="analytics"
                  checked
                ></ui-toggle-switch>
              </div>
            </div>
            <div class="form-actions">
              <ui-button type="submit" variant="primary">Submit Form</ui-button>
              <ui-button type="button" variant="ghost" @click=${this.handleFormReset}>Reset</ui-button>
            </div>
          </form>
          ${this.formResult ? html`
            <div class="result-display">
              <h3>Form Values:</h3>
              <pre>${this.formResult}</pre>
            </div>
          ` : ''}
        </section>
      </div>
    `;
  }
}
