import{r as $,a as w,i as y,b as d}from"./iframe-6s-sIqo3.js";import{n,t as v}from"./property-C_0pZ1Mq.js";import{c as m}from"./template-BbtPzLcA.js";import{t as x}from"./theme-CCP9F1YV.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-BsqWkz84.js";var S=Object.defineProperty,P=Object.getOwnPropertyDescriptor,a=(e,t,o,i)=>{for(var s=i>1?void 0:i?P(t,o):t,h=e.length-1,g;h>=0;h--)(g=e[h])&&(s=(i?g(t,o,s):g(s))||s);return i&&s&&S(t,o,s),s};let r=class extends y{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.label="",this.name="",this.size="md",this.isUserInteraction=!1,this.handleToggle=e=>{this.disabled||(e.preventDefault(),e.stopPropagation(),this.isUserInteraction=!0,this.checked=!this.checked)},this.handleKeyDown=e=>{this.disabled||(e.key===" "||e.key==="Enter")&&(e.preventDefault(),e.stopPropagation(),this.isUserInteraction=!0,this.checked=!this.checked)}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","switch"),this.setAttribute("aria-checked",String(this.checked))}updated(e){e.has("checked")&&(this.setAttribute("aria-checked",String(this.checked)),this.isUserInteraction&&(this.dispatchEvent(new CustomEvent("toggle-change",{detail:{checked:this.checked},bubbles:!0,composed:!0})),this.isUserInteraction=!1))}get value(){return this.checked}set value(e){this.checked=e}render(){const e=m({"toggle-container":!0,disabled:this.disabled,[`size-${this.size}`]:!0}),t=m({"toggle-track":!0,checked:this.checked,disabled:this.disabled});return d`
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
        ${this.label?d`<span class="toggle-label">${this.label}</span>`:""}
      </div>
    `}};r.styles=[$(x),w`
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
    `];a([n({type:Boolean,reflect:!0})],r.prototype,"checked",2);a([n({type:Boolean,reflect:!0})],r.prototype,"disabled",2);a([n({type:String})],r.prototype,"label",2);a([n({type:String})],r.prototype,"name",2);a([n({type:String})],r.prototype,"size",2);r=a([v("ui-toggle-switch")],r);const O={title:"Components/Toggle Switch",tags:["autodocs"],argTypes:{label:{control:"text"},checked:{control:"boolean"},disabled:{control:"boolean"},size:{control:"select",options:["sm","md","lg"]},name:{control:"text"}},args:{label:"Enable notifications",checked:!0,disabled:!1,size:"md",name:"notifications"}},l={render:({label:e,checked:t,disabled:o,size:i,name:s})=>d`
    <ui-toggle-switch
      label=${e}
      ?checked=${t}
      ?disabled=${o}
      size=${i}
      name=${s}
    ></ui-toggle-switch>
  `},c={args:{label:"",checked:!1,size:"md"},render:({checked:e,disabled:t,size:o,name:i})=>d`
    <ui-toggle-switch
      ?checked=${e}
      ?disabled=${t}
      size=${o}
      name=${i}
    ></ui-toggle-switch>
  `};var b,p,u;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: ({
    label,
    checked,
    disabled,
    size,
    name
  }) => html\`
    <ui-toggle-switch
      label=\${label}
      ?checked=\${checked}
      ?disabled=\${disabled}
      size=\${size}
      name=\${name}
    ></ui-toggle-switch>
  \`
}`,...(u=(p=l.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var k,f,z;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: '',
    checked: false,
    size: 'md'
  },
  render: ({
    checked,
    disabled,
    size,
    name
  }) => html\`
    <ui-toggle-switch
      ?checked=\${checked}
      ?disabled=\${disabled}
      size=\${size}
      name=\${name}
    ></ui-toggle-switch>
  \`
}`,...(z=(f=c.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};const T=["Playground","WithoutLabel"];export{l as Playground,c as WithoutLabel,T as __namedExportsOrder,O as default};
