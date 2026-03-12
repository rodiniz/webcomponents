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

  it('should render values by column keys from rows with extra fields', async () => {
    const el = table as any;
    el.columns = [
      { key: 'id', label: 'Post ID' },
      { key: 'title', label: 'Title' },
      { key: 'userId', label: 'Author ID' }
    ];
    el.rows = [
      {
        id: 1,
        userId: 10,
        title: 'Post title',
        body: 'Extra field should not require manual row mapping'
      }
    ];

    await el.updateComplete;

    const cells = Array.from(table.shadowRoot?.querySelectorAll('tbody tr td') ?? []);
    expect(cells.length).toBe(3);
    expect(cells[0]?.textContent?.trim()).toContain('1');
    expect(cells[1]?.textContent?.trim()).toContain('Post title');
    expect(cells[2]?.textContent?.trim()).toContain('10');
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

  it('should expand row when nested children are in exports field', async () => {
    const el = table as any;
    el.columns = [
      { key: 'title', label: 'Title' },
      { key: 'duration', label: 'Duration' },
      { key: 'status', label: 'Status' }
    ];
    el.rows = [
      {
        recordingId: '4d028e70-da81-46f6-bd29-037e174f2fc6',
        title: 'iBabs Debrief',
        duration: null,
        status: 4,
        exports: [
          {
            id: '75f7bb01-c32e-41cb-b024-09ac27b9212f',
            exportType: 0,
            exportedDate: '2026-02-19T10:40:11.614057Z',
            size: 0,
            status: 3
          }
        ]
      }
    ];

    await el.updateComplete;

    const expandBtn = table.shadowRoot?.querySelector('tbody tr.has-children ui-button') as HTMLElement;
    expect(expandBtn).toBeTruthy();

    expandBtn.click();
    await el.updateComplete;

    const childWrapperRow = table.shadowRoot?.querySelector('tbody tr.child-row');
    const nestedHeaders = table.shadowRoot?.querySelectorAll('tbody tr.child-row .nested-table thead th');
    const nestedRows = table.shadowRoot?.querySelectorAll('tbody tr.child-row .nested-table tbody tr');

    expect(childWrapperRow).toBeTruthy();
    expect(nestedHeaders?.length).toBe(5);
    expect(nestedRows?.length).toBe(1);
  });
});
