import{r as f,b as p}from"./iframe-Ck3e-F9w.js";import{n as c,U as m,t as v}from"./ui-component-base-BJ0AM59x.js";import{t as u}from"./theme-DBvyg58T.js";import{r as b}from"./icon-helpers-uywyl4Wq.js";import"./preload-helper-C1FmrZbK.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./unsafe-html-7KbQsD9c.js";const y=':host{display:block;width:280px;box-sizing:border-box}.sidebar{background:linear-gradient(180deg,#1f2937,#111827);display:flex;flex-direction:column;gap:8px;position:relative;overflow:hidden;padding:0;width:100%}.sidebar:before{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle at 30% 20%,rgba(99,102,241,.06) 0%,transparent 50%);pointer-events:none}.sidebar-brand{display:flex;align-items:center;gap:12px;padding:20px 16px;border-bottom:1px solid rgba(255,255,255,.08);margin:0;position:relative;z-index:1;flex-shrink:0}.brand-icon{width:40px;height:40px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:10px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px #6366f14d;flex-shrink:0}.brand-icon svg{width:22px;height:22px;stroke:#fff}.brand-text{font:600 16px/1.2 Sora,system-ui,sans-serif;color:#fff;letter-spacing:-.01em;margin:0}.brand-sub{font:500 10px/1 Inter,system-ui,sans-serif;color:#fff6;text-transform:uppercase;letter-spacing:.08em;margin:0}.nav-section{display:flex;flex-direction:column;gap:4px;padding:0 12px;position:relative;z-index:1}.nav-section ::slotted(*){color:#fff}.sidebar-link,.sidebar-link:any-link{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;color:#fff;text-decoration:none;font:500 14px/1.4 Inter,system-ui,sans-serif;transition:all .2s ease;cursor:pointer;position:relative;z-index:1;margin:2px 0;box-sizing:border-box}.sidebar-link:hover,.sidebar-link:any-link:hover{background:#ffffff0f;color:#fff}.sidebar-link.is-active{background:#6366f126;color:#818cf8}.sidebar-link.is-active:before{content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:20px;background:#6366f1;border-radius:0 3px 3px 0}.link-icon{width:20px;height:20px;flex-shrink:0}.link-icon svg{width:100%;height:100%;stroke:currentColor}.sidebar-footer{margin-top:auto;padding:16px;border-top:1px solid rgba(255,255,255,.08);position:relative;z-index:1}.sidebar-footer ::slotted(*){color:#fff}';var k=Object.defineProperty,w=Object.getOwnPropertyDescriptor,d=(e,i,t,n)=>{for(var r=n>1?void 0:n?w(i,t):i,o=e.length-1,a;o>=0;o--)(a=e[o])&&(r=(n?a(i,t,r):a(r))||r);return n&&r&&k(i,t,r),r};let s=class extends m{constructor(){super(...arguments),this.brand="App",this.version="v1.0",this.items=[],this.footerItems=[],this.handleClick=e=>{var o;const t=e.target.closest(".sidebar-link");if(!t)return;(((o=this.shadowRoot)==null?void 0:o.querySelectorAll(".sidebar-link"))||[]).forEach(a=>a.classList.remove("is-active")),t.classList.add("is-active");const r=t.getAttribute("href")||"";this.emit("nav",{href:r})},this.handleFooterClick=()=>{}}render(){return p`
      <div class="sidebar">
        <div class="sidebar-brand">
          <div class="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div>
            <p class="brand-text">${this.brand}</p>
            <p class="brand-sub">${this.version}</p>
          </div>
        </div>
        <div class="nav-section" @click=${this.handleClick}>
          ${this.items.map(e=>p`
            <a class="sidebar-link" href="${e.href||"#"}">
              <span class="link-icon">${b(e.icon)}</span>
              <span>${e.label}</span>
            </a>
          `)}
        </div>
        <div class="sidebar-footer" @click=${this.handleFooterClick}>
          ${this.footerItems.map(e=>{var i;return p`
            <a class="sidebar-link" href="${e.href||"#"}" target="${(i=e.href)!=null&&i.startsWith("http")?"_blank":"_self"}">
              <span class="link-icon">${b(e.icon)}</span>
              <span>${e.label}</span>
            </a>
          `})}
        </div>
      </div>
    `}};s.styles=[f(u),f(y)];d([c({type:String})],s.prototype,"brand",2);d([c({type:String})],s.prototype,"version",2);d([c({type:Array})],s.prototype,"items",2);d([c({type:Array})],s.prototype,"footerItems",2);s=d([v("ui-sidebar")],s);const $=[{icon:"home",label:"Home",href:"#"},{icon:"layers",label:"Components",href:"#"},{icon:"settings",label:"Settings",href:"#"}],C=[{icon:"github",label:"GitHub",href:"https://github.com/rodiniz/webcomponents"}],j={title:"Components/Sidebar",tags:["autodocs"]},l={render:()=>p`
    <div style="height: 360px; max-width: 260px; border-radius: 12px; overflow: hidden; border: 1px solid hsl(var(--border));">
      <ui-sidebar
        brand="Web Components"
        version="v1.0"
        .items=${$}
        .footerItems=${C}
      ></ui-sidebar>
    </div>
  `};var h,x,g;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => html\`
    <div style="height: 360px; max-width: 260px; border-radius: 12px; overflow: hidden; border: 1px solid hsl(var(--border));">
      <ui-sidebar
        brand="Web Components"
        version="v1.0"
        .items=\${items}
        .footerItems=\${footerItems}
      ></ui-sidebar>
    </div>
  \`
}`,...(g=(x=l.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};const U=["Playground"];export{l as Playground,U as __namedExportsOrder,j as default};
