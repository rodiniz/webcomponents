import{r as h,b as v}from"./iframe-Ck3e-F9w.js";import{n,U as c,t as m}from"./ui-component-base-BJ0AM59x.js";import{c as u}from"./template-1VJuhrPW.js";import{c as d}from"./validators-OS32PDZK.js";import{t as y}from"./theme-DBvyg58T.js";var _=Object.defineProperty,f=Object.getOwnPropertyDescriptor,s=(t,e,p,a)=>{for(var r=a>1?void 0:a?f(e,p):e,l=t.length-1,o;l>=0;l--)(o=t[l])&&(r=(a?o(e,p,r):o(r))||r);return a&&r&&_(e,p,r),r};let i=class extends c{constructor(){super(...arguments),this.validateSize=d(["sm","md","lg"],"md","size","UISpinner"),this.validateVariant=d(["primary","secondary","success","danger"],"primary","variant","UISpinner"),this._size="md",this._variant="primary",this.label="Loading...",this.showLabel=!0}get size(){return this._size}set size(t){const e=this._size;this._size=this.validateSize(t),this.requestUpdate("size",e)}get variant(){return this._variant}set variant(t){const e=this._variant;this._variant=this.validateVariant(t),this.requestUpdate("variant",e)}render(){const t=u({spinner:!0,[this.size]:!0,[this.variant]:!0});return v`
      <div class=${t}>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      ${this.showLabel?v`<div class="spinner-label">${this.label}</div>`:""}
    `}};i.styles=[h(y)];s([n({type:String,reflect:!0})],i.prototype,"size",1);s([n({type:String,reflect:!0})],i.prototype,"variant",1);s([n({type:String})],i.prototype,"label",2);s([n({type:Boolean,reflect:!0})],i.prototype,"showLabel",2);i=s([m("ui-spinner")],i);
