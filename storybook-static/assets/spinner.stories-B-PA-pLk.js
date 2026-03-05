import{r as D,i as M,b as n}from"./iframe-6s-sIqo3.js";import{n as v,t as V}from"./property-C_0pZ1Mq.js";import{c as W}from"./template-BbtPzLcA.js";import{t as A}from"./theme-CCP9F1YV.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-BsqWkz84.js";var B=Object.defineProperty,E=Object.getOwnPropertyDescriptor,l=(r,s,a,t)=>{for(var e=t>1?void 0:t?E(s,a):s,m=r.length-1,b;m>=0;m--)(b=r[m])&&(e=(t?b(s,a,e):b(e))||e);return t&&e&&B(s,a,e),e};let i=class extends M{constructor(){super(...arguments),this.size="md",this.variant="primary",this.label="Loading...",this.showLabel=!0}connectedCallback(){this.setAttribute("data-ui","spinner"),super.connectedCallback()}render(){const r=W({spinner:!0,[this.size]:!0,[this.variant]:!0});return n`
      <div class=${r}>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      ${this.showLabel?n`<div class="spinner-label">${this.label}</div>`:""}
    `}};i.styles=[D(A)];l([v({type:String,reflect:!0})],i.prototype,"size",2);l([v({type:String,reflect:!0})],i.prototype,"variant",2);l([v({type:String})],i.prototype,"label",2);l([v({type:Boolean,reflect:!0})],i.prototype,"showLabel",2);i=l([V("ui-spinner")],i);const H={title:"Components/Spinner",tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"],description:"Spinner size"},variant:{control:"select",options:["primary","secondary","success","danger"],description:"Spinner color variant"},label:{control:"text",description:"Loading label text"},showLabel:{control:"boolean",description:"Show label below spinner"}},args:{size:"md",variant:"primary",label:"Loading...",showLabel:!0}},o={render:({size:r,variant:s,label:a,showLabel:t})=>n`
    <ui-spinner
      size=${r}
      variant=${s}
      label=${a}
      ?showLabel=${t}
    ></ui-spinner>
  `},p={render:()=>n`
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
  `},c={render:()=>n`
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
  `},d={render:()=>n`
    <ui-spinner size="md" variant="primary" ?showLabel=${!1}></ui-spinner>
  `},u={render:()=>n`
    <div style="display: flex; gap: 3rem; align-items: center; justify-content: center;">
      <div style="text-align: center;">
        <ui-spinner size="lg" variant="success" label="Saving..." showLabel></ui-spinner>
      </div>
      <div style="text-align: center;">
        <ui-spinner size="md" variant="danger" label="Processing..." showLabel></ui-spinner>
      </div>
    </div>
  `};var g,y,h;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(h=(y=o.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var w,L,x;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(x=(L=p.parameters)==null?void 0:L.docs)==null?void 0:x.source}}};var f,z,S;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(S=(z=c.parameters)==null?void 0:z.docs)==null?void 0:S.source}}};var $,P,j;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => html\`
    <ui-spinner size="md" variant="primary" ?showLabel=\${false}></ui-spinner>
  \`
}`,...(j=(P=d.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};var _,C,O;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(O=(C=u.parameters)==null?void 0:C.docs)==null?void 0:O.source}}};const J=["Playground","Sizes","Variants","WithoutLabel","Custom"];export{u as Custom,o as Playground,p as Sizes,c as Variants,d as WithoutLabel,J as __namedExportsOrder,H as default};
