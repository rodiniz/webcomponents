import{b as n}from"./iframe-Ck3e-F9w.js";import"./button-C3WNtjOb.js";import"./input-DpGqbU1A.js";import{h as o}from"./http-yWwJkjL9.js";import"./date-picker-M1CLS8-A.js";import"./pagination-DWUZQ7bE.js";import"./modal-_aGH9G5V.js";import"./select-B4iwFhno.js";import"./checkbox-B_0rBhyF.js";import"./tabs-JPaZ1uAP.js";import"./card-E02Fqa-A.js";import"./toast-hujraZ8_.js";import"./stepper-CTUFtMcY.js";import"./upload-DoI1I2V3.js";import"./picklist-DC7830iE.js";import"./toggle-switch-Cmm-JnXl.js";import"./link-BFoJBV43.js";import"./accordion-fpeuHaiB.js";import"./spinner-QkkTxkQg.js";import"./tooltip-CsDM52S5.js";import"./dropdown-CRRhDzr_.js";import"./layout-D8UPBAOM.js";import"./icon-helpers-uywyl4Wq.js";import"./unsafe-html-7KbQsD9c.js";import"./icons-lgEBa0uT.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./template-1VJuhrPW.js";import"./theme-DBvyg58T.js";import"./class-builders-BssWg5Cc.js";import"./query-BApjzB0v.js";import"./click-outside-CXo2mreH.js";import"./keyboard-helpers-TtfJu0Hs.js";import"./validators-OS32PDZK.js";import"./_commonjsHelpers-Cpj98o6Y.js";const f=[{key:"name",label:"Name",sortable:!0,resizable:!0,minWidth:140},{key:"role",label:"Role",sortable:!0,resizable:!0,minWidth:180},{key:"status",label:"Status",sortable:!0,resizable:!0,minWidth:120},{key:"actions",label:"Actions",align:"center",actions:{edit:!0,delete:!0},resizable:!1}],ie=[{name:"Ava Johnson",role:"Frontend Engineer",status:"Active"},{name:"Noah Silva",role:"Product Designer",status:"Active"},{name:"Mia Costa",role:"QA Analyst",status:"Away"}],Be={title:"Components/Table",tags:["autodocs"],argTypes:{bordered:{control:"boolean"},zebra:{control:"boolean"},collapsible:{control:"boolean"}},args:{bordered:!0,zebra:!0,collapsible:!0}},g={render:({bordered:s,zebra:l,collapsible:a})=>n`
    <ui-table
      .columns=${f}
      .rows=${ie}
      ?bordered=${s}
      ?zebra=${l}
      ?collapsible=${a}
    ></ui-table>
  `},y={render:()=>n`
    <ui-table
      .columns=${f}
      .rows=${[{name:"Ava Johnson",role:"Frontend Engineer",status:"Active",childColumns:[{key:"title",label:"Title"},{key:"date",label:"Date"},{key:"duration",label:"Duration"},{key:"status",label:"Status"}],childRows:[{title:"iBabs Debrief",date:"19/02/2026, 10:40 - 11:40",duration:"01:00:00",status:"Exported"},{title:"iBabs Debrief - test",date:"12/02/2026, 13:45 - 13:49",duration:"00:03:57",status:"Ready"}]},{name:"Noah Silva",role:"Product Designer",status:"Active"}]}
      bordered
      zebra
      collapsible
    ></ui-table>
  `},d={render:()=>n`
    <ui-table
      .columns=${f}
      .rows=${[]}
      bordered
    ></ui-table>
  `},m={render:()=>n`
    <ui-table
      .columns=${f}
      .rows=${[]}
      bordered
      empty-message="No team members found"
      empty-hint="Click 'Add Member' to invite someone to your team."
    ></ui-table>
  `},c={render:()=>{class s extends HTMLElement{async connectedCallback(){this.innerHTML='<div style="padding: 20px; color: #1976d2;">⏳ Loading todos...</div>';try{const a=[{key:"id",label:"ID",sortable:!0,resizable:!0,minWidth:100},{key:"title",label:"Title",sortable:!0,resizable:!0,minWidth:200},{key:"completed",label:"Completed",sortable:!0,resizable:!0,minWidth:120}],r=(await o.get("https://jsonplaceholder.typicode.com/todos?_limit=5")).map(t=>({id:t.id,title:t.title,completed:t.completed?"Yes":"No"}));this.innerHTML=`
            <div style="padding: 20px;">
              <p style="margin-bottom: 16px; color: #666;">Data loaded successfully from API</p>
            </div>
          `;const e=document.createElement("ui-table");e.setAttribute("bordered",""),e.setAttribute("zebra",""),e.columns=a,e.rows=r,this.appendChild(e)}catch(a){this.innerHTML=`
            <div style="padding: 20px; color: #d32f2f;">
              <p>Error loading data: ${a.message}</p>
            </div>
          `}}}return customElements.get("todo-table")||customElements.define("todo-table",s),n`<todo-table></todo-table>`}},u={render:()=>{class s extends HTMLElement{async connectedCallback(){this.innerHTML='<div style="padding: 20px; color: #1976d2;">⏳ Loading users...</div>';try{const a=[{key:"id",label:"User ID",sortable:!0,resizable:!0,minWidth:100},{key:"name",label:"Name",sortable:!0,resizable:!0,minWidth:180},{key:"email",label:"Email",sortable:!0,resizable:!0,minWidth:200},{key:"status",label:"Status",sortable:!0,resizable:!0,minWidth:120}],r=(await o.get("https://jsonplaceholder.typicode.com/users?_limit=5")).map(t=>({id:t.id,name:t.name,email:t.email,status:"Active"}));this.innerHTML=`
            <div style="padding: 20px;">
              <p style="margin-bottom: 16px; color: #2e7d32;">✓ Successfully loaded ${r.length} users</p>
            </div>
          `;const e=document.createElement("ui-table");e.setAttribute("bordered",""),e.setAttribute("zebra",""),e.columns=a,e.rows=r,this.appendChild(e)}catch(a){this.innerHTML=`
            <div style="padding: 20px; background-color: #ffebee; border-radius: 4px;">
              <p style="color: #d32f2f; font-weight: bold;">Error Loading Data</p>
              <p style="color: #d32f2f; font-size: 14px;">${a.message}</p>
              <p style="color: #666; font-size: 12px; margin-top: 8px;">
                Tip: Check your API endpoint and network connection
              </p>
            </div>
          `}}}return customElements.get("user-table")||customElements.define("user-table",s),n`<user-table></user-table>`}},p={render:()=>{class s extends HTMLElement{constructor(){super(...arguments),this.isLoading=!0}async connectedCallback(){this.render(),await this.loadData()}render(){this.innerHTML=`
          <div style="padding: 20px;">
            <div id="status" style="margin-bottom: 16px; color: #1976d2;">
              Loading users from API...
            </div>
            <ui-table
              id="data-table"
              bordered
              zebra
            ></ui-table>
          </div>
        `,this.tableElement=this.querySelector("ui-table")}async loadData(){const a=[{key:"id",label:"ID",sortable:!0,resizable:!0,minWidth:80},{key:"username",label:"Username",sortable:!0,resizable:!0,minWidth:150},{key:"phone",label:"Phone",sortable:!0,resizable:!0,minWidth:160},{key:"company",label:"Company",sortable:!0,resizable:!0,minWidth:180}];try{const r=(await o.get("https://jsonplaceholder.typicode.com/users?_limit=8")).map(t=>({id:t.id,username:t.username,phone:t.phone,company:t.company.name}));this.tableElement&&(this.tableElement.columns=a,this.tableElement.rows=r);const e=this.querySelector("#status");e&&(e.innerHTML=`✓ Loaded ${r.length} users successfully`,e.style.color="#2e7d32")}catch(i){const r=this.querySelector("#status");r&&(r.innerHTML=`✗ Error: ${i.message}`,r.style.color="#d32f2f")}}}return customElements.get("api-data-table")||customElements.define("api-data-table",s),n`<api-data-table></api-data-table>`}},b={render:()=>{class s extends HTMLElement{async connectedCallback(){this.innerHTML='<div style="padding: 20px; color: #1976d2;">⏳ Loading posts...</div>';try{const a=[{key:"id",label:"Post ID",sortable:!0,resizable:!0,minWidth:100},{key:"title",label:"Title",sortable:!0,resizable:!0,minWidth:300},{key:"userId",label:"Author ID",sortable:!0,resizable:!0,minWidth:120}];o.setBaseURL("https://jsonplaceholder.typicode.com"),o.setDefaultTimeout(5e3);const r=(await o.get("/posts?_limit=5")).map(t=>({id:t.id,title:t.title,userId:t.userId}));this.innerHTML=`
            <div style="padding: 20px;">
              <div style="margin-bottom: 16px; padding: 12px; background-color: #e3f2fd; border-left: 4px solid #1976d2; border-radius: 2px;">
                <p style="margin: 0; font-size: 14px; color: #1976d2;">
                  ℹ️ This example uses HTTPClient with baseURL and timeout configuration
                </p>
              </div>
            </div>
          `;const e=document.createElement("ui-table");e.setAttribute("bordered",""),e.setAttribute("zebra",""),e.columns=a,e.rows=r,this.appendChild(e)}catch(a){this.innerHTML=`
            <div style="padding: 20px; color: #d32f2f;">
              <p>Error: ${a.message}</p>
            </div>
          `}}}return customElements.get("post-table")||customElements.define("post-table",s),n`<post-table></post-table>`}},h={render:()=>{class s extends HTMLElement{constructor(){super(...arguments),this.totalItems=0,this.currentPage=1,this.pageSize=5,this.handlePageChange=a=>{this.currentPage=a.detail.page,this.loadData(this.currentPage)}}async connectedCallback(){this.render(),await this.loadData(this.currentPage)}render(){this.innerHTML=`
          <div style="padding: 20px;">
            <h3 style="margin-bottom: 16px; color: #333;">Users List</h3>
            <ui-table id="data-table" bordered zebra></ui-table>
            <ui-pagination
              id="pagination"
              style="margin-top: 16px;"
            ></ui-pagination>
          </div>
        `,this.tableElement=this.querySelector("#data-table"),this.paginationElement=this.querySelector("#pagination"),this.paginationElement.addEventListener("page-change",this.handlePageChange)}async loadData(a){const i=[{key:"id",label:"ID",sortable:!0,resizable:!0,minWidth:80},{key:"name",label:"Name",sortable:!0,resizable:!0,minWidth:180},{key:"email",label:"Email",sortable:!0,resizable:!0,minWidth:220},{key:"status",label:"Status",sortable:!0,resizable:!0,minWidth:120}];try{const e=(await o.get(`https://jsonplaceholder.typicode.com/users?_page=${a}&_limit=${this.pageSize}`)).map(t=>({id:t.id,name:t.name,email:t.email,status:t.id%2===0?"Active":"Inactive"}));this.tableElement.columns=i,this.tableElement.rows=e,this.totalItems=10,this.paginationElement.total=this.totalItems,this.paginationElement.pageSize=this.pageSize,this.paginationElement.currentPage=a}catch(r){console.error("Error loading data:",r)}}}return customElements.get("paginated-table")||customElements.define("paginated-table",s),n`<paginated-table></paginated-table>`}};var E,v,T;g.parameters={...g.parameters,docs:{...(E=g.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: ({
    bordered,
    zebra,
    collapsible
  }) => html\`
    <ui-table
      .columns=\${columns}
      .rows=\${rows}
      ?bordered=\${bordered}
      ?zebra=\${zebra}
      ?collapsible=\${collapsible}
    ></ui-table>
  \`
}`,...(T=(v=g.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var w,z,x;y.parameters={...y.parameters,docs:{...(w=y.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => html\`
    <ui-table
      .columns=\${columns}
      .rows=\${[{
    name: 'Ava Johnson',
    role: 'Frontend Engineer',
    status: 'Active',
    childColumns: [{
      key: 'title',
      label: 'Title'
    }, {
      key: 'date',
      label: 'Date'
    }, {
      key: 'duration',
      label: 'Duration'
    }, {
      key: 'status',
      label: 'Status'
    }],
    childRows: [{
      title: 'iBabs Debrief',
      date: '19/02/2026, 10:40 - 11:40',
      duration: '01:00:00',
      status: 'Exported'
    }, {
      title: 'iBabs Debrief - test',
      date: '12/02/2026, 13:45 - 13:49',
      duration: '00:03:57',
      status: 'Ready'
    }]
  }, {
    name: 'Noah Silva',
    role: 'Product Designer',
    status: 'Active'
  }]}
      bordered
      zebra
      collapsible
    ></ui-table>
  \`
}`,...(x=(z=y.parameters)==null?void 0:z.docs)==null?void 0:x.source}}};var k,L,C,D,P;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => html\`
    <ui-table
      .columns=\${columns}
      .rows=\${[]}
      bordered
    ></ui-table>
  \`
}`,...(C=(L=d.parameters)==null?void 0:L.docs)==null?void 0:C.source},description:{story:`Empty State - Default\r
Shows the default empty state when no rows are provided`,...(P=(D=d.parameters)==null?void 0:D.docs)==null?void 0:P.description}}};var A,S,I,W,H;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => html\`
    <ui-table
      .columns=\${columns}
      .rows=\${[]}
      bordered
      empty-message="No team members found"
      empty-hint="Click 'Add Member' to invite someone to your team."
    ></ui-table>
  \`
}`,...(I=(S=m.parameters)==null?void 0:S.docs)==null?void 0:I.source},description:{story:`Empty State - Custom Message\r
Shows how to customize the empty state message and hint`,...(H=(W=m.parameters)==null?void 0:W.docs)==null?void 0:H.description}}};var M,$,U,R,_;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    class TodoTable extends HTMLElement {
      async connectedCallback() {
        this.innerHTML = '<div style="padding: 20px; color: #1976d2;">⏳ Loading todos...</div>';
        try {
          const columns: TableColumn[] = [{
            key: 'id',
            label: 'ID',
            sortable: true,
            resizable: true,
            minWidth: 100
          }, {
            key: 'title',
            label: 'Title',
            sortable: true,
            resizable: true,
            minWidth: 200
          }, {
            key: 'completed',
            label: 'Completed',
            sortable: true,
            resizable: true,
            minWidth: 120
          }];
          const data = await http.get<any>('https://jsonplaceholder.typicode.com/todos?_limit=5');
          const rows: TableRow[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            completed: item.completed ? 'Yes' : 'No'
          }));
          this.innerHTML = \`
            <div style="padding: 20px;">
              <p style="margin-bottom: 16px; color: #666;">Data loaded successfully from API</p>
            </div>
          \`;
          const table = document.createElement('ui-table');
          table.setAttribute('bordered', '');
          table.setAttribute('zebra', '');
          (table as any).columns = columns;
          (table as any).rows = rows;
          this.appendChild(table);
        } catch (error) {
          this.innerHTML = \`
            <div style="padding: 20px; color: #d32f2f;">
              <p>Error loading data: \${(error as Error).message}</p>
            </div>
          \`;
        }
      }
    }
    if (!customElements.get('todo-table')) {
      customElements.define('todo-table', TodoTable);
    }
    return html\`<todo-table></todo-table>\`;
  }
}`,...(U=($=c.parameters)==null?void 0:$.docs)==null?void 0:U.source},description:{story:`Example: Loading table data from a mock API using HTTPClient\r
This demonstrates the basic pattern for fetching and displaying data`,...(_=(R=c.parameters)==null?void 0:R.docs)==null?void 0:_.description}}};var N,q,j,B,F;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    class UserTable extends HTMLElement {
      async connectedCallback() {
        this.innerHTML = '<div style="padding: 20px; color: #1976d2;">⏳ Loading users...</div>';
        try {
          const columns: TableColumn[] = [{
            key: 'id',
            label: 'User ID',
            sortable: true,
            resizable: true,
            minWidth: 100
          }, {
            key: 'name',
            label: 'Name',
            sortable: true,
            resizable: true,
            minWidth: 180
          }, {
            key: 'email',
            label: 'Email',
            sortable: true,
            resizable: true,
            minWidth: 200
          }, {
            key: 'status',
            label: 'Status',
            sortable: true,
            resizable: true,
            minWidth: 120
          }];
          const data = await http.get<any>('https://jsonplaceholder.typicode.com/users?_limit=5');
          const rows: TableRow[] = data.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            status: 'Active'
          }));
          this.innerHTML = \`
            <div style="padding: 20px;">
              <p style="margin-bottom: 16px; color: #2e7d32;">✓ Successfully loaded \${rows.length} users</p>
            </div>
          \`;
          const table = document.createElement('ui-table');
          table.setAttribute('bordered', '');
          table.setAttribute('zebra', '');
          (table as any).columns = columns;
          (table as any).rows = rows;
          this.appendChild(table);
        } catch (error) {
          this.innerHTML = \`
            <div style="padding: 20px; background-color: #ffebee; border-radius: 4px;">
              <p style="color: #d32f2f; font-weight: bold;">Error Loading Data</p>
              <p style="color: #d32f2f; font-size: 14px;">\${(error as Error).message}</p>
              <p style="color: #666; font-size: 12px; margin-top: 8px;">
                Tip: Check your API endpoint and network connection
              </p>
            </div>
          \`;
        }
      }
    }
    if (!customElements.get('user-table')) {
      customElements.define('user-table', UserTable);
    }
    return html\`<user-table></user-table>\`;
  }
}`,...(j=(q=u.parameters)==null?void 0:q.docs)==null?void 0:j.source},description:{story:`Example: API Loading with Loading State\r
Shows how to handle loading, success, and error states`,...(F=(B=u.parameters)==null?void 0:B.docs)==null?void 0:F.description}}};var J,Y,O,Q,G;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => {
    // Define a custom component that loads data
    class APIDataTable extends HTMLElement {
      private tableElement: any;
      private isLoading = true;
      async connectedCallback() {
        this.render();
        await this.loadData();
      }
      private render() {
        this.innerHTML = \`
          <div style="padding: 20px;">
            <div id="status" style="margin-bottom: 16px; color: #1976d2;">
              Loading users from API...
            </div>
            <ui-table
              id="data-table"
              bordered
              zebra
            ></ui-table>
          </div>
        \`;
        this.tableElement = this.querySelector('ui-table');
      }
      private async loadData() {
        const columns: TableColumn[] = [{
          key: 'id',
          label: 'ID',
          sortable: true,
          resizable: true,
          minWidth: 80
        }, {
          key: 'username',
          label: 'Username',
          sortable: true,
          resizable: true,
          minWidth: 150
        }, {
          key: 'phone',
          label: 'Phone',
          sortable: true,
          resizable: true,
          minWidth: 160
        }, {
          key: 'company',
          label: 'Company',
          sortable: true,
          resizable: true,
          minWidth: 180
        }];
        try {
          const data = await http.get<any>('https://jsonplaceholder.typicode.com/users?_limit=8');
          const rows: TableRow[] = data.map((user: any) => ({
            id: user.id,
            username: user.username,
            phone: user.phone,
            company: user.company.name
          }));

          // Update table with loaded data
          if (this.tableElement) {
            this.tableElement.columns = columns;
            this.tableElement.rows = rows;
          }

          // Update status
          const statusDiv = this.querySelector('#status');
          if (statusDiv) {
            statusDiv.innerHTML = \`✓ Loaded \${rows.length} users successfully\`;
            statusDiv.style.color = '#2e7d32';
          }
        } catch (error) {
          // Update status with error
          const statusDiv = this.querySelector('#status');
          if (statusDiv) {
            statusDiv.innerHTML = \`✗ Error: \${(error as Error).message}\`;
            statusDiv.style.color = '#d32f2f';
          }
        }
      }
    }
    if (!customElements.get('api-data-table')) {
      customElements.define('api-data-table', APIDataTable);
    }
    return html\`<api-data-table></api-data-table>\`;
  }
}`,...(O=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:O.source},description:{story:`Example: Creating a Custom Element Component that loads API data\r
This shows the recommended pattern for encapsulating API calls in a component`,...(G=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:G.description}}};var K,V,X,Z,ee;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    class PostTable extends HTMLElement {
      async connectedCallback() {
        this.innerHTML = '<div style="padding: 20px; color: #1976d2;">⏳ Loading posts...</div>';
        try {
          const columns: TableColumn[] = [{
            key: 'id',
            label: 'Post ID',
            sortable: true,
            resizable: true,
            minWidth: 100
          }, {
            key: 'title',
            label: 'Title',
            sortable: true,
            resizable: true,
            minWidth: 300
          }, {
            key: 'userId',
            label: 'Author ID',
            sortable: true,
            resizable: true,
            minWidth: 120
          }];

          // Configure HTTP client
          http.setBaseURL('https://jsonplaceholder.typicode.com');
          http.setDefaultTimeout(5000);

          // Make request with configured client
          const posts = await http.get<any>('/posts?_limit=5');
          const rows: TableRow[] = posts.map((post: any) => ({
            id: post.id,
            title: post.title,
            userId: post.userId
          }));
          this.innerHTML = \`
            <div style="padding: 20px;">
              <div style="margin-bottom: 16px; padding: 12px; background-color: #e3f2fd; border-left: 4px solid #1976d2; border-radius: 2px;">
                <p style="margin: 0; font-size: 14px; color: #1976d2;">
                  ℹ️ This example uses HTTPClient with baseURL and timeout configuration
                </p>
              </div>
            </div>
          \`;
          const table = document.createElement('ui-table');
          table.setAttribute('bordered', '');
          table.setAttribute('zebra', '');
          (table as any).columns = columns;
          (table as any).rows = rows;
          this.appendChild(table);
        } catch (error) {
          this.innerHTML = \`
            <div style="padding: 20px; color: #d32f2f;">
              <p>Error: \${(error as Error).message}</p>
            </div>
          \`;
        }
      }
    }
    if (!customElements.get('post-table')) {
      customElements.define('post-table', PostTable);
    }
    return html\`<post-table></post-table>\`;
  }
}`,...(X=(V=b.parameters)==null?void 0:V.docs)==null?void 0:X.source},description:{story:`Example: Using HTTPClient with Custom Configuration\r
Demonstrates baseURL, headers, and timeout configuration`,...(ee=(Z=b.parameters)==null?void 0:Z.docs)==null?void 0:ee.description}}};var te,ae,re,se,ne;h.parameters={...h.parameters,docs:{...(te=h.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => {
    class PaginatedTable extends HTMLElement {
      private tableElement: any;
      private paginationElement: any;
      private totalItems = 0;
      private currentPage = 1;
      private pageSize = 5;
      async connectedCallback() {
        this.render();
        await this.loadData(this.currentPage);
      }
      private render() {
        this.innerHTML = \`
          <div style="padding: 20px;">
            <h3 style="margin-bottom: 16px; color: #333;">Users List</h3>
            <ui-table id="data-table" bordered zebra></ui-table>
            <ui-pagination
              id="pagination"
              style="margin-top: 16px;"
            ></ui-pagination>
          </div>
        \`;
        this.tableElement = this.querySelector('#data-table');
        this.paginationElement = this.querySelector('#pagination');
        this.paginationElement.addEventListener('page-change', this.handlePageChange);
      }
      private handlePageChange = (e: CustomEvent) => {
        this.currentPage = e.detail.page;
        this.loadData(this.currentPage);
      };
      private async loadData(page: number) {
        const columns: TableColumn[] = [{
          key: 'id',
          label: 'ID',
          sortable: true,
          resizable: true,
          minWidth: 80
        }, {
          key: 'name',
          label: 'Name',
          sortable: true,
          resizable: true,
          minWidth: 180
        }, {
          key: 'email',
          label: 'Email',
          sortable: true,
          resizable: true,
          minWidth: 220
        }, {
          key: 'status',
          label: 'Status',
          sortable: true,
          resizable: true,
          minWidth: 120
        }];
        try {
          const response = await http.get<any>(\`https://jsonplaceholder.typicode.com/users?_page=\${page}&_limit=\${this.pageSize}\`);
          const rows: TableRow[] = response.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.id % 2 === 0 ? 'Active' : 'Inactive'
          }));
          this.tableElement.columns = columns;
          this.tableElement.rows = rows;
          this.totalItems = 10;
          this.paginationElement.total = this.totalItems;
          this.paginationElement.pageSize = this.pageSize;
          this.paginationElement.currentPage = page;
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
    }
    if (!customElements.get('paginated-table')) {
      customElements.define('paginated-table', PaginatedTable);
    }
    return html\`<paginated-table></paginated-table>\`;
  }
}`,...(re=(ae=h.parameters)==null?void 0:ae.docs)==null?void 0:re.source},description:{story:`Example: Paging data with ui-pagination component\r
Shows how to integrate pagination with the table using real API calls`,...(ne=(se=h.parameters)==null?void 0:se.docs)==null?void 0:ne.description}}};const Fe=["Playground","WithChildRow","EmptyStateDefault","EmptyStateCustom","LoadingFromAPI","APILoadingWithState","APIDataComponent","APIWithCustomConfig","WithPagination"];export{p as APIDataComponent,u as APILoadingWithState,b as APIWithCustomConfig,m as EmptyStateCustom,d as EmptyStateDefault,c as LoadingFromAPI,g as Playground,y as WithChildRow,h as WithPagination,Fe as __namedExportsOrder,Be as default};
