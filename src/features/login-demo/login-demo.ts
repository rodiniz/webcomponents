import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../shared/components/card';
import '../../shared/components/button';
import '../../shared/components/input';

@customElement('login-demo')
export class LoginDemo extends LitElement {
  static styles = css`
    .demo-section {
      margin-bottom: 2.5rem;
      padding: 1.5rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
    }

    .demo-section h2 {
      margin: 0 0 1rem;
      font-size: 1.25rem;
      color: #0f172a;
    }

    .login-wrapper {
      display: flex;
      justify-content: center;
      padding: 1rem;
    }

    ui-card {
      max-width: 400px;
      width: 100%;
    }

    .login-header {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .login-logo {
      width: 48px;
      height: 48px;
      margin: 0 auto 1rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .login-logo svg {
      width: 24px;
      height: 24px;
      color: white;
    }

    .login-title {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      font-weight: 600;
      color: #0f172a;
    }

    .login-subtitle {
      margin: 0;
      color: #64748b;
      font-size: 0.875rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
    }

    .remember-me {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #64748b;
      cursor: pointer;
    }

    .forgot-link {
      color: #24ec71;
      text-decoration: none;
      font-weight: 500;
    }

    .forgot-link:hover {
      text-decoration: underline;
    }

    .login-footer {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.875rem;
      color: #64748b;
    }

    .login-footer a {
      color: #24ec71;
      text-decoration: none;
      font-weight: 500;
    }

    .login-footer a:hover {
      text-decoration: underline;
    }

    pre {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1.5rem;
      border-radius: 8px;
      font-size: 0.8rem;
      overflow-x: auto;
      white-space: pre;
      line-height: 1.6;
    }
  `;

  private handleSubmit = (e: Event): void => {
    e.preventDefault();
    alert('Login form submitted!');
  };

  render() {
    return html`
      <div class="demo-section">
        <h2>Login Example</h2>
        <div class="login-wrapper">
          <ui-card variant="elevated" rounded>
            <div class="login-header">
              <div class="login-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h2 class="login-title">Welcome back</h2>
              <p class="login-subtitle">Enter your credentials to access your account</p>
            </div>

            <form class="login-form" @submit=${this.handleSubmit}>
              <ui-input 
                type="email" 
                label="Email address" 
                placeholder="you@example.com"
                required
              ></ui-input>

              <ui-input 
                type="password" 
                label="Password" 
                placeholder="Enter your password"
                required
              ></ui-input>

              <div class="form-row">
                <label class="remember-me">
                  <input type="checkbox">
                  <span>Remember me</span>
                </label>
                <a href="#" class="forgot-link">Forgot password?</a>
              </div>

              <ui-button type="submit" variant="primary" style="width: 100%; margin-top: 8px;">
                Sign in
              </ui-button>
            </form>

            <p class="login-footer">
              Don't have an account? <a href="#">Sign up</a>
            </p>
          </ui-card>
        </div>
      </div>

      <div class="demo-section">
        <h2>Code</h2>
        <pre><code>&lt;ui-card variant="elevated" rounded&gt;
  &lt;div class="login-header"&gt;
    &lt;h2&gt;Welcome back&lt;/h2&gt;
    &lt;p&gt;Enter your credentials to access your account&lt;/p&gt;
  &lt;/div&gt;

  &lt;form&gt;
    &lt;ui-input type="email" label="Email" placeholder="you@example.com" required&gt;&lt;/ui-input&gt;
    &lt;ui-input type="password" label="Password" placeholder="Enter password" required&gt;&lt;/ui-input&gt;
    
    &lt;ui-button type="submit" variant="primary"&gt;Sign in&lt;/ui-button&gt;
  &lt;/form&gt;
&lt;/ui-card&gt;</code></pre>
      </div>
    `;
  }
}
