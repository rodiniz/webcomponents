import{r as S,a as c,i,b as o}from"./iframe-6s-sIqo3.js";import{n as _,t as s}from"./property-C_0pZ1Mq.js";import{s as k}from"./template-BbtPzLcA.js";import{t as w}from"./theme-CCP9F1YV.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-BsqWkz84.js";var I=Object.defineProperty,z=Object.getOwnPropertyDescriptor,a=(e,r,l,n)=>{for(var t=n>1?void 0:n?z(r,l):r,p=e.length-1,y;p>=0;p--)(y=e[p])&&(t=(n?y(r,l,t):y(t))||t);return n&&t&&I(r,l,t),t};let u=class extends i{constructor(){super(...arguments),this.direction="auto"}connectedCallback(){this.setAttribute("data-ui","layout"),super.connectedCallback()}detectDirection(){if(this.direction!=="auto")return this.direction;const e=this.querySelector("ui-layout-header"),r=this.querySelector("ui-layout-footer");return this.querySelector("ui-layout-sidebar")?"horizontal":"vertical"}render(){const e=this.detectDirection()==="horizontal"?"row":"column";return o`
      <div class="layout-container" style=${k({"flex-direction":e})}>
        <slot></slot>
      </div>
    `}};u.styles=[S(w)];a([_({type:String})],u.prototype,"direction",2);u=a([s("ui-layout")],u);let b=class extends i{render(){return o`<slot></slot>`}};b.styles=c`
    :host {
      display: block;
      background: var(--color-header, hsl(var(--background)));
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      padding: 12px 24px;
    }
  `;b=a([s("ui-layout-header")],b);let x=class extends i{render(){return o`<slot></slot>`}};x.styles=c`
    :host { display: block; flex: 1; }
  `;x=a([s("ui-layout-main")],x);let h=class extends i{render(){return o`<slot></slot>`}};h.styles=c`
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
  `;h=a([s("ui-layout-sidebar")],h);let f=class extends i{render(){return o`<slot></slot>`}};f.styles=c`
    :host {
      display: block;
      background: var(--color-footer, hsl(var(--background)));
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      padding: 12px 24px;
    }
  `;f=a([s("ui-layout-footer")],f);const F={title:"Components/Layout",tags:["autodocs"],argTypes:{direction:{control:"select",options:["auto","horizontal","vertical"]}},args:{direction:"vertical"}},d={render:({direction:e})=>o`
    <ui-layout direction=${e} style="height: 360px; border: 1px solid hsl(var(--border)); border-radius: 8px; overflow: hidden;">
      <ui-layout-header>Header</ui-layout-header>
      <ui-layout direction="horizontal" style="flex: 1;">
        <ui-layout-sidebar style="width: 180px;">Sidebar</ui-layout-sidebar>
        <ui-layout-main style="padding: 16px;">Main content</ui-layout-main>
      </ui-layout>
      <ui-layout-footer>Footer</ui-layout-footer>
    </ui-layout>
  `};var g,m,v;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: ({
    direction
  }) => html\`
    <ui-layout direction=\${direction} style="height: 360px; border: 1px solid hsl(var(--border)); border-radius: 8px; overflow: hidden;">
      <ui-layout-header>Header</ui-layout-header>
      <ui-layout direction="horizontal" style="flex: 1;">
        <ui-layout-sidebar style="width: 180px;">Sidebar</ui-layout-sidebar>
        <ui-layout-main style="padding: 16px;">Main content</ui-layout-main>
      </ui-layout>
      <ui-layout-footer>Footer</ui-layout-footer>
    </ui-layout>
  \`
}`,...(v=(m=d.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};const H=["Playground"];export{d as Playground,H as __namedExportsOrder,F as default};
