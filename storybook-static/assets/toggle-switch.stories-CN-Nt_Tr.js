import{b as g}from"./iframe-Ck3e-F9w.js";import"./toggle-switch-Cmm-JnXl.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./validators-OS32PDZK.js";import"./class-builders-BssWg5Cc.js";import"./keyboard-helpers-TtfJu0Hs.js";import"./theme-DBvyg58T.js";const S={title:"Components/Toggle Switch",tags:["autodocs"],argTypes:{label:{control:"text"},checked:{control:"boolean"},disabled:{control:"boolean"},size:{control:"select",options:["sm","md","lg"]},name:{control:"text"}},args:{label:"Enable notifications",checked:!0,disabled:!1,size:"md",name:"notifications"}},e={render:({label:t,checked:s,disabled:a,size:o,name:h})=>g`
    <ui-toggle-switch
      label=${t}
      ?checked=${s}
      ?disabled=${a}
      size=${o}
      name=${h}
    ></ui-toggle-switch>
  `},n={args:{label:"",checked:!1,size:"md"},render:({checked:t,disabled:s,size:a,name:o})=>g`
    <ui-toggle-switch
      ?checked=${t}
      ?disabled=${s}
      size=${a}
      name=${o}
    ></ui-toggle-switch>
  `};var i,r,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: ({
    label,
    checked,
    disabled,
    size,
    name
  }) => html\`
    <ui-toggle-switch
      label=\${label}
      ?checked=\${checked}
      ?disabled=\${disabled}
      size=\${size}
      name=\${name}
    ></ui-toggle-switch>
  \`
}`,...(c=(r=e.parameters)==null?void 0:r.docs)==null?void 0:c.source}}};var l,d,m;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    label: '',
    checked: false,
    size: 'md'
  },
  render: ({
    checked,
    disabled,
    size,
    name
  }) => html\`
    <ui-toggle-switch
      ?checked=\${checked}
      ?disabled=\${disabled}
      size=\${size}
      name=\${name}
    ></ui-toggle-switch>
  \`
}`,...(m=(d=n.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const E=["Playground","WithoutLabel"];export{e as Playground,n as WithoutLabel,E as __namedExportsOrder,S as default};
