import { html } from 'lit';
import { unsafeHTML } from '../../core/template';
import type { TreeNode } from './treeview.types';

export function renderChevronIcon() {
  return html`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  `;
}

export function renderDefaultTreeIcon() {
  return html`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  `;
}

export function renderNodeIcon(node: TreeNode) {
  if (!node.icon) return renderDefaultTreeIcon();
  if (typeof node.icon === 'string' && node.icon.trim().startsWith('<')) {
    return unsafeHTML(node.icon);
  }
  return node.icon;
}

export const EMPTY_STATE_ICON_SVG =
  '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>';
