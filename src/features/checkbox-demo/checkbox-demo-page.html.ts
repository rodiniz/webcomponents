export const checkboxDemoHTML = `
	<div class="demo-container">
		<h1>Checkbox Component Demo</h1>
		<p>Flexible checkbox with sizes, states, and indeterminate support.</p>

		<div class="demo-section">
			<h2>Basic Checkboxes</h2>
			<div class="checkbox-group">
				<ui-checkbox id="basic1" label="Accept terms and conditions"></ui-checkbox>
				<ui-checkbox id="basic2" label="Subscribe to newsletter" checked></ui-checkbox>
				<ui-checkbox id="basic3" label="Disabled checkbox" disabled></ui-checkbox>
				<ui-checkbox id="basic4" label="Disabled & checked" disabled checked></ui-checkbox>
			</div>
		</div>

		<div class="demo-section">
			<h2>Checkbox Sizes</h2>
			<div class="checkbox-group">
				<ui-checkbox id="size1" label="Small checkbox" size="sm"></ui-checkbox>
				<ui-checkbox id="size2" label="Medium checkbox (default)" size="md"></ui-checkbox>
				<ui-checkbox id="size3" label="Large checkbox" size="lg"></ui-checkbox>
			</div>
		</div>

		<div class="demo-section">
			<h2>Indeterminate State</h2>
			<p style="color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 1rem;">
				Useful for "select all" scenarios where some items are selected.
			</p>
			<div style="background: white; padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
				<ui-checkbox id="selectAll" label="Select All" size="md"></ui-checkbox>
				<div style="margin-left: 2rem; margin-top: 1rem;" class="checkbox-group">
					<ui-checkbox class="item-checkbox" label="Item 1" size="sm"></ui-checkbox>
					<ui-checkbox class="item-checkbox" label="Item 2" size="sm"></ui-checkbox>
					<ui-checkbox class="item-checkbox" label="Item 3" size="sm"></ui-checkbox>
					<ui-checkbox class="item-checkbox" label="Item 4" size="sm"></ui-checkbox>
				</div>
			</div>
		</div>

		<div class="demo-section">
			<h2>Checkbox Group (Form)</h2>
			<form id="preferencesForm" style="max-width: 600px;">
				<fieldset style="border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem;">
					<legend style="font-weight: 600; padding: 0 0.5rem;">Notification Preferences</legend>
					<div class="checkbox-group">
						<ui-checkbox id="emailNotif" label="Email notifications" checked></ui-checkbox>
						<ui-checkbox id="smsNotif" label="SMS notifications"></ui-checkbox>
						<ui-checkbox id="pushNotif" label="Push notifications" checked></ui-checkbox>
						<ui-checkbox id="weeklyDigest" label="Weekly digest"></ui-checkbox>
					</div>
				</fieldset>

				<div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
					<ui-button type="submit" variant="primary" icon="save">Save Preferences</ui-button>
					<ui-button type="button" id="resetPreferences" variant="ghost">Reset</ui-button>
				</div>
			</form>
			<div id="formResult" class="result-display" style="display: none; margin-top: 1rem;">
				<strong>Saved Preferences:</strong><br>
				<span id="formValue"></span>
			</div>
		</div>

		<div class="demo-section">
			<h2>Event Handling</h2>
			<div style="background: white; padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
				<ui-checkbox id="eventCheckbox" label="Click me to trigger event"></ui-checkbox>
			</div>
			<div id="eventResult" class="result-display" style="display: none; margin-top: 1rem;">
				<strong>Event Log:</strong><br>
				<div id="eventLog" style="font-family: monospace; font-size: 0.875rem; margin-top: 0.5rem;"></div>
			</div>
		</div>
	</div>
`;
