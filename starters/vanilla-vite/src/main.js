import '@diniz/webcomponents';
import '@diniz/webcomponents/style.css';
import './style.css';

const app = document.querySelector('#app');

if (app) {
  app.innerHTML = `
    <main class="container">
      <h1>Vanilla + @diniz/webcomponents</h1>
      <p>Starter is ready. Edit src/main.js to build your app.</p>

      <section class="stack">
        <ui-button variant="primary" size="lg">Get started</ui-button>
        <ui-input label="Email" type="email" placeholder="you@example.com"></ui-input>
      </section>
    </main>
  `;
}
