import{r as N,i as j,b as n}from"./iframe-6s-sIqo3.js";import{n as g,t as L}from"./property-C_0pZ1Mq.js";import{r as T}from"./state-vQ8fJvXj.js";import{c as v}from"./template-BbtPzLcA.js";import{t as q}from"./theme-CCP9F1YV.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-BsqWkz84.js";var z=Object.defineProperty,F=Object.getOwnPropertyDescriptor,s=(e,d,o,l)=>{for(var t=l>1?void 0:l?F(d,o):d,b=e.length-1,w;b>=0;b--)(w=e[b])&&(t=(l?w(d,o,t):w(t))||t);return l&&t&&z(d,o,t),t};let r=class extends j{constructor(){super(...arguments),this.label="Menu",this.items=[],this.disabled=!1,this.isOpen=!1,this.triggerButton=null,this.toggleDropdown=()=>{this.disabled||(this.isOpen=!this.isOpen)},this.handleItemClick=e=>{const d=this.items.find(o=>o.id===e);d&&!d.disabled&&(this.dispatchEvent(new CustomEvent("dropdown-select",{detail:{id:e,label:d.label},bubbles:!0,composed:!0})),this.isOpen=!1)}}connectedCallback(){this.setAttribute("data-ui","dropdown"),super.connectedCallback()}firstUpdated(){document.addEventListener("click",e=>{this.contains(e.target)||(this.isOpen=!1)})}render(){const e=v({"dropdown-trigger":!0,"is-open":this.isOpen,disabled:this.disabled});return n`
      <div class="dropdown-container">
        <button
          class=${e}
          @click=${this.toggleDropdown}
          ?disabled=${this.disabled}
          aria-expanded=${this.isOpen}
          aria-haspopup="menu"
        >
          <span class="dropdown-label">${this.label}</span>
          <span class="dropdown-chevron">
            <svg class="feather" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>

        <div class=${v({"dropdown-menu":!0,"is-visible":this.isOpen})}>
          ${this.items.length>0?this.items.map(d=>n`
                <button
                  class=${v({"dropdown-item":!0,disabled:d.disabled})}
                  @click=${()=>this.handleItemClick(d.id)}
                  ?disabled=${d.disabled}
                >
                  ${d.label}
                </button>
              `):n`<div class="dropdown-empty">No items</div>`}
        </div>
      </div>
    `}};r.styles=[N(q)];s([g({type:String})],r.prototype,"label",2);s([g({type:Array})],r.prototype,"items",2);s([g({type:Boolean,reflect:!0})],r.prototype,"disabled",2);s([T()],r.prototype,"isOpen",2);r=s([L("ui-dropdown")],r);const B=[{id:"create",label:"Create a recording"},{id:"upload",label:"Upload a recording"}],X={title:"Components/Dropdown",tags:["autodocs"],argTypes:{label:{control:"text",description:"Button label text"},items:{description:"Array of menu items"},disabled:{control:"boolean",description:"Disable the dropdown"}},args:{label:"Record",items:B,disabled:!1}},i={render:({label:e,items:d,disabled:o})=>n`
    <div style="padding: 2rem;">
      <ui-dropdown
        label=${e}
        .items=${d}
        ?disabled=${o}
        @dropdown-select=${l=>{console.log("Selected:",l.detail)}}
      ></ui-dropdown>
    </div>
  `},a={render:()=>n`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Record"
        .items=${[{id:"create",label:"Create a recording"},{id:"upload",label:"Upload a recording"}]}
        @dropdown-select=${e=>{console.log("Selected:",e.detail)}}
      ></ui-dropdown>
    </div>
  `},p={render:()=>n`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="More"
        .items=${[{id:"edit",label:"Edit"},{id:"duplicate",label:"Duplicate"},{id:"delete",label:"Delete",disabled:!0},{id:"export",label:"Export"}]}
        @dropdown-select=${e=>{console.log("Selected:",e.detail)}}
      ></ui-dropdown>
    </div>
  `},c={render:()=>n`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Disabled"
        .items=${B}
        disabled
      ></ui-dropdown>
    </div>
  `},m={render:()=>n`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Actions"
        .items=${[{id:"new",label:"New Document"},{id:"open",label:"Open"},{id:"save",label:"Save"},{id:"saveas",label:"Save As..."},{id:"print",label:"Print"},{id:"export",label:"Export"},{id:"close",label:"Close"}]}
        @dropdown-select=${e=>{console.log("Selected:",e.detail)}}
      ></ui-dropdown>
    </div>
  `},u={render:()=>n`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Empty Menu"
        .items=${[]}
      ></ui-dropdown>
    </div>
  `};var h,y,$;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: ({
    label,
    items,
    disabled
  }) => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label=\${label}
        .items=\${items}
        ?disabled=\${disabled}
        @dropdown-select=\${(e: any) => {
    console.log('Selected:', e.detail);
  }}
      ></ui-dropdown>
    </div>
  \`
}`,...($=(y=i.parameters)==null?void 0:y.docs)==null?void 0:$.source}}};var f,S,O;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Record"
        .items=\${[{
    id: 'create',
    label: 'Create a recording'
  }, {
    id: 'upload',
    label: 'Upload a recording'
  }]}
        @dropdown-select=\${(e: any) => {
    console.log('Selected:', e.detail);
  }}
      ></ui-dropdown>
    </div>
  \`
}`,...(O=(S=a.parameters)==null?void 0:S.docs)==null?void 0:O.source}}};var D,x,C;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="More"
        .items=\${[{
    id: 'edit',
    label: 'Edit'
  }, {
    id: 'duplicate',
    label: 'Duplicate'
  }, {
    id: 'delete',
    label: 'Delete',
    disabled: true
  }, {
    id: 'export',
    label: 'Export'
  }]}
        @dropdown-select=\${(e: any) => {
    console.log('Selected:', e.detail);
  }}
      ></ui-dropdown>
    </div>
  \`
}`,...(C=(x=p.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var E,M,P;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Disabled"
        .items=\${defaultItems}
        disabled
      ></ui-dropdown>
    </div>
  \`
}`,...(P=(M=c.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var _,A,I;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Actions"
        .items=\${[{
    id: 'new',
    label: 'New Document'
  }, {
    id: 'open',
    label: 'Open'
  }, {
    id: 'save',
    label: 'Save'
  }, {
    id: 'saveas',
    label: 'Save As...'
  }, {
    id: 'print',
    label: 'Print'
  }, {
    id: 'export',
    label: 'Export'
  }, {
    id: 'close',
    label: 'Close'
  }]}
        @dropdown-select=\${(e: any) => {
    console.log('Selected:', e.detail);
  }}
      ></ui-dropdown>
    </div>
  \`
}`,...(I=(A=m.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var R,U,k;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Empty Menu"
        .items=\${[]}
      ></ui-dropdown>
    </div>
  \`
}`,...(k=(U=u.parameters)==null?void 0:U.docs)==null?void 0:k.source}}};const Y=["Playground","RecordMenu","MoreOptions","Disabled","ManyItems","Empty"];export{c as Disabled,u as Empty,m as ManyItems,p as MoreOptions,i as Playground,a as RecordMenu,Y as __namedExportsOrder,X as default};
