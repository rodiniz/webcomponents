import{b as e}from"./iframe-Ck3e-F9w.js";import"./accordion-fpeuHaiB.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./theme-DBvyg58T.js";import"./class-builders-BssWg5Cc.js";const s=[{id:"item-1",title:"What is this component?",content:"This is an accordion component that allows users to expand and collapse content sections."},{id:"item-2",title:"How do I use it?",content:"Simply pass an array of items with id, title, and content properties. You can control which items are open using the openItemId property."},{id:"item-3",title:"Can I open multiple items?",content:"Yes! Set the allowMultiple property to true to allow multiple accordion items to be open at the same time."}],O={title:"Components/Accordion",tags:["autodocs"],argTypes:{items:{description:"Array of accordion items with id, title, and content"},allowMultiple:{control:"boolean",description:"Allow multiple items to be open simultaneously"},openItemId:{control:"text",description:"ID of the item to open by default"}},args:{items:s,allowMultiple:!1,openItemId:"item-1"}},t={render:({items:a,allowMultiple:y,openItemId:x})=>e`
    <ui-accordion
      .items=${a}
      ?allowMultiple=${y}
      openItemId=${x}
    ></ui-accordion>
  `},o={render:()=>e`
    <ui-accordion
      .items=${s}
      ?allowMultiple=${!1}
      openItemId="item-1"
    ></ui-accordion>
  `,args:{allowMultiple:!1}},n={render:()=>e`
    <ui-accordion
      .items=${s}
      ?allowMultiple=${!0}
    ></ui-accordion>
  `,args:{allowMultiple:!0}},i={render:()=>e`
      <ui-accordion
        .items=${[{id:"features",title:"✨ Features",content:`• Lightweight and fast
• Framework agnostic
• Full TypeScript support
• Theme switching`},{id:"usage",title:"📦 Installation",content:"npm install @diniz/webcomponents"},{id:"docs",title:"📚 Documentation",content:"Check out our Storybook for interactive examples and API documentation."}]}
        openItemId="features"
      ></ui-accordion>
    `},r={render:()=>e`
      <ui-accordion .items=${[{id:"lorem",title:"Expandable Content",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}]} openItemId="lorem"></ui-accordion>
    `};var l,c,m;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: ({
    items,
    allowMultiple,
    openItemId
  }) => html\`
    <ui-accordion
      .items=\${items}
      ?allowMultiple=\${allowMultiple}
      openItemId=\${openItemId}
    ></ui-accordion>
  \`
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,d,p;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => html\`
    <ui-accordion
      .items=\${defaultItems}
      ?allowMultiple=\${false}
      openItemId="item-1"
    ></ui-accordion>
  \`,
  args: {
    allowMultiple: false
  }
}`,...(p=(d=o.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var I,g,w;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => html\`
    <ui-accordion
      .items=\${defaultItems}
      ?allowMultiple=\${true}
    ></ui-accordion>
  \`,
  args: {
    allowMultiple: true
  }
}`,...(w=(g=n.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};var h,f,$;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const customItems: AccordionItem[] = [{
      id: 'features',
      title: '✨ Features',
      content: '• Lightweight and fast\\n• Framework agnostic\\n• Full TypeScript support\\n• Theme switching'
    }, {
      id: 'usage',
      title: '📦 Installation',
      content: 'npm install @diniz/webcomponents'
    }, {
      id: 'docs',
      title: '📚 Documentation',
      content: 'Check out our Storybook for interactive examples and API documentation.'
    }];
    return html\`
      <ui-accordion
        .items=\${customItems}
        openItemId="features"
      ></ui-accordion>
    \`;
  }
}`,...($=(f=i.parameters)==null?void 0:f.docs)==null?void 0:$.source}}};var M,b,S;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    const longItems: AccordionItem[] = [{
      id: 'lorem',
      title: 'Expandable Content',
      content: \`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\`
    }];
    return html\`
      <ui-accordion .items=\${longItems} openItemId="lorem"></ui-accordion>
    \`;
  }
}`,...(S=(b=r.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};const P=["Playground","SingleOpen","MultipleOpen","CustomContent","LongContent"];export{i as CustomContent,r as LongContent,n as MultipleOpen,t as Playground,o as SingleOpen,P as __namedExportsOrder,O as default};
