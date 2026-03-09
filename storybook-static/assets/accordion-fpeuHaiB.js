import{r as I,b as c}from"./iframe-Ck3e-F9w.js";import{n as l,U as f,t as u}from"./ui-component-base-BJ0AM59x.js";import{r as v}from"./state-CVS5rq8K.js";import{c as d}from"./template-1VJuhrPW.js";import{t as y}from"./theme-DBvyg58T.js";import{c as m,a as h}from"./class-builders-BssWg5Cc.js";var $=Object.defineProperty,b=Object.getOwnPropertyDescriptor,a=(e,t,i,n)=>{for(var s=n>1?void 0:n?b(t,i):t,r=e.length-1,p;r>=0;r--)(p=e[r])&&(s=(n?p(t,i,s):p(s))||s);return n&&s&&$(t,i,s),s};let o=class extends f{constructor(){super(...arguments),this.items=[],this.allowMultiple=!1,this.openItemId="",this.openItems=new Set}connectedCallback(){super.connectedCallback(),this.openItemId&&this.openItems.add(this.openItemId)}updated(e){e.has("openItemId")&&this.openItemId&&(this.allowMultiple||this.openItems.clear(),this.openItems.add(this.openItemId))}toggleItem(e){this.openItems.has(e)?this.openItems.delete(e):(this.allowMultiple||this.openItems.clear(),this.openItems.add(e)),this.openItems=new Set(this.openItems),this.emit("accordion-change",{openItems:Array.from(this.openItems)})}render(){return c`
      <div class="accordion">
        ${this.items.map(e=>{const t=this.openItems.has(e.id),i=d(m({"accordion-header":!0},h({"is-open":t}))),n=d(m({"accordion-content":!0},h({"is-hidden":!t})));return c`
            <div class="accordion-item" data-item-id=${e.id}>
              <button
                class=${i}
                @click=${()=>this.toggleItem(e.id)}
                aria-expanded=${t}
                aria-controls="content-${e.id}"
              >
                <span class="accordion-title">${e.title}</span>
                <span class="accordion-icon">
                  <svg class="feather" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <div class=${n} id="content-${e.id}">
                <div class="accordion-body">${e.content}</div>
              </div>
            </div>
          `})}
      </div>
    `}};o.styles=[I(y)];a([l({type:Array})],o.prototype,"items",2);a([l({type:Boolean,reflect:!0})],o.prototype,"allowMultiple",2);a([l({type:String})],o.prototype,"openItemId",2);a([v()],o.prototype,"openItems",2);o=a([u("ui-accordion")],o);
