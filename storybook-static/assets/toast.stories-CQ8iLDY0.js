import{b as i}from"./iframe-Ck3e-F9w.js";import"./toast-hujraZ8_.js";import"./button-C3WNtjOb.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./theme-DBvyg58T.js";import"./icon-helpers-uywyl4Wq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./unsafe-html-7KbQsD9c.js";import"./template-1VJuhrPW.js";import"./class-builders-BssWg5Cc.js";const E={title:"Components/Toast",tags:["autodocs"]},o={render:()=>i`
    <div style="display: flex; gap: 0.5rem;">
      <ui-button @click=${()=>{var t;return(t=document.getElementById("story-toast"))==null?void 0:t.success("Saved","Changes saved successfully")}}>Success</ui-button>
      <ui-button variant="danger" @click=${()=>{var t;return(t=document.getElementById("story-toast"))==null?void 0:t.error("Error","Something went wrong")}}>Error</ui-button>
    </div>
    <ui-toast id="story-toast" position="top-right"></ui-toast>
  `};var r,e,s;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 0.5rem;">
      <ui-button @click=\${() => (document.getElementById('story-toast') as any)?.success('Saved', 'Changes saved successfully')}>Success</ui-button>
      <ui-button variant="danger" @click=\${() => (document.getElementById('story-toast') as any)?.error('Error', 'Something went wrong')}>Error</ui-button>
    </div>
    <ui-toast id="story-toast" position="top-right"></ui-toast>
  \`
}`,...(s=(e=o.parameters)==null?void 0:e.docs)==null?void 0:s.source}}};const h=["Playground"];export{o as Playground,h as __namedExportsOrder,E as default};
