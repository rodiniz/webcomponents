import{r as O,i as x,b as p}from"./iframe-Bw_KO9Y0.js";import{n as h,t as C}from"./property-BCdGWBue.js";import{r as D}from"./state-CPy2gvTm.js";import{c as b}from"./template-CWz1uxk0.js";import{t as P}from"./theme-Df5CjktT.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-rRkyaLOt.js";var _=Object.defineProperty,F=Object.getOwnPropertyDescriptor,l=(s,n,e,a)=>{for(var r=a>1?void 0:a?F(n,e):n,c=s.length-1,o;c>=0;c--)(o=s[c])&&(r=(a?o(n,e,r):o(r))||r);return a&&r&&_(n,e,r),r};let i=class extends x{constructor(){super(...arguments),this.value="",this.format="YYYY-MM-DD",this.min="",this.max="",this.disabled=!1,this.placeholder="Select date",this.label="",this.currentMonth=new Date,this.selectedDate="",this.isOpen=!1,this.handleOutsideClick=s=>{this.isOpen&&!s.composedPath().includes(this)&&(this.isOpen=!1)},this.toggleDropdown=()=>{this.disabled||(this.isOpen=!this.isOpen,this.isOpen&&this.selectedDate&&(this.currentMonth=new Date(this.selectedDate)))}}connectedCallback(){this.setAttribute("data-ui","date-picker"),super.connectedCallback(),this.value&&(this.selectedDate=this.value,this.currentMonth=new Date(this.value)),document.addEventListener("click",this.handleOutsideClick)}willUpdate(s){s.has("value")&&(this.selectedDate=this.value||"",this.value&&(this.currentMonth=new Date(this.value)))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.handleOutsideClick)}changeMonth(s){const n=new Date(this.currentMonth);n.setMonth(n.getMonth()+s),this.currentMonth=n}selectDate(s,n=!1){const e=new Date(this.currentMonth);n&&e.setMonth(e.getMonth()+(s>15?-1:1)),e.setDate(s);const a=e.getFullYear(),r=(e.getMonth()+1).toString().padStart(2,"0"),c=e.getDate().toString().padStart(2,"0"),o=`${a}-${r}-${c}`;this.selectedDate=o,this.value=o,this.isOpen=!1,this.dispatchEvent(new CustomEvent("change",{detail:{value:o},bubbles:!0,composed:!0}))}formatDateDisplay(s){if(!s)return"";const n=new Date(s);if(isNaN(n.getTime()))return"";const e=n.getDate().toString().padStart(2,"0"),a=(n.getMonth()+1).toString().padStart(2,"0"),r=n.getFullYear();switch(this.format){case"DD/MM/YYYY":return`${e}/${a}/${r}`;case"MM/DD/YYYY":return`${a}/${e}/${r}`;case"DD-MM-YYYY":return`${e}-${a}-${r}`;case"MM-DD-YYYY":return`${a}-${e}-${r}`;default:return`${r}-${a}-${e}`}}renderCalendar(){const s=(t,d)=>new Date(d,t+1,0).getDate(),n=(t,d)=>new Date(d,t,1).getDay(),e=this.currentMonth.getMonth(),a=this.currentMonth.getFullYear(),r=s(e,a),c=n(e,a),o=s(e-1,a),u=[];for(let t=c-1;t>=0;t--)u.push({day:o-t,otherMonth:!0});for(let t=1;t<=r;t++)u.push({day:t,otherMonth:!1});const f=42-u.length;for(let t=1;t<=f;t++)u.push({day:t,otherMonth:!0});const S=["January","February","March","April","May","June","July","August","September","October","November","December"],g=new Date,w=`${g.getFullYear()}-${(g.getMonth()+1).toString().padStart(2,"0")}-${g.getDate().toString().padStart(2,"0")}`;return p`
      <div class="calendar-dropdown">
        <div class="calendar-header">
          <div class="calendar-title">${S[e]} ${a}</div>
          <div class="calendar-nav">
            <button class="calendar-nav-btn" @click=${()=>this.changeMonth(-1)}>&lt;</button>
            <button class="calendar-nav-btn" @click=${()=>this.changeMonth(1)}>&gt;</button>
          </div>
        </div>
        <div class="calendar-grid">
          ${["Su","Mo","Tu","We","Th","Fr","Sa"].map(t=>p`<div class="calendar-day-label">${t}</div>`)}
          ${u.map(t=>{const d=new Date(a,e+(t.otherMonth?t.day>15?-1:1:0),t.day),v=`${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,"0")}-${d.getDate().toString().padStart(2,"0")}`,Y=v===this.selectedDate,k=v===w;return p`
              <div 
                class="calendar-day ${b({"other-month":t.otherMonth,selected:Y,today:k})}"
                @click=${()=>this.selectDate(t.day,t.otherMonth)}
              >
                ${t.day}
              </div>
            `})}
        </div>
      </div>
    `}render(){return p`
      <div class=${b({"date-picker-container":!0,"is-open":this.isOpen})}>
        ${this.label?p`<label class="date-picker-label">${this.label}</label>`:""}
        <div class="date-input-wrapper" @click=${this.toggleDropdown}>
          <input
            type="text"
            class="formatted-input"
            placeholder=${this.placeholder}
            .value=${this.formatDateDisplay(this.selectedDate)}
            ?disabled=${this.disabled}
            readonly
          />
          <button type="button" class="calendar-btn" ?disabled=${this.disabled}>
            <svg class="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </button>
        </div>
        ${this.isOpen?this.renderCalendar():""}
      </div>
    `}};i.styles=[O(P)];l([h({type:String})],i.prototype,"value",2);l([h({type:String})],i.prototype,"format",2);l([h({type:String})],i.prototype,"min",2);l([h({type:String})],i.prototype,"max",2);l([h({type:Boolean})],i.prototype,"disabled",2);l([h({type:String})],i.prototype,"placeholder",2);l([h({type:String})],i.prototype,"label",2);l([D()],i.prototype,"currentMonth",2);l([D()],i.prototype,"selectedDate",2);l([D()],i.prototype,"isOpen",2);i=l([C("ui-date-picker")],i);const I={title:"Components/Date Picker",tags:["autodocs"],argTypes:{disabled:{control:"boolean"},value:{control:"text"}},args:{label:"Pick a date",placeholder:"Select date",disabled:!1,value:""}},y={render:({label:s,placeholder:n,disabled:e,value:a})=>p`
    <ui-date-picker
      label=${s}
      placeholder=${n}
      ?disabled=${e}
      value=${a}
    ></ui-date-picker>
  `};var $,m,M;y.parameters={...y.parameters,docs:{...($=y.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: ({
    label,
    placeholder,
    disabled,
    value
  }) => html\`
    <ui-date-picker
      label=\${label}
      placeholder=\${placeholder}
      ?disabled=\${disabled}
      value=\${value}
    ></ui-date-picker>
  \`
}`,...(M=(m=y.parameters)==null?void 0:m.docs)==null?void 0:M.source}}};const L=["Playground"];export{y as Playground,L as __namedExportsOrder,I as default};
