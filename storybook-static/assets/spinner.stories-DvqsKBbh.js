import{b as e}from"./iframe-Ck3e-F9w.js";import"./spinner-QkkTxkQg.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./validators-OS32PDZK.js";import"./theme-DBvyg58T.js";const _={title:"Components/Spinner",tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"],description:"Spinner size"},variant:{control:"select",options:["primary","secondary","success","danger"],description:"Spinner color variant"},label:{control:"text",description:"Loading label text"},showLabel:{control:"boolean",description:"Show label below spinner"}},args:{size:"md",variant:"primary",label:"Loading...",showLabel:!0}},n={render:({size:x,variant:z,label:S,showLabel:f})=>e`
    <ui-spinner
      size=${x}
      variant=${z}
      label=${S}
      ?showLabel=${f}
    ></ui-spinner>
  `},i={render:()=>e`
    <div style="display: flex; gap: 2rem; align-items: center; justify-content: center;">
      <div style="text-align: center;">
        <ui-spinner size="sm" label="Small" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner size="md" label="Medium" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner size="lg" label="Large" showLabel></ui-spinner>
      </div>
    </div>
  `},r={render:()=>e`
    <div style="display: flex; gap: 2rem; align-items: center; justify-content: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <ui-spinner variant="primary" label="Primary" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner variant="secondary" label="Secondary" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner variant="success" label="Success" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner variant="danger" label="Danger" showLabel></ui-spinner>
      </div>
    </div>
  `},s={render:()=>e`
    <ui-spinner size="md" variant="primary" ?showLabel=${!1}></ui-spinner>
  `},a={render:()=>e`
    <div style="display: flex; gap: 3rem; align-items: center; justify-content: center;">
      <div style="text-align: center;">
        <ui-spinner size="lg" variant="success" label="Saving..." showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner size="md" variant="danger" label="Processing..." showLabel></ui-spinner>
      </div>
    </div>
  `};var t,l,o;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: ({
    size,
    variant,
    label,
    showLabel
  }) => html\`
    <ui-spinner
      size=\${size}
      variant=\${variant}
      label=\${label}
      ?showLabel=\${showLabel}
    ></ui-spinner>
  \`
}`,...(o=(l=n.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};var d,p,c;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 2rem; align-items: center; justify-content: center;">
      <div style="text-align: center;">
        <ui-spinner size="sm" label="Small" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner size="md" label="Medium" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner size="lg" label="Large" showLabel></ui-spinner>
      </div>
    </div>
  \`
}`,...(c=(p=i.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var u,m,v;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 2rem; align-items: center; justify-content: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <ui-spinner variant="primary" label="Primary" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner variant="secondary" label="Secondary" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner variant="success" label="Success" showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner variant="danger" label="Danger" showLabel></ui-spinner>
      </div>
    </div>
  \`
}`,...(v=(m=r.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var g,b,y;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => html\`
    <ui-spinner size="md" variant="primary" ?showLabel=\${false}></ui-spinner>
  \`
}`,...(y=(b=s.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var h,w,L;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 3rem; align-items: center; justify-content: center;">
      <div style="text-align: center;">
        <ui-spinner size="lg" variant="success" label="Saving..." showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner size="md" variant="danger" label="Processing..." showLabel></ui-spinner>
      </div>
    </div>
  \`
}`,...(L=(w=a.parameters)==null?void 0:w.docs)==null?void 0:L.source}}};const E=["Playground","Sizes","Variants","WithoutLabel","Custom"];export{a as Custom,n as Playground,i as Sizes,r as Variants,s as WithoutLabel,E as __namedExportsOrder,_ as default};
