import{b as s}from"./iframe-Ck3e-F9w.js";import"./button-C3WNtjOb.js";import{I as f,a as c}from"./icons-lgEBa0uT.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./theme-DBvyg58T.js";import"./icon-helpers-uywyl4Wq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./class-builders-BssWg5Cc.js";const _={title:"Components/Button",tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","danger"]},size:{control:"select",options:["sm","md","lg"]},icon:{control:"text"},iconPosition:{control:"select",options:["left","right"]},disabled:{control:"boolean"}},args:{label:"Click me",variant:"primary",size:"md",icon:"",iconPosition:"left",disabled:!1}},t={render:({label:n,variant:i,size:e,icon:r,iconPosition:y,disabled:h})=>s`
    <ui-button
      variant=${i}
      size=${e}
      icon=${r}
      icon-position=${y}
      ?disabled=${h}
    >${n}</ui-button>
  `},o={args:{label:"",variant:"primary",size:"md",icon:"settings",iconPosition:"left",disabled:!1},render:({variant:n,size:i,icon:e,disabled:r})=>s`
    <ui-button variant=${n} size=${i} icon=${e} ?disabled=${r}></ui-button>
  `},a={render:()=>{const n="check",i=f.success;return s`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ui-button variant="primary" icon=${n}>With Icon Enum</ui-button>
        <ui-button variant="secondary" icon=${i}>Using Alias</ui-button>
        <ui-button variant="ghost" icon="settings">Settings</ui-button>
        <ui-button variant="danger" icon="trash-2">Delete</ui-button>
      </div>
      <p style="margin-top: 16px; font-size: 14px; color: #666;">
        Available icons: ${c.slice(0,10).join(", ")}... (${c.length} total)
      </p>
    `}};var l,u,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: ({
    label,
    variant,
    size,
    icon,
    iconPosition,
    disabled
  }) => html\`
    <ui-button
      variant=\${variant}
      size=\${size}
      icon=\${icon}
      icon-position=\${iconPosition}
      ?disabled=\${disabled}
    >\${label}</ui-button>
  \`
}`,...(d=(u=t.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var p,m,b;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: '',
    variant: 'primary',
    size: 'md',
    icon: 'settings',
    iconPosition: 'left',
    disabled: false
  },
  render: ({
    variant,
    size,
    icon,
    disabled
  }) => html\`
    <ui-button variant=\${variant} size=\${size} icon=\${icon} ?disabled=\${disabled}></ui-button>
  \`
}`,...(b=(m=o.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var g,$,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const icon: IconName = 'check';
    const iconFromAlias: IconName = ICON_ALIASES.success;
    return html\`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ui-button variant="primary" icon=\${icon}>With Icon Enum</ui-button>
        <ui-button variant="secondary" icon=\${iconFromAlias}>Using Alias</ui-button>
        <ui-button variant="ghost" icon="settings">Settings</ui-button>
        <ui-button variant="danger" icon="trash-2">Delete</ui-button>
      </div>
      <p style="margin-top: 16px; font-size: 14px; color: #666;">
        Available icons: \${ICONS.slice(0, 10).join(', ')}... (\${ICONS.length} total)
      </p>
    \`;
  }
}`,...(v=($=a.parameters)==null?void 0:$.docs)==null?void 0:v.source}}};const k=["Playground","IconOnly","WithIconEnum"];export{o as IconOnly,t as Playground,a as WithIconEnum,k as __namedExportsOrder,_ as default};
