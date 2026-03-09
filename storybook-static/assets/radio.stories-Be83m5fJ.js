import{b as m}from"./iframe-Ck3e-F9w.js";import"./radio-Cn__zr-R.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./validators-OS32PDZK.js";import"./class-builders-BssWg5Cc.js";import"./keyboard-helpers-TtfJu0Hs.js";const v={title:"Components/Radio",tags:["autodocs"],argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},size:{control:"select",options:["sm","md","lg"]}},args:{label:"Option A",value:"a",name:"example",checked:!0,disabled:!1,size:"md"}},e={render:({label:n,value:d,name:l,checked:i,disabled:s,size:t})=>m`
    <ui-radio
      label=${n}
      value=${d}
      name=${l}
      ?checked=${i}
      ?disabled=${s}
      size=${t}
    ></ui-radio>
  `};var a,o,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(r=(o=e.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const f=["Playground"];export{e as Playground,f as __namedExportsOrder,v as default};
