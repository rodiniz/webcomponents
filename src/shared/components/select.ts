import { BaseComponent } from '../../core/base-component';
import styles from '../../styles/theme.css?inline';

interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

class UISelect extends BaseComponent {
	private isOpen = this.useSignal(false);
	private selectedValue = this.useSignal('');
	private searchTerm = this.useSignal('');
	private options: SelectOption[] = [];

	connectedCallback(): void {
		this.setAttribute('data-ui', 'select');
		super.connectedCallback();
		this.parseOptions();
		this.setupClickOutside();
	}

	static get observedAttributes(): string[] {
		return ['value', 'disabled', 'placeholder', 'options'];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if (name === 'value' && oldValue !== newValue) {
			this.selectedValue.set(newValue || '');
		}
		if (name === 'options' && oldValue !== newValue) {
			this.parseOptions();
		}
		this.render();
	}

	private parseOptions(): void {
		const optionsAttr = this.getAttribute('options');
		if (optionsAttr) {
			try {
				this.options = JSON.parse(optionsAttr);
			} catch (e) {
				console.error('Invalid options JSON', e);
				this.options = [];
			}
		}
	}

	private setupClickOutside(): void {
		document.addEventListener('click', (e) => {
			// Check if click is inside this component or its shadow DOM
			const path = e.composedPath();
			const clickedInside = path.includes(this);
			
			if (!clickedInside && this.isOpen.get()) {
				this.isOpen.set(false);
			}
		});
	}

	private toggleDropdown(): void {
		if (!this.hasAttribute('disabled')) {
			this.isOpen.set(!this.isOpen.get());
			if (!this.isOpen.get()) {
				this.searchTerm.set('');
			}
		}
	}

	private selectOption(value: string): void {
		this.selectedValue.set(value);
		this.setAttribute('value', value);
		this.isOpen.set(false);
		this.searchTerm.set('');
		
		this.dispatchEvent(new CustomEvent('select-change', {
			bubbles: true,
			composed: true,
			detail: {
				value,
				option: this.options.find(opt => opt.value === value)
			}
		}));
	}

	private handleSearch(term: string): void {
		this.searchTerm.set(term.toLowerCase());
	}

	private getFilteredOptions(): SelectOption[] {
		const search = this.searchTerm.get();
		if (!search) return this.options;
		return this.options.filter(opt => 
			opt.label.toLowerCase().includes(search) || 
			opt.value.toLowerCase().includes(search)
		);
	}

	private getSelectedLabel(): string {
		const value = this.selectedValue.get();
		const option = this.options.find(opt => opt.value === value);
		return option?.label || this.getAttribute('placeholder') || 'Select an option';
	}

	render(): void {
		const open = this.isOpen.get();
		const disabled = this.hasAttribute('disabled');
		const searchable = this.hasAttribute('searchable');
		const label = this.getAttribute('label') || '';
		const selectedLabel = this.getSelectedLabel();
		const filteredOptions = this.getFilteredOptions();
		const hasSelection = this.selectedValue.get() !== '';

		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>

			<div class="select-container">
				${label ? `<label class="select-label">${label}</label>` : ''}
				
				<div class="select-trigger ${open ? 'open' : ''}" part="trigger" tabindex="0" ${disabled ? 'disabled' : ''}>
					<span class="select-placeholder ${hasSelection ? 'has-selection' : ''}">${selectedLabel}</span>
					<span class="select-arrow ${open ? 'open' : ''}">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</span>
				</div>

				<div class="select-dropdown ${open ? 'open' : ''}" part="dropdown">
					${searchable ? `
						<input 
							type="text" 
							class="select-search" 
							placeholder="Search..."
							part="search"
						>
					` : ''}
					
					${filteredOptions.length > 0 ? filteredOptions.map(option => `
						<div 
							class="select-option ${option.value === this.selectedValue.get() ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}"
							data-value="${option.value}"
							part="option"
						>
							${option.label}
						</div>
					`).join('') : `
						<div class="select-empty">No options found</div>
					`}
				</div>
			</div>
		`;

		// Add event listeners
		const trigger = this.shadowRoot!.querySelector('.select-trigger');
		const searchInput = this.shadowRoot!.querySelector('.select-search') as HTMLInputElement;
		const options = this.shadowRoot!.querySelectorAll('.select-option:not(.disabled)');

		trigger?.addEventListener('click', () => this.toggleDropdown());
		trigger?.addEventListener('keydown', (e) => {
			if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
				e.preventDefault();
				this.toggleDropdown();
			}
		});

		searchInput?.addEventListener('input', (e) => {
			this.handleSearch((e.target as HTMLInputElement).value);
		});

		searchInput?.addEventListener('click', (e) => e.stopPropagation());

		options.forEach(option => {
			option.addEventListener('click', () => {
				const value = option.getAttribute('data-value');
				if (value) this.selectOption(value);
			});
		});
	}
}

export { UISelect };
export type { SelectOption };

customElements.define('ui-select', UISelect);
