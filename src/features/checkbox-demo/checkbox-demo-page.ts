import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from '../../core/template';
import '../../shared/components/button';
import '../../shared/components/checkbox';

@customElement('checkbox-demo-page')
export class CheckboxDemoPage extends LitElement {
  @state() private eventLog: Array<{ time: string; status: string }> = [];
  @state() private formResult: string = '';

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

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .result-display {
      margin-top: 1rem;
      padding: 1rem;
      background: #f1f5f9;
      border-radius: 8px;
    }
  `;

  private selectAll: any = null;
  private itemCheckboxes: any[] = [];

  firstUpdated() {
    setTimeout(() => {
      this.selectAll = this.shadowRoot?.getElementById('selectAll');
      const items = this.shadowRoot?.querySelectorAll('.item-checkbox');
      if (items) {
        this.itemCheckboxes = Array.from(items) as any;
      }
      this.updateSelectAllState();
    }, 50);
  }

  private updateSelectAllState() {
    if (!this.selectAll) return;
    const checkedCount = this.itemCheckboxes.filter((cb: any) => 
      cb.hasAttribute('checked')
    ).length;

    if (checkedCount === 0) {
      this.selectAll?.setChecked(false);
    } else if (checkedCount === this.itemCheckboxes.length) {
      this.selectAll?.setChecked(true);
    } else {
      this.selectAll?.setIndeterminate(true);
    }
  }

  private handleSelectAll = (e: CustomEvent) => {
    const checked = e.detail.checked;
    this.itemCheckboxes.forEach((cb: any) => {
      cb.setChecked(checked);
    });
  };

  private handleItemChange = () => {
    this.updateSelectAllState();
  };

  private handleFormSubmit = (e: Event) => {
    e.preventDefault();
    const emailNotif = this.shadowRoot?.getElementById('emailNotif') as any;
    const smsNotif = this.shadowRoot?.getElementById('smsNotif') as any;
    const pushNotif = this.shadowRoot?.getElementById('pushNotif') as any;
    const weeklyDigest = this.shadowRoot?.getElementById('weeklyDigest') as any;

    const preferences = {
      email: emailNotif?.hasAttribute('checked') || false,
      sms: smsNotif?.hasAttribute('checked') || false,
      push: pushNotif?.hasAttribute('checked') || false,
      weekly: weeklyDigest?.hasAttribute('checked') || false
    };

    this.formResult = `
      Email: <strong>${preferences.email ? '✓ Enabled' : '✗ Disabled'}</strong><br>
      SMS: <strong>${preferences.sms ? '✓ Enabled' : '✗ Disabled'}</strong><br>
      Push: <strong>${preferences.push ? '✓ Enabled' : '✗ Disabled'}</strong><br>
      Weekly Digest: <strong>${preferences.weekly ? '✓ Enabled' : '✗ Disabled'}</strong>
    `;
  };

  private handleReset = () => {
    const emailNotif = this.shadowRoot?.getElementById('emailNotif') as any;
    const smsNotif = this.shadowRoot?.getElementById('smsNotif') as any;
    const pushNotif = this.shadowRoot?.getElementById('pushNotif') as any;
    const weeklyDigest = this.shadowRoot?.getElementById('weeklyDigest') as any;

    emailNotif?.setChecked(true);
    smsNotif?.setChecked(false);
    pushNotif?.setChecked(true);
    weeklyDigest?.setChecked(false);
    this.formResult = '';
  };

  private handleEvent = (e: CustomEvent) => {
    const timestamp = new Date().toLocaleTimeString();
    const status = e.detail.checked ? 'checked' : 'unchecked';
    
    this.eventLog = [
      { time: timestamp, status },
      ...this.eventLog.slice(0, 4)
    ];
  };

  render() {
    return html`
      <div class="demo-container">
        <h1>Checkbox Component Demo</h1>
        <p>Flexible checkbox with sizes, states, and indeterminate support.</p>

        <div class="demo-section">
          <h2>Basic Checkboxes</h2>
          <div class="checkbox-group">
            <ui-checkbox id="basic1" label="Accept terms and conditions"></ui-checkbox>
            <ui-checkbox id="basic2" label="Subscribe to newsletter" checked></ui-checkbox>
            <ui-checkbox id="basic3" label="Disabled checkbox" disabled></ui-checkbox>
            <ui-checkbox id="basic4" label="Disabled & checked" disabled checked></ui-checkbox>
          </div>
        </div>

        <div class="demo-section">
          <h2>Checkbox Sizes</h2>
          <div class="checkbox-group">
            <ui-checkbox id="size1" label="Small checkbox" size="sm"></ui-checkbox>
            <ui-checkbox id="size2" label="Medium checkbox (default)" size="md"></ui-checkbox>
            <ui-checkbox id="size3" label="Large checkbox" size="lg"></ui-checkbox>
          </div>
        </div>

        <div class="demo-section">
          <h2>Indeterminate State</h2>
          <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1rem;">
            Useful for "select all" scenarios where some items are selected.
          </p>
          <div style="background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e5e7eb;">
            <ui-checkbox 
              id="selectAll" 
              label="Select All" 
              size="md"
              @checkbox-change=${this.handleSelectAll}
            ></ui-checkbox>
            <div style="margin-left: 2rem; margin-top: 1rem;" class="checkbox-group">
              <ui-checkbox class="item-checkbox" label="Item 1" size="sm" @checkbox-change=${this.handleItemChange}></ui-checkbox>
              <ui-checkbox class="item-checkbox" label="Item 2" size="sm" @checkbox-change=${this.handleItemChange}></ui-checkbox>
              <ui-checkbox class="item-checkbox" label="Item 3" size="sm" @checkbox-change=${this.handleItemChange}></ui-checkbox>
              <ui-checkbox class="item-checkbox" label="Item 4" size="sm" @checkbox-change=${this.handleItemChange}></ui-checkbox>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h2>Checkbox Group (Form)</h2>
          <form @submit=${this.handleFormSubmit} style="max-width: 600px;">
            <fieldset style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 1.5rem;">
              <legend style="font-weight: 600; padding: 0 0.5rem;">Notification Preferences</legend>
              <div class="checkbox-group">
                <ui-checkbox id="emailNotif" label="Email notifications" checked></ui-checkbox>
                <ui-checkbox id="smsNotif" label="SMS notifications"></ui-checkbox>
                <ui-checkbox id="pushNotif" label="Push notifications" checked></ui-checkbox>
                <ui-checkbox id="weeklyDigest" label="Weekly digest"></ui-checkbox>
              </div>
            </fieldset>

            <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
              <ui-button type="submit" variant="primary">Save Preferences</ui-button>
              <ui-button type="button" variant="ghost" @click=${this.handleReset}>Reset</ui-button>
            </div>
          </form>
          ${this.formResult ? html`
            <div class="result-display">
              <strong>Saved Preferences:</strong><br>
              <span>${unsafeHTML(this.formResult)}</span>
            </div>
          ` : ''}
        </div>

        <div class="demo-section">
          <h2>Event Handling</h2>
          <div style="background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e5e7eb;">
            <ui-checkbox 
              id="eventCheckbox" 
              label="Click me to trigger event"
              @checkbox-change=${this.handleEvent}
            ></ui-checkbox>
          </div>
          ${this.eventLog.length > 0 ? html`
            <div class="result-display">
              <strong>Event Log:</strong><br>
              <div style="font-family: monospace; font-size: 0.875rem; margin-top: 0.5rem;">
                ${this.eventLog.map(e => html`
                  <div style="color: ${e.status === 'checked' ? '#24ec71' : '#64748b'}">
                    [${e.time}] Event: ${e.status}
                  </div>
                `)}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}
