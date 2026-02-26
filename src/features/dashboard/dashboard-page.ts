import { BaseComponent } from '../../core/base-component';
import '../../layouts/app-layout';
import '../../shared/components/button';
import '../../shared/components/table';
import template from './dashboard-page.html?raw';
import type { TableColumn, TableRow } from '../../shared/components/table';
import styles from '../../styles/theme.css?inline';
import { store } from '../../core/store';

class DashboardPage extends BaseComponent {
  private count = this.useSignal(0);

  render(): void {
    this.shadowRoot!.innerHTML = `<style>${styles}</style>${template}`;

    const countEl = this.shadowRoot!.querySelector('#signal-count');
    if (countEl) {
      countEl.textContent = String(this.count.get());
    }

    const themeLabel = this.shadowRoot!.querySelector('#theme-label');
    const currentTheme = store.getState().theme;
    if (themeLabel) {
      themeLabel.textContent = currentTheme === 'shadcn' ? 'Shadcn' : 'Default';
    }

    const themeToggle = this.shadowRoot!.querySelector('#theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const nextTheme = store.getState().theme === 'shadcn' ? 'light' : 'shadcn';
        store.setState({ theme: nextTheme });
        this.render();
      });
    }

    const incButton = this.shadowRoot!.querySelector('#signal-inc');
    if (incButton) {
      incButton.addEventListener('click', () => {
        this.count.set(this.count.get() + 1);
      });
    }

    const columns: TableColumn[] = [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' },
      { key: 'score', label: 'Score', align: 'right' }
    ];

    const rows: TableRow[] = [
      { name: 'Ava Martins', role: 'Admin', status: 'Active', score: 298 },
      { name: 'Diego Silva', role: 'Editor', status: 'Active', score: 87 },
      { name: 'Lia Costa', role: 'Viewer', status: 'Inactive', score: 72 }
    ];

    const table = this.shadowRoot!.querySelector('ui-table') as
      | (HTMLElement & { data: { columns: TableColumn[]; rows: TableRow[] } })
      | null;
    if (table) {
      table.data = {
        columns,
        rows
      };
    }
  }
}

customElements.define('dashboard-page', DashboardPage);
