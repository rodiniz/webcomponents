import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../shared/components/layout';

@customElement('layout-demo')
export class LayoutDemo extends LitElement {
  @state() private events: string[] = [];

  static styles = css`
    h1 {
      font-size: 2rem;
      margin: 0 0 0.5rem;
      color: #0f172a;
    }

    .demo-intro {
      background: linear-gradient(135deg, rgba(36, 236, 113, 0.08) 0%, rgba(52, 168, 235, 0.05) 100%);
      padding: 1.5rem;
      border-radius: 12px;
      border-left: 4px solid #24ec71;
      margin-bottom: 2rem;
    }

    .demo-intro p {
      margin: 0;
      color: #64748b;
    }

    .demo-section {
      margin-bottom: 2.5rem;
    }

    .demo-section h2 {
      font-size: 1.25rem;
      margin: 0 0 1rem;
      color: #0f172a;
    }

    .layout-example {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
      min-height: 200px;
    }

    .layout-example.full-height {
      min-height: 400px;
    }

    .content-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 100px;
      background: #f8fafc;
      color: #64748b;
      font-size: 0.875rem;
    }

    .sidebar-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .sidebar-label {
      font: 600 11px/1 "Inter", system-ui, sans-serif;
      color: rgba(255, 255, 255, 0.35);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 12px 8px 6px;
    }

    .sidebar-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.7);
      font: 500 14px/1.4 "Inter", system-ui, sans-serif;
    }

    .demo-info {
      padding: 1rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      margin-bottom: 1rem;
    }

    .demo-info p {
      margin: 0 0 1rem;
      color: #64748b;
      font-size: 0.875rem;
    }

    .demo-info code {
      background: #f1f5f9;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
    }

    .event-output {
      padding: 1rem;
      background: #1e293b;
      color: #22c55e;
      border-radius: 8px;
      font-family: monospace;
      font-size: 0.8rem;
      min-height: 80px;
      max-height: 150px;
      overflow-y: auto;
    }

    .event-output.empty {
      color: #64748b;
    }
  `;

  private handleCollapsedChange = (e: CustomEvent): void => {
    const collapsed = e.detail.collapsed;
    const timestamp = new Date().toLocaleTimeString();
    const message = `[${timestamp}] Sidebar ${collapsed ? 'collapsed' : 'expanded'}`;

    this.events = [...this.events.slice(-4), message];
  };

  render() {
    return html`
      <h1>🎨 Layout Component Demo</h1>

      <div class="demo-intro">
        <p>Create flexible page layouts with header, footer, sidebar, and content areas.</p>
      </div>

      <div class="demo-section">
        <h2>Basic Layout (Header + Content + Footer)</h2>
        <div class="layout-example">
          <ui-layout>
            <ui-layout-header>
              <div style="font-weight: 600;">Header</div>
              <div style="font-size: 0.9rem; color: rgba(15, 23, 42, 0.6);">Navigation & Logo</div>
            </ui-layout-header>
            <ui-layout-main>
              <div class="content-placeholder">Content Area</div>
            </ui-layout-main>
            <ui-layout-footer>
              <div style="font-size: 0.9rem;">© 2026 Your Company</div>
            </ui-layout-footer>
          </ui-layout>
        </div>
      </div>

      <div class="demo-section">
        <h2>Layout with Sidebar</h2>
        <div class="layout-example">
          <ui-layout direction="horizontal">
            <ui-layout-sidebar collapsible width="220" collapsed-width="60">
              <div class="sidebar-section">
                <div class="sidebar-label">Menu</div>
                <div class="sidebar-item">Dashboard</div>
                <div class="sidebar-item">Users</div>
                <div class="sidebar-item">Settings</div>
                <div class="sidebar-item">Analytics</div>
              </div>
            </ui-layout-sidebar>
            <ui-layout-main>
              <div class="content-placeholder">Main Content</div>
            </ui-layout-main>
          </ui-layout>
        </div>
      </div>

      <div class="demo-section">
        <h2>Full Layout (Header + Sidebar + Content + Footer)</h2>
        <div class="layout-example full-height">
          <ui-layout direction="vertical">
            <ui-layout-header height="60">
              <div style="font-weight: 600; font-size: 1.1rem;">App Header</div>
              <div style="display: flex; gap: 1rem;">
                <button style="padding: 0.5rem 1rem; background: #24ec71; color: white; border: none; border-radius: 6px; cursor: pointer;">Login</button>
              </div>
            </ui-layout-header>

            <ui-layout direction="horizontal" style="flex: 1;">
              <ui-layout-sidebar collapsible width="200" collapsed-width="60">
                <div class="sidebar-section">
                  <div class="sidebar-item">📊 Dashboard</div>
                  <div class="sidebar-item">👥 Users</div>
                  <div class="sidebar-item">📝 Projects</div>
                  <div class="sidebar-item">⚙️ Settings</div>
                </div>
              </ui-layout-sidebar>
              <ui-layout-main>
                <div style="padding: 2rem;">
                  <h3 style="margin: 0 0 1rem; color: #0f172a;">Welcome to the Dashboard</h3>
                  <p style="color: rgba(15, 23, 42, 0.6);">Try clicking the sidebar toggle button to collapse/expand the sidebar.</p>
                  <div style="margin-top: 2rem; padding: 1.5rem; background: #f1f5f9; border-radius: 8px;">
                    <p style="margin: 0; font-size: 0.95rem;">This is a full-featured layout with header, sidebar, content, and footer.</p>
                  </div>
                </div>
              </ui-layout-main>
            </ui-layout>

            <ui-layout-footer height="50">
              <div style="font-size: 0.9rem;">© 2026 Dashboard App</div>
              <div style="font-size: 0.85rem; color: rgba(15, 23, 42, 0.6);">v1.0.0</div>
            </ui-layout-footer>
          </ui-layout>
        </div>
      </div>

      <div class="demo-section">
        <h2>Sidebar Collapse Event</h2>
        <div class="demo-info">
          <p>Listen to <code>collapsed-change</code> event to react to sidebar state changes.</p>
          <div class="event-output ${this.events.length === 0 ? 'empty' : ''}">
            ${this.events.length > 0 ? this.events.join('\n') : 'Click the sidebar toggle to see events...'}
          </div>
        </div>
        <div class="layout-example" style="height: 300px;">
          <ui-layout direction="horizontal">
            <ui-layout-sidebar 
              id="eventSidebar" 
              collapsible 
              width="220"
              @collapsed-change=${this.handleCollapsedChange}
            >
              <div class="sidebar-item">Item 1</div>
              <div class="sidebar-item">Item 2</div>
              <div class="sidebar-item">Item 3</div>
            </ui-layout-sidebar>
            <ui-layout-main>
              <div class="content-placeholder">Content</div>
            </ui-layout-main>
          </ui-layout>
        </div>
      </div>
    `;
  }
}
