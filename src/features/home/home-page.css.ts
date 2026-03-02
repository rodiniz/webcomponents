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
    width: 64px;
    height: 4px;
    background: var(--color-primary);
    border-radius: 2px;
  }

  p {
    line-height: 1.6;
    color: rgba(15, 23, 42, 0.75);
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(15, 23, 42, 0.5);
  }

  /* Hero Section */
  .hero {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 4rem;
    align-items: center;
    margin-bottom: 6rem;
    padding: 3.5rem 0 1rem;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .hero-title {
    font-size: 3.6rem;
    font-weight: 800;
    line-height: 1.05;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-ink) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    line-height: 1.7;
    color: rgba(15, 23, 42, 0.7);
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .hero-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .meta-item {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .meta-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(15, 23, 42, 0.55);
  }

  .meta-value {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-ink);
  }

  .hero-visual {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stack {
    display: grid;
    gap: 1.2rem;
    width: min(320px, 100%);
  }

  .stack-card {
    padding: 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    box-shadow: 0 18px 32px rgba(15, 23, 42, 0.08);
  }

  .stack-title {
    display: block;
    font-weight: 700;
    margin-bottom: 0.35rem;
  }

  .stack-desc {
    font-size: 0.9rem;
    color: rgba(15, 23, 42, 0.6);
  }

  /* Advantages Section */
  .advantages {
    margin-bottom: 6rem;
  }

  .advantages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .advantage-card {
    padding: 1.75rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .advantage-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
    border-color: var(--color-primary);
  }

  .advantage-card h3 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  .advantage-card p {
    margin: 0;
    font-size: 0.95rem;
  }

  /* Split Section */
  .split {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 6rem;
  }

  .split-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 2rem;
  }

  .feature-list {
    margin: 1rem 0 0;
    padding-left: 1.1rem;
    color: rgba(15, 23, 42, 0.7);
  }

  .feature-list li {
    margin-bottom: 0.75rem;
  }

  .code-card {
    background: #0f172a;
    color: #f8fafc;
  }

  .code-card h3 {
    color: #f8fafc;
    margin-bottom: 1rem;
  }

  .code-card pre {
    margin: 0;
    overflow-x: auto;
  }

  .code-card code {
    font-family: "Cascadia Mono", "Fira Code", monospace;
    font-size: 0.9rem;
    color: #e0e7ff;
    line-height: 1.5;
  }

  /* CTA Section */
  .cta {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, rgba(36, 236, 113, 0.1) 0%, rgba(52, 168, 235, 0.08) 100%);
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
  @media (max-width: 900px) {
    .hero {
      grid-template-columns: 1fr;
      gap: 2.5rem;
      margin-bottom: 4rem;
    }

    .hero-title {
      font-size: 2.8rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    .hero-actions {
      flex-wrap: wrap;
    }

    h2 {
      font-size: 1.5rem;
    }

    .cta {
      padding: 2rem 1.5rem;
    }

    .cta h2 {
      font-size: 1.5rem;
    }
  }
`;