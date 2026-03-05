import{a as k,i as u,b as l}from"./iframe-Bw_KO9Y0.js";import{n,t as g}from"./property-BCdGWBue.js";import{c as b}from"./template-CWz1uxk0.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-rRkyaLOt.js";var z=Object.defineProperty,f=Object.getOwnPropertyDescriptor,r=(e,i,t,o)=>{for(var s=o>1?void 0:o?f(i,t):i,d=e.length-1,h;d>=0;d--)(h=e[d])&&(s=(o?h(i,t,s):h(s))||s);return o&&s&&z(i,t,s),s};let c=class extends u{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.indeterminate=!1,this.label="",this._size="md",this.handleChange=e=>{if(this.disabled)return;const t=e.target.checked;this.indeterminate&&(this.indeterminate=!1),this.checked=t,this.dispatchEvent(new CustomEvent("checkbox-change",{bubbles:!0,composed:!0,detail:{checked:t}}))}}get size(){return this._size}set size(e){const i=["sm","md","lg"],t=i.includes(e)?e:"md";e&&!i.includes(e)&&console.warn(`ui-checkbox received invalid size "${e}"; falling back to "md"`);const o=this._size;this._size=t,this.requestUpdate("size",o)}connectedCallback(){this.setAttribute("data-ui","checkbox"),super.connectedCallback()}setChecked(e){this.checked=e,this.indeterminate=!1}setIndeterminate(e){this.indeterminate=e}render(){const e=b({"checkbox-container":!0,"size-sm":this.size==="sm","size-md":this.size==="md","size-lg":this.size==="lg"}),i=b({"checkbox-box":!0,"size-sm":this.size==="sm","size-md":this.size==="md","size-lg":this.size==="lg",checked:this.checked,indeterminate:this.indeterminate,disabled:this.disabled});return l`
      <label class=${e}>
        <input type="checkbox" .checked=${this.checked} .indeterminate=${this.indeterminate} ?disabled=${this.disabled} @change=${this.handleChange}>
        <div class=${i}>
          <svg class="checkbox-icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <svg class="checkbox-icon minus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        ${this.label?l`<span class="checkbox-label">${this.label}</span>`:l`<slot></slot>`}
      </label>
    `}};c.styles=k`
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
  `;r([n({type:Boolean,reflect:!0})],c.prototype,"checked",2);r([n({type:Boolean,reflect:!0})],c.prototype,"disabled",2);r([n({type:Boolean,reflect:!0})],c.prototype,"indeterminate",2);r([n({type:String})],c.prototype,"label",2);r([n({type:String})],c.prototype,"size",1);c=r([g("ui-checkbox")],c);const _={title:"Components/Checkbox",tags:["autodocs"],argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},indeterminate:{control:"boolean"},size:{control:"select",options:["sm","md","lg"]}},args:{label:"Accept terms",checked:!1,disabled:!1,indeterminate:!1,size:"md"}},a={render:({label:e,checked:i,disabled:t,indeterminate:o,size:s})=>l`
    <ui-checkbox
      label=${e}
      ?checked=${i}
      ?disabled=${t}
      ?indeterminate=${o}
      size=${s}
    ></ui-checkbox>
  `};var p,m,x;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: ({
    label,
    checked,
    disabled,
    indeterminate,
    size
  }) => html\`
    <ui-checkbox
      label=\${label}
      ?checked=\${checked}
      ?disabled=\${disabled}
      ?indeterminate=\${indeterminate}
      size=\${size}
    ></ui-checkbox>
  \`
}`,...(x=(m=a.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};const P=["Playground"];export{a as Playground,P as __namedExportsOrder,_ as default};
