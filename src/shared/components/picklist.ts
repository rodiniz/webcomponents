import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { UIComponentBase } from '../../core/ui-component-base';
import styles from '../../styles/theme.css?inline';
import './button';

type PicklistChangeDetail = {
	available: string[];
	selected: string[];
};

type PicklistItem = {
	value: string;
	label: string;
};

@customElement('ui-picklist')
export class UIPicklist extends UIComponentBase {
	static styles = [
		css`:host { display: block; }`,
		unsafeCSS(styles),
		css`
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
		`
	];

	@property({ attribute: 'available-items', type: String }) availableItems: string = '[]';
	@property({ attribute: 'selected-items', type: String }) selectedItems: string = '[]';

	@state() private available: PicklistItem[] = [];
	@state() private selected: PicklistItem[] = [];
	@state() private selectedSelected: Set<string> = new Set();

	connectedCallback(): void {
		super.connectedCallback();
		this.parseAttributes();
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if (oldValue !== newValue) {
			this.parseAttributes();
		}
		super.attributeChangedCallback(name, oldValue, newValue);
	}

	private parseAttributes(): void {
		try {
			this.available = JSON.parse(this.availableItems || '[]');
			this.selected = JSON.parse(this.selectedItems || '[]');
		} catch (e) {
			console.warn('Invalid JSON in picklist attributes');
		}
	}

	setAvailableItems(items: PicklistItem[]): void {
		this.available = items;
		this.availableItems = JSON.stringify(items);
	}

	setSelectedItems(items: PicklistItem[]): void {
		this.selected = items;
		this.selectedItems = JSON.stringify(items);
	}

	getValue(): { available: string[]; selected: string[] } {
		return {
			available: this.available.map(i => i.value),
			selected: this.selected.map(i => i.value)
		};
	}

	private toggleSelected(value: string): void {
		if (this.selectedSelected.has(value)) {
			this.selectedSelected.delete(value);
		} else {
			this.selectedSelected.add(value);
		}
		this.selectedSelected = new Set(this.selectedSelected);
	}

	private moveToSelected(): void {
		const toMove = this.available.filter(item => this.selectedSelected.has(item.value));
		this.selected = [...this.selected, ...toMove];
		this.available = this.available.filter(item => !this.selectedSelected.has(item.value));
		this.selectedSelected.clear();
		this.updateAttributes();
		this.dispatchChange();
	}

	private moveToAvailable(): void {
		const toMove = this.selected.filter(item => this.selectedSelected.has(item.value));
		this.available = [...this.available, ...toMove];
		this.selected = this.selected.filter(item => !this.selectedSelected.has(item.value));
		this.selectedSelected.clear();
		this.updateAttributes();
		this.dispatchChange();
	}

	private moveAllToSelected(): void {
		this.selected = [...this.selected, ...this.available];
		this.available = [];
		this.selectedSelected.clear();
		this.updateAttributes();
		this.dispatchChange();
	}

	private moveAllToAvailable(): void {
		this.available = [...this.available, ...this.selected];
		this.selected = [];
		this.selectedSelected.clear();
		this.updateAttributes();
		this.dispatchChange();
	}

	private updateAttributes(): void {
		this.availableItems = JSON.stringify(this.available);
		this.selectedItems = JSON.stringify(this.selected);
	}

	private dispatchChange(): void {
		this.emit<PicklistChangeDetail>('picklist-change', {
			available: this.available.map(i => i.value),
			selected: this.selected.map(i => i.value)
		});
	}

	private renderCheckbox(isSelected: boolean): unknown {
		return html`
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="20 6 9 17 4 12"></polyline>
			</svg>
		`;
	}

	render() {
		const hasAvailableSelection = this.selectedSelected.size > 0;

		const availableItems = this.available.length > 0 
			? this.available.map(item => html`
				<div 
					class="list-item ${this.selectedSelected.has(item.value) ? 'selected' : ''}" 
					data-value="${item.value}"
					@click=${() => this.toggleSelected(item.value)}
				>
					<div class="list-item-checkbox">
						${this.renderCheckbox(this.selectedSelected.has(item.value))}
					</div>
					<span class="list-item-label">${item.label}</span>
				</div>
			`)
			: html`
				<div class="list-empty">
					<svg class="list-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
						<circle cx="12" cy="7" r="4"></circle>
					</svg>
					No items available
				</div>
			`;

		const selectedItems = this.selected.length > 0
			? this.selected.map(item => html`
				<div 
					class="list-item ${this.selectedSelected.has(item.value) ? 'selected' : ''}" 
					data-value="${item.value}"
					@click=${() => this.toggleSelected(item.value)}
				>
					<div class="list-item-checkbox">
						${this.renderCheckbox(this.selectedSelected.has(item.value))}
					</div>
					<span class="list-item-label">${item.label}</span>
				</div>
			`)
			: html`
				<div class="list-empty">
					<svg class="list-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
						<line x1="9" y1="9" x2="15" y2="15"></line>
						<line x1="15" y1="9" x2="9" y2="15"></line>
					</svg>
					No items selected
				</div>
			`;

		return html`
			<div class="picklist">
				<div class="list-section">
					<div class="list-header">Available (${this.available.length})</div>
					<div class="list-container">
						<div class="list-items">
							${availableItems}
						</div>
					</div>
				</div>

				<div class="actions">
					<ui-button 
						variant="secondary" 
						size="sm"
						icon="chevrons-right"
						?disabled="${this.available.length === 0}"
						@click=${() => this.moveAllToSelected()}
					></ui-button>
					
					<ui-button 
						variant="secondary" 
						size="sm"
						icon="chevron-right"
						?disabled="${!hasAvailableSelection}"
						@click=${() => this.moveToSelected()}
					></ui-button>
					
					<ui-button 
						variant="secondary" 
						size="sm"
						icon="chevron-left"
						?disabled="${!hasAvailableSelection}"
						@click=${() => this.moveToAvailable()}
					></ui-button>
					
					<ui-button 
						variant="secondary" 
						size="sm"
						icon="chevrons-left"
						?disabled="${this.selected.length === 0}"
						@click=${() => this.moveAllToAvailable()}
					></ui-button>
				</div>

				<div class="list-section">
					<div class="list-header">Selected (${this.selected.length})</div>
					<div class="list-container">
						<div class="list-items">
							${selectedItems}
						</div>
					</div>
				</div>
			</div>
		`;
	}
}

export type { PicklistChangeDetail };
