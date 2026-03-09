import{b as d}from"./iframe-Ck3e-F9w.js";import"./checkbox-B_0rBhyF.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./class-builders-BssWg5Cc.js";import"./validators-OS32PDZK.js";const g={title:"Components/Checkbox",tags:["autodocs"],argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},indeterminate:{control:"boolean"},size:{control:"select",options:["sm","md","lg"]}},args:{label:"Accept terms",checked:!1,disabled:!1,indeterminate:!1,size:"md"}},e={render:({label:r,checked:a,disabled:i,indeterminate:c,size:s})=>d`
    <ui-checkbox
      label=${r}
      ?checked=${a}
      ?disabled=${i}
      ?indeterminate=${c}
      size=${s}
    ></ui-checkbox>
  `};var o,n,t;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: ({
    label,
    checked,
    disabled,
    indeterminate,
    size
  }) => html\`
    <ui-checkbox
      label=\${label}
      ?checked=\${checked}
      ?disabled=\${disabled}
      ?indeterminate=\${indeterminate}
      size=\${size}
    ></ui-checkbox>
  \`
}`,...(t=(n=e.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};const x=["Playground"];export{e as Playground,x as __namedExportsOrder,g as default};
