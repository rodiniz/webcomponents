import{r as u,b as p}from"./iframe-Ck3e-F9w.js";import{n as r,U as m,t as f}from"./ui-component-base-BJ0AM59x.js";import{r as O}from"./state-CVS5rq8K.js";import{c}from"./template-1VJuhrPW.js";import{t as v}from"./theme-DBvyg58T.js";import{c as h,a as b,b as w}from"./class-builders-BssWg5Cc.js";import{u as y}from"./click-outside-CXo2mreH.js";var g=Object.defineProperty,C=Object.getOwnPropertyDescriptor,l=(t,s,o,a)=>{for(var i=a>1?void 0:a?C(s,o):s,n=t.length-1,d;n>=0;n--)(d=t[n])&&(i=(a?d(s,o,i):d(i))||i);return a&&i&&g(s,o,i),i};let e=class extends m{constructor(){super(...arguments),this.label="Menu",this.items=[],this.size="md",this.disabled=!1,this.isOpen=!1,this.triggerButton=null,this.clickOutsideHandler=y(this,()=>this.isOpen=!1,{enabled:()=>this.isOpen}),this.toggleDropdown=()=>{this.disabled||(this.isOpen=!this.isOpen)},this.handleItemClick=t=>{const s=this.items.find(o=>o.id===t);s&&!s.disabled&&(this.emit("dropdown-select",{id:t,label:s.label}),this.isOpen=!1)}}connectedCallback(){super.connectedCallback(),this.clickOutsideHandler.attach()}disconnectedCallback(){this.clickOutsideHandler.detach(),super.disconnectedCallback()}render(){const t=c(h({"dropdown-trigger":!0},w(this.size,""),b({"is-open":this.isOpen,disabled:this.disabled})));return p`
      <div class="dropdown-container">
        <button
          class=${t}
          @click=${this.toggleDropdown}
          ?disabled=${this.disabled}
          aria-expanded=${this.isOpen}
          aria-haspopup="menu"
        >
          <span class="dropdown-label">${this.label}</span>
          <span class="dropdown-chevron">
            <svg class="feather" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>

        <div class=${c(h({"dropdown-menu":!0},b({"is-visible":this.isOpen})))}>
          ${this.items.length>0?this.items.map(s=>p`
                <button
                  class=${c(h({"dropdown-item":!0},b({disabled:s.disabled})))}
                  @click=${()=>this.handleItemClick(s.id)}
                  ?disabled=${s.disabled}
                >
                  ${s.label}
                </button>
              `):p`<div class="dropdown-empty">No items</div>`}
        </div>
      </div>
    `}};e.styles=[u(v)];l([r({type:String})],e.prototype,"label",2);l([r({type:Array})],e.prototype,"items",2);l([r({type:String,reflect:!0})],e.prototype,"size",2);l([r({type:Boolean,reflect:!0})],e.prototype,"disabled",2);l([O()],e.prototype,"isOpen",2);e=l([f("ui-dropdown")],e);
