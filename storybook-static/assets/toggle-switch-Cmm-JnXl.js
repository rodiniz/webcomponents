import{r as d,i as p,b as h}from"./iframe-Ck3e-F9w.js";import{n as o,U as m,t as b}from"./ui-component-base-BJ0AM59x.js";import{c as g}from"./template-1VJuhrPW.js";import{a as u}from"./validators-OS32PDZK.js";import{c as f,b as k}from"./class-builders-BssWg5Cc.js";import{o as z}from"./keyboard-helpers-TtfJu0Hs.js";import{t as v}from"./theme-DBvyg58T.js";var y=Object.defineProperty,w=Object.getOwnPropertyDescriptor,r=(e,t,l,a)=>{for(var s=a>1?void 0:a?w(t,l):t,n=e.length-1,c;n>=0;n--)(c=e[n])&&(s=(a?c(t,l,s):c(s))||s);return a&&s&&y(t,l,s),s};let i=class extends m{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.label="",this.name="",this.validateSize=u(["sm","md","lg"],"md","UIToggleSwitch"),this._size="md",this.handleToggle=e=>{this.disabled||(e.preventDefault(),e.stopPropagation(),this.toggle())},this.handleKeyDown=z(e=>{this.disabled||(e.stopPropagation(),this.toggle())},{stopPropagation:!1})}get size(){return this._size}set size(e){const t=this._size;this._size=this.validateSize(e),this.requestUpdate("size",t)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","switch"),this.setAttribute("aria-checked",String(this.checked))}updated(e){e.has("checked")&&this.setAttribute("aria-checked",String(this.checked))}toggle(){this.disabled||(this.checked=!this.checked,this.emit("toggle-change",{checked:this.checked}))}get value(){return this.checked}set value(e){this.checked=e}render(){const e=g(f({"toggle-container":!0,disabled:this.disabled},k(this.size))),t=g({"toggle-track":!0,checked:this.checked,disabled:this.disabled});return h`
      <div 
        class=${e}
        @click=${this.handleToggle}
        @keydown=${this.handleKeyDown}
        tabindex="${this.disabled?-1:0}"
      >
        <input
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name}
          aria-hidden="true"
          tabindex="-1"
        />
        <span class=${t}>
          <span class="toggle-thumb"></span>
        </span>
        ${this.label?h`<span class="toggle-label">${this.label}</span>`:""}
      </div>
    `}};i.styles=[d(v),p`
      :host {
        display: inline-block;
      }

      .toggle-container {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        user-select: none;
      }

      .toggle-container.disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        pointer-events: none;
      }

      .toggle-track {
        position: relative;
        display: inline-block;
        width: 2.75rem;
        height: 1.5rem;
        background: hsl(var(--muted));
        border: 1px solid hsl(var(--border));
        border-radius: 1.5rem;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
      }

      .toggle-track:hover:not(.disabled) {
        border-color: hsl(var(--ring));
      }

      .toggle-track.checked {
        background: hsl(var(--primary));
        border-color: hsl(var(--primary));
      }

      .toggle-thumb {
        position: absolute;
        top: 0.125rem;
        left: 0.125rem;
        width: 1.125rem;
        height: 1.125rem;
        background: white;
        border-radius: 50%;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
      }

      .toggle-track.checked .toggle-thumb {
        transform: translateX(1.25rem);
      }

      .toggle-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: hsl(var(--foreground));
        line-height: 1.5;
      }

      /* Size variants */
      .toggle-container.size-sm .toggle-track {
        width: 2.25rem;
        height: 1.25rem;
      }

      .toggle-container.size-sm .toggle-thumb {
        width: 0.875rem;
        height: 0.875rem;
        top: 0.125rem;
        left: 0.125rem;
      }

      .toggle-container.size-sm .toggle-track.checked .toggle-thumb {
        transform: translateX(1rem);
      }

      .toggle-container.size-sm .toggle-label {
        font-size: 0.8125rem;
      }

      .toggle-container.size-lg .toggle-track {
        width: 3.5rem;
        height: 1.875rem;
      }

      .toggle-container.size-lg .toggle-thumb {
        width: 1.5rem;
        height: 1.5rem;
        top: 0.125rem;
        left: 0.125rem;
      }

      .toggle-container.size-lg .toggle-track.checked .toggle-thumb {
        transform: translateX(1.625rem);
      }

      .toggle-container.size-lg .toggle-label {
        font-size: 0.9375rem;
      }

      /* Focus styles */
      input:focus-visible + .toggle-track {
        outline: 2px solid hsl(var(--ring));
        outline-offset: 2px;
      }
    `];r([o({type:Boolean,reflect:!0})],i.prototype,"checked",2);r([o({type:Boolean,reflect:!0})],i.prototype,"disabled",2);r([o({type:String})],i.prototype,"label",2);r([o({type:String})],i.prototype,"name",2);r([o({type:String})],i.prototype,"size",1);i=r([b("ui-toggle-switch")],i);
