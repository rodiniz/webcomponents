import { BaseComponent } from '../../core/base-component';
import '../../shared/components/card';
import '../../shared/components/button';
import '../../shared/components/input';
import template from './login-demo.html?raw';
import styles from './login-demo.css?inline';

class LoginDemo extends BaseComponent {
  connectedCallback(): void {
    super.connectedCallback();
  }

  render(): void {
    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      ${template}
    `;
  }
}

customElements.define('login-demo', LoginDemo);
