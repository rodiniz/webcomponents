import{a as p,r as g,i as x,b as c}from"./iframe-6s-sIqo3.js";import{n as u,t as f}from"./property-C_0pZ1Mq.js";import{r as h}from"./state-vQ8fJvXj.js";import{t as y}from"./theme-CCP9F1YV.js";import"./button-B9VckUVt.js";import"./preload-helper-C1FmrZbK.js";import"./template-BbtPzLcA.js";import"./unsafe-html-BsqWkz84.js";import"./feather-YLknBcFY.js";import"./_commonjsHelpers-Cpj98o6Y.js";var S=Object.defineProperty,k=Object.getOwnPropertyDescriptor,r=(e,t,i,s)=>{for(var a=s>1?void 0:s?k(t,i):t,d=e.length-1,n;d>=0;d--)(n=e[d])&&(a=(s?n(t,i,a):n(a))||a);return s&&a&&S(t,i,a),a};let l=class extends x{constructor(){super(...arguments),this.availableItems="[]",this.selectedItems="[]",this.available=[],this.selected=[],this.selectedSelected=new Set}connectedCallback(){this.setAttribute("data-ui","picklist"),super.connectedCallback(),this.parseAttributes()}attributeChangedCallback(e,t,i){t!==i&&this.parseAttributes(),super.attributeChangedCallback(e,t,i)}parseAttributes(){try{this.available=JSON.parse(this.availableItems||"[]"),this.selected=JSON.parse(this.selectedItems||"[]")}catch{console.warn("Invalid JSON in picklist attributes")}}setAvailableItems(e){this.available=e,this.availableItems=JSON.stringify(e)}setSelectedItems(e){this.selected=e,this.selectedItems=JSON.stringify(e)}getValue(){return{available:this.available.map(e=>e.value),selected:this.selected.map(e=>e.value)}}toggleSelected(e){this.selectedSelected.has(e)?this.selectedSelected.delete(e):this.selectedSelected.add(e),this.selectedSelected=new Set(this.selectedSelected)}moveToSelected(){const e=this.available.filter(t=>this.selectedSelected.has(t.value));this.selected=[...this.selected,...e],this.available=this.available.filter(t=>!this.selectedSelected.has(t.value)),this.selectedSelected.clear(),this.updateAttributes(),this.dispatchChange()}moveToAvailable(){const e=this.selected.filter(t=>this.selectedSelected.has(t.value));this.available=[...this.available,...e],this.selected=this.selected.filter(t=>!this.selectedSelected.has(t.value)),this.selectedSelected.clear(),this.updateAttributes(),this.dispatchChange()}moveAllToSelected(){this.selected=[...this.selected,...this.available],this.available=[],this.selectedSelected.clear(),this.updateAttributes(),this.dispatchChange()}moveAllToAvailable(){this.available=[...this.available,...this.selected],this.selected=[],this.selectedSelected.clear(),this.updateAttributes(),this.dispatchChange()}updateAttributes(){this.availableItems=JSON.stringify(this.available),this.selectedItems=JSON.stringify(this.selected)}dispatchChange(){this.dispatchEvent(new CustomEvent("picklist-change",{bubbles:!0,composed:!0,detail:{available:this.available.map(e=>e.value),selected:this.selected.map(e=>e.value)}}))}renderCheckbox(e){return c`
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="20 6 9 17 4 12"></polyline>
			</svg>
		`}render(){const e=this.selectedSelected.size>0,t=this.available.length>0?this.available.map(s=>c`
				<div 
					class="list-item ${this.selectedSelected.has(s.value)?"selected":""}" 
					data-value="${s.value}"
					@click=${()=>this.toggleSelected(s.value)}
				>
					<div class="list-item-checkbox">
						${this.renderCheckbox(this.selectedSelected.has(s.value))}
					</div>
					<span class="list-item-label">${s.label}</span>
				</div>
			`):c`
				<div class="list-empty">
					<svg class="list-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
						<circle cx="12" cy="7" r="4"></circle>
					</svg>
					No items available
				</div>
			`,i=this.selected.length>0?this.selected.map(s=>c`
				<div 
					class="list-item ${this.selectedSelected.has(s.value)?"selected":""}" 
					data-value="${s.value}"
					@click=${()=>this.toggleSelected(s.value)}
				>
					<div class="list-item-checkbox">
						${this.renderCheckbox(this.selectedSelected.has(s.value))}
					</div>
					<span class="list-item-label">${s.label}</span>
				</div>
			`):c`
				<div class="list-empty">
					<svg class="list-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
						<line x1="9" y1="9" x2="15" y2="15"></line>
						<line x1="15" y1="9" x2="9" y2="15"></line>
					</svg>
					No items selected
				</div>
			`;return c`
			<div class="picklist">
				<div class="list-section">
					<div class="list-header">Available (${this.available.length})</div>
					<div class="list-container">
						<div class="list-items">
							${t}
						</div>
					</div>
				</div>

				<div class="actions">
					<ui-button 
						variant="secondary" 
						size="sm"
						icon="chevrons-right"
						?disabled="${this.available.length===0}"
						@click=${()=>this.moveAllToSelected()}
					></ui-button>
					
					<ui-button 
						variant="secondary" 
						size="sm"
						icon="chevron-right"
						?disabled="${!e}"
						@click=${()=>this.moveToSelected()}
					></ui-button>
					
					<ui-button 
						variant="secondary" 
						size="sm"
						icon="chevron-left"
						?disabled="${!e}"
						@click=${()=>this.moveToAvailable()}
					></ui-button>
					
					<ui-button 
						variant="secondary" 
						size="sm"
						icon="chevrons-left"
						?disabled="${this.selected.length===0}"
						@click=${()=>this.moveAllToAvailable()}
					></ui-button>
				</div>

				<div class="list-section">
					<div class="list-header">Selected (${this.selected.length})</div>
					<div class="list-container">
						<div class="list-items">
							${i}
						</div>
					</div>
				</div>
			</div>
		`}};l.styles=[p`:host { display: block; }`,g(y),p`
			:host {
				display: block;
			}

			.picklist {
				display: grid;
				grid-template-columns: 1fr auto 1fr;
				gap: 20px;
				align-items: stretch;
			}

			.list-section {
				display: flex;
				flex-direction: column;
				gap: 12px;
			}

			.list-header {
				font: 600 13px/1 "DM Sans", system-ui, sans-serif;
				color: #64748b;
				text-transform: uppercase;
				letter-spacing: 0.08em;
				padding-bottom: 8px;
				border-bottom: 1px solid #e2e8f0;
			}

			.list-container {
				background: #fff;
				border-radius: 14px;
				border: 1.5px solid #e2e8f0;
				overflow: hidden;
				min-height: 280px;
				max-height: 320px;
				transition: border-color 200ms ease, box-shadow 200ms ease;
			}

			.list-container:focus-within {
				border-color: #6366f1;
				box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
			}

			.list-items {
				padding: 8px;
				overflow-y: auto;
				max-height: 260px;
			}

			.list-item {
				display: flex;
				align-items: center;
				gap: 10px;
				padding: 12px 14px;
				border-radius: 10px;
				cursor: pointer;
				font: 500 14px/1.4 "DM Sans", system-ui, sans-serif;
				color: #334155;
				transition: all 150ms ease;
				user-select: none;
			}

			.list-item:hover {
				background: #f1f5f9;
			}

			.list-item.selected {
				background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%);
				color: #4338ca;
			}

			.list-item-checkbox {
				width: 18px;
				height: 18px;
				border: 2px solid #cbd5e1;
				border-radius: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 150ms ease;
				flex-shrink: 0;
			}

			.list-item.selected .list-item-checkbox {
				background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
				border-color: #6366f1;
			}

			.list-item-checkbox svg {
				width: 12px;
				height: 12px;
				stroke: white;
				stroke-width: 3;
				opacity: 0;
				transform: scale(0.5);
				transition: all 150ms ease;
			}

			.list-item.selected .list-item-checkbox svg {
				opacity: 1;
				transform: scale(1);
			}

			.list-item-label {
				flex: 1;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.list-empty {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 40px 20px;
				color: #94a3b8;
				font: 400 14px/1.5 "DM Sans", system-ui, sans-serif;
				text-align: center;
			}

			.list-empty-icon {
				width: 48px;
				height: 48px;
				margin-bottom: 12px;
				opacity: 0.4;
			}

			.actions {
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: 10px;
				padding-top: 40px;
			}

			@media (max-width: 768px) {
				.picklist {
					grid-template-columns: 1fr;
					gap: 16px;
				}
				
				.actions {
					flex-direction: row;
					justify-content: center;
					flex-wrap: wrap;
					padding: 8px 0;
				}
			}
		`];r([u({attribute:"available-items",type:String})],l.prototype,"availableItems",2);r([u({attribute:"selected-items",type:String})],l.prototype,"selectedItems",2);r([h()],l.prototype,"available",2);r([h()],l.prototype,"selected",2);r([h()],l.prototype,"selectedSelected",2);l=r([f("ui-picklist")],l);const w=[{value:"js",label:"JavaScript"},{value:"ts",label:"TypeScript"},{value:"py",label:"Python"},{value:"go",label:"Go"}],$=[{value:"rust",label:"Rust"}],M={title:"Components/Picklist",tags:["autodocs"]},o={render:()=>c`
    <ui-picklist
      available-items=${JSON.stringify(w)}
      selected-items=${JSON.stringify($)}
    ></ui-picklist>
  `};var v,b,m;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => html\`
    <ui-picklist
      available-items=\${JSON.stringify(availableItems)}
      selected-items=\${JSON.stringify(selectedItems)}
    ></ui-picklist>
  \`
}`,...(m=(b=o.parameters)==null?void 0:b.docs)==null?void 0:m.source}}};const z=["Playground"];export{o as Playground,z as __namedExportsOrder,M as default};
