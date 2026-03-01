import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from '../../core/template';
import '../../shared/components/button';
import '../../shared/components/select';
import type { SelectOption } from '../../shared/components/select';

@customElement('select-demo-page')
export class SelectDemoPage extends LitElement {
  @state() private results: Record<string, string> = {};
  @state() private formResult = '';

  private fruits: SelectOption[] = [
    { value: 'apple', label: '🍎 Apple' },
    { value: 'banana', label: '🍌 Banana' },
    { value: 'orange', label: '🍊 Orange' },
    { value: 'grape', label: '🍇 Grape' },
    { value: 'strawberry', label: '🍓 Strawberry' },
    { value: 'watermelon', label: '🍉 Watermelon' }
  ];

  private countries: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'br', label: 'Brazil' },
    { value: 'in', label: 'India' },
    { value: 'cn', label: 'China' }
  ];

  private languages: SelectOption[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' }
  ];

  private roles: SelectOption[] = [
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Manager' },
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'user', label: 'User' }
  ];

  private departments: SelectOption[] = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' }
  ];

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

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .result-display {
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      background: #f1f5f9;
      border-radius: 8px;
      font-size: 0.875rem;
    }
  `;

  private handleSelectChange = (id: string) => (e: CustomEvent): void => {
    const { option, value } = e.detail;
    this.results = {
      ...this.results,
      [id]: `${option.label} (${value})`
    };
  };

  private handleFormSubmit = (e: Event): void => {
    e.preventDefault();
    const roleSelect = this.shadowRoot?.getElementById('roleSelect') as any;
    const deptSelect = this.shadowRoot?.getElementById('departmentSelect') as any;
    
    const roleValue = roleSelect?.value || 'Not selected';
    const deptValue = deptSelect?.value || 'Not selected';

    this.formResult = `Role: <strong>${roleValue}</strong><br>Department: <strong>${deptValue}</strong>`;
  };

  private handleFormReset = (): void => {
    const roleSelect = this.shadowRoot?.getElementById('roleSelect') as any;
    const deptSelect = this.shadowRoot?.getElementById('departmentSelect') as any;
    
    if (roleSelect) roleSelect.value = '';
    if (deptSelect) deptSelect.value = '';
    this.formResult = '';
  };

  render() {
    return html`
      <div class="demo-container">
        <h1>Select Component Demo</h1>
        <p>Customizable dropdown select with search and multi-configuration options.</p>

        <div class="demo-section">
          <h2>Basic Select</h2>
          <div class="demo-grid">
            <ui-select 
              id="basicSelect"
              label="Choose a Fruit"
              placeholder="Select a fruit..."
              .options=${this.fruits}
              @select-change=${this.handleSelectChange('basic')}
            ></ui-select>
            
            <ui-select 
              id="disabledSelect"
              label="Disabled Select"
              placeholder="Not available"
              disabled
              .options=${this.fruits}
            ></ui-select>
          </div>
          ${this.results['basic'] ? html`
            <div class="result-display">
              <strong>Selected:</strong> ${this.results['basic']}
            </div>
          ` : ''}
        </div>

        <div class="demo-section">
          <h2>Searchable Select</h2>
          <div class="demo-grid">
            <ui-select 
              id="searchableSelect"
              label="Choose a Country"
              placeholder="Search countries..."
              searchable
              .options=${this.countries}
              @select-change=${this.handleSelectChange('search')}
            ></ui-select>
          </div>
          ${this.results['search'] ? html`
            <div class="result-display">
              <strong>Selected Country:</strong> ${this.results['search']}
            </div>
          ` : ''}
        </div>

        <div class="demo-section">
          <h2>Select Sizes & Preselected</h2>
          <div class="demo-grid">
            <ui-select 
              id="preselectedSelect"
              label="Choose a Programming Language"
              placeholder="Select language..."
              value="javascript"
              .options=${this.languages}
              @select-change=${this.handleSelectChange('preselected')}
            ></ui-select>
          </div>
          ${this.results['preselected'] ? html`
            <div class="result-display">
              <strong>Selected:</strong> ${this.results['preselected']}
            </div>
          ` : ''}
        </div>

        <div class="demo-section">
          <h2>Form Example</h2>
          <form @submit=${this.handleFormSubmit} style="max-width: 600px;">
            <ui-select 
              id="roleSelect"
              label="User Role"
              placeholder="Select role..."
              .options=${this.roles}
            ></ui-select>

            <ui-select 
              id="departmentSelect"
              label="Department"
              placeholder="Select department..."
              .options=${this.departments}
            ></ui-select>

            <div style="margin-top: 0.5rem; display: flex; gap: 1rem;">
              <ui-button type="submit" variant="primary">Submit</ui-button>
              <ui-button type="button" variant="ghost" @click=${this.handleFormReset}>Reset</ui-button>
            </div>
          </form>
          ${this.formResult ? html`
            <div class="result-display" style="margin-top: 1rem;">
              <strong>Form Data:</strong><br>
              ${unsafeHTML(this.formResult)}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}
