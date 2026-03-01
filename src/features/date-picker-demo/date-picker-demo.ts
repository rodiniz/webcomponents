import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../shared/components/date-picker';
import '../../shared/components/button';

@customElement('date-picker-demo')
export class DatePickerDemo extends LitElement {
  @state() private outputs: Record<string, string> = {};

  static styles = css`
    h1 {
      font-size: 2rem;
      margin: 0 0 1rem;
      color: #0f172a;
    }

    .demo-section {
      margin-bottom: 2.5rem;
      padding: 1.5rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
    }

    .demo-section h2 {
      margin: 0 0 1.5rem;
      font-size: 1.25rem;
      color: #0f172a;
    }

    .picker-row {
      margin-bottom: 1.5rem;
    }

    .picker-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #64748b;
      margin-bottom: 0.5rem;
    }

    .picker-controls {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .clear-btn {
      flex-shrink: 0;
    }

    .output {
      font-size: 0.8rem;
      color: #94a3b8;
      padding: 0.5rem;
      background: #f8fafc;
      border-radius: 6px;
    }

    .code-block {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1.5rem;
      border-radius: 8px;
      font-family: monospace;
      font-size: 0.8rem;
      overflow-x: auto;
      white-space: pre;
      line-height: 1.6;
    }
  `;

  private handleDateChange = (id: string) => (e: CustomEvent): void => {
    this.outputs = {
      ...this.outputs,
      [id]: e.detail.value || 'No date selected'
    };
  };

  private handleClear = (id: string) => (): void => {
    const picker = this.shadowRoot?.querySelector(`#${id}`) as any;
    if (picker) {
      picker.value = '';
      this.outputs = {
        ...this.outputs,
        [id]: 'Cleared'
      };
    }
  };

  render() {
    return html`
      <h1>📅 Date Picker Component Demo</h1>

      <div class="demo-section">
        <h2>Different Date Formats</h2>
        
        <div class="picker-row">
          <div class="picker-label">Format: YYYY-MM-DD (ISO)</div>
          <div class="picker-controls">
            <ui-date-picker id="picker1" format="YYYY-MM-DD" @change=${this.handleDateChange('picker1')}></ui-date-picker>
            <ui-button class="clear-btn" variant="secondary" @click=${this.handleClear('picker1')}>Clear</ui-button>
          </div>
          <div class="output">${this.outputs['picker1'] || 'Select a date to see the output'}</div>
        </div>

        <div class="picker-row">
          <div class="picker-label">Format: DD/MM/YYYY (European)</div>
          <div class="picker-controls">
            <ui-date-picker id="picker2" format="DD/MM/YYYY" @change=${this.handleDateChange('picker2')}></ui-date-picker>
            <ui-button class="clear-btn" variant="secondary" @click=${this.handleClear('picker2')}>Clear</ui-button>
          </div>
          <div class="output">${this.outputs['picker2'] || 'Select a date to see the output'}</div>
        </div>

        <div class="picker-row">
          <div class="picker-label">Format: MM/DD/YYYY (US)</div>
          <div class="picker-controls">
            <ui-date-picker id="picker3" format="MM/DD/YYYY" @change=${this.handleDateChange('picker3')}></ui-date-picker>
            <ui-button class="clear-btn" variant="secondary" @click=${this.handleClear('picker3')}>Clear</ui-button>
          </div>
          <div class="output">${this.outputs['picker3'] || 'Select a date to see the output'}</div>
        </div>

        <div class="picker-row">
          <div class="picker-label">Format: DD-MM-YYYY</div>
          <div class="picker-controls">
            <ui-date-picker id="picker4" format="DD-MM-YYYY" @change=${this.handleDateChange('picker4')}></ui-date-picker>
            <ui-button class="clear-btn" variant="secondary" @click=${this.handleClear('picker4')}>Clear</ui-button>
          </div>
          <div class="output">${this.outputs['picker4'] || 'Select a date to see the output'}</div>
        </div>

        <div class="picker-row">
          <div class="picker-label">Format: MM-DD-YYYY</div>
          <div class="picker-controls">
            <ui-date-picker id="picker5" format="MM-DD-YYYY" @change=${this.handleDateChange('picker5')}></ui-date-picker>
            <ui-button class="clear-btn" variant="secondary" @click=${this.handleClear('picker5')}>Clear</ui-button>
          </div>
          <div class="output">${this.outputs['picker5'] || 'Select a date to see the output'}</div>
        </div>
      </div>

      <div class="demo-section">
        <h2>With Constraints</h2>
        
        <div class="picker-row">
          <div class="picker-label">With Min and Max Dates</div>
          <div class="picker-controls">
            <ui-date-picker id="picker6" format="DD/MM/YYYY" min="2026-01-01" max="2026-12-31" @change=${this.handleDateChange('picker6')}></ui-date-picker>
            <ui-button class="clear-btn" variant="secondary" @click=${this.handleClear('picker6')}>Clear</ui-button>
          </div>
          <div class="output">Only dates in 2026 are allowed</div>
        </div>

        <div class="picker-row">
          <div class="picker-label">Disabled State</div>
          <div class="picker-controls">
            <ui-date-picker id="picker7" format="DD/MM/YYYY" disabled></ui-date-picker>
          </div>
          <div class="output">This picker is disabled</div>
        </div>

        <div class="picker-row">
          <div class="picker-label">With Initial Value</div>
          <div class="picker-controls">
            <ui-date-picker id="picker8" format="DD/MM/YYYY" value="2026-02-26" @change=${this.handleDateChange('picker8')}></ui-date-picker>
            <ui-button class="clear-btn" variant="secondary" @click=${this.handleClear('picker8')}>Clear</ui-button>
          </div>
          <div class="output">Initial value: 2026-02-26</div>
        </div>
      </div>

      <div class="demo-section">
        <h2>Usage Example</h2>
        <div class="code-block"><code>&lt;ui-date-picker 
  format="DD/MM/YYYY"
  value="2026-02-26"
  min="2026-01-01"
  max="2026-12-31"
&gt;&lt;/ui-date-picker&gt;

&lt;script&gt;
  const picker = document.querySelector('ui-date-picker');
  
  // Listen to date changes
  picker.addEventListener('change', (e) => {
    console.log('Value:', e.detail.value);
  });

  // Programmatic API
  picker.value = '2026-03-15';
  picker.clear();
&lt;/script&gt;</code></div>
      </div>
    `;
  }
}
