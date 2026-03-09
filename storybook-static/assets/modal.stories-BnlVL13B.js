import{b as a}from"./iframe-Ck3e-F9w.js";import"./modal-_aGH9G5V.js";import"./button-C3WNtjOb.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./keyboard-helpers-TtfJu0Hs.js";import"./theme-DBvyg58T.js";import"./state-CVS5rq8K.js";import"./icon-helpers-uywyl4Wq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./class-builders-BssWg5Cc.js";const y={title:"Components/Modal",tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]}},args:{title:"Example modal",size:"md"}},t={render:({title:e,size:n})=>a`
    <ui-modal open title=${e} size=${n}>
      This is a preview of modal content in Storybook.
      <div slot="footer">
        <ui-button variant="ghost">Cancel</ui-button>
        <ui-button variant="primary">Confirm</ui-button>
      </div>
    </ui-modal>
  `};var o,i,r;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: ({
    title,
    size
  }) => html\`
    <ui-modal open title=\${title} size=\${size}>
      This is a preview of modal content in Storybook.
      <div slot="footer">
        <ui-button variant="ghost">Cancel</ui-button>
        <ui-button variant="primary">Confirm</ui-button>
      </div>
    </ui-modal>
  \`
}`,...(r=(i=t.parameters)==null?void 0:i.docs)==null?void 0:r.source}}};const C=["Open"];export{t as Open,C as __namedExportsOrder,y as default};
