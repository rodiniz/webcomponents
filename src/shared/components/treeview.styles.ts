import { css } from 'lit';

export const treeViewStyles = css`
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
    transition: background-color var(--tree-transition), color var(--tree-transition);
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
`;
