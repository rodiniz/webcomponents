import{r as m,i as f,b as n}from"./iframe-Bw_KO9Y0.js";import{n as c,t as g}from"./property-BCdGWBue.js";import{r as y}from"./state-CPy2gvTm.js";import{c as v}from"./template-CWz1uxk0.js";import{t as w}from"./theme-Df5CjktT.js";import"./button-DZ8HSUmR.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-rRkyaLOt.js";import"./feather-YLknBcFY.js";import"./_commonjsHelpers-Cpj98o6Y.js";var C=Object.defineProperty,A=Object.getOwnPropertyDescriptor,d=(e,a,t,r)=>{for(var s=r>1?void 0:r?A(a,t):a,o=e.length-1,i;o>=0;o--)(i=e[o])&&(s=(r?i(a,t,s):i(s))||s);return r&&s&&C(a,t,s),s};let l=class extends f{constructor(){super(...arguments),this.columns=[],this.rows=[],this.bordered=!0,this.zebra=!1,this.collapsible=!0,this.expandedRows=new Set}connectedCallback(){this.setAttribute("data-ui","table"),super.connectedCallback()}set data(e){this.columns=e.columns,this.rows=e.rows}get data(){return{columns:this.columns,rows:this.rows}}handleAction(e,a){const t=this.rows[a];this.dispatchEvent(new CustomEvent("action",{detail:{action:e,row:t,rowIndex:a},bubbles:!0,composed:!0}))}toggleExpand(e){this.expandedRows.has(e)?this.expandedRows.delete(e):this.expandedRows.add(e),this.expandedRows=new Set(this.expandedRows)}hasChildren(e){return Array.isArray(e.children)&&e.children.length>0}renderExpandIcon(e,a){if(!this.collapsible||!this.hasChildren(e))return null;const t=this.expandedRows.has(a);return n`
      <ui-button 
        variant="ghost" 
        size="sm" 
        icon="${t?"chevron-down":"chevron-right"}"
        @click=${()=>this.toggleExpand(a)}
      ></ui-button>
    `}renderChildRow(e,a,t){const r=this.columns.filter(s=>s.visible!==!1);return n`
      <tr class="child-row" data-row-index="${a}" data-depth="${t}">
        ${r.map((s,o)=>s.template?n`<td class="align-${s.align??"left"}">${s.template(e,a)}</td>`:s.actions?n`<td class="align-center actions-cell"></td>`:o===0?n`
              <td class="align-${s.align??"left"}">
                <span class="child-row-indent" style="margin-left: ${t*24}px"></span>
                ${String(e[s.key]??"")}
              </td>
            `:n`<td class="align-${s.align??"left"}">${String(e[s.key]??"")}</td>`)}
      </tr>
    `}renderRows(){const e=[],a=this.columns.filter(t=>t.visible!==!1);return this.rows.forEach((t,r)=>{const s=this.expandedRows.has(r),o=this.hasChildren(t);e.push(n`
        <tr class="${o?"has-children":""} ${s?"expanded":""}" data-row-index="${r}">
          ${a.map((i,p)=>i.template?n`
                <td class="align-${i.align??"left"}">
                  ${p===0?this.renderExpandIcon(t,r):""}
                  ${i.template(t,r)}
                </td>
              `:i.actions?n`
                <td class="align-center actions-cell">
                  ${i.actions.edit?n`
                    <ui-button variant="primary" class="action-btn" icon="edit" size="sm" data-action="edit" data-row-index="${r}" @click=${()=>this.handleAction("edit",r)}></ui-button>
                  `:""}
                  ${i.actions.delete?n`
                    <ui-button variant="danger" class="action-btn" icon="trash" size="sm" data-action="delete" data-row-index="${r}" @click=${()=>this.handleAction("delete",r)}></ui-button>
                  `:""}
                </td>
              `:p===0?n`
                <td class="align-${i.align??"left"}">
                  ${this.renderExpandIcon(t,r)}
                  ${String(t[i.key]??"")}
                </td>
              `:n`<td class="align-${i.align??"left"}">${String(t[i.key]??"")}</td>`)}
        </tr>
      `),s&&o&&t.children&&t.children.forEach((i,p)=>{e.push(this.renderChildRow(i,r*1e3+p,1))})}),e}render(){const e=this.columns.filter(t=>t.visible!==!1),a=v({"table-wrap":!0,"no-border":!this.bordered,zebra:this.zebra});return n`
      <div class=${a}>
        <table>
          <thead>
            <tr>
              ${e.map(t=>n`
                <th class="align-${t.align??"left"}">${t.label}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${this.renderRows()}
          </tbody>
        </table>
      </div>
    `}};l.styles=[m(w)];d([c({type:Array})],l.prototype,"columns",2);d([c({type:Array})],l.prototype,"rows",2);d([c({type:Boolean,reflect:!0})],l.prototype,"bordered",2);d([c({type:Boolean,reflect:!0})],l.prototype,"zebra",2);d([c({type:Boolean,reflect:!0})],l.prototype,"collapsible",2);d([y()],l.prototype,"expandedRows",2);l=d([g("ui-table")],l);const z=[{key:"name",label:"Name"},{key:"role",label:"Role"},{key:"status",label:"Status"},{key:"actions",label:"Actions",align:"center",actions:{edit:!0,delete:!0}}],E=[{name:"Ava Johnson",role:"Frontend Engineer",status:"Active"},{name:"Noah Silva",role:"Product Designer",status:"Active"},{name:"Mia Costa",role:"QA Analyst",status:"Away"}],j={title:"Components/Table",tags:["autodocs"],argTypes:{bordered:{control:"boolean"},zebra:{control:"boolean"},collapsible:{control:"boolean"}},args:{bordered:!0,zebra:!0,collapsible:!0}},h={render:({bordered:e,zebra:a,collapsible:t})=>n`
    <ui-table
      .columns=${z}
      .rows=${E}
      ?bordered=${e}
      ?zebra=${a}
      ?collapsible=${t}
    ></ui-table>
  `};var b,u,$;h.parameters={...h.parameters,docs:{...(b=h.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...($=(u=h.parameters)==null?void 0:u.docs)==null?void 0:$.source}}};const M=["Playground"];export{h as Playground,M as __namedExportsOrder,j as default};
