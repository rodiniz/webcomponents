export const selectDemoCSS = `
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

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-top: 1rem;
	}

	.demo-grid > * {
		min-width: 0;
	}

	.result-display {
		margin-top: 1rem;
		padding: 1rem;
		background: var(--color-muted);
		border-radius: var(--radius-md);
		border-left: 4px solid var(--color-primary);
	}

	form {
		background: white;
		padding: 1.5rem;
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
`;
