import{b as s}from"./iframe-Ck3e-F9w.js";import"./card-E02Fqa-A.js";import"./button-C3WNtjOb.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./theme-DBvyg58T.js";import"./icon-helpers-uywyl4Wq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./class-builders-BssWg5Cc.js";const w={title:"Components/Card",tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","elevated","bordered","ghost","glass"]},shadow:{control:"boolean"},rounded:{control:"boolean"}},args:{variant:"default",shadow:!0,rounded:!0}},t={render:({variant:e,shadow:n,rounded:i})=>s`
    <ui-card variant=${e} ?shadow=${n} ?rounded=${i} elevation="sm">
      <div slot="header"><strong>Release summary</strong></div>
      <div slot="content">Track updates from the component library.</div>
      <div slot="footer">
        <ui-button variant="ghost" size="sm">Cancel</ui-button>
        <ui-button variant="primary" size="sm">Open</ui-button>
      </div>
    </ui-card>
  `};var o,r,a;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: ({
    variant,
    shadow,
    rounded
  }) => html\`
    <ui-card variant=\${variant} ?shadow=\${shadow} ?rounded=\${rounded} elevation="sm">
      <div slot="header"><strong>Release summary</strong></div>
      <div slot="content">Track updates from the component library.</div>
      <div slot="footer">
        <ui-button variant="ghost" size="sm">Cancel</ui-button>
        <ui-button variant="primary" size="sm">Open</ui-button>
      </div>
    </ui-card>
  \`
}`,...(a=(r=t.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};const $=["Playground"];export{t as Playground,$ as __namedExportsOrder,w as default};
