import{b as c}from"./iframe-6s-sIqo3.js";import"./radio-CeGSCN3Y.js";import"./preload-helper-C1FmrZbK.js";import"./property-C_0pZ1Mq.js";import"./template-BbtPzLcA.js";import"./unsafe-html-BsqWkz84.js";const h={title:"Components/Radio",tags:["autodocs"],argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},size:{control:"select",options:["sm","md","lg"]}},args:{label:"Option A",value:"a",name:"example",checked:!0,disabled:!1,size:"md"}},e={render:({label:r,value:d,name:l,checked:s,disabled:i,size:t})=>c`
    <ui-radio
      label=${r}
      value=${d}
      name=${l}
      ?checked=${s}
      ?disabled=${i}
      size=${t}
    ></ui-radio>
  `};var a,o,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: ({
    label,
    value,
    name,
    checked,
    disabled,
    size
  }) => html\`
    <ui-radio
      label=\${label}
      value=\${value}
      name=\${name}
      ?checked=\${checked}
      ?disabled=\${disabled}
      size=\${size}
    ></ui-radio>
  \`
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};const k=["Playground"];export{e as Playground,k as __namedExportsOrder,h as default};
