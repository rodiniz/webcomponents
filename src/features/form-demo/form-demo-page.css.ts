export const formDemoCSS = `
	:host {
		display: block;
		color: var(--color-ink);
	}

	.form-hero {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
		padding: 2rem;
		border-radius: 20px;
		background: radial-gradient(circle at top left, rgba(36, 236, 113, 0.2), transparent 45%),
			linear-gradient(135deg, rgba(52, 168, 235, 0.12), rgba(255, 255, 255, 0.95));
		border: 1px solid rgba(52, 168, 235, 0.2);
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.eyebrow {
		text-transform: uppercase;
		letter-spacing: 0.2em;
		font-size: 0.7rem;
		color: rgba(15, 23, 42, 0.55);
		margin: 0 0 0.75rem;
		font-weight: 700;
	}

	h1 {
		font-size: 2.4rem;
		margin: 0 0 0.5rem;
	}

	.hero-subtitle {
		max-width: 520px;
		margin: 0;
		color: rgba(15, 23, 42, 0.65);
		font-size: 1rem;
		line-height: 1.6;
	}

	.hero-chip {
		padding: 0.4rem 0.9rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		background: #0f172a;
		color: #ffffff;
		box-shadow: 0 12px 24px rgba(15, 23, 42, 0.15);
	}

	.form-shell {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 2rem;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.5rem;
		align-items: start;
	}

	.form-panel {
		padding: 1.5rem;
		border-radius: 16px;
		border: 1px solid rgba(148, 163, 184, 0.3);
		background: #ffffff;
		box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-panel h2 {
		margin: 0;
		font-size: 1.35rem;
	}

	.form-panel p {
		margin: 0;
		color: rgba(15, 23, 42, 0.6);
		font-size: 0.95rem;
	}

	.split {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	textarea {
		min-height: 120px;
		padding: 0.75rem 0.85rem;
		font-size: 0.95rem;
		font-family: inherit;
		border: 1.5px solid var(--color-border);
		border-radius: 8px;
		background: #ffffff;
		color: var(--color-ink);
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	textarea:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(36, 236, 113, 0.15);
	}

	.native-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		font-size: 0.9rem;
		color: var(--color-ink);
	}

	.native-group select {
		padding: 0.65rem 0.85rem;
		border: 1.5px solid var(--color-border);
		border-radius: 8px;
		font-size: 0.95rem;
		font-family: inherit;
		background: #ffffff;
		color: var(--color-ink);
	}

	.checkbox-stack {
		display: grid;
		gap: 0.75rem;
	}

	.checkbox-inline {
		display: grid;
		gap: 0.5rem;
		font-size: 0.9rem;
		color: var(--color-ink);
	}

	.inline-options {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.inline-options label {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.form-actions {
		grid-column: 1 / -1;
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.form-output {
		background: #0f172a;
		color: #f8fafc;
		border-radius: 16px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		box-shadow: 0 16px 30px rgba(15, 23, 42, 0.2);
		height: fit-content;
		position: sticky;
		top: 1.5rem;
	}

	.output-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(248, 250, 252, 0.7);
	}

	.output-head h3 {
		margin: 0;
		font-size: 0.95rem;
		color: #ffffff;
	}

	pre {
		margin: 0;
		white-space: pre-wrap;
		font-family: "Cascadia Mono", "Fira Code", monospace;
		font-size: 0.82rem;
		line-height: 1.5;
		background: rgba(15, 23, 42, 0.45);
		padding: 1rem;
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	@media (max-width: 1024px) {
		.form-shell {
			grid-template-columns: 1fr;
		}

		.form-output {
			position: static;
		}
	}

	@media (max-width: 720px) {
		.form-grid {
			grid-template-columns: 1fr;
		}

		.split {
			grid-template-columns: 1fr;
		}

		h1 {
			font-size: 2rem;
		}
	}
`;
