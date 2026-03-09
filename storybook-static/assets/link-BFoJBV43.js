import{r as h,b as d}from"./iframe-Ck3e-F9w.js";import{n as s,U as c,t as f}from"./ui-component-base-BJ0AM59x.js";import{c as u}from"./template-1VJuhrPW.js";import{c as v}from"./validators-OS32PDZK.js";import{t as y}from"./theme-DBvyg58T.js";var m=Object.defineProperty,g=Object.getOwnPropertyDescriptor,a=(t,i,l,n)=>{for(var r=n>1?void 0:n?g(i,l):i,o=t.length-1,p;o>=0;o--)(p=t[o])&&(r=(n?p(i,l,r):p(r))||r);return n&&r&&m(i,l,r),r};let e=class extends c{constructor(){super(...arguments),this.validateVariant=v(["primary","secondary","ghost","danger"],"primary","variant","UILink"),this._variant="primary",this.href="#",this.target="",this.rel="",this.underline=!1,this.disabled=!1,this.handleClick=t=>{this.disabled&&(t.preventDefault(),t.stopPropagation())}}get variant(){return this._variant}set variant(t){const i=this._variant;this._variant=this.validateVariant(t),this.requestUpdate("variant",i)}render(){const t=u({link:!0,[this.variant]:!0,underline:this.underline,disabled:this.disabled});return d`
      <a
        part="link"
        class=${t}
        href=${this.disabled?"#":this.href}
        target=${this.target}
        rel=${this.rel}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot></slot>
      </a>
    `}};e.styles=[h(y)];a([s({type:String,reflect:!0})],e.prototype,"variant",1);a([s({type:String})],e.prototype,"href",2);a([s({type:String})],e.prototype,"target",2);a([s({type:String})],e.prototype,"rel",2);a([s({type:Boolean,reflect:!0})],e.prototype,"underline",2);a([s({type:Boolean,reflect:!0})],e.prototype,"disabled",2);e=a([f("ui-link")],e);
