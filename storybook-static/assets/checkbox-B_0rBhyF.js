import{i as x,b as h}from"./iframe-Ck3e-F9w.js";import{n as c,U as k,t as m}from"./ui-component-base-BJ0AM59x.js";import{c as d}from"./template-1VJuhrPW.js";import{c as b,b as p,a as u}from"./class-builders-BssWg5Cc.js";import{a as g}from"./validators-OS32PDZK.js";function v(e){return e!==void 0?{"aria-checked":String(e)}:{}}var f=Object.defineProperty,y=Object.getOwnPropertyDescriptor,r=(e,i,s,n)=>{for(var o=n>1?void 0:n?y(i,s):i,a=e.length-1,l;a>=0;a--)(l=e[a])&&(o=(n?l(i,s,o):l(o))||o);return n&&o&&f(i,s,o),o};let t=class extends k{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.indeterminate=!1,this.label="",this._size="md",this.validateSize=g(["sm","md","lg"],"md","UICheckbox"),this.handleChange=e=>{if(this.disabled)return;const s=e.target.checked;this.indeterminate&&(this.indeterminate=!1),this.checked=s,this.emit("checkbox-change",{checked:s})}}get size(){return this._size}set size(e){const i=this._size;this._size=this.validateSize(e),this.requestUpdate("size",i)}setChecked(e){this.checked=e,this.indeterminate=!1}setIndeterminate(e){this.indeterminate=e}render(){const e=d(b({"checkbox-container":!0},p(this.size,"size-"))),i=d(b({"checkbox-box":!0},p(this.size,"size-"),u({checked:this.checked,indeterminate:this.indeterminate,disabled:this.disabled})));return h`
      <label class=${e}>
        <input 
          type="checkbox" 
          .checked=${this.checked} 
          .indeterminate=${this.indeterminate} 
          ?disabled=${this.disabled} 
          @change=${this.handleChange}
          ...${v(this.indeterminate?"mixed":this.checked)}
        >
        <div class=${i}>
          <svg class="checkbox-icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <svg class="checkbox-icon minus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        ${this.label?h`<span class="checkbox-label">${this.label}</span>`:h`<slot></slot>`}
      </label>
    `}};t.styles=x`
    :host {
      display: inline-block;
    }
    .checkbox-container {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      user-select: none;
    }
    .checkbox-container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .checkbox-box {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      /* default size ensures a visible container even if size class is missing */
      width: 18px;
      height: 18px;
      border: 2px solid var(--color-border, hsl(var(--border)));
      border-radius: 4px;
      background: var(--color-page-bg, hsl(var(--background)));
      transition: all 0.2s;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .checkbox-box.size-sm {
      width: 16px;
      height: 16px;
    }
    .checkbox-box.size-md {
      width: 18px;
      height: 18px;
    }
    .checkbox-box.size-lg {
      width: 20px;
      height: 20px;
    }
    .checkbox-box:hover:not(.disabled) {
      border-color: var(--color-primary, hsl(var(--primary)));
    }
    .checkbox-box.checked,
    .checkbox-box.indeterminate {
      background: var(--color-primary, hsl(var(--primary)));
      border-color: var(--color-primary, hsl(var(--primary)));
    }
    .checkbox-box.disabled {
      background: var(--color-muted, hsl(var(--muted)));
      cursor: not-allowed;
    }
    .checkbox-icon {
      display: none;
      color: var(--color-primary-contrast, hsl(var(--primary-foreground)));
      position: absolute;
    }
    .checkbox-box.checked .checkbox-icon.check,
    .checkbox-box.indeterminate .checkbox-icon.minus {
      display: block;
    }
    .checkbox-icon.check {
      width: 10px;
      height: 10px;
    }
    .checkbox-icon.minus {
      width: 8px;
      height: 8px;
    }
    .checkbox-label {
      font-size: 0.95rem;
      color: var(--color-ink, hsl(var(--foreground)));
      line-height: 1.5;
    }
    .checkbox-container.size-sm .checkbox-label {
      font-size: 0.875rem;
    }
    .checkbox-container.size-lg .checkbox-label {
      font-size: 1rem;
    }
  `;r([c({type:Boolean,reflect:!0})],t.prototype,"checked",2);r([c({type:Boolean,reflect:!0})],t.prototype,"disabled",2);r([c({type:Boolean,reflect:!0})],t.prototype,"indeterminate",2);r([c({type:String})],t.prototype,"label",2);r([c({type:String})],t.prototype,"size",1);t=r([m("ui-checkbox")],t);
