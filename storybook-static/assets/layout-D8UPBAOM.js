import{r as h,i as c,b as s}from"./iframe-Ck3e-F9w.js";import{n as g,U as i,t as a}from"./ui-component-base-BJ0AM59x.js";import{s as m}from"./template-1VJuhrPW.js";import{c as v}from"./validators-OS32PDZK.js";import{t as _}from"./theme-DBvyg58T.js";var I=Object.defineProperty,U=Object.getOwnPropertyDescriptor,o=(t,e,l,n)=>{for(var r=n>1?void 0:n?U(e,l):e,u=t.length-1,p;u>=0;u--)(p=t[u])&&(r=(n?p(e,l,r):p(r))||r);return n&&r&&I(e,l,r),r};let d=class extends i{constructor(){super(...arguments),this.validateDirection=v(["horizontal","vertical","auto"],"auto","direction","UILayout"),this._direction="auto"}get direction(){return this._direction}set direction(t){const e=this._direction;this._direction=this.validateDirection(t),this.requestUpdate("direction",e)}detectDirection(){if(this.direction!=="auto")return this.direction;const t=this.querySelector("ui-layout-header"),e=this.querySelector("ui-layout-footer");return this.querySelector("ui-layout-sidebar")?"horizontal":"vertical"}render(){const t=this.detectDirection()==="horizontal"?"row":"column";return s`
      <div class="layout-container" style=${m({"flex-direction":t})}>
        <slot></slot>
      </div>
    `}};d.styles=[h(_)];o([g({type:String})],d.prototype,"direction",1);d=o([a("ui-layout")],d);let b=class extends i{render(){return s`<slot></slot>`}};b.styles=c`
    :host {
      display: block;
      background: var(--color-header, hsl(var(--background)));
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      padding: 12px 24px;
    }
  `;b=o([a("ui-layout-header")],b);let y=class extends i{render(){return s`<slot></slot>`}};y.styles=c`
    :host { display: block; flex: 1; }
  `;y=o([a("ui-layout-main")],y);let f=class extends i{render(){return s`<slot></slot>`}};f.styles=c`
    :host {
      display: block;
      background: linear-gradient(180deg, var(--color-nav-bg, #1f2937) 0%, var(--color-nav-bg, #111827) 100%);
      color: rgba(255, 255, 255, 0.7);
      padding: 16px 12px;
      box-sizing: border-box;
    }
    ::slotted(.sidebar-section) {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    ::slotted(.sidebar-label) {
      font: 600 11px/1 "Inter", system-ui, sans-serif;
      color: rgba(255, 255, 255, 0.35);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 12px 8px 6px;
    }
    ::slotted(.sidebar-item) {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.7);
      font: 500 14px/1.4 "Inter", system-ui, sans-serif;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    ::slotted(.sidebar-item:hover) {
      background: rgba(255, 255, 255, 0.06);
      color: var(--color-nav-text, #ffffff);
    }
  `;f=o([a("ui-layout-sidebar")],f);let x=class extends i{render(){return s`<slot></slot>`}};x.styles=c`
    :host {
      display: block;
      background: var(--color-footer, hsl(var(--background)));
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      padding: 12px 24px;
    }
  `;x=o([a("ui-layout-footer")],x);
