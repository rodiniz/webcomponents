import{r as h,i as m,b as a}from"./iframe-Ck3e-F9w.js";import{n as l,U as v,t as f}from"./ui-component-base-BJ0AM59x.js";import{c as d}from"./template-1VJuhrPW.js";import{c as x,a as g}from"./validators-OS32PDZK.js";import{t as u}from"./theme-DBvyg58T.js";var b=Object.defineProperty,y=Object.getOwnPropertyDescriptor,n=(e,r,t,s)=>{for(var i=s>1?void 0:s?y(r,t):r,p=e.length-1,c;p>=0;p--)(c=e[p])&&(i=(s?c(r,t,i):c(i))||i);return s&&i&&b(r,t,i),i};let o=class extends v{constructor(){super(...arguments),this.steps=[],this.active=1,this.validateOrientation=x(["horizontal","vertical"],"horizontal","orientation","UIStepper"),this.validateSize=g(["sm","md","lg"],"md","UIStepper"),this._orientation="horizontal",this._size="md"}get orientation(){return this._orientation}set orientation(e){const r=this._orientation;this._orientation=this.validateOrientation(e),this.requestUpdate("orientation",r)}get size(){return this._size}set size(e){const r=this._size;this._size=this.validateSize(e),this.requestUpdate("size",r)}getActiveIndex(){const e=this.steps||[];return Number.isNaN(this.active)||e.length<=0?1:Math.min(Math.max(this.active,1),e.length)}getStepState(e,r){if(this.steps,e.state)return e.state;const t=this.getActiveIndex();return r+1<t?"complete":r+1===t?"active":"upcoming"}handleStepClick(e){const t=(this.steps||[])[e];if(t.disabled)return;this.active=e+1;const s=this.getStepState(t,e);this.emit("step-change",{index:e+1,step:t,state:s})}render(){const e=this.steps||[],r=d({stepper:!0,[this.orientation]:!0,[this.size]:!0});return a`
      <div class=${r}>
        ${e.map((t,s)=>{const i=this.getStepState(t,s),p=d({step:!0,[i]:!0,disabled:!!t.disabled});return a`
            <div class=${p} @click=${()=>this.handleStepClick(s)}>
              <div class="step-marker">
                ${i==="complete"?a`
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                `:i==="error"?a`
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                `:i==="warning"?"!":s+1}
              </div>
              <div class="step-content">
                <div class="step-title">${t.title}</div>
                ${t.description?a`<div class="step-description">${t.description}</div>`:""}
              </div>
            </div>
          `})}
      </div>
    `}};o.styles=[h(u),m`
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
    `];n([l({type:Array})],o.prototype,"steps",2);n([l({type:Number})],o.prototype,"active",2);n([l({type:String})],o.prototype,"orientation",1);n([l({type:String})],o.prototype,"size",1);o=n([f("ui-stepper")],o);
