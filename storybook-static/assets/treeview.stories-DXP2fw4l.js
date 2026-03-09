import{b as l}from"./iframe-Ck3e-F9w.js";import"./button-C3WNtjOb.js";import"./input-DpGqbU1A.js";import{h as d}from"./http-yWwJkjL9.js";import"./date-picker-M1CLS8-A.js";import"./pagination-DWUZQ7bE.js";import"./modal-_aGH9G5V.js";import"./select-B4iwFhno.js";import"./checkbox-B_0rBhyF.js";import"./tabs-JPaZ1uAP.js";import"./card-E02Fqa-A.js";import"./toast-hujraZ8_.js";import"./stepper-CTUFtMcY.js";import"./upload-DoI1I2V3.js";import"./picklist-DC7830iE.js";import"./toggle-switch-Cmm-JnXl.js";import"./link-BFoJBV43.js";import"./accordion-fpeuHaiB.js";import"./spinner-QkkTxkQg.js";import"./tooltip-CsDM52S5.js";import"./dropdown-CRRhDzr_.js";import"./layout-D8UPBAOM.js";import"./icon-helpers-uywyl4Wq.js";import"./unsafe-html-7KbQsD9c.js";import"./icons-lgEBa0uT.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./template-1VJuhrPW.js";import"./theme-DBvyg58T.js";import"./class-builders-BssWg5Cc.js";import"./query-BApjzB0v.js";import"./click-outside-CXo2mreH.js";import"./keyboard-helpers-TtfJu0Hs.js";import"./validators-OS32PDZK.js";import"./_commonjsHelpers-Cpj98o6Y.js";const ze={title:"Components/TreeView",tags:["autodocs"],argTypes:{multiSelect:{control:"boolean"}},args:{multiSelect:!1}},v=[{id:"1",label:"Documents",children:[{id:"1.1",label:"Forms",children:[{id:"1.1.1",label:"Application Form",isLeaf:!0},{id:"1.1.2",label:"Contract Template",isLeaf:!0}]},{id:"1.2",label:"Reports",children:[{id:"1.2.1",label:"Q1 Summary",isLeaf:!0},{id:"1.2.2",label:"Q2 Summary",isLeaf:!0}]}]},{id:"2",label:"Media",children:[{id:"2.1",label:"Images",isLeaf:!1},{id:"2.2",label:"Videos",isLeaf:!1}]},{id:"3",label:"Settings",isLeaf:!0}],m={render:({multiSelect:r})=>l`
    <ui-treeview
      .items=${v}
      ?multiSelect=${r}
      @node-selected=${o=>console.log("Node selected:",o.detail)}
      @node-expanded=${o=>console.log("Node expanded:",o.detail)}
    ></ui-treeview>
  `},p={render:()=>{class r extends HTMLElement{constructor(){super(...arguments),this.nodeCount=0}async connectedCallback(){this.innerHTML=`
          <div style="padding: 20px;">
            <div style="margin-bottom: 16px; padding: 12px; background-color: #e3f2fd; border-left: 4px solid #1976d2; border-radius: 2px;">
              <p style="margin: 0; font-size: 14px; color: #1976d2;">
                ℹ️ Click to expand folders and load child items from API
              </p>
            </div>
          </div>
        `;const t=document.createElement("div");t.style.padding="20px",this.appendChild(t);const i=document.createElement("ui-treeview");t.appendChild(i),this.treeElement=i,this.treeElement.items=[{id:"users",label:"Users",lazy:!0},{id:"posts",label:"Posts",lazy:!0},{id:"comments",label:"Comments",lazy:!0}],this.treeElement.options={onLoadChildren:async n=>{try{return await this.loadChildrenFromAPI(n)}catch(e){return console.error("Error loading children:",e),[]}}},this.treeElement.addEventListener("node-selected",n=>{console.log("Selected:",n.detail.node.label)})}async loadChildrenFromAPI(t){const i=[];try{if(t.id==="users")return(await d.get("https://jsonplaceholder.typicode.com/users?_limit=5")).map(e=>({id:`user-${e.id}`,label:e.name,isLeaf:!0,data:e}));if(t.id==="posts")return(await d.get("https://jsonplaceholder.typicode.com/posts?_limit=5")).map(e=>({id:`post-${e.id}`,label:e.title.substring(0,40)+"...",isLeaf:!0,data:e}));if(t.id==="comments")return(await d.get("https://jsonplaceholder.typicode.com/comments?_limit=5")).map(e=>({id:`comment-${e.id}`,label:e.body.substring(0,40)+"...",isLeaf:!0,data:e}))}catch(n){console.error("API Error:",n)}return i}}return customElements.get("api-tree-view")||customElements.define("api-tree-view",r),l`<api-tree-view></api-tree-view>`}},u={render:()=>l`
    <ui-treeview
      .items=${v}
      .options=${{nodeTemplate:r=>{let o="📁";return r.label.includes("Form")&&(o="📝"),r.label.includes("Report")&&(o="📊"),r.label.includes("Image")&&(o="🖼️"),r.label.includes("Video")&&(o="🎬"),r.label.includes("Settings")&&(o="⚙️"),`${o} ${r.label}`}}}
      @node-selected=${r=>{const{node:o}=r.detail;console.log("Selected node:",o.label)}}
    ></ui-treeview>
  `},h={render:()=>{class r extends HTMLElement{constructor(){super(...arguments),this.selectedNodes=new Set}async connectedCallback(){this.innerHTML=`
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
        `;const t=this.querySelector("#tree-panel");if(!t)return;const i=document.createElement("div");i.style.marginTop="8px",t.appendChild(i);const n=document.createElement("ui-treeview");n.multiSelect=!0,n.items=v,i.appendChild(n),n.addEventListener("node-selected",e=>{const{node:s,selected:a}=e.detail;a?this.selectedNodes.add(s.id):this.selectedNodes.delete(s.id),this.updateSelectedList()})}updateSelectedList(){const t=this.querySelector("#selected-list");t&&(this.selectedNodes.size===0?t.innerHTML='<p style="color: #999; margin: 0;">No items selected</p>':t.innerHTML=Array.from(this.selectedNodes).map(i=>`<div style="padding: 4px 0;">✓ ${i}</div>`).join(""))}}return customElements.get("selective-tree-view")||customElements.define("selective-tree-view",r),l`<selective-tree-view></selective-tree-view>`}},g={render:()=>{class r extends HTMLElement{async connectedCallback(){this.innerHTML=`
          <div style="padding: 20px;">
            <div style="margin-bottom: 16px; padding: 12px; background-color: #fff3e0; border-left: 4px solid #ff9800; border-radius: 2px;">
              <p style="margin: 0; font-size: 14px; color: #f57c00;">
                ℹ️ Using HTTPClient with baseURL configuration
              </p>
            </div>
          </div>
        `;const t=document.createElement("div");t.style.padding="20px",this.appendChild(t);const i=document.createElement("ui-treeview");t.appendChild(i),d.setBaseURL("https://jsonplaceholder.typicode.com"),d.setDefaultTimeout(8e3),i.items=[{id:"todos",label:"Todos (Nested)",lazy:!0},{id:"albums",label:"Albums (Nested)",lazy:!0}],i.options={onLoadChildren:async n=>{if(n.id==="todos")try{return(await d.get("/todos?userId=1&_limit=5")).map(s=>({id:`todo-${s.id}`,label:`${s.completed?"✓":"○"} ${s.title}`,isLeaf:!0}))}catch(e){return console.error("Error loading todos:",e),[]}else if(n.id==="albums")try{return(await d.get("/albums?userId=1&_limit=5")).map(s=>({id:`album-${s.id}`,label:s.title,lazy:!0}))}catch(e){return console.error("Error loading albums:",e),[]}return[]}}}}return customElements.get("configurable-tree-view")||customElements.define("configurable-tree-view",r),l`<configurable-tree-view></configurable-tree-view>`}},f={render:()=>{class r extends HTMLElement{async connectedCallback(){this.innerHTML=`
          <div style="padding: 20px;">
            <div style="margin-bottom: 16px; padding: 12px; background-color: #f3e5f5; border-left: 4px solid #9c27b0; border-radius: 2px;">
              <p style="margin: 0; font-size: 14px; color: #7b1fa2;">
                ℹ️ Each level loads data independently from the API on expansion
              </p>
            </div>
          </div>
        `;const t=document.createElement("div");t.style.padding="20px",this.appendChild(t);const i=document.createElement("ui-treeview");t.appendChild(i),i.items=[{id:"users-root",label:"All Users",lazy:!0}],i.options={onLoadChildren:async n=>{var e,s;if(n.id==="users-root")try{return(await d.get("https://jsonplaceholder.typicode.com/users?_limit=3")).map(c=>({id:`user-${c.id}`,label:c.name,lazy:!0,data:c}))}catch{return[]}if((e=n.id)!=null&&e.startsWith("user-"))try{const a=(s=n.data)==null?void 0:s.id,[c,J]=await Promise.all([d.get(`https://jsonplaceholder.typicode.com/posts?userId=${a}&_limit=2`),d.get(`https://jsonplaceholder.typicode.com/todos?userId=${a}&_limit=2`)]);return[{id:`posts-of-${a}`,label:`Posts (${c.length})`},{id:`todos-of-${a}`,label:`Todos (${J.length})`}]}catch{return[]}return[]}}}}return customElements.get("nested-tree-view")||customElements.define("nested-tree-view",r),l`<nested-tree-view></nested-tree-view>`}};var y,b,w,x,L;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: ({
    multiSelect
  }) => html\`
    <ui-treeview
      .items=\${staticTreeData}
      ?multiSelect=\${multiSelect}
      @node-selected=\${(e: CustomEvent) => console.log('Node selected:', e.detail)}
      @node-expanded=\${(e: CustomEvent) => console.log('Node expanded:', e.detail)}
    ></ui-treeview>
  \`
}`,...(w=(b=m.parameters)==null?void 0:b.docs)==null?void 0:w.source},description:{story:"Basic TreeView with static data",...(L=(x=m.parameters)==null?void 0:x.docs)==null?void 0:L.description}}};var E,T,C,$,S;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => {
    class APITreeView extends HTMLElement {
      private treeElement: any;
      private nodeCount = 0;
      async connectedCallback() {
        this.innerHTML = \`
          <div style="padding: 20px;">
            <div style="margin-bottom: 16px; padding: 12px; background-color: #e3f2fd; border-left: 4px solid #1976d2; border-radius: 2px;">
              <p style="margin: 0; font-size: 14px; color: #1976d2;">
                ℹ️ Click to expand folders and load child items from API
              </p>
            </div>
          </div>
        \`;
        const container = document.createElement('div');
        container.style.padding = '20px';
        this.appendChild(container);
        const treeview = document.createElement('ui-treeview');
        container.appendChild(treeview);
        this.treeElement = treeview;

        // Initialize with root folders
        this.treeElement.items = [{
          id: 'users',
          label: 'Users',
          lazy: true
        }, {
          id: 'posts',
          label: 'Posts',
          lazy: true
        }, {
          id: 'comments',
          label: 'Comments',
          lazy: true
        }];

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
              id: \`user-\${user.id}\`,
              label: user.name,
              isLeaf: true,
              data: user
            }));
          } else if (parent.id === 'posts') {
            // Load first 5 posts
            const data = await http.get<any>('https://jsonplaceholder.typicode.com/posts?_limit=5');
            return data.map((post: any) => ({
              id: \`post-\${post.id}\`,
              label: post.title.substring(0, 40) + '...',
              isLeaf: true,
              data: post
            }));
          } else if (parent.id === 'comments') {
            // Load first 5 comments
            const data = await http.get<any>('https://jsonplaceholder.typicode.com/comments?_limit=5');
            return data.map((comment: any) => ({
              id: \`comment-\${comment.id}\`,
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
    return html\`<api-tree-view></api-tree-view>\`;
  }
}`,...(C=(T=p.parameters)==null?void 0:T.docs)==null?void 0:C.source},description:{story:`TreeView with Lazy Loading from API\r
Fetches child nodes on demand from JSONPlaceholder API`,...(S=($=p.parameters)==null?void 0:$.docs)==null?void 0:S.description}}};var I,N,P,z,A;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => html\`
    <ui-treeview
      .items=\${staticTreeData}
      .options=\${{
    nodeTemplate: (node: TreeNode) => {
      // Add emoji based on node type
      let emoji = '📁';
      if (node.label.includes('Form')) emoji = '📝';
      if (node.label.includes('Report')) emoji = '📊';
      if (node.label.includes('Image')) emoji = '🖼️';
      if (node.label.includes('Video')) emoji = '🎬';
      if (node.label.includes('Settings')) emoji = '⚙️';
      return \`\${emoji} \${node.label}\`;
    }
  }}
      @node-selected=\${(e: CustomEvent) => {
    const {
      node
    } = e.detail;
    console.log('Selected node:', node.label);
  }}
    ></ui-treeview>
  \`
}`,...(P=(N=u.parameters)==null?void 0:N.docs)==null?void 0:P.source},description:{story:`TreeView with Custom Node Rendering\r
Shows how to customize node appearance with templates`,...(A=(z=u.parameters)==null?void 0:z.docs)==null?void 0:A.description}}};var H,j,M,V,k;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => {
    class SelectiveTreeView extends HTMLElement {
      private selectedNodes: Set<string> = new Set();
      async connectedCallback() {
        this.innerHTML = \`
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
        \`;
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
          const {
            node,
            selected
          } = e.detail;
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
          list.innerHTML = Array.from(this.selectedNodes).map(id => \`<div style="padding: 4px 0;">✓ \${id}</div>\`).join('');
        }
      }
    }
    if (!customElements.get('selective-tree-view')) {
      customElements.define('selective-tree-view', SelectiveTreeView);
    }
    return html\`<selective-tree-view></selective-tree-view>\`;
  }
}`,...(M=(j=h.parameters)==null?void 0:j.docs)==null?void 0:M.source},description:{story:`TreeView with Selection and Events\r
Demonstrates node selection, multi-select, and event handling`,...(k=(V=h.parameters)==null?void 0:V.docs)==null?void 0:k.description}}};var _,F,R,U,D;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => {
    class ConfigurableTreeView extends HTMLElement {
      async connectedCallback() {
        this.innerHTML = \`
          <div style="padding: 20px;">
            <div style="margin-bottom: 16px; padding: 12px; background-color: #fff3e0; border-left: 4px solid #ff9800; border-radius: 2px;">
              <p style="margin: 0; font-size: 14px; color: #f57c00;">
                ℹ️ Using HTTPClient with baseURL configuration
              </p>
            </div>
          </div>
        \`;
        const container = document.createElement('div');
        container.style.padding = '20px';
        this.appendChild(container);
        const treeview = document.createElement('ui-treeview');
        container.appendChild(treeview);

        // Configure HTTP client
        http.setBaseURL('https://jsonplaceholder.typicode.com');
        http.setDefaultTimeout(8000);

        // Load initial structure
        (treeview as any).items = [{
          id: 'todos',
          label: 'Todos (Nested)',
          lazy: true
        }, {
          id: 'albums',
          label: 'Albums (Nested)',
          lazy: true
        }];

        // Configure lazy loading with custom options
        (treeview as any).options = {
          onLoadChildren: async (node: TreeNode) => {
            if (node.id === 'todos') {
              try {
                const data = await http.get<any>('/todos?userId=1&_limit=5');
                return data.map((todo: any) => ({
                  id: \`todo-\${todo.id}\`,
                  label: \`\${todo.completed ? '✓' : '○'} \${todo.title}\`,
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
                  id: \`album-\${album.id}\`,
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
    return html\`<configurable-tree-view></configurable-tree-view>\`;
  }
}`,...(R=(F=g.parameters)==null?void 0:F.docs)==null?void 0:R.source},description:{story:`TreeView with HTTPClient and Custom Configuration\r
Loads a complete tree structure from API with baseURL setup`,...(D=(U=g.parameters)==null?void 0:U.docs)==null?void 0:D.description}}};var q,W,B,O,Q;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    class NestedTreeView extends HTMLElement {
      async connectedCallback() {
        this.innerHTML = \`
          <div style="padding: 20px;">
            <div style="margin-bottom: 16px; padding: 12px; background-color: #f3e5f5; border-left: 4px solid #9c27b0; border-radius: 2px;">
              <p style="margin: 0; font-size: 14px; color: #7b1fa2;">
                ℹ️ Each level loads data independently from the API on expansion
              </p>
            </div>
          </div>
        \`;
        const container = document.createElement('div');
        container.style.padding = '20px';
        this.appendChild(container);
        const treeview = document.createElement('ui-treeview');
        container.appendChild(treeview);

        // Root level
        (treeview as any).items = [{
          id: 'users-root',
          label: 'All Users',
          lazy: true
        }];
        (treeview as any).options = {
          onLoadChildren: async (node: TreeNode) => {
            // Level 1: Load users
            if (node.id === 'users-root') {
              try {
                const data = await http.get<any>('https://jsonplaceholder.typicode.com/users?_limit=3');
                return data.map((user: any) => ({
                  id: \`user-\${user.id}\`,
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
                const [posts, todos] = await Promise.all([http.get<any>(\`https://jsonplaceholder.typicode.com/posts?userId=\${userId}&_limit=2\`), http.get<any>(\`https://jsonplaceholder.typicode.com/todos?userId=\${userId}&_limit=2\`)]);
                return [{
                  id: \`posts-of-\${userId}\`,
                  label: \`Posts (\${posts.length})\`
                }, {
                  id: \`todos-of-\${userId}\`,
                  label: \`Todos (\${todos.length})\`
                }];
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
    return html\`<nested-tree-view></nested-tree-view>\`;
  }
}`,...(B=(W=f.parameters)==null?void 0:W.docs)==null?void 0:B.source},description:{story:`TreeView with Nested Lazy Loading\r
Demonstrates multi-level lazy loading from API`,...(Q=(O=f.parameters)==null?void 0:O.docs)==null?void 0:Q.description}}};const Ae=["Playground","LazyLoadingFromAPI","CustomNodeRendering","SelectionAndEvents","APIWithCustomConfig","NestedLazyLoading"];export{g as APIWithCustomConfig,u as CustomNodeRendering,p as LazyLoadingFromAPI,f as NestedLazyLoading,m as Playground,h as SelectionAndEvents,Ae as __namedExportsOrder,ze as default};
