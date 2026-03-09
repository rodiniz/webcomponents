import{b as d}from"./iframe-Ck3e-F9w.js";import"./dropdown-CRRhDzr_.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./theme-DBvyg58T.js";import"./class-builders-BssWg5Cc.js";import"./click-outside-CXo2mreH.js";const f=[{id:"create",label:"Create a recording",disabled:!1},{id:"upload",label:"Upload a recording",disabled:!1}],q={title:"Components/Dropdown",tags:["autodocs"],argTypes:{label:{control:"text",description:"Button label text"},items:{description:"Array of menu items"},size:{control:"select",options:["sm","md","lg"],description:"Trigger size"},disabled:{control:"boolean",description:"Disable the dropdown"}},args:{label:"Record",items:f,size:"md",disabled:!1}},o={render:({label:e,items:h,size:C,disabled:A})=>d`
    <div style="padding: 2rem;">
      <ui-dropdown
        label=${e}
        .items=${h}
        size=${C}
        ?disabled=${A}
        @dropdown-select=${O=>{console.log("Selected:",O.detail)}}
      ></ui-dropdown>
    </div>
  `},r={render:()=>d`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Record"
        size="md"
        .items=${[{id:"create",label:"Create a recording"},{id:"upload",label:"Upload a recording"}]}
        @dropdown-select=${e=>{console.log("Selected:",e.detail)}}
      ></ui-dropdown>
    </div>
  `},l={render:()=>d`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="More"
        size="md"
        .items=${[{id:"edit",label:"Edit"},{id:"duplicate",label:"Duplicate"},{id:"delete",label:"Delete",disabled:!0},{id:"export",label:"Export"}]}
        @dropdown-select=${e=>{console.log("Selected:",e.detail)}}
      ></ui-dropdown>
    </div>
  `},i={render:()=>d`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Disabled"
        size="md"
        .items=${f}
        disabled
      ></ui-dropdown>
    </div>
  `},a={render:()=>d`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Actions"
        size="md"
        .items=${[{id:"new",label:"New Document"},{id:"open",label:"Open"},{id:"save",label:"Save"},{id:"saveas",label:"Save As..."},{id:"print",label:"Print"},{id:"export",label:"Export"},{id:"close",label:"Close"}]}
        @dropdown-select=${e=>{console.log("Selected:",e.detail)}}
      ></ui-dropdown>
    </div>
  `},s={render:()=>d`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Empty Menu"
        size="md"
        .items=${[]}
      ></ui-dropdown>
    </div>
  `};var t,n,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: ({
    label,
    items,
    size,
    disabled
  }) => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label=\${label}
        .items=\${items}
        size=\${size}
        ?disabled=\${disabled}
        @dropdown-select=\${(e: any) => {
    console.log('Selected:', e.detail);
  }}
      ></ui-dropdown>
    </div>
  \`
}`,...(p=(n=o.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};var c,m,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Record"
        size="md"
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
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var b,g,w;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="More"
        size="md"
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
}`,...(w=(g=l.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};var v,y,$;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Disabled"
        size="md"
        .items=\${defaultItems}
        disabled
      ></ui-dropdown>
    </div>
  \`
}`,...($=(y=i.parameters)==null?void 0:y.docs)==null?void 0:$.source}}};var S,z,x;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Actions"
        size="md"
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
}`,...(x=(z=a.parameters)==null?void 0:z.docs)==null?void 0:x.source}}};var D,E,M;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem;">
      <ui-dropdown
        label="Empty Menu"
        size="md"
        .items=\${[]}
      ></ui-dropdown>
    </div>
  \`
}`,...(M=(E=s.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};const F=["Playground","RecordMenu","MoreOptions","Disabled","ManyItems","Empty"];export{i as Disabled,s as Empty,a as ManyItems,l as MoreOptions,o as Playground,r as RecordMenu,F as __namedExportsOrder,q as default};
