import{r as f,a as x,i as g,b as p}from"./iframe-6s-sIqo3.js";import{n as c,t as b}from"./property-C_0pZ1Mq.js";import{c as h}from"./template-BbtPzLcA.js";import{t as y}from"./theme-CCP9F1YV.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-BsqWkz84.js";var w=Object.defineProperty,z=Object.getOwnPropertyDescriptor,n=(t,r,e,i)=>{for(var s=i>1?void 0:i?z(r,e):r,a=t.length-1,d;a>=0;a--)(d=t[a])&&(s=(i?d(r,e,s):d(s))||s);return i&&s&&w(r,e,s),s};let o=class extends g{constructor(){super(...arguments),this.steps=[],this.active=1,this.orientation="horizontal",this.size="md"}connectedCallback(){this.setAttribute("data-ui","stepper"),super.connectedCallback()}getActiveIndex(){const t=this.steps||[];return Number.isNaN(this.active)||t.length<=0?1:Math.min(Math.max(this.active,1),t.length)}getStepState(t,r){if(this.steps,t.state)return t.state;const e=this.getActiveIndex();return r+1<e?"complete":r+1===e?"active":"upcoming"}handleStepClick(t){const e=(this.steps||[])[t];if(e.disabled)return;this.active=t+1;const i=this.getStepState(e,t);this.dispatchEvent(new CustomEvent("step-change",{bubbles:!0,composed:!0,detail:{index:t+1,step:e,state:i}}))}render(){const t=this.steps||[],r=h({stepper:!0,[this.orientation]:!0,[this.size]:!0});return p`
      <div class=${r}>
        ${t.map((e,i)=>{const s=this.getStepState(e,i),a=h({step:!0,[s]:!0,disabled:!!e.disabled});return p`
            <div class=${a} @click=${()=>this.handleStepClick(i)}>
              <div class="step-marker">
                ${s==="complete"?p`
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                `:s==="error"?p`
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                `:s==="warning"?"!":i+1}
              </div>
              <div class="step-content">
                <div class="step-title">${e.title}</div>
                ${e.description?p`<div class="step-description">${e.description}</div>`:""}
              </div>
            </div>
          `})}
      </div>
    `}};o.styles=[f(y),x`
       :host {
         display: block;
         width: 100%;
         --stepper-primary: var(--color-primary, hsl(var(--primary)));
         --stepper-secondary: var(--color-muted, hsl(var(--muted)));
         --stepper-border: var(--color-border, hsl(var(--border)));
         --stepper-text: var(--color-ink, hsl(var(--foreground)));
         --stepper-muted: var(--color-text-muted, hsl(var(--muted-foreground)));
       }

      .stepper {
        display: flex;
        width: 100%;
        position: relative;
        gap: 1.5rem;
      }

      .stepper.horizontal {
        flex-direction: row;
        align-items: flex-start;
      }

      .stepper.vertical {
        flex-direction: column;
      }

      .step {
        display: flex;
        position: relative;
        flex: 1;
        gap: 0.75rem;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .stepper.horizontal .step {
        flex-direction: column;
        align-items: center;
        text-align: center;
        min-width: 120px;
      }

      .stepper.vertical .step {
        flex-direction: row;
        align-items: flex-start;
      }

      /* Connectors */
      .step::after {
        content: '';
        position: absolute;
        background: var(--stepper-border);
        transition: all 0.3s ease;
        z-index: 0;
      }

      .stepper.horizontal .step:not(:last-child)::after {
        top: 20px;
        left: 50%;
        width: calc(100% + 1.5rem);
        height: 2px;
      }

      .stepper.vertical .step:not(:last-child)::after {
        top: 40px;
        left: 17px;
        width: 2px;
        height: calc(100% - 20px);
      }

      .step.complete::after {
        background: var(--stepper-primary);
      }

      .step-marker {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: white;
        border: 2px solid var(--stepper-border);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.9rem;
        color: var(--stepper-muted);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        z-index: 1;
        flex-shrink: 0;
        position: relative;
      }

      .step.active .step-marker {
        border-color: var(--stepper-primary);
        background: white;
        color: var(--stepper-primary);
        box-shadow: 0 0 0 4px rgba(36, 236, 113, 0.15);
        transform: scale(1.1);
      }

      .step.complete .step-marker {
        background: var(--stepper-primary);
        border-color: var(--stepper-primary);
        color: white;
      }

      .step.error .step-marker {
        background: #fee2e2;
        border-color: #ef4444;
        color: #ef4444;
      }

      .step.warning .step-marker {
        background: #fef3c7;
        border-color: #f59e0b;
        color: #f59e0b;
      }

      .step-marker svg {
        width: 18px;
        height: 18px;
      }

      .step-content {
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .step-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--stepper-text);
        transition: color 0.2s ease;
      }

      .step.upcoming .step-title {
        color: var(--stepper-muted);
      }

      .step-description {
        font-size: 0.8rem;
        color: var(--stepper-muted);
        line-height: 1.4;
      }

      .step.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      /* Size variations */
      .stepper.sm .step-marker { width: 28px; height: 28px; font-size: 0.8rem; }
      .stepper.sm .step-marker svg { width: 14px; height: 14px; }
      .stepper.sm.horizontal .step:not(:last-child)::after { top: 14px; }
      .stepper.sm.vertical .step:not(:last-child)::after { top: 32px; left: 13px; }

      .stepper.lg .step-marker { width: 44px; height: 44px; font-size: 1rem; }
      .stepper.lg .step-marker svg { width: 22px; height: 22px; }
      .stepper.lg.horizontal .step:not(:last-child)::after { top: 22px; }
      .stepper.lg.vertical .step:not(:last-child)::after { top: 48px; left: 21px; }

      @media (max-width: 640px) {
        .stepper.horizontal {
          flex-direction: column;
          align-items: stretch;
        }
        .stepper.horizontal .step {
          flex-direction: row;
          align-items: flex-start;
          text-align: left;
        }
        .stepper.horizontal .step:not(:last-child)::after {
          top: 40px;
          left: 17px;
          width: 2px;
          height: calc(100% - 20px);
        }
      }
    `];n([c({type:Array})],o.prototype,"steps",2);n([c({type:Number})],o.prototype,"active",2);n([c({type:String})],o.prototype,"orientation",2);n([c({type:String})],o.prototype,"size",2);o=n([b("ui-stepper")],o);const k=[{title:"Account",description:"Create your account"},{title:"Profile",description:"Complete profile details"},{title:"Finish",description:"Review and submit"}],A={title:"Components/Stepper",tags:["autodocs"],argTypes:{active:{control:{type:"number",min:1,max:3,step:1}},orientation:{control:"select",options:["horizontal","vertical"]},size:{control:"select",options:["sm","md","lg"]}},args:{active:2,orientation:"horizontal",size:"md"}},l={render:({active:t,orientation:r,size:e})=>p`
    <ui-stepper .steps=${k} .active=${t} orientation=${r} size=${e}></ui-stepper>
  `};var m,u,v;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: ({
    active,
    orientation,
    size
  }) => html\`
    <ui-stepper .steps=\${steps} .active=\${active} orientation=\${orientation} size=\${size}></ui-stepper>
  \`
}`,...(v=(u=l.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};const O=["Playground"];export{l as Playground,O as __namedExportsOrder,A as default};
