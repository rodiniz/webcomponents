import{r as c,i as m,b as l}from"./iframe-Ck3e-F9w.js";import{n as r,U as g,t as v}from"./ui-component-base-BJ0AM59x.js";import{r as h}from"./state-CVS5rq8K.js";import{e as y}from"./query-BApjzB0v.js";import{r as u}from"./icon-helpers-uywyl4Wq.js";import{t as f}from"./theme-DBvyg58T.js";var $=Object.defineProperty,b=Object.getOwnPropertyDescriptor,e=(t,s,a,o)=>{for(var n=o>1?void 0:o?b(s,a):s,p=t.length-1,d;p>=0;p--)(d=t[p])&&(n=(o?d(s,a,n):d(n))||n);return o&&n&&$(s,a,n),n};let i=class extends g{constructor(){super(...arguments),this.type="text",this.label="",this.placeholder="",this.required=!1,this.pattern="",this.minlength=null,this.maxlength=null,this.min="",this.max="",this.errorMessage="",this.customError="",this.disabled=!1,this.name="",this.validationRule="",this.icon="",this.iconPosition="left",this.value="",this.valid=!0,this.touched=!1,this.error="",this.customValidator=null,this._validationRule=null,this.handleInput=t=>{const s=t.target;this.value=s.value,this.touched=!0,this.doValidate(),this.updateErrorDisplay()},this.handleBlur=()=>{this.touched=!0,this.doValidate(),this.updateErrorDisplay()}}updated(t){super.updated(t),t.has("type")&&this.doValidate()}setCustomValidator(t){this.customValidator=t,this.touched=!0,this.doValidate()}get isValid(){return this.valid}checkValidity(){this.touched=!0,this.doValidate()}reportValidity(){this.touched=!0;const t=this.doValidate();return this.updateErrorDisplay(),!t&&this.inputEl&&this.inputEl.focus(),t}doValidate(){if(!this.inputEl)return!0;if(this.validationRule&&(this._validationRule||(this._validationRule=this.parseValidationRule(this.validationRule)),this._validationRule)){const t=this.applyValidationRule(this._validationRule);return this.valid=t.valid,!t.valid&&t.message?this.error=t.message:this.error="",this.valid}if(this.customValidator){const t=this.customValidator(this.value,this.inputEl);this.valid=t.valid,!t.valid&&t.message?this.error=t.message:this.error=""}else{const t=this.inputEl.checkValidity();this.valid=t,!t&&this.touched&&(this.error=this.errorMessage||this.customError||this.inputEl.validationMessage||""),t&&(this.error="")}return this.valid}updateErrorDisplay(){var a,o;const t=(a=this.shadowRoot)==null?void 0:a.querySelector(".input-wrapper"),s=(o=this.shadowRoot)==null?void 0:o.querySelector(".input-error");t&&t.classList.toggle("invalid",!this.valid&&this.touched),s&&(!this.valid&&this.touched&&this.error?(s.textContent=this.error,s.classList.remove("hidden")):s.classList.add("hidden")),this.inputEl&&(this.inputEl.setAttribute("aria-invalid",String(!this.valid&&this.touched)),this.name&&this.inputEl.setAttribute("aria-describedby",`${this.name}-error`))}parseValidationRule(t){try{return JSON.parse(t)}catch{return null}}applyValidationRule(t){const s=this.value;switch(t.type){case"emailDomain":return{valid:s.endsWith(`@${t.domain}`),message:`Email must be from ${t.domain}`};case"match":const a=document.querySelector(t.selector);if(!a)return{valid:!0};const o=a.value??"";return{valid:s===o,message:"Values do not match"};case"minLength":return{valid:s.length>=t.length,message:`Minimum length is ${t.length}`};case"maxLength":return{valid:s.length<=t.length,message:`Maximum length is ${t.length}`};case"regex":return{valid:new RegExp(t.pattern).test(s),message:"Invalid format"};default:return{valid:!0}}}render(){const t=!this.valid&&this.touched,s=this.label!=="",a=!!this.icon,o=a?`has-icon-${this.iconPosition}`:"";return l`
      <div class="input-wrapper${t?" invalid":""}${this.disabled?" disabled":""}">
        ${s?l`<label class="input-label">${this.label}${this.required?" *":""}</label>`:""}
        <div class="input-container">
          ${a&&this.iconPosition==="left"?l`<span class="input-icon left">${u(this.icon,{width:16,height:16})}</span>`:""}
          <input
            part="input"
            class="input-field ${o}"
            type="${this.type}"
            placeholder="${this.placeholder}"
            name="${this.name}"
            .value=${this.value}
            ?required=${this.required}
            ?pattern="${this.pattern}"
            ?minlength=${this.minlength!==null?this.minlength:void 0}
            ?maxlength=${this.maxlength!==null?this.maxlength:void 0}
            min=${this.min}
            max=${this.max}
            ?disabled=${this.disabled}
            aria-invalid="${t}"
            aria-describedby="${this.name}-error"
            @input=${this.handleInput}
            @blur=${this.handleBlur}
          />
          ${a&&this.iconPosition==="right"?l`<span class="input-icon right">${u(this.icon,{width:16,height:16})}</span>`:""}
        </div>
        <span class="input-error${t&&this.error?"":" hidden"}" id="${this.name}-error" role="alert">${this.error}</span>
      </div>
    `}};i.styles=[c(f),m`
      :host {
        display: block;
        margin-bottom: 1rem;
      }

      .input-container {
        position: relative;
        display: flex;
        align-items: center;
      }

      .input-icon {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        color: hsl(var(--muted-foreground));
        transition: color 0.15s ease;
      }

      .input-icon svg {
        width: 16px;
        height: 16px;
      }

      .input-icon.left {
        left: 0.75rem;
      }

      .input-icon.right {
        right: 0.75rem;
      }

      .input-field.has-icon-left {
        padding-left: 2.5rem;
      }

      .input-field.has-icon-right {
        padding-right: 2.5rem;
      }

      .input-wrapper:focus-within .input-icon {
        color: hsl(var(--ring));
      }

      .input-error {
        color: hsl(0, 84.2%, 60.2%);
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      }

      .input-error.hidden {
        display: none;
      }
    `];e([r({type:String})],i.prototype,"type",2);e([r({type:String})],i.prototype,"label",2);e([r({type:String})],i.prototype,"placeholder",2);e([r({type:Boolean})],i.prototype,"required",2);e([r({type:String})],i.prototype,"pattern",2);e([r({type:Number})],i.prototype,"minlength",2);e([r({type:Number})],i.prototype,"maxlength",2);e([r({type:String})],i.prototype,"min",2);e([r({type:String})],i.prototype,"max",2);e([r({type:String})],i.prototype,"errorMessage",2);e([r({type:String})],i.prototype,"customError",2);e([r({type:Boolean})],i.prototype,"disabled",2);e([r({type:String})],i.prototype,"name",2);e([r({type:String})],i.prototype,"validationRule",2);e([r({type:String})],i.prototype,"icon",2);e([r({type:String})],i.prototype,"iconPosition",2);e([h()],i.prototype,"value",2);e([h()],i.prototype,"valid",2);e([h()],i.prototype,"touched",2);e([h()],i.prototype,"error",2);e([y(".input-field")],i.prototype,"inputEl",2);i=e([v("ui-input")],i);
