export const modalDemoHTML = `
	<div class="demo-container">
		<h1>Modal Component Demo</h1>
		<p>Interactive modals with various sizes and configurations.</p>

		<div class="demo-section">
			<h2>Basic Modals</h2>
			<div class="demo-controls">
				<ui-button id="openBasicModal" variant="primary" icon="maximize-2">
					Open Basic Modal
				</ui-button>
				<ui-button id="openSmallModal" variant="secondary">
					Small Modal
				</ui-button>
				<ui-button id="openLargeModal" variant="secondary">
					Large Modal
				</ui-button>
			</div>
		</div>

		<div class="demo-section">
			<h2>Modal Behaviors</h2>
			<div class="demo-controls">
				<ui-button id="openNoEscapeModal" variant="ghost">
					No Close on Escape
				</ui-button>
				<ui-button id="openNoBackdropModal" variant="ghost">
					No Close on Backdrop
				</ui-button>
			</div>
		</div>

		<div class="demo-section">
			<h2>Confirmation Modal</h2>
			<div class="demo-controls">
				<ui-button id="openConfirmModal" variant="primary" icon="alert-circle">
					Delete Item
				</ui-button>
			</div>
			<div id="confirmResult" class="result-display" style="display: none;">
				<strong>Result:</strong> <span id="confirmText"></span>
			</div>
		</div>

		<!-- Modals -->
		<ui-modal id="basicModal" title="Premium Feature Unlocked" size="md">
			<div class="demo-modal-hero">
				<img src="/premium-demo.png" alt="Premium Dashboard">
			</div>
			
			<div class="demo-modal-body-text">
				Experience the next generation of UI design with our premium web components. Precision-engineered for performance and aesthetics.
			</div>

			<div class="demo-modal-grid">
				<div class="demo-modal-card">
					<div class="demo-modal-card-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
					</div>
					<div class="demo-modal-card-title">Layered Design</div>
				</div>
				<div class="demo-modal-card">
					<div class="demo-modal-card-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
					</div>
					<div class="demo-modal-card-title">Real-time Data</div>
				</div>
			</div>

			<div slot="footer">
				<ui-button id="basicModalClose" variant="secondary">Maybe Later</ui-button>
				<ui-button id="basicModalOk" variant="primary">Get Started</ui-button>
			</div>
		</ui-modal>

		<ui-modal id="smallModal" title="Quick Notification" size="sm">
			<div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; padding: 1rem 0;">
				<div style="width: 48px; height: 48px; border-radius: 50%; background: #dcfce7; color: #166534; display: flex; align-items: center; justify-content: center;">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
				</div>
				<div>
					<h3 style="margin: 0; font-size: 1.1rem;">Changes Saved</h3>
					<p style="margin: 0.5rem 0 0; color: #64748b;">Your preferences have been updated successfully.</p>
				</div>
			</div>
			<div slot="footer">
				<ui-button id="smallModalClose" variant="primary" style="width: 100%;">Awesome!</ui-button>
			</div>
		</ui-modal>

		<ui-modal id="largeModal" title="Large Modal" size="lg">
			<p>This is a large modal that can contain more content.</p>
			<div style="height: 400px; background: #f1f5f9; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
				<p><strong>Scrollable Content Area</strong></p>
				<p>When content exceeds the modal height, it automatically becomes scrollable.</p>
				${Array(20).fill('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>').join('')}
			</div>
			<div slot="footer">
				<ui-button id="largeModalClose" variant="primary">Close</ui-button>
			</div>
		</ui-modal>

		<ui-modal id="noEscapeModal" title="No Escape Close" size="md" no-close-on-escape>
			<p>This modal cannot be closed by pressing the Escape key.</p>
			<p>You must click the close button or click outside.</p>
			<div slot="footer">
				<ui-button id="noEscapeClose" variant="primary">Close</ui-button>
			</div>
		</ui-modal>

		<ui-modal id="noBackdropModal" title="No Backdrop Close" size="md" no-close-on-backdrop>
			<p>This modal cannot be closed by clicking the backdrop.</p>
			<p>You must use the close button or press Escape.</p>
			<div slot="footer">
				<ui-button id="noBackdropClose" variant="primary">Close</ui-button>
			</div>
		</ui-modal>

		<ui-modal id="confirmModal" title="Confirm Delete" size="sm">
			<p>Are you sure you want to delete this item?</p>
			<p style="color: #ef4444; font-size: 0.875rem;">This action cannot be undone.</p>
			<div slot="footer">
				<ui-button id="confirmCancel" variant="ghost">Cancel</ui-button>
				<ui-button id="confirmDelete" variant="primary" icon="trash-2">Delete</ui-button>
			</div>
		</ui-modal>
	</div>
`;
