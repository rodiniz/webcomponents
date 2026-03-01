import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../shared/components/button';
import '../../shared/components/input';
import '../../shared/components/select';
import '../../shared/components/checkbox';
import '../../shared/components/date-picker';
import '../../shared/components/upload';
import { http } from '../../core/http';
import type { SelectOption } from '../../shared/components/select';

type Category = {
  slug: string;
  name: string;
  url: string;
};

const roles: SelectOption[] = [
  { value: 'admin', label: 'Administrator' },
  { value: 'manager', label: 'Manager' },
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' }
];

const regions: SelectOption[] = [
  { value: 'us-east', label: 'US East' },
  { value: 'us-west', label: 'US West' },
  { value: 'eu-west', label: 'EU West' },
  { value: 'apac', label: 'APAC' }
];

@customElement('form-demo-page')
export class FormDemoPage extends LitElement {
  @state() private formOutput = 'Submit the form to see values.';
  @state() private categoryOptions: SelectOption[] = [];

  static styles = css`
    .form-hero {
      padding: 3rem 2rem;
      background: linear-gradient(135deg, rgba(36, 236, 113, 0.08) 0%, rgba(52, 168, 235, 0.05) 100%);
      border-radius: 16px;
      margin-bottom: 2rem;
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

    .form-shell {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    @media (max-width: 1024px) {
      .form-shell {
        grid-template-columns: 1fr;
      }
    }

    .form-grid {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 2rem;
    }

    .form-panel h2 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      color: #0f172a;
    }

    .form-panel p {
      color: #64748b;
      margin: 0 0 1.5rem;
      font-size: 0.875rem;
    }

    .split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }

    .form-output {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
    }

    .output-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      background: #f8fafc;
      border-bottom: 1px solid #e5e7eb;
    }

    .output-head h3 {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: #0f172a;
    }

    .output-head span {
      font-size: 0.75rem;
      color: #64748b;
      font-family: monospace;
    }

    pre {
      margin: 0;
      padding: 1.5rem;
      font-family: monospace;
      font-size: 0.8rem;
      color: #64748b;
      white-space: pre-wrap;
      word-break: break-all;
      min-height: 200px;
    }
  `;

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    try {
      const categories = await http.get<Category[]>('https://dummyjson.com/products/categories');
      if (Array.isArray(categories)) {
        this.categoryOptions = categories.map(cat => ({
          value: cat.slug,
          label: cat.name
        }));
      }
    } catch (e) {
      console.error('Failed to load categories:', e);
    }
  }

  private handleSubmit = (e: Event): void => {
    e.preventDefault();
    this.formOutput = 'Form submitted! Check console for values.';
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const values: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      values[key] = value.toString();
    });
    
    console.log('Form values:', values);
  };

  private handleReset = (): void => {
    this.formOutput = 'Submit the form to see values.';
    
    this.shadowRoot?.querySelectorAll('ui-input').forEach(input => {
      (input as any).value = '';
    });
    this.shadowRoot?.querySelectorAll('ui-select').forEach(select => {
      (select as any).value = '';
    });
    this.shadowRoot?.querySelectorAll('ui-checkbox').forEach(checkbox => {
      (checkbox as any).setChecked?.(false);
    });
    this.shadowRoot?.querySelectorAll('ui-date-picker').forEach(datePicker => {
      (datePicker as any).value = '';
    });
    this.shadowRoot?.querySelectorAll('ui-upload').forEach(upload => {
      (upload as any).clear?.();
    });
  };

  render() {
    return html`
      <section class="form-hero">
        <div>			
          <h1>Form Elements</h1>
          <p class="hero-subtitle">
            Bring inputs, selects, checkboxes, uploads, and native fields together in one cohesive flow.
          </p>
        </div>	
      </section>

      <section class="form-shell">
        <form class="form-grid" @submit=${this.handleSubmit}>
          <div class="form-panel">
            <h2>Project setup</h2>
            <p>Collect the essentials to launch a workspace.</p>

            <ui-input label="Workspace name" placeholder="Studio Atlas" name="workspace" required></ui-input>
            <ui-input label="Owner email" type="email" placeholder="owner@company.com" name="ownerEmail" required></ui-input>

            <div class="split">
              <ui-select id="roleSelect" label="Default role" name="role" .options=${roles}></ui-select>
              <ui-select id="regionSelect" label="Region" name="region" .options=${regions}></ui-select>
            </div>
            <ui-select id="categorySelect" label="Category" name="category" .options=${this.categoryOptions}></ui-select>
            <ui-date-picker label="Launch date" name="launchDate" placeholder="Select date" format="MM/DD/YYYY"></ui-date-picker>

            <ui-upload
              label="Brand assets"
              helper="Upload logos or product shots. PNG, JPG, or SVG."
              name="brandAssets"
              accept=".png,.jpg,.jpeg,.svg"
              multiple
            ></ui-upload>
          </div>		

          <div class="form-actions">
            <ui-button type="submit" variant="primary">Save form</ui-button>
            <ui-button type="button" variant="ghost" @click=${this.handleReset}>Reset</ui-button>
          </div>
        </form>

        <div class="form-output">
          <div class="output-head">
            <h3>Helper output</h3>
            <span>getFormValues()</span>
          </div>
          <pre>${this.formOutput}</pre>
        </div>
      </section>
    `;
  }
}
