import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { TreeNode } from '../src/shared/components/treeview';
import { http } from '../src/lib/index';
import '../src/shared/components/treeview';

type TreeViewArgs = {
  multiSelect: boolean;
};

const meta: Meta<TreeViewArgs> = {
  title: 'Components/TreeView',
  tags: ['autodocs'],
  argTypes: {
    multiSelect: { control: 'boolean' }
  },
  args: {
    multiSelect: false
  }
};

export default meta;

type Story = StoryObj<TreeViewArgs>;

// Sample data for basic examples
const staticTreeData: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    children: [
      {
        id: '1.1',
        label: 'Forms',
        children: [
          { id: '1.1.1', label: 'Application Form', isLeaf: true },
          { id: '1.1.2', label: 'Contract Template', isLeaf: true }
        ]
      },
      {
        id: '1.2',
        label: 'Reports',
        children: [
          { id: '1.2.1', label: 'Q1 Summary', isLeaf: true },
          { id: '1.2.2', label: 'Q2 Summary', isLeaf: true }
        ]
      }
    ]
  },
  {
    id: '2',
    label: 'Media',
    children: [
      { id: '2.1', label: 'Images', isLeaf: false },
      { id: '2.2', label: 'Videos', isLeaf: false }
    ]
  },
  {
    id: '3',
    label: 'Settings',
    isLeaf: true
  }
];

/**
 * Basic TreeView with static data
 */
export const Playground: Story = {
  render: ({ multiSelect }) => html`
    <ui-treeview
      .items=${staticTreeData}
      ?multiSelect=${multiSelect}
      @node-selected=${(e: CustomEvent) => console.log('Node selected:', e.detail)}
      @node-expanded=${(e: CustomEvent) => console.log('Node expanded:', e.detail)}
    ></ui-treeview>
  `
};

/**
 * TreeView with Lazy Loading from API
 * Fetches child nodes on demand from JSONPlaceholder API
 */
export const LazyLoadingFromAPI: Story = {
  render: () => {
    class APITreeView extends HTMLElement {
      private treeElement: any;
      private nodeCount = 0;

      async connectedCallback() {
        this.innerHTML = `
          <div style="padding: 20px;">
            <div style="margin-bottom: 16px; padding: 12px; background-color: #e3f2fd; border-left: 4px solid #1976d2; border-radius: 2px;">
              <p style="margin: 0; font-size: 14px; color: #1976d2;">
                ℹ️ Click to expand folders and load child items from API
              </p>
            </div>
          </div>
        `;

        const container = document.createElement('div');
        container.style.padding = '20px';
        this.appendChild(container);

        const treeview = document.createElement('ui-treeview');
        container.appendChild(treeview);
        this.treeElement = treeview;

        // Initialize with root folders
        this.treeElement.items = [
          { id: 'users', label: 'Users', lazy: true },
          { id: 'posts', label: 'Posts', lazy: true },
          { id: 'comments', label: 'Comments', lazy: true }
        ];

        // Handle lazy loading
        this.treeElement.options = {
          onLoadChildren: async (node: TreeNode) => {
            try {
              const children = await this.loadChildrenFromAPI(node);
              return children;
            } catch (error) {
              console.error('Error loading children:', error);
              return [];
            }
          }
        };

        // Track selection
        this.treeElement.addEventListener('node-selected', (e: CustomEvent) => {
          console.log('Selected:', e.detail.node.label);
        });
      }

      private async loadChildrenFromAPI(parent: TreeNode): Promise<TreeNode[]> {
        const children: TreeNode[] = [];

        try {
          if (parent.id === 'users') {
            // Load first 5 users
            const data = await http.get<any>('https://jsonplaceholder.typicode.com/users?_limit=5');
            return data.map((user: any) => ({
              id: `user-${user.id}`,
              label: user.name,
              isLeaf: true,
              data: user
            }));
          } else if (parent.id === 'posts') {
            // Load first 5 posts
            const data = await http.get<any>('https://jsonplaceholder.typicode.com/posts?_limit=5');
            return data.map((post: any) => ({
              id: `post-${post.id}`,
              label: post.title.substring(0, 40) + '...',
              isLeaf: true,
              data: post
            }));
          } else if (parent.id === 'comments') {
            // Load first 5 comments
            const data = await http.get<any>('https://jsonplaceholder.typicode.com/comments?_limit=5');
            return data.map((comment: any) => ({
              id: `comment-${comment.id}`,
              label: comment.body.substring(0, 40) + '...',
              isLeaf: true,
              data: comment
            }));
          }
        } catch (error) {
          console.error('API Error:', error);
        }

        return children;
      }
    }

    if (!customElements.get('api-tree-view')) {
      customElements.define('api-tree-view', APITreeView);
    }

    return html`<api-tree-view></api-tree-view>`;
  }
};

/**
 * TreeView with Custom Node Rendering
 * Shows how to customize node appearance with templates
 */
export const CustomNodeRendering: Story = {
  render: () => html`
    <ui-treeview
      .items=${staticTreeData}
      .options=${{
        nodeTemplate: (node: TreeNode) => {
          // Add emoji based on node type
          let emoji = '📁';
          if (node.label.includes('Form')) emoji = '📝';
          if (node.label.includes('Report')) emoji = '📊';
          if (node.label.includes('Image')) emoji = '🖼️';
          if (node.label.includes('Video')) emoji = '🎬';
          if (node.label.includes('Settings')) emoji = '⚙️';

          return `${emoji} ${node.label}`;
        }
      }}
      @node-selected=${(e: CustomEvent) => {
        const { node } = e.detail;
        console.log('Selected node:', node.label);
      }}
    ></ui-treeview>
  `
};

/**
 * TreeView with Selection and Events
 * Demonstrates node selection, multi-select, and event handling
 */
export const SelectionAndEvents: Story = {
  render: () => {
    class SelectiveTreeView extends HTMLElement {
      private selectedNodes: Set<string> = new Set();

      async connectedCallback() {
        this.innerHTML = `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
            <div id="tree-panel">
              <h3 style="margin-top: 0; color: #333;">Folder Structure</h3>
            </div>
            <div>
              <h3 style="margin-top: 0; color: #333;">Selected Items</h3>
              <div id="selected-list" style="
                padding: 12px;
                border: 1px solid #e0e0e0;
                border-radius: 6px;
                min-height: 200px;
                background: #f5f5f5;
                font-size: 13px;
              ">
                <p style="color: #999; margin: 0;">No items selected</p>
              </div>
            </div>
          </div>
        `;

        const treePanel = this.querySelector('#tree-panel') as HTMLElement | null;
        if (!treePanel) return;

        const container = document.createElement('div');
        container.style.marginTop = '8px';
        treePanel.appendChild(container);

        const treeview = document.createElement('ui-treeview');
        (treeview as any).multiSelect = true;
        (treeview as any).items = staticTreeData;
        container.appendChild(treeview);

        // Handle selection
        (treeview as any).addEventListener('node-selected', (e: CustomEvent) => {
          const { node, selected } = e.detail;
          if (selected) {
            this.selectedNodes.add(node.id);
          } else {
            this.selectedNodes.delete(node.id);
          }
          this.updateSelectedList();
        });
      }

      private updateSelectedList() {
        const list = this.querySelector('#selected-list');
        if (!list) return;

        if (this.selectedNodes.size === 0) {
          list.innerHTML = '<p style="color: #999; margin: 0;">No items selected</p>';
        } else {
          list.innerHTML = Array.from(this.selectedNodes)
            .map(id => `<div style="padding: 4px 0;">✓ ${id}</div>`)
            .join('');
        }
      }
    }

    if (!customElements.get('selective-tree-view')) {
      customElements.define('selective-tree-view', SelectiveTreeView);
    }

    return html`<selective-tree-view></selective-tree-view>`;
  }
};

/**
 * TreeView with HTTPClient and Custom Configuration
 * Loads a complete tree structure from API with baseURL setup
 */
export const APIWithCustomConfig: Story = {
  render: () => {
    class ConfigurableTreeView extends HTMLElement {
      async connectedCallback() {
        this.innerHTML = `
          <div style="padding: 20px;">
            <div style="margin-bottom: 16px; padding: 12px; background-color: #fff3e0; border-left: 4px solid #ff9800; border-radius: 2px;">
              <p style="margin: 0; font-size: 14px; color: #f57c00;">
                ℹ️ Using HTTPClient with baseURL configuration
              </p>
            </div>
          </div>
        `;

        const container = document.createElement('div');
        container.style.padding = '20px';
        this.appendChild(container);

        const treeview = document.createElement('ui-treeview');
        container.appendChild(treeview);

        // Configure HTTP client
        http.setBaseURL('https://jsonplaceholder.typicode.com');
        http.setDefaultTimeout(8000);

        // Load initial structure
        (treeview as any).items = [
          { id: 'todos', label: 'Todos (Nested)', lazy: true },
          { id: 'albums', label: 'Albums (Nested)', lazy: true }
        ];

        // Configure lazy loading with custom options
        (treeview as any).options = {
          onLoadChildren: async (node: TreeNode) => {
            if (node.id === 'todos') {
              try {
                const data = await http.get<any>('/todos?userId=1&_limit=5');
                return data.map((todo: any) => ({
                  id: `todo-${todo.id}`,
                  label: `${todo.completed ? '✓' : '○'} ${todo.title}`,
                  isLeaf: true
                }));
              } catch (error) {
                console.error('Error loading todos:', error);
                return [];
              }
            } else if (node.id === 'albums') {
              try {
                const data = await http.get<any>('/albums?userId=1&_limit=5');
                return data.map((album: any) => ({
                  id: `album-${album.id}`,
                  label: album.title,
                  lazy: true
                }));
              } catch (error) {
                console.error('Error loading albums:', error);
                return [];
              }
            }
            return [];
          }
        };
      }
    }

    if (!customElements.get('configurable-tree-view')) {
      customElements.define('configurable-tree-view', ConfigurableTreeView);
    }

    return html`<configurable-tree-view></configurable-tree-view>`;
  }
};

/**
 * TreeView with Nested Lazy Loading
 * Demonstrates multi-level lazy loading from API
 */
export const NestedLazyLoading: Story = {
  render: () => {
    class NestedTreeView extends HTMLElement {
      async connectedCallback() {
        this.innerHTML = `
          <div style="padding: 20px;">
            <div style="margin-bottom: 16px; padding: 12px; background-color: #f3e5f5; border-left: 4px solid #9c27b0; border-radius: 2px;">
              <p style="margin: 0; font-size: 14px; color: #7b1fa2;">
                ℹ️ Each level loads data independently from the API on expansion
              </p>
            </div>
          </div>
        `;

        const container = document.createElement('div');
        container.style.padding = '20px';
        this.appendChild(container);

        const treeview = document.createElement('ui-treeview');
        container.appendChild(treeview);

        // Root level
        (treeview as any).items = [
          { id: 'users-root', label: 'All Users', lazy: true }
        ];

        (treeview as any).options = {
          onLoadChildren: async (node: TreeNode) => {
            // Level 1: Load users
            if (node.id === 'users-root') {
              try {
                const data = await http.get<any>('https://jsonplaceholder.typicode.com/users?_limit=3');
                return data.map((user: any) => ({
                  id: `user-${user.id}`,
                  label: user.name,
                  lazy: true,
                  data: user
                }));
              } catch (error) {
                return [];
              }
            }

            // Level 2: Load user details (posts, todos)
            if (node.id?.startsWith('user-')) {
              try {
                const userId = node.data?.id;
                const [posts, todos] = await Promise.all([
                  http.get<any>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=2`),
                  http.get<any>(`https://jsonplaceholder.typicode.com/todos?userId=${userId}&_limit=2`)
                ]);

                return [
                  {
                    id: `posts-of-${userId}`,
                    label: `Posts (${posts.length})`
                  },
                  {
                    id: `todos-of-${userId}`,
                    label: `Todos (${todos.length})`
                  }
                ];
              } catch (error) {
                return [];
              }
            }

            return [];
          }
        };
      }
    }

    if (!customElements.get('nested-tree-view')) {
      customElements.define('nested-tree-view', NestedTreeView);
    }

    return html`<nested-tree-view></nested-tree-view>`;
  }
};
