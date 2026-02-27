export const buttonDemoCSS = `
  :host {
    display: block;
    color: var(--color-ink);
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  h2 {
    font-size: 1.4rem;
    margin: 2rem 0 1.5rem;
    font-weight: 600;
    border-bottom: 2px solid var(--color-primary);
    padding-bottom: 0.5rem;
  }

  p {
    line-height: 1.6;
    color: rgba(15, 23, 42, 0.75);
    margin: 0 0 1rem;
  }

  .demo-intro {
    background: linear-gradient(135deg, rgba(36, 236, 113, 0.08) 0%, rgba(52, 168, 235, 0.05) 100%);
    padding: 1.5rem;
    border-radius: 12px;
    border-left: 4px solid var(--color-primary);
    margin-bottom: 2rem;
  }

  .demo-section {
    margin-bottom: 3rem;
  }

  .button-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .button-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    text-align: center;
    transition: all 0.2s ease;
  }

  .button-item:hover {
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
    border-color: var(--color-border-strong);
  }

  .label {
    font-size: 0.8rem;
    color: rgba(15, 23, 42, 0.6);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  @media (max-width: 768px) {
    .button-group {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
    }

    .button-item {
      padding: 1rem;
    }

    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.2rem;
    }
  }
`;
