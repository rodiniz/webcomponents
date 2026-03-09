import{r as S,b as u}from"./iframe-Ck3e-F9w.js";import{n as d,U as w,t as Y}from"./ui-component-base-BJ0AM59x.js";import{r as D}from"./state-CVS5rq8K.js";import{c as M}from"./template-1VJuhrPW.js";import{u as O}from"./click-outside-CXo2mreH.js";import{t as k}from"./theme-DBvyg58T.js";var x=Object.defineProperty,C=Object.getOwnPropertyDescriptor,o=(r,s,e,a)=>{for(var n=a>1?void 0:a?C(s,e):s,c=r.length-1,l;c>=0;c--)(l=r[c])&&(n=(a?l(s,e,n):l(n))||n);return a&&n&&x(s,e,n),n};let i=class extends w{constructor(){super(...arguments),this.value="",this.format="YYYY-MM-DD",this.min="",this.max="",this.disabled=!1,this.placeholder="Select date",this.label="",this.currentMonth=new Date,this.selectedDate="",this.isOpen=!1,this.clickOutsideHandler=O(this,()=>{this.isOpen&&(this.isOpen=!1)}),this.toggleDropdown=()=>{this.disabled||(this.isOpen=!this.isOpen,this.isOpen&&this.selectedDate&&(this.currentMonth=new Date(this.selectedDate)))}}connectedCallback(){super.connectedCallback(),this.value&&(this.selectedDate=this.value,this.currentMonth=new Date(this.value)),this.clickOutsideHandler.attach()}willUpdate(r){r.has("value")&&(this.selectedDate=this.value||"",this.value&&(this.currentMonth=new Date(this.value)))}disconnectedCallback(){super.disconnectedCallback(),this.clickOutsideHandler.detach()}changeMonth(r){const s=new Date(this.currentMonth);s.setMonth(s.getMonth()+r),this.currentMonth=s}selectDate(r,s=!1){const e=new Date(this.currentMonth);s&&e.setMonth(e.getMonth()+(r>15?-1:1)),e.setDate(r);const a=e.getFullYear(),n=(e.getMonth()+1).toString().padStart(2,"0"),c=e.getDate().toString().padStart(2,"0"),l=`${a}-${n}-${c}`;this.selectedDate=l,this.value=l,this.isOpen=!1,this.emit("change",{value:l})}formatDateDisplay(r){if(!r)return"";const s=new Date(r);if(isNaN(s.getTime()))return"";const e=s.getDate().toString().padStart(2,"0"),a=(s.getMonth()+1).toString().padStart(2,"0"),n=s.getFullYear();switch(this.format){case"DD/MM/YYYY":return`${e}/${a}/${n}`;case"MM/DD/YYYY":return`${a}/${e}/${n}`;case"DD-MM-YYYY":return`${e}-${a}-${n}`;case"MM-DD-YYYY":return`${a}-${e}-${n}`;default:return`${n}-${a}-${e}`}}renderCalendar(){const r=(t,h)=>new Date(h,t+1,0).getDate(),s=(t,h)=>new Date(h,t,1).getDay(),e=this.currentMonth.getMonth(),a=this.currentMonth.getFullYear(),n=r(e,a),c=s(e,a),l=r(e-1,a),p=[];for(let t=c-1;t>=0;t--)p.push({day:l-t,otherMonth:!0});for(let t=1;t<=n;t++)p.push({day:t,otherMonth:!1});const v=42-p.length;for(let t=1;t<=v;t++)p.push({day:t,otherMonth:!0});const $=["January","February","March","April","May","June","July","August","September","October","November","December"],y=new Date,f=`${y.getFullYear()}-${(y.getMonth()+1).toString().padStart(2,"0")}-${y.getDate().toString().padStart(2,"0")}`;return u`
      <div class="calendar-dropdown">
        <div class="calendar-header">
          <div class="calendar-title">${$[e]} ${a}</div>
          <div class="calendar-nav">
            <button class="calendar-nav-btn" @click=${()=>this.changeMonth(-1)}>&lt;</button>
            <button class="calendar-nav-btn" @click=${()=>this.changeMonth(1)}>&gt;</button>
          </div>
        </div>
        <div class="calendar-grid">
          ${["Su","Mo","Tu","We","Th","Fr","Sa"].map(t=>u`<div class="calendar-day-label">${t}</div>`)}
          ${p.map(t=>{const h=new Date(a,e+(t.otherMonth?t.day>15?-1:1:0),t.day),g=`${h.getFullYear()}-${(h.getMonth()+1).toString().padStart(2,"0")}-${h.getDate().toString().padStart(2,"0")}`,m=g===this.selectedDate,b=g===f;return u`
              <div 
                class="calendar-day ${M({"other-month":t.otherMonth,selected:m,today:b})}"
                @click=${()=>this.selectDate(t.day,t.otherMonth)}
              >
                ${t.day}
              </div>
            `})}
        </div>
      </div>
    `}render(){return u`
      <div class=${M({"date-picker-container":!0,"is-open":this.isOpen})}>
        ${this.label?u`<label class="date-picker-label">${this.label}</label>`:""}
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
    `}};i.styles=[S(k)];o([d({type:String})],i.prototype,"value",2);o([d({type:String})],i.prototype,"format",2);o([d({type:String})],i.prototype,"min",2);o([d({type:String})],i.prototype,"max",2);o([d({type:Boolean})],i.prototype,"disabled",2);o([d({type:String})],i.prototype,"placeholder",2);o([d({type:String})],i.prototype,"label",2);o([D()],i.prototype,"currentMonth",2);o([D()],i.prototype,"selectedDate",2);o([D()],i.prototype,"isOpen",2);i=o([Y("ui-date-picker")],i);
