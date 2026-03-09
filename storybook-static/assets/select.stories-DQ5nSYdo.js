import{b as d}from"./iframe-Ck3e-F9w.js";import"./select-B4iwFhno.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./click-outside-CXo2mreH.js";import"./theme-DBvyg58T.js";const i=[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"angular",label:"Angular"},{value:"lit",label:"Lit"}],x={title:"Components/Select",tags:["autodocs"],argTypes:{searchable:{control:"boolean"},disabled:{control:"boolean"},value:{control:"text"}},args:{label:"Framework",placeholder:"Select framework...",searchable:!0,disabled:!1,value:""}},e={render:({label:o,placeholder:t,searchable:s,disabled:n,value:c})=>d`
    <ui-select
      label=${o}
      placeholder=${t}
      ?searchable=${s}
      ?disabled=${n}
      value=${c}
      .options=${i}
    ></ui-select>
  `};var a,l,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: ({
    label,
    placeholder,
    searchable,
    disabled,
    value
  }) => html\`
    <ui-select
      label=\${label}
      placeholder=\${placeholder}
      ?searchable=\${searchable}
      ?disabled=\${disabled}
      value=\${value}
      .options=\${options}
    ></ui-select>
  \`
}`,...(r=(l=e.parameters)==null?void 0:l.docs)==null?void 0:r.source}}};const y=["Playground"];export{e as Playground,y as __namedExportsOrder,x as default};
