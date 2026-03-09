import{b as e}from"./iframe-Ck3e-F9w.js";import"./link-BFoJBV43.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./validators-OS32PDZK.js";import"./theme-DBvyg58T.js";const V={title:"Components/Link",tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","danger"],description:"Link style variant"},href:{control:"text",description:"Link destination URL"},target:{control:"select",options:["","_blank","_self","_parent","_top"],description:"Link target (empty = _self)"},underline:{control:"boolean",description:"Show underline on link"},disabled:{control:"boolean",description:"Disable the link"}},args:{variant:"primary",href:"#",target:"",underline:!1,disabled:!1}},r={render:({variant:L,href:$,target:x,underline:_,disabled:S})=>e`
    <ui-link
      variant=${L}
      href=${$}
      target=${x}
      ?underline=${_}
      ?disabled=${S}
    >
      Click me
    </ui-link>
  `},n={render:()=>e`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <ui-link variant="primary" href="#">Primary Link</ui-link>
      <ui-link variant="secondary" href="#">Secondary Link</ui-link>
      <ui-link variant="ghost" href="#">Ghost Link</ui-link>
      <ui-link variant="danger" href="#">Danger Link</ui-link>
    </div>
  `},i={render:()=>e`
    <ui-link href="#" underline>Underlined Link</ui-link>
  `},a={render:()=>e`
    <ui-link href="https://github.com" target="_blank" rel="noopener noreferrer">
      Open in new tab
    </ui-link>
  `},t={render:()=>e`
    <ui-link href="#" disabled>Disabled Link</ui-link>
  `};var l,o,s;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: ({
    variant,
    href,
    target,
    underline,
    disabled
  }) => html\`
    <ui-link
      variant=\${variant}
      href=\${href}
      target=\${target}
      ?underline=\${underline}
      ?disabled=\${disabled}
    >
      Click me
    </ui-link>
  \`
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var d,u,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <ui-link variant="primary" href="#">Primary Link</ui-link>
      <ui-link variant="secondary" href="#">Secondary Link</ui-link>
      <ui-link variant="ghost" href="#">Ghost Link</ui-link>
      <ui-link variant="danger" href="#">Danger Link</ui-link>
    </div>
  \`
}`,...(p=(u=n.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var c,k,m;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => html\`
    <ui-link href="#" underline>Underlined Link</ui-link>
  \`
}`,...(m=(k=i.parameters)==null?void 0:k.docs)==null?void 0:m.source}}};var h,f,g;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => html\`
    <ui-link href="https://github.com" target="_blank" rel="noopener noreferrer">
      Open in new tab
    </ui-link>
  \`
}`,...(g=(f=a.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var b,y,v;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => html\`
    <ui-link href="#" disabled>Disabled Link</ui-link>
  \`
}`,...(v=(y=t.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};const R=["Playground","Variants","Underlined","External","Disabled"];export{t as Disabled,a as External,r as Playground,i as Underlined,n as Variants,R as __namedExportsOrder,V as default};
