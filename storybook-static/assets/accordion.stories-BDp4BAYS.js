import{r as k,i as F,b as i}from"./iframe-6s-sIqo3.js";import{n as h,t as L}from"./property-C_0pZ1Mq.js";import{r as T}from"./state-vQ8fJvXj.js";import{c as f}from"./template-BbtPzLcA.js";import{t as E}from"./theme-CCP9F1YV.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-BsqWkz84.js";var U=Object.defineProperty,j=Object.getOwnPropertyDescriptor,a=(e,t,o,r)=>{for(var n=r>1?void 0:r?j(t,o):t,u=e.length-1,I;u>=0;u--)(I=e[u])&&(n=(r?I(t,o,n):I(n))||n);return r&&n&&U(t,o,n),n};let s=class extends F{constructor(){super(...arguments),this.items=[],this.allowMultiple=!1,this.openItemId="",this.openItems=new Set}connectedCallback(){this.setAttribute("data-ui","accordion"),super.connectedCallback(),this.openItemId&&this.openItems.add(this.openItemId)}updated(e){e.has("openItemId")&&this.openItemId&&(this.allowMultiple||this.openItems.clear(),this.openItems.add(this.openItemId))}toggleItem(e){this.openItems.has(e)?this.openItems.delete(e):(this.allowMultiple||this.openItems.clear(),this.openItems.add(e)),this.openItems=new Set(this.openItems);const t={openItems:Array.from(this.openItems)};this.dispatchEvent(new CustomEvent("accordion-change",{detail:t,bubbles:!0,composed:!0}))}render(){return i`
      <div class="accordion">
        ${this.items.map(e=>{const t=this.openItems.has(e.id),o=f({"accordion-header":!0,"is-open":t}),r=f({"accordion-content":!0,"is-hidden":!t});return i`
            <div class="accordion-item" data-item-id=${e.id}>
              <button
                class=${o}
                @click=${()=>this.toggleItem(e.id)}
                aria-expanded=${t}
                aria-controls="content-${e.id}"
              >
                <span class="accordion-title">${e.title}</span>
                <span class="accordion-icon">
                  <svg class="feather" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <div class=${r} id="content-${e.id}">
                <div class="accordion-body">${e.content}</div>
              </div>
            </div>
          `})}
      </div>
    `}};s.styles=[k(E)];a([h({type:Array})],s.prototype,"items",2);a([h({type:Boolean,reflect:!0})],s.prototype,"allowMultiple",2);a([h({type:String})],s.prototype,"openItemId",2);a([T()],s.prototype,"openItems",2);s=a([L("ui-accordion")],s);const g=[{id:"item-1",title:"What is this component?",content:"This is an accordion component that allows users to expand and collapse content sections."},{id:"item-2",title:"How do I use it?",content:"Simply pass an array of items with id, title, and content properties. You can control which items are open using the openItemId property."},{id:"item-3",title:"Can I open multiple items?",content:"Yes! Set the allowMultiple property to true to allow multiple accordion items to be open at the same time."}],K={title:"Components/Accordion",tags:["autodocs"],argTypes:{items:{description:"Array of accordion items with id, title, and content"},allowMultiple:{control:"boolean",description:"Allow multiple items to be open simultaneously"},openItemId:{control:"text",description:"ID of the item to open by default"}},args:{items:g,allowMultiple:!1,openItemId:"item-1"}},l={render:({items:e,allowMultiple:t,openItemId:o})=>i`
    <ui-accordion
      .items=${e}
      ?allowMultiple=${t}
      openItemId=${o}
    ></ui-accordion>
  `},c={render:()=>i`
    <ui-accordion
      .items=${g}
      ?allowMultiple=${!1}
      openItemId="item-1"
    ></ui-accordion>
  `,args:{allowMultiple:!1}},d={render:()=>i`
    <ui-accordion
      .items=${g}
      ?allowMultiple=${!0}
    ></ui-accordion>
  `,args:{allowMultiple:!0}},m={render:()=>i`
      <ui-accordion
        .items=${[{id:"features",title:"✨ Features",content:`• Lightweight and fast
• Framework agnostic
• Full TypeScript support
• Theme switching`},{id:"usage",title:"📦 Installation",content:"npm install @diniz/webcomponents"},{id:"docs",title:"📚 Documentation",content:"Check out our Storybook for interactive examples and API documentation."}]}
        openItemId="features"
      ></ui-accordion>
    `},p={render:()=>i`
      <ui-accordion .items=${[{id:"lorem",title:"Expandable Content",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}]} openItemId="lorem"></ui-accordion>
    `};var w,$,y;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(y=($=l.parameters)==null?void 0:$.docs)==null?void 0:y.source}}};var v,b,M;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(M=(b=c.parameters)==null?void 0:b.docs)==null?void 0:M.source}}};var C,S,x;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => html\`
    <ui-accordion
      .items=\${defaultItems}
      ?allowMultiple=\${true}
    ></ui-accordion>
  \`,
  args: {
    allowMultiple: true
  }
}`,...(x=(S=d.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var A,O,q;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(q=(O=m.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var P,_,D;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(D=(_=p.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};const N=["Playground","SingleOpen","MultipleOpen","CustomContent","LongContent"];export{m as CustomContent,p as LongContent,d as MultipleOpen,l as Playground,c as SingleOpen,N as __namedExportsOrder,K as default};
