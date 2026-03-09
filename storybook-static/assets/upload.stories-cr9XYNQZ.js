import{b as d}from"./iframe-Ck3e-F9w.js";import"./upload-DoI1I2V3.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./icon-helpers-uywyl4Wq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./theme-DBvyg58T.js";const y={title:"Components/Upload",tags:["autodocs"],argTypes:{multiple:{control:"boolean"},disabled:{control:"boolean"}},args:{label:"Drag and drop files here",helper:"PNG, JPG, SVG",accept:".png,.jpg,.jpeg,.svg",multiple:!0,disabled:!1}},e={render:({label:o,helper:p,accept:t,multiple:n,disabled:s})=>d`
    <ui-upload
      label=${o}
      helper=${p}
      accept=${t}
      ?multiple=${n}
      ?disabled=${s}
      name="assets"
    ></ui-upload>
  `};var l,a,r;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: ({
    label,
    helper,
    accept,
    multiple,
    disabled
  }) => html\`
    <ui-upload
      label=\${label}
      helper=\${helper}
      accept=\${accept}
      ?multiple=\${multiple}
      ?disabled=\${disabled}
      name="assets"
    ></ui-upload>
  \`
}`,...(r=(a=e.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};const G=["Playground"];export{e as Playground,G as __namedExportsOrder,y as default};
