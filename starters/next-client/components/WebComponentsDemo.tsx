'use client';

import { useEffect } from 'react';

import '../styles.css';

export default function WebComponentsDemo() {
  useEffect(() => {
    import('@diniz/webcomponents');
  }, []);

  return (
    <main className="container">
      <h1>Next.js + @diniz/webcomponents</h1>
      <p>Starter is ready. Edit components/WebComponentsDemo.tsx to build your app.</p>

      <section className="stack">
        <ui-button variant="primary" size="lg">Get started</ui-button>
        <ui-input label="Email" type="email" placeholder="you@example.com"></ui-input>
      </section>
    </main>
  );
}
