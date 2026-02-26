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
		<ui-modal id="basicModal" title="Welcome!" size="md">
			<p>This is a basic modal with a title and content.</p>
			<p>You can close it by:</p>
			<ul>
				<li>Clicking the X button</li>
				<li>Pressing the Escape key</li>
				<li>Clicking outside the modal</li>
			</ul>
			<div slot="footer">
				<ui-button id="basicModalClose" variant="secondary">Close</ui-button>
				<ui-button id="basicModalOk" variant="primary">Got it!</ui-button>
			</div>
		</ui-modal>

		<ui-modal id="smallModal" title="Small Modal" size="sm">
			<p>This is a small modal perfect for quick messages or confirmations.</p>
			<div slot="footer">
				<ui-button id="smallModalClose" variant="primary">Close</ui-button>
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
