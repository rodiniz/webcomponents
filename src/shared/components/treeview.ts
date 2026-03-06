import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap, unsafeHTML } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';
import './spinner';

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  isLeaf?: boolean;
  lazy?: boolean;
  data?: any;
  [key: string]: any;
}

export interface TreeViewOptions {
  nodeTemplate?: (node: TreeNode) => string | HTMLElement;
  onLoadChildren?: (node: TreeNode) => Promise<TreeNode[]>;
  onNodeSelect?: (node: TreeNode) => void;
  multiSelect?: boolean;
  autoExpand?: boolean;
}

export interface TreeNodeChangedDetail {
  node: TreeNode;
  expanded: boolean;
}

export interface TreeNodeSelectedDetail {
  node: TreeNode;
  selected: boolean;
}

@customElement('ui-treeview')
export class UITreeView extends LitElement {
  static styles = [
    unsafeCSS(themeStyles),
    css`
      :host {
        display: block;
        --tree-indent: 20px;
        --tree-node-height: 36px;
        --tree-transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
        --tree-bg: #ffffff;
        --tree-hover-bg: #f5f5f5;
        --tree-text: #333333;
        --tree-text-secondary: #666666;
        --tree-border: #e0e0e0;
        --tree-accent: #2196f3;
        --tree-accent-light: rgba(33, 150, 243, 0.08);
      }

      .tree-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        color: var(--tree-text);
        background: var(--tree-bg);
        border-radius: 8px;
        overflow: hidden;
      }

      .tree-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .tree-node {
        display: block;
        margin: 0;
        padding: 0;
      }

      .node-item {
        display: flex;
        align-items: center;
        height: var(--tree-node-height);
        padding: 0 8px;
        cursor: pointer;
        border-radius: 6px;
        transition: background-color var(--tree-transition),
                    color var(--tree-transition);
        position: relative;
        gap: 4px;
      }

      .node-item:hover {
        background-color: var(--tree-hover-bg);
      }

      .node-item.selected {
        background-color: var(--tree-accent-light);
        color: var(--tree-accent);
      }

      .node-item.selected .node-label {
        font-weight: 600;
      }

      .expand-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--tree-text-secondary);
        transition: transform var(--tree-transition), color var(--tree-transition);
        flex-shrink: 0;
      }

      .expand-toggle:hover {
        color: var(--tree-accent);
      }

      .expand-toggle.expanded {
        transform: rotate(90deg);
      }

      .expand-toggle svg {
        width: 16px;
        height: 16px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .node-icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .node-icon svg {
        width: 16px;
        height: 16px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .node-label {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        transition: color var(--tree-transition);
      }

      .loading-spinner {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
      }

      .children {
        max-height: 0;
        overflow: hidden;
        transition: max-height var(--tree-transition) ease-in-out;
      }

      .children.expanded {
        max-height: 10000px;
      }

      .children-wrapper {
        padding-left: var(--tree-indent);
        border-left: 1px solid var(--tree-border);
        margin-left: 8px;
      }

      .placeholder {
        padding: 16px 8px;
        color: var(--tree-text-secondary);
        font-size: 13px;
        text-align: center;
      }

      .empty-state {
        padding: 32px 16px;
        text-align: center;
        color: var(--tree-text-secondary);
        font-size: 14px;
      }

      .empty-state svg {
        width: 48px;
        height: 48px;
        margin-bottom: 12px;
        opacity: 0.3;
        stroke: currentColor;
        stroke-width: 1.5;
        fill: none;
      }

      .loader-item {
        display: flex;
        align-items: center;
        height: var(--tree-node-height);
        padding: 0 8px;
      }
    `
  ];

  @property({ type: Array }) items: TreeNode[] = [];
  @property({ type: Object }) options: TreeViewOptions = {};
  @property({ type: Boolean, reflect: true }) multiSelect: boolean = false;

  @state() private expandedNodeIds: Set<string> = new Set();
  @state() private selectedNodeIds: Set<string> = new Set();
  @state() private loadingNodeIds: Set<string> = new Set();
  @state() private nodeChildrenCache: Map<string, TreeNode[]> = new Map();

  connectedCallback(): void {
    this.setAttribute('data-ui', 'treeview');
    super.connectedCallback();
  }

  private getChevronIcon() {
    return html`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;
  }

  private getDefaultIcon() {
    return html`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
  }

  private renderNodeIcon(node: TreeNode) {
    if (!node.icon) return this.getDefaultIcon();
    if (typeof node.icon === 'string' && node.icon.trim().startsWith('<')) {
      return unsafeHTML(node.icon);
    }
    return node.icon;
  }

  private toggleNode(node: TreeNode, e: MouseEvent): void {
    e.stopPropagation();

    if (this.expandedNodeIds.has(node.id)) {
      this.expandedNodeIds.delete(node.id);
    } else {
      this.expandedNodeIds.add(node.id);
      
      // Load children if lazy and not cached
      if (node.lazy && !this.nodeChildrenCache.has(node.id)) {
        this.loadChildren(node);
      }
    }

    this.expandedNodeIds = new Set(this.expandedNodeIds);

    this.dispatchEvent(
      new CustomEvent<TreeNodeChangedDetail>('node-expanded', {
        detail: {
          node,
          expanded: this.expandedNodeIds.has(node.id)
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private async loadChildren(node: TreeNode): Promise<void> {
    this.loadingNodeIds.add(node.id);
    this.loadingNodeIds = new Set(this.loadingNodeIds);

    try {
      let children: TreeNode[] = [];

      if (this.options.onLoadChildren) {
        children = await this.options.onLoadChildren(node);
      }

      this.nodeChildrenCache.set(node.id, children);
    } catch (error) {
      console.error('Error loading children for node:', node.id, error);
    } finally {
      this.loadingNodeIds.delete(node.id);
      this.loadingNodeIds = new Set(this.loadingNodeIds);
    }
  }

  private selectNode(node: TreeNode, e: MouseEvent): void {
    e.stopPropagation();

    const isSelected = this.selectedNodeIds.has(node.id);

    if (!this.multiSelect) {
      this.selectedNodeIds.clear();
    }

    if (isSelected) {
      this.selectedNodeIds.delete(node.id);
    } else {
      this.selectedNodeIds.add(node.id);
    }

    this.selectedNodeIds = new Set(this.selectedNodeIds);

    this.dispatchEvent(
      new CustomEvent<TreeNodeSelectedDetail>('node-selected', {
        detail: {
          node,
          selected: this.selectedNodeIds.has(node.id)
        },
        bubbles: true,
        composed: true
      })
    );

    this.options.onNodeSelect?.(node);
  }

  private renderNode(node: TreeNode): unknown {
    const hasChildren = node.children && node.children.length > 0;
    const isLazy = node.lazy && !this.nodeChildrenCache.has(node.id);
    const canExpand = hasChildren || isLazy || node.lazy;
    const isExpanded = this.expandedNodeIds.has(node.id);
    const isSelected = this.selectedNodeIds.has(node.id);
    const isLoading = this.loadingNodeIds.has(node.id);
    const cachedChildren = this.nodeChildrenCache.get(node.id) || [];
    const displayChildren = hasChildren ? node.children : cachedChildren;

    const itemClasses = classMap({
      'node-item': true,
      'selected': isSelected
    });

    const toggleClasses = classMap({
      'expand-toggle': true,
      'expanded': isExpanded && canExpand ? true : false
    });

    return html`
      <li class="tree-node">
        <div class=${itemClasses} @click=${(e: MouseEvent) => this.selectNode(node, e)}>
          ${canExpand
            ? html`
                <button
                  class=${toggleClasses}
                  @click=${(e: MouseEvent) => this.toggleNode(node, e)}
                  aria-label=${isExpanded ? 'Collapse' : 'Expand'}
                >
                  ${this.getChevronIcon()}
                </button>
              `
            : html`<div class="expand-toggle" style="visibility: hidden;"></div>`}

          <div class="node-icon">${this.renderNodeIcon(node)}</div>

          ${this.options.nodeTemplate
            ? html`<span class="node-label">${this.options.nodeTemplate(node)}</span>`
            : html`<span class="node-label">${node.label}</span>`}

          ${isLoading
            ? html`
                <div class="loading-spinner">
                  <ui-spinner size="sm" variant="primary"></ui-spinner>
                </div>
              `
            : ''}
        </div>

        ${canExpand && displayChildren && displayChildren.length > 0
          ? html`
              <ul
                class=${classMap({
                  'children': true,
                  'expanded': isExpanded
                })}
              >
                <li class="children-wrapper">
                  ${displayChildren.map((child) => this.renderNode(child))}
                </li>
              </ul>
            `
          : ''}

        ${canExpand && isExpanded && isLoading
          ? html`
              <div class="placeholder">
                Loading...
              </div>
            `
          : ''}
      </li>
    `;
  }

  render() {
    if (this.items.length === 0) {
      return html`
        <div class="tree-container">
          <div class="empty-state">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <p>No items to display</p>
          </div>
        </div>
      `;
    }

    return html`
      <div class="tree-container">
        <ul class="tree-list">
          ${this.items.map((item) => this.renderNode(item))}
        </ul>
      </div>
    `;
  }
}


