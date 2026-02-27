export const stepperDemoHTML = `
	<section class="stepper-hero">
		<div>
			<p class="eyebrow">Flow control</p>
			<h1>Stepper</h1>
			<p class="hero-subtitle">
				Guide users across multi-step journeys with clear progress, states, and actions.
			</p>
		</div>		
	</section>

	<section class="stepper-section">
		<div class="section-head">
			<h2>Interactive progress</h2>
			<p>Move between steps to preview states and content density.</p>
		</div>
		<div class="stepper-card">
			<ui-stepper id="interactiveStepper" size="md"></ui-stepper>
			<div class="stepper-preview" id="interactiveContent"></div>
			<div class="stepper-controls">
				<div class="status-pill" id="interactiveStatus">Step 2 of 5</div>
				<div class="actions">
					<ui-button id="prevStep" variant="secondary" size="sm">Previous</ui-button>
					<ui-button id="nextStep" variant="primary" size="sm">Next</ui-button>
				</div>
			</div>
		</div>
	</section>

	<section class="stepper-section grid">
		<div class="stepper-card">
			<div class="section-head">
				<h2>Compact workflow</h2>
				<p>Small size for tight layouts or onboarding drawers.</p>
			</div>
			<ui-stepper id="compactStepper" size="sm"></ui-stepper>
		</div>
		<div class="stepper-card">
			<div class="section-head">
				<h2>Vertical journey</h2>
				<p>Perfect for forms, checklists, and long content.</p>
			</div>
			<ui-stepper id="verticalStepper" orientation="vertical" size="lg"></ui-stepper>
		</div>
	</section>

	<section class="stepper-section">
		<div class="section-head">
			<h2>Status flavors</h2>
			<p>Explicit states like warning and error bring clarity to complex flows.</p>
		</div>
		<div class="stepper-card">
			<ui-stepper id="statusStepper" size="md"></ui-stepper>
		</div>
	</section>
`;
