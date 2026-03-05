import{r as U,i as E,b as s}from"./iframe-6s-sIqo3.js";import{n as l,t as j}from"./property-C_0pZ1Mq.js";import{c as B}from"./template-BbtPzLcA.js";import{t as G}from"./theme-CCP9F1YV.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-BsqWkz84.js";var V=Object.defineProperty,A=Object.getOwnPropertyDescriptor,i=(e,t,o,a)=>{for(var r=a>1?void 0:a?A(t,o):t,k=e.length-1,m;k>=0;k--)(m=e[k])&&(r=(a?m(t,o,r):m(r))||r);return a&&r&&V(t,o,r),r};let n=class extends E{constructor(){super(...arguments),this.variant="primary",this.href="#",this.target="",this.rel="",this.underline=!1,this.disabled=!1,this.handleClick=e=>{this.disabled&&(e.preventDefault(),e.stopPropagation())}}connectedCallback(){this.setAttribute("data-ui","link"),super.connectedCallback()}render(){const e=B({link:!0,[this.variant]:!0,underline:this.underline,disabled:this.disabled});return s`
      <a
        part="link"
        class=${e}
        href=${this.disabled?"#":this.href}
        target=${this.target}
        rel=${this.rel}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot></slot>
      </a>
    `}};n.styles=[U(G)];i([l({type:String,reflect:!0})],n.prototype,"variant",2);i([l({type:String})],n.prototype,"href",2);i([l({type:String})],n.prototype,"target",2);i([l({type:String})],n.prototype,"rel",2);i([l({type:Boolean,reflect:!0})],n.prototype,"underline",2);i([l({type:Boolean,reflect:!0})],n.prototype,"disabled",2);n=i([j("ui-link")],n);const F={title:"Components/Link",tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","danger"],description:"Link style variant"},href:{control:"text",description:"Link destination URL"},target:{control:"select",options:["","_blank","_self","_parent","_top"],description:"Link target (empty = _self)"},underline:{control:"boolean",description:"Show underline on link"},disabled:{control:"boolean",description:"Disable the link"}},args:{variant:"primary",href:"#",target:"",underline:!1,disabled:!1}},d={render:({variant:e,href:t,target:o,underline:a,disabled:r})=>s`
    <ui-link
      variant=${e}
      href=${t}
      target=${o}
      ?underline=${a}
      ?disabled=${r}
    >
      Click me
    </ui-link>
  `},p={render:()=>s`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <ui-link variant="primary" href="#">Primary Link</ui-link>
      <ui-link variant="secondary" href="#">Secondary Link</ui-link>
      <ui-link variant="ghost" href="#">Ghost Link</ui-link>
      <ui-link variant="danger" href="#">Danger Link</ui-link>
    </div>
  `},c={render:()=>s`
    <ui-link href="#" underline>Underlined Link</ui-link>
  `},u={render:()=>s`
    <ui-link href="https://github.com" target="_blank" rel="noopener noreferrer">
      Open in new tab
    </ui-link>
  `},h={render:()=>s`
    <ui-link href="#" disabled>Disabled Link</ui-link>
  `};var f,g,b;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(b=(g=d.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var y,v,L;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <ui-link variant="primary" href="#">Primary Link</ui-link>
      <ui-link variant="secondary" href="#">Secondary Link</ui-link>
      <ui-link variant="ghost" href="#">Ghost Link</ui-link>
      <ui-link variant="danger" href="#">Danger Link</ui-link>
    </div>
  \`
}`,...(L=(v=p.parameters)==null?void 0:v.docs)==null?void 0:L.source}}};var $,_,S;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => html\`
    <ui-link href="#" underline>Underlined Link</ui-link>
  \`
}`,...(S=(_=c.parameters)==null?void 0:_.docs)==null?void 0:S.source}}};var x,D,w;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => html\`
    <ui-link href="https://github.com" target="_blank" rel="noopener noreferrer">
      Open in new tab
    </ui-link>
  \`
}`,...(w=(D=u.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};var P,C,O;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => html\`
    <ui-link href="#" disabled>Disabled Link</ui-link>
  \`
}`,...(O=(C=h.parameters)==null?void 0:C.docs)==null?void 0:O.source}}};const H=["Playground","Variants","Underlined","External","Disabled"];export{h as Disabled,u as External,d as Playground,c as Underlined,p as Variants,H as __namedExportsOrder,F as default};
