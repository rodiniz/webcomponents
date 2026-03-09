import{b as l,A as v,r as _,i as k}from"./iframe-Ck3e-F9w.js";import{n as g,U as z,t as W}from"./ui-component-base-BJ0AM59x.js";import{r as x}from"./state-CVS5rq8K.js";import{s as T,c as w}from"./template-1VJuhrPW.js";import{t as N}from"./theme-DBvyg58T.js";import"./button-C3WNtjOb.js";import{o as A}from"./unsafe-html-7KbQsD9c.js";import"./spinner-QkkTxkQg.js";function H(t,e,s){return t==null&&e==null?0:t==null?1:e==null?-1:s==="number"?Number(t)-Number(e):s==="date"?new Date(String(t)).getTime()-new Date(String(e)).getTime():typeof t=="number"&&typeof e=="number"?t-e:String(t).localeCompare(String(e),void 0,{numeric:!0,sensitivity:"base"})}function I(t,e,s,i){const r=[...t];return r.sort((n,o)=>{const d=n[e],a=o[e],h=i.sortFn?i.sortFn(n,o):H(d,a,i.sortType);return s==="asc"?h:-h}),r}function R(t){return t.filter(e=>e.visible!==!1)}function $(t,e){const s=e[t.key]??t.width;return T({width:s?`${s}px`:"","min-width":t.minWidth?`${t.minWidth}px`:"","max-width":t.maxWidth?`${t.maxWidth}px`:""})}function D(t){const e=Array.isArray(t.children)&&t.children.length>0,s=Array.isArray(t.childRows)&&t.childRows.length>0;return e||s}function M(t,e){const s=t.childRows??t.children??[];if(!Array.isArray(s)||s.length===0)return null;const i=t.childColumns??e;return{columns:R(i),rows:s}}function K(t,e={}){const s={...e};return t.forEach(i=>{i.width&&!s[i.key]&&(s[i.key]=i.width)}),s}class U{constructor(){this._expandedRows=new Set,this._sortKey=null,this._sortDirection="asc",this._columnWidths={}}get expandedRows(){return this._expandedRows}get sortKey(){return this._sortKey}get sortDirection(){return this._sortDirection}get columnWidths(){return this._columnWidths}set columnWidths(e){this._columnWidths=e}toggleExpand(e){return this._expandedRows.has(e)?this._expandedRows.delete(e):this._expandedRows.add(e),this._expandedRows=new Set(this._expandedRows),this._expandedRows}isExpanded(e){return this._expandedRows.has(e)}collapseAll(){return this._expandedRows=new Set,this._expandedRows}expandAll(e){return this._expandedRows=new Set(e),this._expandedRows}setSorting(e,s){return this._sortKey=e,this._sortDirection=s,{key:this._sortKey,direction:this._sortDirection}}toggleSort(e){return this._sortKey===e?this._sortDirection=this._sortDirection==="asc"?"desc":"asc":(this._sortKey=e,this._sortDirection="asc"),{key:this._sortKey,direction:this._sortDirection}}clearSorting(){this._sortKey=null,this._sortDirection="asc"}isSorted(e){return this._sortKey===e}setColumnWidth(e,s){return this._columnWidths={...this._columnWidths,[e]:s},this._columnWidths}getColumnWidth(e){return this._columnWidths[e]}reset(){this._expandedRows=new Set,this._sortKey=null,this._sortDirection="asc",this._columnWidths={}}snapshot(){return{expandedRows:Array.from(this._expandedRows),sortKey:this._sortKey,sortDirection:this._sortDirection,columnWidths:{...this._columnWidths}}}restore(e){e.expandedRows&&(this._expandedRows=new Set(e.expandedRows)),e.sortKey!==void 0&&(this._sortKey=e.sortKey),e.sortDirection&&(this._sortDirection=e.sortDirection),e.columnWidths&&(this._columnWidths={...e.columnWidths})}}class B{constructor(e){this.mode=e}setMode(e){this.mode=e}getSortedRows(e,s,i,r){if(!i||this.mode==="server")return e;const n=s.find(o=>o.key===i);return!n||!n.sortable?e:I(e,i,r,n)}}class L{constructor(){this.resizingKey=null,this.resizeStartX=0,this.resizeStartWidth=0}isResizing(){return!!this.resizingKey}startResize(e,s,i){if(!s.resizable)return;e.preventDefault(),e.stopPropagation();const r=e.currentTarget,n=r==null?void 0:r.closest("th");n&&(this.isResizing()&&this.stopResize(),this.resizingKey=s.key,this.resizeStartX=e.clientX,this.resizeStartWidth=n.getBoundingClientRect().width,this.handleMove=o=>{if(!this.resizingKey)return;const d=o.clientX-this.resizeStartX,a=s.minWidth??80,h=s.maxWidth??600,c=Math.min(h,Math.max(a,this.resizeStartWidth+d));i(this.resizingKey,c)},this.handleUp=()=>{this.stopResize()},window.addEventListener("mousemove",this.handleMove),window.addEventListener("mouseup",this.handleUp))}stopResize(){this.resizingKey=null,this.handleMove&&(window.removeEventListener("mousemove",this.handleMove),this.handleMove=void 0),this.handleUp&&(window.removeEventListener("mouseup",this.handleUp),this.handleUp=void 0)}}class S{static renderCell(e,s,i,r,n){const o=$(s,n.columnWidths),d=s.align??"left",a=r===0&&n.renderExpandIcon?n.renderExpandIcon(e,i):"";if(s.template)return l`
        <td class="align-${d}" style=${o}>
          ${a}
          ${s.template(e,i)}
        </td>
      `;if(s.actions){const h=!!n.includeActionDataAttrs;return l`
        <td class="align-center actions-cell" style=${o}>
          ${s.actions.edit?l`
            <ui-button
              variant="primary"
              class="action-btn"
              icon="edit"
              size="sm"
              data-action=${h?"edit":v}
              data-row-index=${h?i:v}
              @click=${()=>{var c;return(c=n.onAction)==null?void 0:c.call(n,"edit",i)}}
            ></ui-button>
          `:""}
          ${s.actions.delete?l`
            <ui-button
              variant="danger"
              class="action-btn"
              icon="trash"
              size="sm"
              data-action=${h?"delete":v}
              data-row-index=${h?i:v}
              @click=${()=>{var c;return(c=n.onAction)==null?void 0:c.call(n,"delete",i)}}
            ></ui-button>
          `:""}
        </td>
      `}return r===0?l`
        <td class="align-${d}" style=${o}>
          ${a}
          ${String(e[s.key]??"")}
        </td>
      `:l`
      <td class="align-${d}" style=${o}>
        ${String(e[s.key]??"")}
      </td>
    `}static renderFlatRows(e,s,i){return e.map((r,n)=>l`
      <tr data-row-index="${n}">
        ${s.map((o,d)=>S.renderCell(r,o,n,d,i))}
      </tr>
    `)}}class E{static renderHeader(e,s){const i=!!e.sortable,r=w({[`align-${e.align??"left"}`]:!0,sortable:i,sorted:s.isSorted}),n=i?l`<span class="sort-indicator ${s.isSorted?s.sortDirection:""}"></span>`:"",o=e.resizable?l`<span class="column-resizer" @mousedown=${s.onResizeStart}></span>`:"";return l`
      <th
        class=${r}
        style=${$(e,s.columnWidths)}
        @click=${s.onHeaderClick}
      >
        <span class="th-label">${e.label}</span>
        ${n}
        ${o}
      </th>
    `}static renderBasicHeader(e,s){return l`
      <th class="align-${e.align??"left"}" style=${$(e,s)}>
        ${e.label}
      </th>
    `}}function O(t,e,s){if(!s.collapsible||!D(t))return null;const i=s.isExpanded(e);return l`
    <ui-button
      variant="ghost"
      size="sm"
      icon="${i?"chevron-down":"chevron-right"}"
      @click=${()=>s.onToggleExpand(e)}
    ></ui-button>
  `}function P(t){const e=[],s=R(t.columns);return t.rows.length===0?[l`
      <tr class="table-empty">
        <td colspan=${Math.max(s.length,1)}>
          <div class="table-empty-content">
            <div class="table-empty-title">${t.emptyMessage}</div>
            <div class="table-empty-hint">${t.emptyHint}</div>
          </div>
        </td>
      </tr>
    `]:(t.rows.forEach((i,r)=>{const n=t.isExpanded(r),o=D(i);if(e.push(l`
      <tr class="${o?"has-children":""} ${n?"expanded":""}" data-row-index="${r}">
        ${s.map((d,a)=>S.renderCell(i,d,r,a,{columnWidths:t.columnWidths,renderExpandIcon:(h,c)=>O(h,c,t),onAction:(h,c)=>t.onAction(h,c),includeActionDataAttrs:!0}))}
      </tr>
    `),n&&o){const d=M(i,t.columns);d&&e.push(l`
          <tr class="child-row" data-parent-row="${r}">
            <td colspan=${s.length}>
              <div class="child-table-wrap">
                <table class="nested-table">
                  <thead>
                    <tr>
                      ${d.columns.map(a=>E.renderBasicHeader(a,t.columnWidths))}
                    </tr>
                  </thead>
                  <tbody>
                    ${S.renderFlatRows(d.rows,d.columns,{columnWidths:t.columnWidths,onAction:(a,h)=>t.onAction(a,h)})}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        `)}}),e)}function j(t){return l`
    <thead>
      <tr>
        ${t.visibleColumns.map(e=>E.renderHeader(e,{isSorted:t.isSorted(e.key),sortDirection:t.sortDirection,onHeaderClick:()=>t.onHeaderClick(e),onResizeStart:s=>t.onResizeStart(s,e),columnWidths:t.columnWidths}))}
      </tr>
    </thead>
  `}var q=Object.defineProperty,F=Object.getOwnPropertyDescriptor,f=(t,e,s,i)=>{for(var r=i>1?void 0:i?F(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&q(e,s,r),r};let p=class extends z{constructor(){super(...arguments),this.columns=[],this.rows=[],this.bordered=!0,this.zebra=!1,this.collapsible=!0,this.sortMode="client",this.emptyMessage="No rows to display",this.emptyHint="Add data to populate this table.",this.tableState=new U,this.sorter=new B(this.sortMode),this.columnResizer=new L}disconnectedCallback(){this.columnResizer.stopResize(),super.disconnectedCallback()}updated(t){t.has("columns")&&(this.tableState.columnWidths=K(this.columns,this.tableState.columnWidths)),t.has("sortMode")&&this.sorter.setMode(this.sortMode)}set data(t){this.columns=t.columns,this.rows=t.rows}get data(){return{columns:this.columns,rows:this.rows,total:this.rows.length}}handleAction(t,e){const s=this.rows[e];this.emit("action",{action:t,row:s,rowIndex:e})}toggleExpand(t){this.tableState.toggleExpand(t),this.requestUpdate()}handleHeaderClick(t){if(!t.sortable)return;const e=this.tableState.toggleSort(t.key);this.sortMode==="server"&&this.emit("sort-change",{key:e.key,direction:e.direction,column:t})}getSortedRows(){return this.sorter.getSortedRows(this.rows,this.columns,this.tableState.sortKey,this.tableState.sortDirection)}handleResizeStart(t,e){this.columnResizer.startResize(t,e,(s,i)=>{this.tableState.setColumnWidth(s,i)})}render(){const t=R(this.columns),e=this.getSortedRows(),s=w({"table-wrap":!0,"no-border":!this.bordered,zebra:this.zebra});return l`
      <div class=${s}>
        <table>
          ${j({visibleColumns:t,isSorted:i=>this.tableState.isSorted(i),sortDirection:this.tableState.sortDirection,onHeaderClick:i=>this.handleHeaderClick(i),onResizeStart:(i,r)=>this.handleResizeStart(i,r),columnWidths:this.tableState.columnWidths})}
          <tbody>
            ${P({columns:this.columns,rows:e,collapsible:this.collapsible,emptyMessage:this.emptyMessage,emptyHint:this.emptyHint,columnWidths:this.tableState.columnWidths,isExpanded:i=>this.tableState.isExpanded(i),onToggleExpand:i=>this.toggleExpand(i),onAction:(i,r)=>this.handleAction(i,r)})}
          </tbody>
        </table>
      </div>
    `}};p.styles=[_(N)];f([g({type:Array})],p.prototype,"columns",2);f([g({type:Array})],p.prototype,"rows",2);f([g({type:Boolean,reflect:!0})],p.prototype,"bordered",2);f([g({type:Boolean,reflect:!0})],p.prototype,"zebra",2);f([g({type:Boolean,reflect:!0})],p.prototype,"collapsible",2);f([g({type:String,reflect:!0})],p.prototype,"sortMode",2);f([g({type:String,attribute:"empty-message"})],p.prototype,"emptyMessage",2);f([g({type:String,attribute:"empty-hint"})],p.prototype,"emptyHint",2);f([x()],p.prototype,"tableState",2);p=f([W("ui-table")],p);function V(){return l`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  `}function X(){return l`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  `}function G(t){return t.icon?typeof t.icon=="string"&&t.icon.trim().startsWith("<")?A(t.icon):t.icon:X()}const J=k`
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
`;var Q=Object.defineProperty,Y=Object.getOwnPropertyDescriptor,y=(t,e,s,i)=>{for(var r=i>1?void 0:i?Y(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(i?o(e,s,r):o(r))||r);return i&&r&&Q(e,s,r),r};let m=class extends z{constructor(){super(...arguments),this.items=[],this.options={},this.multiSelect=!1,this.expandedNodeIds=new Set,this.selectedNodeIds=new Set,this.loadingNodeIds=new Set,this.nodeChildrenCache=new Map}toggleNode(t,e){e.stopPropagation(),this.expandedNodeIds.has(t.id)?this.expandedNodeIds.delete(t.id):(this.expandedNodeIds.add(t.id),t.lazy&&!this.nodeChildrenCache.has(t.id)&&this.loadChildren(t)),this.expandedNodeIds=new Set(this.expandedNodeIds),this.emit("node-expanded",{node:t,expanded:this.expandedNodeIds.has(t.id)})}async loadChildren(t){this.loadingNodeIds.add(t.id),this.loadingNodeIds=new Set(this.loadingNodeIds);try{let e=[];this.options.onLoadChildren&&(e=await this.options.onLoadChildren(t)),this.nodeChildrenCache.set(t.id,e)}catch(e){console.error("Error loading children for node:",t.id,e)}finally{this.loadingNodeIds.delete(t.id),this.loadingNodeIds=new Set(this.loadingNodeIds)}}selectNode(t,e){var i,r;e.stopPropagation();const s=this.selectedNodeIds.has(t.id);this.multiSelect||this.selectedNodeIds.clear(),s?this.selectedNodeIds.delete(t.id):this.selectedNodeIds.add(t.id),this.selectedNodeIds=new Set(this.selectedNodeIds),this.emit("node-selected",{node:t,selected:this.selectedNodeIds.has(t.id)}),(r=(i=this.options).onNodeSelect)==null||r.call(i,t)}renderNode(t){const e=t.children&&t.children.length>0,s=t.lazy&&!this.nodeChildrenCache.has(t.id),i=e||s||t.lazy,r=this.expandedNodeIds.has(t.id),n=this.selectedNodeIds.has(t.id),o=this.loadingNodeIds.has(t.id),d=this.nodeChildrenCache.get(t.id)||[],a=e?t.children:d,h=w({"node-item":!0,selected:n}),c=w({"expand-toggle":!0,expanded:!!(r&&i)});return l`
      <li class="tree-node">
        <div class=${h} @click=${u=>this.selectNode(t,u)}>
          ${i?l`
                <button
                  class=${c}
                  @click=${u=>this.toggleNode(t,u)}
                  aria-label=${r?"Collapse":"Expand"}
                >
                  ${V()}
                </button>
              `:l`<div class="expand-toggle" style="visibility: hidden;"></div>`}

          <div class="node-icon">${G(t)}</div>

          ${this.options.nodeTemplate?l`<span class="node-label">${this.options.nodeTemplate(t)}</span>`:l`<span class="node-label">${t.label}</span>`}

          ${o?l`
                <div class="loading-spinner">
                  <ui-spinner size="sm" variant="primary"></ui-spinner>
                </div>
              `:""}
        </div>

        ${i&&a&&a.length>0?l`
              <ul
                class=${w({children:!0,expanded:r})}
              >
                <li class="children-wrapper">
                  ${a.map(u=>this.renderNode(u))}
                </li>
              </ul>
            `:""}

        ${i&&r&&o?l`
              <div class="placeholder">
                Loading...
              </div>
            `:""}
      </li>
    `}render(){return this.items.length===0?l`
        <div class="tree-container">
          <div class="empty-state">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <p>No items to display</p>
          </div>
        </div>
      `:l`
      <div class="tree-container">
        <ul class="tree-list">
          ${this.items.map(t=>this.renderNode(t))}
        </ul>
      </div>
    `}};m.styles=[_(N),J];y([g({type:Array})],m.prototype,"items",2);y([g({type:Object})],m.prototype,"options",2);y([g({type:Boolean,reflect:!0})],m.prototype,"multiSelect",2);y([x()],m.prototype,"expandedNodeIds",2);y([x()],m.prototype,"selectedNodeIds",2);y([x()],m.prototype,"loadingNodeIds",2);y([x()],m.prototype,"nodeChildrenCache",2);m=y([W("ui-treeview")],m);class Z{constructor(){this.baseURL="",this.defaultHeaders={"Content-Type":"application/json"},this.defaultTimeout=3e4,this.interceptors={request:{handlers:[],use:(e,s)=>{this.interceptors.request.handlers.push({onFulfilled:e,onRejected:s})}},response:{handlers:[],use:(e,s)=>{this.interceptors.response.handlers.push({onFulfilled:e,onRejected:s})}}}}setBaseURL(e){this.baseURL=e}getBaseURL(){return this.baseURL}setDefaultHeaders(e){this.defaultHeaders={...this.defaultHeaders,...e}}setDefaultTimeout(e){this.defaultTimeout=e}async executeRequest(e,s){const i=e.startsWith("http")?e:this.baseURL+e;let r={method:"GET",headers:{...this.defaultHeaders},timeout:this.defaultTimeout,...s};for(const d of this.interceptors.request.handlers)try{r=await d.onFulfilled(r)}catch(a){if(d.onRejected)r=await d.onRejected(a);else throw a}const n=new AbortController,o=setTimeout(()=>n.abort(),r.timeout||this.defaultTimeout);try{const d={method:r.method,headers:r.headers,signal:n.signal};r.body&&r.method!=="GET"&&(d.body=(typeof r.body=="string",r.body));const a=await fetch(i,d);let h;const c=a.headers.get("content-type");c!=null&&c.includes("application/json")?h=a.ok?await a.json():null:c!=null&&c.includes("text")?h=await a.text():h=await a.blob();let u={status:a.status,statusText:a.statusText,headers:a.headers,data:h};if(!a.ok){const b=new Error(`HTTP ${a.status}: ${a.statusText}`);throw b.response=u,b.config=r,b}for(const b of this.interceptors.response.handlers)try{u=await b.onFulfilled(u)}catch(C){if(b.onRejected)u=await b.onRejected(C);else throw C}return u.data}catch(d){throw d instanceof Error&&d.name==="AbortError"?new Error(`Request timeout after ${r.timeout}ms`):d}finally{clearTimeout(o)}}async get(e,s){return this.executeRequest(e,{...s,method:"GET"})}async post(e,s,i){return this.executeRequest(e,{...i,method:"POST",body:typeof s=="string"||s instanceof FormData?s:JSON.stringify(s)})}async put(e,s,i){return this.executeRequest(e,{...i,method:"PUT",body:typeof s=="string"||s instanceof FormData?s:JSON.stringify(s)})}async patch(e,s,i){return this.executeRequest(e,{...i,method:"PATCH",body:typeof s=="string"||s instanceof FormData?s:JSON.stringify(s)})}async delete(e,s){return this.executeRequest(e,{...s,method:"DELETE"})}async head(e,s){return this.executeRequest(e,{...s,method:"HEAD"})}}const de=new Z;export{de as h};
