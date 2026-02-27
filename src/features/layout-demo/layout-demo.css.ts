export const layoutDemoCSS = `
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
    margin: 2rem 0 1rem;
    font-weight: 600;
    border-bottom: 2px solid var(--color-primary);
    padding-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0 0 0.75rem;
    font-weight: 600;
  }

  p {
    line-height: 1.6;
    color: rgba(15, 23, 42, 0.75);
    margin: 0 0 1rem;
  }

  code {
    background: var(--color-muted);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: "Cascadia Mono", "Fira Code", monospace;
    font-size: 0.9rem;
    color: var(--color-primary);
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

  .layout-example {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    overflow: hidden;
    height: 400px;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
    margin-top: 1rem;
  }

  .layout-example.full-height {
    height: 550px;
  }

  .content-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg);
    font-size: 1.1rem;
    font-weight: 500;
    color: rgba(15, 23, 42, 0.5);
  }

  .sidebar-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(15, 23, 42, 0.5);
    padding: 0.75rem 1rem 0.5rem;
    margin-top: 0.5rem;
  }

  .sidebar-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.95rem;
    color: var(--color-ink);
    user-select: none;
  }

  .sidebar-item:hover {
    background: var(--color-muted);
    color: var(--color-primary);
  }

  .sidebar-section {
    padding: 0.5rem 0;
  }

  .demo-info {
    background: var(--color-muted);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .event-output {
    background: #0f172a;
    color: #f8fafc;
    padding: 1rem;
    border-radius: 6px;
    font-family: "Cascadia Mono", "Fira Code", monospace;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    line-height: 1.5;
    max-height: 150px;
    overflow-y: auto;
  }

  .event-output.empty {
    opacity: 0.6;
  }

  /* Custom scrollbar */
  .event-output::-webkit-scrollbar {
    width: 6px;
  }

  .event-output::-webkit-scrollbar-track {
    background: rgba(248, 250, 252, 0.1);
    border-radius: 3px;
  }

  .event-output::-webkit-scrollbar-thumb {
    background: rgba(248, 250, 252, 0.3);
    border-radius: 3px;
  }

  .event-output::-webkit-scrollbar-thumb:hover {
    background: rgba(248, 250, 252, 0.5);
  }
`;
