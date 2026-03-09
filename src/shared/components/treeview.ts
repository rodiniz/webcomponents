import { html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import themeStyles from '../../styles/theme.css?inline';
import {
  renderChevronIcon,
  renderNodeIcon
} from './treeview-icons';
import { treeViewStyles } from './treeview.styles';
import type {
  TreeNode,
  TreeViewOptions,
  TreeNodeChangedDetail,
  TreeNodeSelectedDetail
} from './treeview.types';
import './spinner';

export type {
  TreeNode,
  TreeViewOptions,
  TreeNodeChangedDetail,
  TreeNodeSelectedDetail
} from './treeview.types';

@customElement('ui-treeview')
export class UITreeView extends UIComponentBase {
  static styles = [
    unsafeCSS(themeStyles),
    treeViewStyles
  ];

  @property({ type: Array }) items: TreeNode[] = [];
  @property({ type: Object }) options: TreeViewOptions = {};
  @property({ type: Boolean, reflect: true }) multiSelect: boolean = false;

  @state() private expandedNodeIds: Set<string> = new Set();
  @state() private selectedNodeIds: Set<string> = new Set();
  @state() private loadingNodeIds: Set<string> = new Set();
  @state() private nodeChildrenCache: Map<string, TreeNode[]> = new Map();

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

    this.emit<TreeNodeChangedDetail>('node-expanded', {
      node,
      expanded: this.expandedNodeIds.has(node.id)
    });
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

    this.emit<TreeNodeSelectedDetail>('node-selected', {
      node,
      selected: this.selectedNodeIds.has(node.id)
    });

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
                  ${renderChevronIcon()}
                </button>
              `
            : html`<div class="expand-toggle" style="visibility: hidden;"></div>`}

          <div class="node-icon">${renderNodeIcon(node)}</div>

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


