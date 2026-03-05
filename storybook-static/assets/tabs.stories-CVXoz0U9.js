import{r as b,i as g,b as f}from"./iframe-Bw_KO9Y0.js";import{n as m,t as x}from"./property-BCdGWBue.js";import{r as y}from"./state-CPy2gvTm.js";import{e as A}from"./query-BApjzB0v.js";import{t as w}from"./theme-Df5CjktT.js";import"./preload-helper-C1FmrZbK.js";const I=':host{display:block}.tabs{background:var(--color-page-bg);border-radius:16px;box-shadow:0 1px 3px #0000000a,0 4px 12px #00000008;overflow:hidden;position:relative}.tablist{display:flex;position:relative;padding:8px;gap:4px;background:linear-gradient(180deg,#fafafa,#f5f5f5);border-bottom:1px solid rgba(0,0,0,.04)}.tab-indicator{position:absolute;bottom:8px;height:calc(100% - 16px);background:var(--color-page-bg);border-radius:10px;box-shadow:0 2px 8px #0000000f,0 1px 2px #0000000a;transition:transform .28s cubic-bezier(.4,0,.2,1),width .28s cubic-bezier(.4,0,.2,1);pointer-events:none;z-index:0}::slotted([slot="tab"]){-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;border:none;color:#64748b;cursor:pointer;font:600 13px/1 DM Sans,system-ui,-apple-system,sans-serif;letter-spacing:.02em;padding:10px 18px;position:relative;transition:color .2s ease;-webkit-user-select:none;user-select:none;white-space:nowrap;z-index:1}::slotted([slot="tab"]:hover){color:var(--color-ink)}::slotted([slot="tab"].is-active){color:var(--color-ink)}::slotted([slot="tab"]:focus-visible){outline:none}::slotted([slot="tab"]:focus-visible):after{content:"";position:absolute;top:6px;right:6px;bottom:6px;left:6px;border:2px solid var(--color-primary);border-radius:8px;pointer-events:none}.panels{padding:24px 28px;min-height:200px}::slotted([slot="panel"]){animation:fadeIn .3s ease}::slotted([slot="panel"]:not(.is-active)){display:none}@keyframes fadeIn{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@media (prefers-reduced-motion: reduce){.tab-indicator{transition:none}::slotted([slot="panel"]){animation:none}}';var P=Object.defineProperty,T=Object.getOwnPropertyDescriptor,l=(t,a,s,e)=>{for(var i=e>1?void 0:e?T(a,s):a,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(e?o(a,s,i):o(i))||i);return e&&i&&P(a,s,i),i};let d=class extends g{constructor(){super(...arguments),this.active="",this.activeId=null,this.handleTabClick=t=>{const a=t.target;if(!a)return;const s=a.closest('[slot="tab"][data-tab]');if(!s)return;t.preventDefault();const e=s.getAttribute("data-tab");e&&this.setActive(e)}}connectedCallback(){this.setAttribute("data-ui","tabs"),super.connectedCallback()}firstUpdated(){var s,e;const t=(s=this.shadowRoot)==null?void 0:s.querySelector('slot[name="tab"]'),a=(e=this.shadowRoot)==null?void 0:e.querySelector('slot[name="panel"]');t==null||t.addEventListener("slotchange",()=>this.syncTabs()),a==null||a.addEventListener("slotchange",()=>this.syncTabs()),requestAnimationFrame(()=>this.syncTabs())}setActive(t){this.activeId!==t&&(this.activeId=t,this.active=t,this.syncTabs(),this.dispatchEvent(new CustomEvent("tab-change",{bubbles:!0,composed:!0,detail:{id:t}})))}getTabs(){var a;const t=(a=this.shadowRoot)==null?void 0:a.querySelector('slot[name="tab"]');return t?t.assignedElements({flatten:!0}):[]}getPanels(){var a;const t=(a=this.shadowRoot)==null?void 0:a.querySelector('slot[name="panel"]');return t?t.assignedElements({flatten:!0}):[]}getActiveId(t){const a=this.active;if(a&&t.some(e=>e.getAttribute("data-tab")===a))return a;if(this.activeId&&t.some(e=>e.getAttribute("data-tab")===this.activeId))return this.activeId;const s=t.find(e=>e.getAttribute("data-tab"));return(s==null?void 0:s.getAttribute("data-tab"))??null}syncTabs(){const t=this.getTabs(),a=this.getPanels();if(t.length===0)return;const s=this.getActiveId(t);s&&(this.activeId=s,this.active!==s&&(this.active=s),t.forEach(e=>{const i=e.getAttribute("data-tab");if(!i)return;const n=e.id||`tab-${i}`,o=i===s;e.id=n,e.setAttribute("role","tab"),e.setAttribute("aria-selected",String(o)),e.setAttribute("tabindex",o?"0":"-1"),e.classList.toggle("is-active",o)}),a.forEach(e=>{const i=e.getAttribute("data-tab");if(!i)return;const n=e.id||`panel-${i}`,o=i===s;e.id=n,e.setAttribute("role","tabpanel"),e.toggleAttribute("hidden",!o),e.classList.toggle("is-active",o);const r=t.find(h=>h.getAttribute("data-tab")===i);r&&(r.setAttribute("aria-controls",n),e.setAttribute("aria-labelledby",r.id))}),this.updateIndicator(t,s))}updateIndicator(t,a){var o;if(!this.indicator)return;const s=t.find(r=>r.getAttribute("data-tab")===a);if(!s||!((o=this.shadowRoot)==null?void 0:o.querySelector(".tablist")))return;const i=t.indexOf(s);let n=0;for(let r=0;r<i;r++)n+=t[r].offsetWidth;this.indicator.style.transform=`translateX(${n}px)`,this.indicator.style.width=`${s.offsetWidth}px`}render(){return f`
      <div class="tabs" @click=${this.handleTabClick}>
        <div class="tablist" role="tablist">
          <div class="tab-indicator"></div>
          <slot name="tab"></slot>
        </div>
        <div class="panels">
          <slot name="panel"></slot>
        </div>
      </div>
    `}};d.styles=[b(w),b(I)];l([m({type:String,reflect:!0})],d.prototype,"active",2);l([y()],d.prototype,"activeId",2);l([A(".tab-indicator")],d.prototype,"indicator",2);d=l([x("ui-tabs")],d);const q={title:"Components/Tabs",tags:["autodocs"]},c={render:()=>f`
    <ui-tabs active="overview">
      <button slot="tab" data-tab="overview">Overview</button>
      <button slot="tab" data-tab="usage">Usage</button>
      <button slot="tab" data-tab="api">API</button>

      <div slot="panel" data-tab="overview">Overview content</div>
      <div slot="panel" data-tab="usage">Usage content</div>
      <div slot="panel" data-tab="api">API content</div>
    </ui-tabs>
  `};var p,u,v;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => html\`
    <ui-tabs active="overview">
      <button slot="tab" data-tab="overview">Overview</button>
      <button slot="tab" data-tab="usage">Usage</button>
      <button slot="tab" data-tab="api">API</button>

      <div slot="panel" data-tab="overview">Overview content</div>
      <div slot="panel" data-tab="usage">Usage content</div>
      <div slot="panel" data-tab="api">API content</div>
    </ui-tabs>
  \`
}`,...(v=(u=c.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};const U=["Playground"];export{c as Playground,U as __namedExportsOrder,q as default};
