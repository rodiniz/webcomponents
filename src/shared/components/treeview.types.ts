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
