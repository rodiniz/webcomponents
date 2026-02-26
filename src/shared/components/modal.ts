import { BaseComponent } from '../../core/base-component';
import styles from '../../styles/theme.css?inline';

class UIModal extends BaseComponent {
	private isOpen = this.useSignal(false);

	connectedCallback(): void {
		this.setAttribute('data-ui', 'modal');
		super.connectedCallback();
		this.setupEventListeners();
	}

	static get observedAttributes(): string[] {
		return ['open'];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if (name === 'open' && oldValue !== newValue) {
			this.isOpen.set(newValue !== null);
		}
	}

	private setupEventListeners(): void {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && this.isOpen.get() && !this.hasAttribute('no-close-on-escape')) {
				this.close();
			}
		});
	}

	public open(): void {
		this.isOpen.set(true);
		this.setAttribute('open', '');
		this.dispatchEvent(new CustomEvent('modal-open', { bubbles: true, composed: true }));
		document.body.style.overflow = 'hidden';
	}

	public close(): void {
		this.isOpen.set(false);
		this.removeAttribute('open');
		this.dispatchEvent(new CustomEvent('modal-close', { bubbles: true, composed: true }));
		document.body.style.overflow = '';
	}

	private handleBackdropClick(e: Event): void {
		if ((e.target as HTMLElement).classList.contains('modal-backdrop') && !this.hasAttribute('no-close-on-backdrop')) {
			this.close();
		}
	}

	render(): void {
		const open = this.isOpen.get();
		const title = this.getAttribute('title') || '';
		const size = this.getAttribute('size') || 'md'; // sm, md, lg, xl, full

		this.shadowRoot!.innerHTML = `
			<style>
				${styles}
				
				::slotted([slot="footer"]) {
					display: flex;
					gap: 0.75rem;
					width: 100%;
					justify-content: flex-end;
				}
			</style>

			<div class="modal-backdrop ${open ? 'open' : ''}" part="backdrop">
				<div class="modal-content ${size}" part="content" @click="${(e: Event) => e.stopPropagation()}">
					${title ? `
						<div class="modal-header" part="header">
							<h2 class="modal-title">${title}</h2>
							<button class="modal-close" part="close" aria-label="Close modal">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</button>
						</div>
					` : ''}
					
					<div class="modal-body" part="body">
						<slot></slot>
					</div>

					<div class="modal-footer" part="footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
		`;

		// Add event listeners after render
		const backdrop = this.shadowRoot!.querySelector('.modal-backdrop');
		const closeBtn = this.shadowRoot!.querySelector('.modal-close');

		backdrop?.addEventListener('click', (e) => this.handleBackdropClick(e));
		closeBtn?.addEventListener('click', () => this.close());
	}
}

export { UIModal };

customElements.define('ui-modal', UIModal);
