import{r as v,a as f,i as $,b as h}from"./iframe-Bw_KO9Y0.js";import{n as s,t as b}from"./property-BCdGWBue.js";import{r as u}from"./state-CPy2gvTm.js";import{e as x}from"./query-BApjzB0v.js";import{o as c}from"./unsafe-html-rRkyaLOt.js";import{t as E}from"./theme-Df5CjktT.js";import{f as V}from"./feather-YLknBcFY.js";import"./preload-helper-C1FmrZbK.js";import"./_commonjsHelpers-Cpj98o6Y.js";var S=Object.defineProperty,R=Object.getOwnPropertyDescriptor,r=(t,i,n,o)=>{for(var a=o>1?void 0:o?R(i,n):i,l=t.length-1,p;l>=0;l--)(p=t[l])&&(a=(o?p(i,n,a):p(a))||a);return o&&a&&S(i,n,a),a};let e=class extends ${constructor(){super(...arguments),this.type="text",this.label="",this.placeholder="",this.required=!1,this.pattern="",this.minlength=null,this.maxlength=null,this.min="",this.max="",this.errorMessage="",this.customError="",this.disabled=!1,this.name="",this.validationRule="",this.icon="",this.iconPosition="left",this.value="",this.valid=!0,this.touched=!1,this.error="",this.customValidator=null,this._validationRule=null,this.handleInput=t=>{const i=t.target;this.value=i.value,this.touched=!0,this.doValidate(),this.updateErrorDisplay()},this.handleBlur=()=>{this.touched=!0,this.doValidate(),this.updateErrorDisplay()}}connectedCallback(){this.setAttribute("data-ui","input"),super.connectedCallback()}getIcon(){var i;return this.icon?{svg:((i=V.icons[this.icon])==null?void 0:i.toSvg())||"",name:this.icon}:null}setCustomValidator(t){this.customValidator=t,this.doValidate()}get isValid(){return this.valid}checkValidity(){this.touched=!0,this.doValidate()}reportValidity(){this.touched=!0;const t=this.doValidate();return this.updateErrorDisplay(),!t&&this.inputEl&&this.inputEl.focus(),t}doValidate(){if(!this.inputEl)return!0;if(this.validationRule&&(this._validationRule||(this._validationRule=this.parseValidationRule(this.validationRule)),this._validationRule)){const t=this.applyValidationRule(this._validationRule);return this.valid=t.valid,!t.valid&&t.message&&(this.error=t.message),this.valid}if(this.customValidator){const t=this.customValidator(this.value,this.inputEl);this.valid=t.valid,!t.valid&&t.message&&(this.error=t.message)}else{const t=this.inputEl.checkValidity();this.valid=t,!t&&this.touched&&(this.error=this.inputEl.validationMessage||this.errorMessage||this.customError),t&&(this.error="")}return this.valid}updateErrorDisplay(){var n,o;const t=(n=this.shadowRoot)==null?void 0:n.querySelector(".input-wrapper"),i=(o=this.shadowRoot)==null?void 0:o.querySelector(".input-error");t&&t.classList.toggle("invalid",!this.valid&&this.touched),i&&(!this.valid&&this.touched&&this.error?(i.textContent=this.error,i.classList.remove("hidden")):i.classList.add("hidden")),this.inputEl&&(this.inputEl.setAttribute("aria-invalid",String(!this.valid&&this.touched)),this.name&&this.inputEl.setAttribute("aria-describedby",`${this.name}-error`))}parseValidationRule(t){try{return JSON.parse(t)}catch{return null}}applyValidationRule(t){const i=this.value;switch(t.type){case"emailDomain":return{valid:i.endsWith(`@${t.domain}`),message:`Email must be from ${t.domain}`};case"match":const n=document.querySelector(t.selector);if(!n)return{valid:!0};const o=n.value??"";return{valid:i===o,message:"Values do not match"};case"minLength":return{valid:i.length>=t.length,message:`Minimum length is ${t.length}`};case"maxLength":return{valid:i.length<=t.length,message:`Maximum length is ${t.length}`};case"regex":return{valid:new RegExp(t.pattern).test(i),message:"Invalid format"};default:return{valid:!0}}}render(){const t=!this.valid&&this.touched,i=this.label!=="",n=this.getIcon(),o=n!==null,a=o?`has-icon-${this.iconPosition}`:"";return h`
      <div class="input-wrapper${t?" invalid":""}${this.disabled?" disabled":""}">
        ${i?h`<label class="input-label">${this.label}${this.required?" *":""}</label>`:""}
        <div class="input-container">
          ${o&&this.iconPosition==="left"?h`<span class="input-icon left">${c(n.svg)}</span>`:""}
          <input
            part="input"
            class="input-field ${a}"
            type="${this.type}"
            placeholder="${this.placeholder}"
            name="${this.name}"
            .value=${this.value}
            ?required=${this.required}
            pattern="${this.pattern}"
            minlength="${this.minlength!==null?this.minlength:""}"
            maxlength="${this.maxlength!==null?this.maxlength:""}"
            min=${this.min}
            max=${this.max}
            ?disabled=${this.disabled}
            aria-invalid="${t}"
            aria-describedby="${this.name}-error"
            @input=${this.handleInput}
            @blur=${this.handleBlur}
          />
          ${o&&this.iconPosition==="right"?h`<span class="input-icon right">${c(n.svg)}</span>`:""}
        </div>
        <span class="input-error${t&&this.error?"":" hidden"}" id="${this.name}-error" role="alert">${this.error}</span>
      </div>
    `}};e.styles=[v(E),f`
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
    `];r([s({type:String})],e.prototype,"type",2);r([s({type:String})],e.prototype,"label",2);r([s({type:String})],e.prototype,"placeholder",2);r([s({type:Boolean})],e.prototype,"required",2);r([s({type:String})],e.prototype,"pattern",2);r([s({type:Number})],e.prototype,"minlength",2);r([s({type:Number})],e.prototype,"maxlength",2);r([s({type:String})],e.prototype,"min",2);r([s({type:String})],e.prototype,"max",2);r([s({type:String})],e.prototype,"errorMessage",2);r([s({type:String})],e.prototype,"customError",2);r([s({type:Boolean})],e.prototype,"disabled",2);r([s({type:String})],e.prototype,"name",2);r([s({type:String})],e.prototype,"validationRule",2);r([s({type:String})],e.prototype,"icon",2);r([s({type:String})],e.prototype,"iconPosition",2);r([u()],e.prototype,"value",2);r([u()],e.prototype,"valid",2);r([u()],e.prototype,"touched",2);r([u()],e.prototype,"error",2);r([x(".input-field")],e.prototype,"inputEl",2);e=r([b("ui-input")],e);const O={title:"Components/Input",tags:["autodocs"],argTypes:{type:{control:"select",options:["text","email","password","number","tel","url"]},icon:{control:"text"},iconPosition:{control:"select",options:["left","right"]},required:{control:"boolean"},disabled:{control:"boolean"}},args:{label:"Email",placeholder:"name@company.com",type:"email",icon:"mail",iconPosition:"left",required:!0,disabled:!1}},d={render:({label:t,placeholder:i,type:n,icon:o,iconPosition:a,required:l,disabled:p})=>h`
    <ui-input
      label=${t}
      placeholder=${i}
      type=${n}
      icon=${o}
      icon-position=${a}
      ?required=${l}
      ?disabled=${p}
      name="storybook-input"
    ></ui-input>
  `};var m,g,y;d.parameters={...d.parameters,docs:{...(m=d.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: ({
    label,
    placeholder,
    type,
    icon,
    iconPosition,
    required,
    disabled
  }) => html\`
    <ui-input
      label=\${label}
      placeholder=\${placeholder}
      type=\${type}
      icon=\${icon}
      icon-position=\${iconPosition}
      ?required=\${required}
      ?disabled=\${disabled}
      name="storybook-input"
    ></ui-input>
  \`
}`,...(y=(g=d.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};const B=["Playground"];export{d as Playground,B as __namedExportsOrder,O as default};
