import{b as p}from"./iframe-Bw_KO9Y0.js";import"./button-DZ8HSUmR.js";import"./preload-helper-C1FmrZbK.js";import"./property-BCdGWBue.js";import"./state-CPy2gvTm.js";import"./template-CWz1uxk0.js";import"./unsafe-html-rRkyaLOt.js";import"./theme-Df5CjktT.js";import"./feather-YLknBcFY.js";import"./_commonjsHelpers-Cpj98o6Y.js";const C={title:"Components/Button",tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","danger"]},size:{control:"select",options:["sm","md","lg"]},icon:{control:"text"},iconPosition:{control:"select",options:["left","right"]},disabled:{control:"boolean"}},args:{label:"Click me",variant:"primary",size:"md",icon:"",iconPosition:"left",disabled:!1}},n={render:({label:o,variant:t,size:e,icon:a,iconPosition:b,disabled:u})=>p`
    <ui-button
      variant=${t}
      size=${e}
      icon=${a}
      icon-position=${b}
      ?disabled=${u}
    >${o}</ui-button>
  `},i={args:{label:"",variant:"primary",size:"md",icon:"settings",iconPosition:"left",disabled:!1},render:({variant:o,size:t,icon:e,disabled:a})=>p`
    <ui-button variant=${o} size=${t} icon=${e} ?disabled=${a}></ui-button>
  `};var r,s,l;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(l=(s=n.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};var c,d,m;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(m=(d=i.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const I=["Playground","IconOnly"];export{i as IconOnly,n as Playground,I as __namedExportsOrder,C as default};
