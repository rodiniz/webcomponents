import{r as f,i as b,b as v}from"./iframe-6s-sIqo3.js";import{n as a,t as y}from"./property-C_0pZ1Mq.js";import{r as g}from"./state-vQ8fJvXj.js";import{c as u,s as w}from"./template-BbtPzLcA.js";import{t as C}from"./theme-CCP9F1YV.js";import"./button-B9VckUVt.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-BsqWkz84.js";import"./feather-YLknBcFY.js";import"./_commonjsHelpers-Cpj98o6Y.js";var $=Object.defineProperty,x=Object.getOwnPropertyDescriptor,o=(r,e,s,i)=>{for(var n=i>1?void 0:i?x(e,s):e,l=r.length-1,h;l>=0;l--)(h=r[l])&&(n=(i?h(e,s,n):h(n))||n);return i&&n&&$(e,s,n),n};let t=class extends b{constructor(){super(...arguments),this.shadow=!1,this.shadowColor="0, 0, 0",this.rounded=!0,this.variant="default",this.elevation="sm",this.interactive=!1,this.animated=!1,this.bg="default",this.hasHeader=!1,this.hasFooter=!1,this.handleHeaderSlotChange=r=>{const e=r.target;this.hasHeader=e.assignedNodes({flatten:!0}).length>0},this.handleFooterSlotChange=r=>{const e=r.target;this.hasFooter=e.assignedNodes({flatten:!0}).length>0}}connectedCallback(){this.setAttribute("data-ui","card"),super.connectedCallback()}getShadowValue(){if(!this.shadow)return"none";switch(this.elevation){case"sm":return`0 1px 2px rgba(${this.shadowColor}, 0.05), 0 1px 3px rgba(${this.shadowColor}, 0.1)`;case"md":return`0 4px 6px rgba(${this.shadowColor}, 0.07), 0 2px 4px rgba(${this.shadowColor}, 0.06)`;case"lg":return`0 10px 15px rgba(${this.shadowColor}, 0.1), 0 4px 6px rgba(${this.shadowColor}, 0.05)`;case"xl":return`0 20px 25px rgba(${this.shadowColor}, 0.15), 0 10px 10px rgba(${this.shadowColor}, 0.04)`;default:return"none"}}render(){const r=u({card:!0,[this.variant]:!0,rounded:this.rounded,square:!this.rounded,"custom-shadow":this.shadow,"no-shadow":!this.shadow,interactive:this.interactive,animated:this.animated,[`bg-${this.bg}`]:!0}),e=u({"card-header":!0,"is-empty":!this.hasHeader}),s=u({"card-footer":!0,"is-empty":!this.hasFooter});return v`
      <div class=${r} style=${w({"box-shadow":this.shadow?this.getShadowValue():"none"})}>
        <div class=${e}>
          <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
        </div>
        <div class="card-content">
          <slot name="content"><slot></slot></slot>
        </div>
        <div class=${s}>
          <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
        </div>
      </div>
    `}};t.styles=[f(C)];o([a({type:Boolean,reflect:!0})],t.prototype,"shadow",2);o([a({type:String})],t.prototype,"shadowColor",2);o([a({type:Boolean,reflect:!0})],t.prototype,"rounded",2);o([a({type:String,reflect:!0})],t.prototype,"variant",2);o([a({type:String})],t.prototype,"elevation",2);o([a({type:Boolean,reflect:!0})],t.prototype,"interactive",2);o([a({type:Boolean,reflect:!0})],t.prototype,"animated",2);o([a({type:String,attribute:"bg"})],t.prototype,"bg",2);o([g()],t.prototype,"hasHeader",2);o([g()],t.prototype,"hasFooter",2);t=o([y("ui-card")],t);const D={title:"Components/Card",tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","elevated","bordered","ghost","glass"]},shadow:{control:"boolean"},rounded:{control:"boolean"}},args:{variant:"default",shadow:!0,rounded:!0}},d={render:({variant:r,shadow:e,rounded:s})=>v`
    <ui-card variant=${r} ?shadow=${e} ?rounded=${s} elevation="sm">
      <div slot="header"><strong>Release summary</strong></div>
      <div slot="content">Track updates from the component library.</div>
      <div slot="footer">
        <ui-button variant="ghost" size="sm">Cancel</ui-button>
        <ui-button variant="primary" size="sm">Open</ui-button>
      </div>
    </ui-card>
  `};var p,c,m;d.parameters={...d.parameters,docs:{...(p=d.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(m=(c=d.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const M=["Playground"];export{d as Playground,M as __namedExportsOrder,D as default};
