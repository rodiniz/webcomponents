import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/table';

describe('UITable', () => {
  let table: HTMLElement;

  beforeEach(() => {
    table = document.createElement('ui-table');
    document.body.appendChild(table);
  });

  afterEach(() => {
    table.remove();
  });

  it('should render table inside shadow DOM', () => {
    const shadowRoot = table.shadowRoot;
    expect(shadowRoot?.querySelector('.table-wrap')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(table.getAttribute('data-ui')).toBe('table');
  });

  it('should render columns', async () => {
    const el = table as any;
    el.columns = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' }
    ];
    el.rows = [{ name: 'John', email: 'john@example.com' }];
    await el.updateComplete;
    
    const headers = table.shadowRoot?.querySelectorAll('th');
    expect(headers?.length).toBe(2);
  });

  it('should render rows', async () => {
    const el = table as any;
    el.columns = [{ key: 'name', label: 'Name' }];
    el.rows = [
      { name: 'John' },
      { name: 'Jane' }
    ];
    await el.updateComplete;
    
    const rows = table.shadowRoot?.querySelectorAll('tbody tr');
    expect(rows?.length).toBe(2);
  });

  it('should apply bordered class by default', () => {
    const wrap = table.shadowRoot?.querySelector('.table-wrap');
    expect(wrap?.classList.contains('no-border')).toBe(false);
  });

  it('should apply zebra class', async () => {
    table.setAttribute('zebra', '');
    await (table as any).updateComplete;
    const wrap = table.shadowRoot?.querySelector('.table-wrap');
    expect(wrap?.classList.contains('zebra')).toBe(true);
  });

  it('should render sortable columns', async () => {
    const el = table as any;
    el.columns = [
      { key: 'name', label: 'Name', sortable: true }
    ];
    el.rows = [{ name: 'John' }];
    await el.updateComplete;
    
    const header = table.shadowRoot?.querySelector('th.sortable');
    expect(header).toBeTruthy();
  });

  it('should emit action event on action button click', async () => {
    const el = table as any;
    el.columns = [
      { key: 'name', label: 'Name' },
      { key: 'actions', label: 'Actions', actions: { edit: true } }
    ];
    el.rows = [{ name: 'John' }];
    await el.updateComplete;
    
    let eventFired = false;
    table.addEventListener('action', () => { eventFired = true; });
    
    const actionBtn = table.shadowRoot?.querySelector('.action-btn');
    (actionBtn as HTMLElement).click();
    expect(eventFired).toBe(true);
  });

  it('should expand row when childRows are provided', async () => {
    const el = table as any;
    el.columns = [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' }
    ];
    el.rows = [
      {
        name: 'Parent Row',
        role: 'Lead',
        childRows: [
          { name: 'Child A', role: 'Engineer' },
          { name: 'Child B', role: 'Designer' }
        ]
      }
    ];
    await el.updateComplete;

    const expandBtn = table.shadowRoot?.querySelector('tbody tr.has-children ui-button') as HTMLElement;
    expect(expandBtn).toBeTruthy();

    expandBtn.click();
    await el.updateComplete;

    const childWrapperRow = table.shadowRoot?.querySelector('tbody tr.child-row');
    const nestedRows = table.shadowRoot?.querySelectorAll('tbody tr.child-row .nested-table tbody tr');

    expect(childWrapperRow).toBeTruthy();
    expect(nestedRows?.length).toBe(2);
  });
});
