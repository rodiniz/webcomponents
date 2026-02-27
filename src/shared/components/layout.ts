import { BaseComponent } from '../../core/base-component';
import styles from '../../styles/theme.css?inline';

/**
 * ui-layout: Main layout container that manages flex direction
 * Supports: horizontal (header-footer with content), vertical, auto (detects based on children)
 */
class UILayout extends BaseComponent {
	connectedCallback(): void {
		this.setAttribute('data-ui', 'layout');
		super.connectedCallback();
	}

	static get observedAttributes(): string[] {
		return ['direction'];
	}

	attributeChangedCallback(): void {
		this.render();
	}

	private getDirection(): 'horizontal' | 'vertical' | 'auto' {
		const value = this.getAttribute('direction');
		if (value === 'horizontal' || value === 'vertical') return value;
		return 'auto';
	}

	private detectDirection(): 'horizontal' | 'vertical' {
		const direction = this.getDirection();
		if (direction !== 'auto') return direction;

		// Auto-detect based on children
		const hasHeader = this.querySelector('ui-layout-header');
		const hasFooter = this.querySelector('ui-layout-footer');
		const hasSidebar = this.querySelector('ui-layout-sidebar');

		// If has sidebar, use horizontal (sidebar on left/right, content flows down)
		if (hasSidebar) return 'horizontal';
		// If has header/footer only, use vertical
		if (hasHeader || hasFooter) return 'vertical';

		return 'vertical';
	}

	render(): void {
		const flexDirection = this.detectDirection() === 'horizontal' ? 'row' : 'column';

		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			<div class="layout-container" style="flex-direction: ${flexDirection}">
				<slot></slot>
			</div>
		`;
	}
}

/**
 * ui-layout-header: Header section with optional height
 */
class UILayoutHeader extends BaseComponent {
	connectedCallback(): void {
		this.setAttribute('data-ui', 'layout-header');
		super.connectedCallback();
	}

	static get observedAttributes(): string[] {
		return ['height'];
	}

	attributeChangedCallback(): void {
		this.render();
	}

	private getHeight(): string {
		const height = this.getAttribute('height');
		if (height && /^\d+$/.test(height)) return height + 'px';
		return height || '64px';
	}

	render(): void {
		const height = this.getHeight();
		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			<header class="layout-header" style="height: ${height}">
				<slot></slot>
			</header>
		`;
	}
}

/**
 * ui-layout-footer: Footer section with optional height
 */
class UILayoutFooter extends BaseComponent {
	connectedCallback(): void {
		this.setAttribute('data-ui', 'layout-footer');
		super.connectedCallback();
	}

	static get observedAttributes(): string[] {
		return ['height'];
	}

	attributeChangedCallback(): void {
		this.render();
	}

	private getHeight(): string {
		const height = this.getAttribute('height');
		if (height && /^\d+$/.test(height)) return height + 'px';
		return height || '56px';
	}

	render(): void {
		const height = this.getHeight();
		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			<footer class="layout-footer" style="height: ${height}">
				<slot></slot>
			</footer>
		`;
	}
}

/**
 * ui-layout-content: Main content area (grows to fill available space)
 */
class UILayoutContent extends BaseComponent {
	connectedCallback(): void {
		this.setAttribute('data-ui', 'layout-content');
		super.connectedCallback();
	}

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			<div class="layout-content">
				<slot></slot>
			</div>
		`;
	}
}

/**
 * ui-layout-sidebar: Sidebar with collapse functionality
 */
class UILayoutSidebar extends BaseComponent {
	private isCollapsed = false;
	private animating = false;

	connectedCallback(): void {
		this.setAttribute('data-ui', 'layout-sidebar');
		super.connectedCallback();
		this.isCollapsed = this.hasAttribute('collapsed');
		this.render();
		this.attachEventListeners();
	}

	static get observedAttributes(): string[] {
		return ['collapsed', 'width', 'collapsed-width', 'collapsible'];
	}

	attributeChangedCallback(name: string): void {
		if (name === 'collapsed') {
			this.isCollapsed = this.hasAttribute('collapsed');
		}
		this.render();
	}

	private getWidth(): string {
		const width = this.getAttribute('width');
		if (width && /^\d+$/.test(width)) return width + 'px';
		return width || '240px';
	}

	private getCollapsedWidth(): string {
		const width = this.getAttribute('collapsed-width');
		if (width && /^\d+$/.test(width)) return width + 'px';
		return width || '64px';
	}

	private isCollapsible(): boolean {
		return this.hasAttribute('collapsible');
	}

	private attachEventListeners(): void {
		if (!this.shadowRoot) return;

		const toggleBtn = this.shadowRoot.querySelector('.sidebar-toggle');
		if (toggleBtn) {
			toggleBtn.addEventListener('click', () => this.toggleCollapse());
		}
	}

	private toggleCollapse(): void {
		if (this.animating) return;
		this.animating = true;

		this.isCollapsed = !this.isCollapsed;

		if (this.isCollapsed) {
			this.setAttribute('collapsed', '');
		} else {
			this.removeAttribute('collapsed');
		}

		// Dispatch custom event
		this.dispatchEvent(
			new CustomEvent('collapsed-change', {
				detail: { collapsed: this.isCollapsed },
				bubbles: true,
				composed: true
			})
		);

		setTimeout(() => {
			this.animating = false;
		}, 300);
	}

	render(): void {
		const width = this.getWidth();
		const collapsedWidth = this.getCollapsedWidth();
		const isCollapsible = this.isCollapsible();
		const showToggle = isCollapsible && !this.isCollapsed;

		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			<aside class="layout-sidebar ${this.isCollapsed ? 'collapsed' : ''}" 
				style="--sidebar-width: ${width}; --sidebar-collapsed-width: ${collapsedWidth}">
				<div class="sidebar-content">
					<slot></slot>
				</div>
				${isCollapsible ? `
					<button class="sidebar-toggle" title="${this.isCollapsed ? 'Expand' : 'Collapse'}">
						<svg class="toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
								d="M15 19l-7-7 7-7"></path>
						</svg>
					</button>
				` : ''}
			</aside>
		`;

		this.attachEventListeners();
	}
}

customElements.define('ui-layout', UILayout);
customElements.define('ui-layout-header', UILayoutHeader);
customElements.define('ui-layout-footer', UILayoutFooter);
customElements.define('ui-layout-content', UILayoutContent);
customElements.define('ui-layout-sidebar', UILayoutSidebar);

export { UILayout, UILayoutHeader, UILayoutFooter, UILayoutContent, UILayoutSidebar };
