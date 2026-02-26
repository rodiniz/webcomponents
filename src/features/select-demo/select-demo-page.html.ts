export const selectDemoHTML = `
	<div class="demo-container">
		<h1>Select Component Demo</h1>
		<p>Customizable dropdown select with search and multi-configuration options.</p>

		<div class="demo-section">
			<h2>Basic Select</h2>
			<div class="demo-grid">
				<ui-select 
					id="basicSelect"
					label="Choose a Fruit"
					placeholder="Select a fruit..."
				></ui-select>
				
				<ui-select 
					id="disabledSelect"
					label="Disabled Select"
					placeholder="Not available"
					disabled
				></ui-select>
			</div>
			<div id="basicResult" class="result-display" style="display: none;">
				<strong>Selected:</strong> <span id="basicValue"></span>
			</div>
		</div>

		<div class="demo-section">
			<h2>Searchable Select</h2>
			<div class="demo-grid">
				<ui-select 
					id="searchableSelect"
					label="Choose a Country"
					placeholder="Search countries..."
					searchable
				></ui-select>
			</div>
			<div id="searchResult" class="result-display" style="display: none;">
				<strong>Selected Country:</strong> <span id="searchValue"></span>
			</div>
		</div>

		<div class="demo-section">
			<h2>Select Sizes & Preselected</h2>
			<div class="demo-grid">
				<ui-select 
					id="preselectedSelect"
					label="Choose a Programming Language"
					placeholder="Select language..."
					value="javascript"
				></ui-select>
			</div>
			<div id="preselectedResult" class="result-display" style="display: none;">
				<strong>Selected:</strong> <span id="preselectedValue"></span>
			</div>
		</div>

		<div class="demo-section">
			<h2>Form Example</h2>
			<form id="userForm" style="max-width: 600px;">
				<ui-select 
					id="roleSelect"
					label="User Role"
					placeholder="Select role..."
				></ui-select>

				<ui-select 
					id="departmentSelect"
					label="Department"
					placeholder="Select department..."
				></ui-select>

				<div style="margin-top: 0.5rem; display: flex; gap: 1rem;">
					<ui-button type="submit" variant="primary" icon="check">Submit</ui-button>
					<ui-button type="button" id="resetForm" variant="ghost">Reset</ui-button>
				</div>
			</form>
			<div id="formResult" class="result-display" style="display: none; margin-top: 1rem;">
				<strong>Form Data:</strong><br>
				<span id="formValue"></span>
			</div>
		</div>
	</div>
`;
