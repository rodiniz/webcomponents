export const homePageCSS = `
  :host {
    display: block;
    color: var(--color-ink);
  }

  h1, h2, h3 {
    margin: 0;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    position: relative;
    display: inline-block;
  }

  h2::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: var(--color-primary);
    border-radius: 2px;
  }

  p {
    line-height: 1.6;
    color: rgba(15, 23, 42, 0.75);
  }

  /* Hero Section */
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    margin-bottom: 6rem;
    padding: 3rem 0;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-ink) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    line-height: 1.7;
    color: rgba(15, 23, 42, 0.7);
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .hero-visual {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feature-icons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .icon-item {
    font-size: 4rem;
    animation: float 3s ease-in-out infinite;
  }

  .icon-item:nth-child(2) { animation-delay: 0.3s; }
  .icon-item:nth-child(3) { animation-delay: 0.6s; }
  .icon-item:nth-child(4) { animation-delay: 0.9s; }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  /* Features Section */
  .features {
    margin-bottom: 6rem;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .feature-card {
    padding: 2rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
    border-color: var(--color-primary);
  }

  .feature-icon {
    font-size: 2.5rem;
    line-height: 1;
  }

  .feature-card h3 {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .feature-card p {
    font-size: 0.95rem;
    margin: 0;
  }

  /* Components Section */
  .components {
    margin-bottom: 6rem;
  }

  .components-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }

  .component-item {
    padding: 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    transition: all 0.2s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .component-item:hover {
    border-color: var(--color-primary);
    background: linear-gradient(135deg, rgba(36, 236, 113, 0.05), transparent);
    transform: translateX(4px);
  }

  .component-name {
    font-weight: 600;
    color: var(--color-primary);
    font-family: "Cascadia Mono", "Fira Code", monospace;
    font-size: 0.9rem;
  }

  .component-desc {
    font-size: 0.85rem;
    color: rgba(15, 23, 42, 0.6);
  }

  /* Quick Start Section */
  .quick-start {
    margin-bottom: 6rem;
  }

  .code-blocks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .code-block {
    background: #0f172a;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .code-block h3 {
    color: #f8fafc;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .code-block pre {
    margin: 0;
    overflow-x: auto;
  }

  .code-block code {
    font-family: "Cascadia Mono", "Fira Code", monospace;
    font-size: 0.9rem;
    color: #e0e7ff;
    line-height: 1.5;
  }

  /* CTA Section */
  .cta {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, rgba(36, 236, 113, 0.1) 0%, rgba(52, 168, 235, 0.05) 100%);
    border-radius: 16px;
    border: 1px solid var(--color-border);
    margin-bottom: 2rem;
  }

  .cta h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  .cta h2::after {
    display: none;
  }

  .cta p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero {
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .hero-title {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }

    .hero-actions {
      flex-wrap: wrap;
    }

    .feature-icons {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .icon-item {
      font-size: 3rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .features-grid,
    .components-grid {
      grid-template-columns: 1fr;
    }

    .code-blocks {
      grid-template-columns: 1fr;
    }

    .cta {
      padding: 2rem 1.5rem;
    }

    .cta h2 {
      font-size: 1.5rem;
    }
  }
`;
