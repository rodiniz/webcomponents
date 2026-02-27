export const stepperDemoCSS = `
	:host {
		display: block;
		color: var(--color-ink);
	}

	.stepper-hero {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem;
		border-radius: 20px;
		background: radial-gradient(circle at top left, rgba(36, 236, 113, 0.2), transparent 45%),
			linear-gradient(135deg, rgba(52, 168, 235, 0.12), rgba(255, 255, 255, 0.9));
		border: 1px solid rgba(52, 168, 235, 0.2);
		margin-bottom: 2rem;
		gap: 1.5rem;
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

	.hero-badge {
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

	.stepper-section {
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.stepper-section.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.section-head h2 {
		margin: 0 0 0.35rem;
		font-size: 1.4rem;
	}

	.section-head p {
		margin: 0;
		color: rgba(15, 23, 42, 0.6);
		font-size: 0.95rem;
	}

	.stepper-card {
		padding: 1.5rem;
		border-radius: 16px;
		border: 1px solid rgba(148, 163, 184, 0.3);
		background: #ffffff;
		box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.stepper-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.stepper-preview {
		border-radius: 14px;
		padding: 1.25rem;
		background: linear-gradient(135deg, rgba(36, 236, 113, 0.12), rgba(255, 255, 255, 0.9));
		border: 1px solid rgba(36, 236, 113, 0.25);
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		min-height: 140px;
		animation: fadeSlide 0.25s ease;
	}

	.stepper-preview h3 {
		margin: 0;
		font-size: 1.1rem;
	}

	.stepper-preview p {
		margin: 0;
		color: rgba(15, 23, 42, 0.65);
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.stepper-preview ul {
		margin: 0;
		padding-left: 1.2rem;
		color: rgba(15, 23, 42, 0.65);
		font-size: 0.9rem;
		display: grid;
		gap: 0.35rem;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.status-pill {
		padding: 0.35rem 0.9rem;
		background: rgba(36, 236, 113, 0.15);
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: 600;
		color: #166534;
	}

	@keyframes fadeSlide {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 720px) {
		.stepper-hero {
			padding: 1.5rem;
		}

		h1 {
			font-size: 2rem;
		}
	}
`;
