import{r as b,i as u,A as d,b as a}from"./iframe-Ck3e-F9w.js";import{n as c,U as m,t as v}from"./ui-component-base-BJ0AM59x.js";import{r as h}from"./state-CVS5rq8K.js";import{c as f}from"./template-1VJuhrPW.js";import{u as g}from"./click-outside-CXo2mreH.js";import{t as x}from"./theme-DBvyg58T.js";var y=Object.defineProperty,w=Object.getOwnPropertyDescriptor,s=(e,t,r,i)=>{for(var l=i>1?void 0:i?w(t,r):t,n=e.length-1,p;n>=0;n--)(p=e[n])&&(l=(i?p(t,r,l):p(l))||l);return i&&l&&y(t,r,l),l};let o=class extends m{constructor(){super(...arguments),this.value="",this.label="",this.disabled=!1,this.searchable=!1,this.placeholder="Select an option",this.options=[],this.isOpen=!1,this.searchTerm="",this.clickOutsideHandler=g(this,()=>{this.isOpen&&(this.isOpen=!1)})}connectedCallback(){super.connectedCallback(),this.clickOutsideHandler.attach()}disconnectedCallback(){super.disconnectedCallback(),this.clickOutsideHandler.detach()}getSelectedLabel(){const e=this.options.find(t=>t.value===this.value);return(e==null?void 0:e.label)||this.placeholder}toggleOpen(){this.disabled||(this.isOpen=!this.isOpen,this.isOpen&&(this.searchTerm="",setTimeout(()=>{var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".select-input");e==null||e.focus()},0)))}selectOption(e){this.value=e.value,this.isOpen=!1,this.emit("select-change",{value:e.value,option:e})}render(){const e=f({"select-container":!0,open:this.isOpen,disabled:this.disabled,"has-value":!!this.value&&this.value!==""}),t=this.options.filter(r=>r.label.toLowerCase().includes(this.searchTerm.toLowerCase()));return a`
      ${this.label?a`<label class="select-label">${this.label}</label>`:d}
      
      <div class=${e}>
        <div class="select-display" @click=${this.toggleOpen}>
          <span class="select-value">${this.getSelectedLabel()}</span>
          <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        ${this.isOpen?a`
          <div class="select-dropdown">
            ${this.searchable?a`
              <div class="select-search">
                <input
                  type="text"
                  class="select-input"
                  placeholder="Search options..."
                  .value=${this.searchTerm}
                  @input=${r=>this.searchTerm=r.target.value}
                  @click=${r=>r.stopPropagation()}
                />
              </div>
            `:d}
            
            <div class="select-options">
              ${t.length>0?t.map(r=>a`
                <div 
                  class="select-option ${r.value===this.value?"selected":""}"
                  @click=${i=>{i.stopPropagation(),this.selectOption(r)}}
                >
                  ${r.label}
                </div>
              `):a`<div class="select-no-results">No results found</div>`}
            </div>
          </div>
        `:d}
      </div>
    `}};o.styles=[b(x),u`
      :host {
        display: block;
        width: 100%;
        font-family: inherit;
      }

      .select-container {
        position: relative;
        width: 100%;
      }

      .select-label {
        display: block;
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--color-ink);
        margin-bottom: 0.5rem;
      }

      .select-display {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.65rem 1rem;
        background: var(--color-page-bg, hsl(var(--background)));
        border: 2px solid var(--color-border, hsl(var(--border)));
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        min-height: 42px;
        box-sizing: border-box;
      }

      .select-container.open .select-display {
        border-color: var(--color-primary, hsl(var(--primary)));
        box-shadow: 0 0 0 4px rgba(36, 236, 113, 0.1);
      }

      .select-container.disabled .select-display {
        background: var(--color-muted, hsl(var(--muted)));
        cursor: not-allowed;
        opacity: 0.7;
      }

      .select-value {
        font-size: 0.95rem;
        color: var(--color-ink, hsl(var(--foreground)));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
      }

      .select-container:not(.has-value) .select-value {
        color: var(--color-text-muted, hsl(var(--muted-foreground)));
      }

      .select-arrow {
        width: 18px;
        height: 18px;
        color: var(--color-text-muted, hsl(var(--muted-foreground)));
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        margin-left: 0.75rem;
        flex-shrink: 0;
      }

      .select-container.open .select-arrow {
        transform: rotate(180deg);
        color: var(--color-primary, hsl(var(--primary)));
      }

      .select-dropdown {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        background: white;
        border: 1px solid var(--color-border-strong);
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        animation: dropdownScale 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: top;
      }

      @keyframes dropdownScale {
        from { transform: scaleY(0.9); opacity: 0; }
        to { transform: scaleY(1); opacity: 1; }
      }

      .select-search {
        padding: 0.75rem;
        border-bottom: 1px solid var(--color-border);
        background: #fcfdfe;
      }

      .select-input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1.5px solid var(--color-border);
        border-radius: 6px;
        font-size: 0.9rem;
        outline: none;
        transition: all 0.2s;
        box-sizing: border-box;
      }

      .select-input:focus {
        border-color: var(--color-primary);
      }

      .select-options {
        max-height: 240px;
        overflow-y: auto;
        padding: 0.4rem;
      }

      .select-option {
        padding: 0.65rem 0.75rem;
        font-size: 0.9rem;
        color: var(--color-ink);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .select-option:hover {
        background: rgba(36, 236, 113, 0.08);
      }

      .select-option.selected {
        background: var(--color-primary);
        color: white;
        font-weight: 600;
      }

      .select-no-results {
        padding: 1.5rem;
        text-align: center;
        color: #94a3b8;
        font-size: 0.9rem;
      }

      /* Custom scrollbar */
      .select-options::-webkit-scrollbar {
        width: 6px;
      }
      .select-options::-webkit-scrollbar-track {
        background: transparent;
      }
      .select-options::-webkit-scrollbar-thumb {
        background: #e2e8f0;
        border-radius: 10px;
      }
      .select-options::-webkit-scrollbar-thumb:hover {
        background: #cbd5e1;
      }
    `];s([c({type:String})],o.prototype,"value",2);s([c({type:String})],o.prototype,"label",2);s([c({type:Boolean})],o.prototype,"disabled",2);s([c({type:Boolean})],o.prototype,"searchable",2);s([c({type:String})],o.prototype,"placeholder",2);s([c({type:Array})],o.prototype,"options",2);s([h()],o.prototype,"isOpen",2);s([h()],o.prototype,"searchTerm",2);o=s([v("ui-select")],o);
