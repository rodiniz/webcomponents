import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeHTML } from 'unsafe-html';
import '../../shared/components/input';
import '../../shared/components/button';

@customElement('input-demo')
export class InputDemo extends LitElement {
  @state() private formResult: string = '';
  @state() private statusText: string = 'Not validated';

  @query('#form-result') formResultEl!: HTMLElement;
  @query('#result-status') statusSpan!: HTMLElement;

  static styles = css`
    .demo-container {
      padding: 2rem;
      max-width: 800px;
    }

    .demo-container h1 {
      margin: 0 0 0.5rem;
      color: #0f172a;
    }

    .demo-description {
      color: #64748b;
      margin-bottom: 2rem;
    }

    .demo-description code {
      background: #f1f5f9;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
    }

    .demo-section {
      margin-bottom: 2.5rem;
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

    .demo-section > p {
      margin: 0 0 1rem;
      color: #64748b;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
    }

    .form-actions {
      margin-top: 1.5rem;
      display: flex;
      gap: 0.75rem;
    }

    .demo-form {
      margin-bottom: 1rem;
    }

    .form-result {
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      background: #f1f5f9;
      border-radius: 6px;
      display: flex;
      gap: 0.5rem;
    }

    .result-label {
      font-weight: 600;
      color: #0f172a;
    }

    .result-value {
      color: #64748b;
    }

    .result-value.valid {
      color: #24ec71;
    }

    .result-value.invalid {
      color: #ef4444;
    }
  `;

  private handleSubmit = (e: Event): void => {
    e.preventDefault();

    const inputs = Array.from(this.shadowRoot!.querySelectorAll('ui-input')) as unknown as Array<{
      reportValidity: () => boolean;
      value: string;
    }>;

    let allValid = true;

    for (const input of inputs) {
      const valid = input.reportValidity();
      if (!valid) {
        allValid = false;
      }
    }

    this.statusText = allValid ? 'Valid' : 'Invalid';
  };

  private handleReset = (): void => {
    const inputs = this.shadowRoot!.querySelectorAll('ui-input');
    inputs.forEach(input => {
      (input as any).value = '';
    });

    this.statusText = 'Not validated';
  };

  render() {
    return html`
      <div class="demo-container">
        <h1>Input Component Demo</h1>
        <p class="demo-description">
          Explore the <code>&lt;ui-input&gt;</code> component with various validation scenarios.
        </p>

        <section class="demo-section">
          <h2>Basic Inputs</h2>
          <div class="form-grid">
            <ui-input
              label="Username"
              placeholder="Enter your username"
              name="username"
              required
              minlength="3"
              maxlength="20"
            ></ui-input>

            <ui-input
              label="Email"
              type="email"
              placeholder="you@example.com"
              name="email"
              required
            ></ui-input>

            <ui-input
              label="Password"
              type="password"
              placeholder="Enter password"
              name="password"
              required
              minlength="8"
            ></ui-input>

            <ui-input
              label="Phone"
              type="tel"
              placeholder="(555) 123-4567"
              name="phone"
              pattern="[0-9\\-\\(\\)\\s]+"
            ></ui-input>
          </div>
        </section>

        <section class="demo-section">
          <h2>Custom Validation</h2>
          <p>Email must end with <code>@company.com</code></p>
          <div class="form-grid">
            <ui-input
              label="Corporate Email"
              type="email"
              placeholder="you@company.com"
              name="corp-email"
              required
              validate="email:company.com"
              custom-error="Must be a company.com email"
              id="corp-email"
            ></ui-input>

            <ui-input
              label="Confirm Email"
              type="email"
              placeholder="Confirm your email"
              name="confirm-email"
              required
              validate="match:#corp-email"
              custom-error="Emails must match"
              id="confirm-email"
            ></ui-input>
          </div>
        </section>
        
        <section class="demo-section">
          <h2>Disabled State</h2>
          <div class="form-grid">
            <ui-input
              label="Disabled Input"
              placeholder="Cannot edit"
              name="disabled"
              value="This is disabled"
              disabled
            ></ui-input>
          </div>
        </section>

        <div class="form-actions">
          <ui-button type="submit" variant="primary" @click=${this.handleSubmit}>Validate</ui-button>
          <ui-button type="button" variant="ghost" @click=${this.handleReset}>Reset</ui-button>
        </div>
        <div class="form-result">
          <span class="result-label">Status:</span>
          <span class="result-value ${this.statusText === 'Valid' ? 'valid' : this.statusText === 'Invalid' ? 'invalid' : ''}">${this.statusText}</span>
        </div>
      </div>
    `;
  }
}
