import{i as g,A as b,b as p}from"./iframe-Ck3e-F9w.js";import{n as i,U as y,t as $}from"./ui-component-base-BJ0AM59x.js";import{c as f}from"./template-1VJuhrPW.js";import{c as u,a as z}from"./validators-OS32PDZK.js";import"./radio-Cn__zr-R.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-7KbQsD9c.js";import"./class-builders-BssWg5Cc.js";import"./keyboard-helpers-TtfJu0Hs.js";var _=Object.defineProperty,x=Object.getOwnPropertyDescriptor,t=(a,r,n,s)=>{for(var e=s>1?void 0:s?x(r,n):r,l=a.length-1,c;l>=0;l--)(c=a[l])&&(e=(s?c(r,n,e):c(e))||e);return s&&e&&_(r,n,e),e};let o=class extends y{constructor(){super(...arguments),this.label="",this.name="radio-group",this.value="",this.options=[],this.validateOrientation=u(["vertical","horizontal"],"vertical","orientation","UIRadioGroup"),this.validateVariant=u(["default","card"],"default","variant","UIRadioGroup"),this.validateSize=z(["sm","md","lg"],"md","UIRadioGroup"),this._orientation="vertical",this._variant="default",this._size="md",this.disabled=!1,this.handleRadioChange=a=>{const r=a.detail.value;this.value=r,this.emit("group-change",{value:r,name:this.name})}}get orientation(){return this._orientation}set orientation(a){const r=this._orientation;this._orientation=this.validateOrientation(a),this.requestUpdate("orientation",r)}get variant(){return this._variant}set variant(a){const r=this._variant;this._variant=this.validateVariant(a),this.requestUpdate("variant",r)}get size(){return this._size}set size(a){const r=this._size;this._size=this.validateSize(a),this.requestUpdate("size",r)}render(){const a=f({"group-options":!0,horizontal:this.orientation==="horizontal",card:this.variant==="card"});return p`
      ${this.label?p`<span class="group-label">${this.label}</span>`:b}
      <div class=${a} role="radiogroup" aria-label=${this.label||this.name}>
        ${this.options.map(r=>p`
          <ui-radio
            .name=${this.name}
            .value=${r.value}
            .label=${r.label}
            .description=${r.description??""}
            .size=${this.size}
            ?checked=${this.value===r.value}
            ?disabled=${this.disabled||!!r.disabled}
            @radio-change=${this.handleRadioChange}
          ></ui-radio>
        `)}
        <slot></slot>
      </div>
    `}};o.styles=g`
    :host {
      display: block;
    }

    .group-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-ink, hsl(var(--foreground)));
      margin-bottom: 0.75rem;
    }

    .group-options {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    .group-options.horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1.25rem;
    }

    /* Card variant — each radio renders as a selectable card */
    .group-options.card {
      flex-direction: column;
      gap: 0.5rem;
    }

    .group-options.card ui-radio {
      display: block;
      padding: 0.875rem 1rem;
      border: 1.5px solid var(--color-border, hsl(var(--border)));
      border-radius: var(--radius, 0.5rem);
      transition: border-color 0.2s ease, box-shadow 0.15s ease;
      background: var(--color-page-bg, hsl(var(--background)));
      cursor: pointer;
    }

    .group-options.card ui-radio:hover:not([disabled]) {
      border-color: var(--color-primary, hsl(var(--primary)));
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary, #24ec71) 12%, transparent);
    }

    .group-options.card ui-radio[checked] {
      border-color: var(--color-primary, hsl(var(--primary)));
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary, #24ec71) 15%, transparent);
      background: color-mix(in srgb, var(--color-primary, #24ec71) 5%, white);
    }
  `;t([i({type:String})],o.prototype,"label",2);t([i({type:String})],o.prototype,"name",2);t([i({type:String})],o.prototype,"value",2);t([i({type:Array})],o.prototype,"options",2);t([i({type:String})],o.prototype,"orientation",1);t([i({type:String})],o.prototype,"variant",1);t([i({type:String})],o.prototype,"size",1);t([i({type:Boolean})],o.prototype,"disabled",2);o=t([$("ui-radio-group")],o);const w=[{value:"starter",label:"Starter",description:"For simple use cases"},{value:"pro",label:"Pro",description:"For growing products"},{value:"enterprise",label:"Enterprise",description:"For large teams"}],V={title:"Components/Radio Group",tags:["autodocs"],argTypes:{orientation:{control:"select",options:["vertical","horizontal"]},variant:{control:"select",options:["default","card"]},size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"}},args:{label:"Choose plan",value:"pro",orientation:"vertical",variant:"default",size:"md",disabled:!1}},d={render:({label:a,value:r,orientation:n,variant:s,size:e,disabled:l})=>p`
    <ui-radio-group
      label=${a}
      name="plan"
      value=${r}
      orientation=${n}
      variant=${s}
      size=${e}
      ?disabled=${l}
      .options=${w}
    ></ui-radio-group>
  `};var h,v,m;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: ({
    label,
    value,
    orientation,
    variant,
    size,
    disabled
  }) => html\`
    <ui-radio-group
      label=\${label}
      name="plan"
      value=\${value}
      orientation=\${orientation}
      variant=\${variant}
      size=\${size}
      ?disabled=\${disabled}
      .options=\${options}
    ></ui-radio-group>
  \`
}`,...(m=(v=d.parameters)==null?void 0:v.docs)==null?void 0:m.source}}};const q=["Playground"];export{d as Playground,q as __namedExportsOrder,V as default};
