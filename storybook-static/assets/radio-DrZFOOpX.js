import{a as b,i as u,A as h,b as n}from"./iframe-Bw_KO9Y0.js";import{n as o,t as g}from"./property-BCdGWBue.js";import{c as p}from"./template-CWz1uxk0.js";var m=Object.defineProperty,v=Object.getOwnPropertyDescriptor,t=(e,i,s,d)=>{for(var a=d>1?void 0:d?v(i,s):i,l=e.length-1,c;l>=0;l--)(c=e[l])&&(a=(d?c(i,s,a):c(a))||a);return d&&a&&m(i,s,a),a};let r=class extends u{constructor(){super(...arguments),this.value="",this.name="",this.label="",this.description="",this.checked=!1,this.disabled=!1,this._size="md",this.handleChange=e=>{if(this.disabled)return;const i=e.target;this.checked=i.checked,this.dispatchEvent(new CustomEvent("radio-change",{bubbles:!0,composed:!0,detail:{value:this.value,name:this.name}}))},this.handleKeyDown=e=>{this.disabled||(e.key===" "||e.key==="Enter")&&(e.preventDefault(),this.checked||(this.checked=!0,this.dispatchEvent(new CustomEvent("radio-change",{bubbles:!0,composed:!0,detail:{value:this.value,name:this.name}}))))}}get size(){return this._size}set size(e){const i=["sm","md","lg"],s=this._size;this._size=i.includes(e)?e:"md",this.requestUpdate("size",s)}connectedCallback(){this.setAttribute("data-ui","radio"),super.connectedCallback()}render(){const e=p({"radio-container":!0,[`size-${this.size}`]:!0,disabled:this.disabled}),i=p({"radio-ring":!0,[`size-${this.size}`]:!0,checked:this.checked});return n`
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
        ${this.label||this.description?n`
          <span class="radio-text">
            ${this.label?n`<span class="radio-label">${this.label}</span>`:h}
            ${this.description?n`<span class="radio-description">${this.description}</span>`:h}
          </span>
        `:n`<slot></slot>`}
      </label>
    `}};r.styles=b`
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
  `;t([o({type:String})],r.prototype,"value",2);t([o({type:String})],r.prototype,"name",2);t([o({type:String})],r.prototype,"label",2);t([o({type:String})],r.prototype,"description",2);t([o({type:Boolean,reflect:!0})],r.prototype,"checked",2);t([o({type:Boolean,reflect:!0})],r.prototype,"disabled",2);t([o({type:String})],r.prototype,"size",1);r=t([g("ui-radio")],r);
