import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/treeview';

describe('UITreeView', () => {
  let treeview: HTMLElement;

  beforeEach(() => {
    treeview = document.createElement('ui-treeview');
    document.body.appendChild(treeview);
  });

  afterEach(() => {
    treeview.remove();
  });

  it('should render treeview inside shadow DOM', () => {
    const shadowRoot = treeview.shadowRoot;
    expect(shadowRoot?.querySelector('.tree-container')).toBeTruthy();
  });

  it('should have data-ui attribute', () => {
    expect(treeview.getAttribute('data-ui')).toBe('treeview');
  });

  it('should show empty state when no items', () => {
    const emptyState = treeview.shadowRoot?.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
  });

  it('should render items', async () => {
    const el = treeview as any;
    el.items = [
      { id: '1', label: 'Node 1' },
      { id: '2', label: 'Node 2' }
    ];
    await el.updateComplete;
    
    const nodes = treeview.shadowRoot?.querySelectorAll('.node-item');
    expect(nodes?.length).toBe(2);
  });

  it('should render nested items', async () => {
    const el = treeview as any;
    el.items = [
      {
        id: '1',
        label: 'Node 1',
        children: [
          { id: '1-1', label: 'Child 1' }
        ]
      }
    ];
    await el.updateComplete;
    
    const nodes = treeview.shadowRoot?.querySelectorAll('.node-item');
    expect(nodes?.length).toBe(2);
  });

  it('should have expand toggle for nodes with children', async () => {
    const el = treeview as any;
    el.items = [
      {
        id: '1',
        label: 'Node 1',
        children: [{ id: '1-1', label: 'Child 1' }]
      }
    ];
    await el.updateComplete;
    
    const toggle = treeview.shadowRoot?.querySelector('.expand-toggle');
    expect(toggle).toBeTruthy();
  });

  it('should emit node-selected event on node click', async () => {
    const el = treeview as any;
    el.items = [{ id: '1', label: 'Node 1' }];
    await el.updateComplete;
    
    const node = treeview.shadowRoot?.querySelector('.node-item');
    let eventFired = false;
    treeview.addEventListener('node-selected', () => { eventFired = true; });
    
    (node as HTMLElement).click();
    expect(eventFired).toBe(true);
  });
});
