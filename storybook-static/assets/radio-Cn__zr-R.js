import{i as g,A as h,b as s}from"./iframe-Ck3e-F9w.js";import{n as o,U as u,t as v}from"./ui-component-base-BJ0AM59x.js";import{c as p}from"./template-1VJuhrPW.js";import{a as y}from"./validators-OS32PDZK.js";import{c as b,b as m}from"./class-builders-BssWg5Cc.js";import{o as f}from"./keyboard-helpers-TtfJu0Hs.js";var x=Object.defineProperty,z=Object.getOwnPropertyDescriptor,t=(e,i,d,n)=>{for(var a=n>1?void 0:n?z(i,d):i,l=e.length-1,c;l>=0;l--)(c=e[l])&&(a=(n?c(i,d,a):c(a))||a);return n&&a&&x(i,d,a),a};let r=class extends u{constructor(){super(...arguments),this.value="",this.name="",this.label="",this.description="",this.checked=!1,this.disabled=!1,this.validateSize=y(["sm","md","lg"],"md"),this._size="md",this.handleChange=e=>{if(this.disabled)return;const i=e.target;this.checked=i.checked,this.emit("radio-change",{value:this.value,name:this.name})},this.handleKeyDown=f(e=>{this.disabled||(e.preventDefault(),this.checked||(this.checked=!0,this.emit("radio-change",{value:this.value,name:this.name})))})}get size(){return this._size}set size(e){const i=this._size;this._size=this.validateSize(e),this.requestUpdate("size",i)}render(){const e=p(b({"radio-container":!0,disabled:this.disabled},m(this.size))),i=p(b({"radio-ring":!0,checked:this.checked},m(this.size)));return s`
      <label
        class=${e}
        tabindex=${this.disabled?-1:0}
        @keydown=${this.handleKeyDown}
        aria-checked=${this.checked}
        role="radio"
      >
        <input
          type="radio"
          .name=${this.name}
          .value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          tabindex="-1"
          @change=${this.handleChange}
        />
        <span class=${i}>
          <span class="radio-dot"></span>
        </span>
        ${this.label||this.description?s`
          <span class="radio-text">
            ${this.label?s`<span class="radio-label">${this.label}</span>`:h}
            ${this.description?s`<span class="radio-description">${this.description}</span>`:h}
          </span>
        `:s`<slot></slot>`}
      </label>
    `}};r.styles=g`
    :host {
      display: inline-block;
    }

    .radio-container {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      user-select: none;
      outline: none;
    }

    .radio-container.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Hide native input visually but keep it accessible */
    .radio-container input[type="radio"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    /* Custom radio circle */
    .radio-ring {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border-radius: 50%;
      background: var(--color-page-bg, hsl(var(--background)));
      border: 2px solid var(--color-border, hsl(var(--border)));
      transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-sizing: border-box;
    }

    /* Size variants */
    .radio-ring.size-sm { width: 16px; height: 16px; }
    .radio-ring.size-md { width: 20px; height: 20px; }
    .radio-ring.size-lg { width: 24px; height: 24px; }

    /* Dot */
    .radio-dot {
      border-radius: 50%;
      background: var(--color-primary, hsl(var(--primary)));
      transform: scale(0);
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .radio-ring.size-sm .radio-dot { width: 6px;  height: 6px; }
    .radio-ring.size-md .radio-dot { width: 8px;  height: 8px; }
    .radio-ring.size-lg .radio-dot { width: 10px; height: 10px; }

    /* Checked state */
    .radio-ring.checked {
      border-color: var(--color-primary, hsl(var(--primary)));
    }

    .radio-ring.checked .radio-dot {
      transform: scale(1);
    }

    /* Hover — only when not disabled */
    .radio-container:not(.disabled):hover .radio-ring {
      border-color: var(--color-primary, hsl(var(--primary)));
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary, #24ec71) 15%, transparent);
    }

    /* Focus ring via keyboard */
    .radio-container:focus-visible .radio-ring {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary, #24ec71) 25%, transparent);
    }

    /* Label */
    .radio-label {
      font-size: 0.9375rem;
      line-height: 1.5;
      color: var(--color-ink, hsl(var(--foreground)));
    }

    .radio-container.size-sm .radio-label { font-size: 0.8125rem; }
    .radio-container.size-lg .radio-label { font-size: 1rem; }

    /* Description */
    .radio-description {
      display: block;
      font-size: 0.8125rem;
      color: var(--color-text-muted, hsl(var(--muted-foreground)));
      line-height: 1.4;
      margin-top: 2px;
    }

    .radio-text {
      display: flex;
      flex-direction: column;
    }
  `;t([o({type:String})],r.prototype,"value",2);t([o({type:String})],r.prototype,"name",2);t([o({type:String})],r.prototype,"label",2);t([o({type:String})],r.prototype,"description",2);t([o({type:Boolean,reflect:!0})],r.prototype,"checked",2);t([o({type:Boolean,reflect:!0})],r.prototype,"disabled",2);t([o({type:String})],r.prototype,"size",1);r=t([v("ui-radio")],r);
