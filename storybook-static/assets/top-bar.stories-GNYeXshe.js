import{r as m,A as u,b as d}from"./iframe-Ck3e-F9w.js";import{n as b,U as h,t as f}from"./ui-component-base-BJ0AM59x.js";import{s as y}from"./template-1VJuhrPW.js";import{t as v}from"./theme-DBvyg58T.js";import"./button-C3WNtjOb.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-7KbQsD9c.js";import"./state-CVS5rq8K.js";import"./icon-helpers-uywyl4Wq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./class-builders-BssWg5Cc.js";const w=":host{display:block;border-bottom:1px solid #3671e5;box-shadow:0 1px 2px #0000000d}.top-bar{display:grid;grid-template-columns:1fr auto;align-items:center;gap:24px;padding:1rem 3rem;width:100%;box-sizing:border-box;background:hsl(var(--background));border-bottom:1px solid hsl(var(--border))}.title-section{display:flex;flex-direction:column;gap:2px;min-width:0}.page-title{font-size:1.5rem;font-weight:700;color:hsl(var(--foreground));letter-spacing:-.02em;margin:0;word-break:break-word}.page-subtitle{font-size:.875rem;color:hsl(var(--muted-foreground));margin:0;word-break:break-word}.actions-slot{display:flex;align-items:center;gap:1rem;flex-shrink:0}.actions-slot ::slotted(ui-select){min-width:180px;width:180px}.theme-picker{width:130px}@media (max-width: 1280px){.top-bar{gap:16px;padding:12px 32px}.page-title{font-size:20px}.page-subtitle{font-size:12px}}@media (max-width: 768px){.top-bar{grid-template-columns:1fr;gap:12px;padding:12px 24px}.page-title{font-size:18px}.page-subtitle{font-size:12px}.actions-slot{width:100%;justify-content:flex-end}}@media (max-width: 480px){.top-bar{padding:10px 16px;gap:10px}.page-title{font-size:16px}.page-subtitle{font-size:11px}}";var z=Object.defineProperty,C=Object.getOwnPropertyDescriptor,a=(e,o,p,i)=>{for(var t=i>1?void 0:i?C(o,p):o,l=e.length-1,n;l>=0;l--)(n=e[l])&&(t=(i?n(o,p,t):n(t))||t);return i&&t&&z(o,p,t),t};let r=class extends h{constructor(){super(...arguments),this.title="Dashboard",this.subtitle="",this.bgColor=""}render(){const e=this.bgColor?y({background:this.bgColor}):u;return d`
      <div class="top-bar" style=${e}>
        <div class="title-section">
          <h1 class="page-title">${this.title}</h1>
          ${this.subtitle?d`<p class="page-subtitle">${this.subtitle}</p>`:u}
        </div>
        <div class="actions-slot">
          <slot></slot>
        </div>
      </div>
    `}};r.styles=[m(v),m(w)];a([b({type:String})],r.prototype,"title",2);a([b({type:String})],r.prototype,"subtitle",2);a([b({type:String,attribute:"bg-color"})],r.prototype,"bgColor",2);r=a([f("ui-top-bar")],r);const I={title:"Components/Top Bar",tags:["autodocs"],args:{title:"Component Library",subtitle:"Storybook preview"}},s={render:({title:e,subtitle:o})=>d`
    <ui-top-bar title=${e} subtitle=${o}>
      <ui-button variant="secondary" size="sm">Action</ui-button>
    </ui-top-bar>
  `};var c,g,x;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: ({
    title,
    subtitle
  }) => html\`
    <ui-top-bar title=\${title} subtitle=\${subtitle}>
      <ui-button variant="secondary" size="sm">Action</ui-button>
    </ui-top-bar>
  \`
}`,...(x=(g=s.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const T=["Playground"];export{s as Playground,T as __namedExportsOrder,I as default};
