import{i as h,r as v,b as c}from"./iframe-Ck3e-F9w.js";import{n as p,U as b,t as m}from"./ui-component-base-BJ0AM59x.js";import{r as n}from"./state-CVS5rq8K.js";import{t as u}from"./theme-DBvyg58T.js";import"./button-C3WNtjOb.js";var g=Object.defineProperty,x=Object.getOwnPropertyDescriptor,d=(e,t,i,s)=>{for(var a=s>1?void 0:s?x(t,i):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(a=(s?r(t,i,a):r(a))||a);return s&&a&&g(t,i,a),a};let l=class extends b{constructor(){super(...arguments),this.availableItems="[]",this.selectedItems="[]",this.available=[],this.selected=[],this.selectedSelected=new Set}connectedCallback(){super.connectedCallback(),this.parseAttributes()}attributeChangedCallback(e,t,i){t!==i&&this.parseAttributes(),super.attributeChangedCallback(e,t,i)}parseAttributes(){try{this.available=JSON.parse(this.availableItems||"[]"),this.selected=JSON.parse(this.selectedItems||"[]")}catch{console.warn("Invalid JSON in picklist attributes")}}setAvailableItems(e){this.available=e,this.availableItems=JSON.stringify(e)}setSelectedItems(e){this.selected=e,this.selectedItems=JSON.stringify(e)}getValue(){return{available:this.available.map(e=>e.value),selected:this.selected.map(e=>e.value)}}toggleSelected(e){this.selectedSelected.has(e)?this.selectedSelected.delete(e):this.selectedSelected.add(e),this.selectedSelected=new Set(this.selectedSelected)}moveToSelected(){const e=this.available.filter(t=>this.selectedSelected.has(t.value));this.selected=[...this.selected,...e],this.available=this.available.filter(t=>!this.selectedSelected.has(t.value)),this.selectedSelected.clear(),this.updateAttributes(),this.dispatchChange()}moveToAvailable(){const e=this.selected.filter(t=>this.selectedSelected.has(t.value));this.available=[...this.available,...e],this.selected=this.selected.filter(t=>!this.selectedSelected.has(t.value)),this.selectedSelected.clear(),this.updateAttributes(),this.dispatchChange()}moveAllToSelected(){this.selected=[...this.selected,...this.available],this.available=[],this.selectedSelected.clear(),this.updateAttributes(),this.dispatchChange()}moveAllToAvailable(){this.available=[...this.available,...this.selected],this.selected=[],this.selectedSelected.clear(),this.updateAttributes(),this.dispatchChange()}updateAttributes(){this.availableItems=JSON.stringify(this.available),this.selectedItems=JSON.stringify(this.selected)}dispatchChange(){this.emit("picklist-change",{available:this.available.map(e=>e.value),selected:this.selected.map(e=>e.value)})}renderCheckbox(e){return c`
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
		`}};l.styles=[h`:host { display: block; }`,v(u),h`
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
		`];d([p({attribute:"available-items",type:String})],l.prototype,"availableItems",2);d([p({attribute:"selected-items",type:String})],l.prototype,"selectedItems",2);d([n()],l.prototype,"available",2);d([n()],l.prototype,"selected",2);d([n()],l.prototype,"selectedSelected",2);l=d([m("ui-picklist")],l);
