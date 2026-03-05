import{a as v,i as g,A as h,b as d}from"./iframe-Bw_KO9Y0.js";import{n as t,t as y}from"./property-BCdGWBue.js";import{c as $}from"./template-CWz1uxk0.js";import"./radio-DrZFOOpX.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-rRkyaLOt.js";var f=Object.defineProperty,x=Object.getOwnPropertyDescriptor,a=(i,r,n,s)=>{for(var e=s>1?void 0:s?x(r,n):r,l=i.length-1,c;l>=0;l--)(c=i[l])&&(e=(s?c(r,n,e):c(e))||e);return s&&e&&f(r,n,e),e};let o=class extends g{constructor(){super(...arguments),this.label="",this.name="radio-group",this.value="",this.options=[],this.orientation="vertical",this.variant="default",this.size="md",this.disabled=!1,this.handleRadioChange=i=>{const r=i.detail.value;this.value=r,this.dispatchEvent(new CustomEvent("group-change",{bubbles:!0,composed:!0,detail:{value:r,name:this.name}}))}}connectedCallback(){this.setAttribute("data-ui","radio-group"),super.connectedCallback()}render(){const i=$({"group-options":!0,horizontal:this.orientation==="horizontal",card:this.variant==="card"});return d`
      ${this.label?d`<span class="group-label">${this.label}</span>`:h}
      <div class=${i} role="radiogroup" aria-label=${this.label||this.name}>
        ${this.options.map(r=>d`
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
    `}};o.styles=v`
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
  `;a([t({type:String})],o.prototype,"label",2);a([t({type:String})],o.prototype,"name",2);a([t({type:String})],o.prototype,"value",2);a([t({type:Array})],o.prototype,"options",2);a([t({type:String})],o.prototype,"orientation",2);a([t({type:String})],o.prototype,"variant",2);a([t({type:String})],o.prototype,"size",2);a([t({type:Boolean})],o.prototype,"disabled",2);o=a([y("ui-radio-group")],o);const z=[{value:"starter",label:"Starter",description:"For simple use cases"},{value:"pro",label:"Pro",description:"For growing products"},{value:"enterprise",label:"Enterprise",description:"For large teams"}],O={title:"Components/Radio Group",tags:["autodocs"],argTypes:{orientation:{control:"select",options:["vertical","horizontal"]},variant:{control:"select",options:["default","card"]},size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"}},args:{label:"Choose plan",value:"pro",orientation:"vertical",variant:"default",size:"md",disabled:!1}},p={render:({label:i,value:r,orientation:n,variant:s,size:e,disabled:l})=>d`
    <ui-radio-group
      label=${i}
      name="plan"
      value=${r}
      orientation=${n}
      variant=${s}
      size=${e}
      ?disabled=${l}
      .options=${z}
    ></ui-radio-group>
  `};var u,b,m;p.parameters={...p.parameters,docs:{...(u=p.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(m=(b=p.parameters)==null?void 0:b.docs)==null?void 0:m.source}}};const E=["Playground"];export{p as Playground,E as __namedExportsOrder,O as default};
