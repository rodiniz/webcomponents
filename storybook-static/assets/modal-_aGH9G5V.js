import{r as p,i as h,b as c}from"./iframe-Ck3e-F9w.js";import{n as l,U as m,t as b}from"./ui-component-base-BJ0AM59x.js";import{c as f}from"./template-1VJuhrPW.js";import{a as u}from"./keyboard-helpers-TtfJu0Hs.js";import{t as y}from"./theme-DBvyg58T.js";var v=Object.defineProperty,g=Object.getOwnPropertyDescriptor,s=(e,i,a,n)=>{for(var o=n>1?void 0:n?g(i,a):i,r=e.length-1,d;r>=0;r--)(d=e[r])&&(o=(n?d(i,a,o):d(o))||o);return n&&o&&v(i,a,o),o};let t=class extends m{constructor(){super(...arguments),this.title="",this.size="md",this.isOpen=!1,this.noCloseOnEscape=!1,this.noCloseOnBackdrop=!1}connectedCallback(){super.connectedCallback();const e=u(()=>{this.isOpen&&!this.noCloseOnEscape&&this.close()});document.addEventListener("keydown",e),this.escapeCleanup=()=>document.removeEventListener("keydown",e)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.escapeCleanup)==null||e.call(this)}willUpdate(e){e.has("isOpen")&&(this.isOpen?document.body.style.overflow="hidden":document.body.style.overflow="")}open(){const e=this.parentNode;e&&e!==document.body&&(this._originalParent=e,this._originalNextSibling=this.nextSibling,document.body.appendChild(this)),this.isOpen=!0,this.emit("modal-open")}close(){if(this.isOpen=!1,this.emit("modal-close"),this._originalParent){try{this._originalNextSibling&&this._originalNextSibling.parentNode===this._originalParent?this._originalParent.insertBefore(this,this._originalNextSibling):this._originalParent.appendChild(this)}catch(e){console.error("Modal restoration failed:",e)}this._originalParent=void 0,this._originalNextSibling=void 0}}handleBackdropClick(e){e.target.classList.contains("modal-backdrop")&&!this.noCloseOnBackdrop&&this.close()}render(){const e=`modal-${this.size}`,i=f({"modal-backdrop":!0,open:this.isOpen});return c`
      <div class=${i} @click=${this.handleBackdropClick}>
        <div class="modal-container ${e}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="modal-header">
            ${this.title?c`<h2 id="modal-title" class="modal-title">${this.title}</h2>`:c`<div></div>`}
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
    `}};t.styles=[p(y),h`
      :host {
        display: contents;
      }
      :host([open]) {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 10000;
      }
    `];s([l({type:String})],t.prototype,"title",2);s([l({type:String})],t.prototype,"size",2);s([l({type:Boolean,reflect:!0,attribute:"open"})],t.prototype,"isOpen",2);s([l({type:Boolean,attribute:"no-close-on-escape"})],t.prototype,"noCloseOnEscape",2);s([l({type:Boolean,attribute:"no-close-on-backdrop"})],t.prototype,"noCloseOnBackdrop",2);t=s([b("ui-modal")],t);
