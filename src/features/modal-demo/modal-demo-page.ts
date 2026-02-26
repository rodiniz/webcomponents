import { BaseComponent } from '../../core/base-component';
import { modalDemoHTML } from './modal-demo-page.html';
import { modalDemoCSS } from './modal-demo-page.css';
import '../../shared/components/button';
import '../../shared/components/modal';
import '../../layouts/app-layout';
class ModalDemoPage extends BaseComponent {
	async connectedCallback(): Promise<void> {
		super.connectedCallback();
		// Wait for ui-modal and ui-button to be defined
		await Promise.all([
			customElements.whenDefined('ui-modal'),
			customElements.whenDefined('ui-button')
		]);
		await new Promise(resolve => setTimeout(resolve, 10));
		this.setupEventListeners();
	}

	private setupEventListeners(): void {
		// Basic modal
		const openBasicModal = this.shadowRoot!.getElementById('openBasicModal');
		const basicModal = this.shadowRoot!.getElementById('basicModal') as any;
		const basicModalClose = this.shadowRoot!.getElementById('basicModalClose');
		const basicModalOk = this.shadowRoot!.getElementById('basicModalOk');

		openBasicModal?.addEventListener('click', () => basicModal?.open());
		basicModalClose?.addEventListener('click', () => basicModal?.close());
		basicModalOk?.addEventListener('click', () => basicModal?.close());

		// Small modal
		const openSmallModal = this.shadowRoot!.getElementById('openSmallModal');
		const smallModal = this.shadowRoot!.getElementById('smallModal') as any;
		const smallModalClose = this.shadowRoot!.getElementById('smallModalClose');

		openSmallModal?.addEventListener('click', () => smallModal?.open());
		smallModalClose?.addEventListener('click', () => smallModal?.close());

		// Large modal
		const openLargeModal = this.shadowRoot!.getElementById('openLargeModal');
		const largeModal = this.shadowRoot!.getElementById('largeModal') as any;
		const largeModalClose = this.shadowRoot!.getElementById('largeModalClose');

		openLargeModal?.addEventListener('click', () => largeModal?.open());
		largeModalClose?.addEventListener('click', () => largeModal?.close());

		// No escape modal
		const openNoEscapeModal = this.shadowRoot!.getElementById('openNoEscapeModal');
		const noEscapeModal = this.shadowRoot!.getElementById('noEscapeModal') as any;
		const noEscapeClose = this.shadowRoot!.getElementById('noEscapeClose');

		openNoEscapeModal?.addEventListener('click', () => noEscapeModal?.open());
		noEscapeClose?.addEventListener('click', () => noEscapeModal?.close());

		// No backdrop modal
		const openNoBackdropModal = this.shadowRoot!.getElementById('openNoBackdropModal');
		const noBackdropModal = this.shadowRoot!.getElementById('noBackdropModal') as any;
		const noBackdropClose = this.shadowRoot!.getElementById('noBackdropClose');

		openNoBackdropModal?.addEventListener('click', () => noBackdropModal?.open());
		noBackdropClose?.addEventListener('click', () => noBackdropModal?.close());

		// Confirm modal
		const openConfirmModal = this.shadowRoot!.getElementById('openConfirmModal');
		const confirmModal = this.shadowRoot!.getElementById('confirmModal') as any;
		const confirmCancel = this.shadowRoot!.getElementById('confirmCancel');
		const confirmDelete = this.shadowRoot!.getElementById('confirmDelete');
		const confirmResult = this.shadowRoot!.getElementById('confirmResult');
		const confirmText = this.shadowRoot!.getElementById('confirmText');

		openConfirmModal?.addEventListener('click', () => confirmModal?.open());
		confirmCancel?.addEventListener('click', () => {
			confirmModal?.close();
			if (confirmResult && confirmText) {
				confirmResult.style.display = 'block';
				confirmText.textContent = 'Cancelled';
				confirmText.style.color = '#64748b';
			}
		});
		confirmDelete?.addEventListener('click', () => {
			confirmModal?.close();
			if (confirmResult && confirmText) {
				confirmResult.style.display = 'block';
				confirmText.textContent = 'Item deleted!';
				confirmText.style.color = '#ef4444';
			}
		});
	}

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${modalDemoCSS}</style>
			${modalDemoHTML}
		`;
	}
}

customElements.define('modal-demo-page', ModalDemoPage);
