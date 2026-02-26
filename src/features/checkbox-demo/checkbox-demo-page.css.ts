export const checkboxDemoCSS = `
	.demo-container {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.demo-container h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		color: var(--color-ink);
	}

	.demo-container > p {
		color: var(--color-text-muted);
		margin-bottom: 2rem;
	}

	.demo-section {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-border);
	}

	.demo-section:last-child {
		border-bottom: none;
	}

	.demo-section h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: var(--color-ink);
	}

	.checkbox-group {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.result-display {
		padding: 1rem;
		background: var(--color-muted);
		border-radius: var(--radius-md);
		border-left: 4px solid var(--color-primary);
	}

	fieldset {
		margin: 0;
	}

	legend {
		color: var(--color-ink);
	}
`;
