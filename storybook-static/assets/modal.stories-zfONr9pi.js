import{r as b,a as v,i as y,b as r}from"./iframe-Bw_KO9Y0.js";import{n,t as f}from"./property-BCdGWBue.js";import{c as g}from"./template-CWz1uxk0.js";import{t as C}from"./theme-Df5CjktT.js";import"./button-DZ8HSUmR.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-rRkyaLOt.js";import"./state-CPy2gvTm.js";import"./feather-YLknBcFY.js";import"./_commonjsHelpers-Cpj98o6Y.js";var k=Object.defineProperty,O=Object.getOwnPropertyDescriptor,s=(e,t,d,a)=>{for(var i=a>1?void 0:a?O(t,d):t,p=e.length-1,c;p>=0;p--)(c=e[p])&&(i=(a?c(t,d,i):c(i))||i);return a&&i&&k(t,d,i),i};let o=class extends y{constructor(){super(...arguments),this.title="",this.size="md",this.isOpen=!1,this.noCloseOnEscape=!1,this.noCloseOnBackdrop=!1,this.handleKeydown=e=>{e.key==="Escape"&&this.isOpen&&!this.noCloseOnEscape&&this.close()}}connectedCallback(){this.setAttribute("data-ui","modal"),super.connectedCallback(),document.addEventListener("keydown",this.handleKeydown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleKeydown)}willUpdate(e){e.has("isOpen")&&(this.isOpen?document.body.style.overflow="hidden":document.body.style.overflow="")}open(){const e=this.parentNode;e&&e!==document.body&&(this._originalParent=e,this._originalNextSibling=this.nextSibling,document.body.appendChild(this)),this.isOpen=!0,this.dispatchEvent(new CustomEvent("modal-open",{bubbles:!0,composed:!0}))}close(){if(this.isOpen=!1,this.dispatchEvent(new CustomEvent("modal-close",{bubbles:!0,composed:!0})),this._originalParent){try{this._originalNextSibling&&this._originalNextSibling.parentNode===this._originalParent?this._originalParent.insertBefore(this,this._originalNextSibling):this._originalParent.appendChild(this)}catch(e){console.error("Modal restoration failed:",e)}this._originalParent=void 0,this._originalNextSibling=void 0}}handleBackdropClick(e){e.target.classList.contains("modal-backdrop")&&!this.noCloseOnBackdrop&&this.close()}render(){const e=`modal-${this.size}`,t=g({"modal-backdrop":!0,open:this.isOpen});return r`
      <div class=${t} @click=${this.handleBackdropClick}>
        <div class="modal-container ${e}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="modal-header">
            ${this.title?r`<h2 id="modal-title" class="modal-title">${this.title}</h2>`:r`<div></div>`}
            <button class="modal-close" @click=${this.close} aria-label="Close modal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `}};o.styles=[b(C),v`
      :host {
        display: contents;
      }
      :host([open]) {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 10000;
      }
    `];s([n({type:String})],o.prototype,"title",2);s([n({type:String})],o.prototype,"size",2);s([n({type:Boolean,reflect:!0,attribute:"open"})],o.prototype,"isOpen",2);s([n({type:Boolean,attribute:"no-close-on-escape"})],o.prototype,"noCloseOnEscape",2);s([n({type:Boolean,attribute:"no-close-on-backdrop"})],o.prototype,"noCloseOnBackdrop",2);o=s([f("ui-modal")],o);const M={title:"Components/Modal",tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg"]}},args:{title:"Example modal",size:"md"}},l={render:({title:e,size:t})=>r`
    <ui-modal open title=${e} size=${t}>
      This is a preview of modal content in Storybook.
      <div slot="footer">
        <ui-button variant="ghost">Cancel</ui-button>
        <ui-button variant="primary">Confirm</ui-button>
      </div>
    </ui-modal>
  `};var m,h,u;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: ({
    title,
    size
  }) => html\`
    <ui-modal open title=\${title} size=\${size}>
      This is a preview of modal content in Storybook.
      <div slot="footer">
        <ui-button variant="ghost">Cancel</ui-button>
        <ui-button variant="primary">Confirm</ui-button>
      </div>
    </ui-modal>
  \`
}`,...(u=(h=l.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};const j=["Open"];export{l as Open,j as __namedExportsOrder,M as default};
