import { html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { UIComponentBase } from '../../core/ui-component-base';
import styles from '../../styles/theme.css?inline';
import picklistStyles from './picklist.css?inline';
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
	static styles = [unsafeCSS(styles), unsafeCSS(picklistStyles)];

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
