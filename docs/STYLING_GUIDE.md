# Web Components Styling Guide for AI Agents

This guide helps AI agents and developers create beautiful, cohesive designs using web components. Focus on intentional aesthetics and component composition over scattered micro-interactions.

## Design Philosophy

**Bold > Timid**: Choose a clear aesthetic direction and execute it with precision. Whether minimal, maximalist, or somewhere in between, commit to the vision.

**Intentionality**: Every design choice should have a purpose. Avoid generic patterns (overused fonts like Inter, common purple gradients, predictable layouts).

**Component-First**: Use component properties before custom CSS. Shadow DOM scoping means your styles won't leak.

---

## Styling Approaches

### 1. Component Properties (Recommended - No CSS Needed)

Each component has built-in customization attributes. Use these first:

#### ui-card
```html
<!-- Professional card with depth -->
<ui-card 
  variant="elevated" 
  shadow 
  shadow-color="59, 130, 246"
  elevation="lg">
  <div class="card-content">
    <h3>Premium Feature</h3>
    <p>Elevated design with blue shadow</p>
  </div>
</ui-card>

<!-- Minimalist ghost card -->
<ui-card variant="ghost">
  <div class="card-content">
    <p>Subtle, refined appearance</p>
  </div>
</ui-card>

<!-- Geometric square card -->
<ui-card variant="bordered" rounded="false" shadow elevation="md">
  <div class="card-content">
    <p>Brutalist, raw approach</p>
  </div>
</ui-card>
```

**Shadow Color RGB Values**:
- Blue: `99, 102, 241` 
- Purple: `168, 85, 247`
- Red: `239, 68, 68`
- Cyan: `34, 211, 238`
- Green: `34, 197, 94`
- Gray: `100, 116, 139`

#### ui-button
```html
<!-- Prominent primary action -->
<ui-button variant="primary" size="lg" icon="arrow-right">Get Started</ui-button>

<!-- Subtle secondary action -->
<ui-button variant="secondary" size="sm" icon="info">Learn More</ui-button>

<!-- Text-only ghost button -->
<ui-button variant="ghost" size="md" icon="external-link">Open Link</ui-button>
```

**Icon Positioning**:
```html
<ui-button icon="plus" icon-position="left">Add Item</ui-button>
<ui-button icon="arrow-right" icon-position="right">Continue</ui-button>
```

#### ui-input
```html
<!-- Standard required field -->
<ui-input 
  label="Username" 
  required 
  placeholder="Enter username">
</ui-input>

<!-- Email with custom domain validation -->
<ui-input 
  label="Work Email"
  type="email"
  validate="email:company.com"
  custom-error="Must be your company email"
  required>
</ui-input>

<!-- Password confirmation -->
<ui-input 
  label="Confirm Password"
  type="password"
  validate="match:#password"
  custom-error="Passwords must match"
  id="confirm-password">
</ui-input>
```

---

### 2. Container Styling (HTML/CSS)

Wrap components for layout and spacing:

```html
<style>
  /* Centered form card */
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
  }

  .form-card {
    width: 100%;
    max-width: 420px;
  }

  .form-content {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-header {
    text-align: center;
    margin-bottom: 16px;
  }

  .form-header h2 {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: #1f2937;
  }

  .form-header p {
    color: #6b7280;
    font-size: 14px;
    margin: 0;
  }

  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: space-between;
  }

  .form-actions ui-button {
    flex: 1;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .form-content {
      padding: 24px;
      gap: 16px;
    }
  }
</style>

<div class="form-container">
  <ui-card variant="elevated" shadow elevation="xl" class="form-card">
    <div class="form-content">
      <div class="form-header">
        <h2>Login</h2>
        <p>Welcome back</p>
      </div>

      <ui-input label="Email" type="email" required></ui-input>
      <ui-input label="Password" type="password" required></ui-input>

      <div class="form-actions">
        <ui-button variant="secondary">Cancel</ui-button>
        <ui-button variant="primary" icon="log-in" icon-position="right">Login</ui-button>
      </div>
    </div>
  </ui-card>
</div>
```

---

### 3. CSS Customization (Advanced)

For components with slots, style the parent container:

```html
<style>
  /* Table container with custom styling */
  .table-wrapper {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .table-header {
    background: linear-gradient(90deg, #f3f4f6 0%, #f9fafb 100%);
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  .table-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
  }

  /* Grid layout for cards -->
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    padding: 32px;
  }

  .card-grid ui-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card-grid ui-card:hover {
    transform: translateY(-4px);
  }
</style>
```

---

## Beautiful UI Patterns

### Login Form
```html
<style>
  .login-box {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #667eea, #764ba2);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .login-form {
    width: 100%;
    max-width: 400px;
    margin: 0 20px;
  }

  .login-content {
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .login-title {
    text-align: center;
    margin-bottom: 8px;
  }

  .login-title h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: #1f2937;
  }

  .login-title p {
    margin: 8px 0 0 0;
    font-size: 14px;
    color: #9ca3af;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 16px;
  }

  .form-footer {
    text-align: center;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
  }

  .form-footer p {
    font-size: 13px;
    color: #6b7280;
  }

  .form-footer a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }
</style>

<div class="login-box">
  <ui-card variant="elevated" shadow elevation="xl" class="login-form">
    <div class="login-content">
      <div class="login-title">
        <h1>Welcome</h1>
        <p>Sign in to continue</p>
      </div>

      <div class="form-group">
        <ui-input label="Email" type="email" required placeholder="you@example.com"></ui-input>
      </div>

      <div class="form-group">
        <ui-input label="Password" type="password" required placeholder="••••••••"></ui-input>
      </div>

      <div class="form-actions">
        <ui-button variant="secondary">Sign Up</ui-button>
        <ui-button variant="primary">Login</ui-button>
      </div>

      <div class="form-footer">
        <p><a href="#">Forgot password?</a></p>
      </div>
    </div>
  </ui-card>
</div>
```

### Feature Cards Grid
```html
<style>
  .features-section {
    padding: 80px 20px;
    background: linear-gradient(to bottom, #ffffff, #f9fafb);
  }

  .features-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-header h2 {
    font-size: 36px;
    font-weight: 700;
    margin: 0 0 16px 0;
    color: #1f2937;
  }

  .section-header p {
    font-size: 18px;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
  }

  .feature-card {
    text-align: center;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 16px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }

  .feature-card h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #1f2937;
  }

  .feature-card p {
    font-size: 15px;
    color: #6b7280;
    margin: 0;
  }
</style>

<section class="features-section">
  <div class="features-container">
    <div class="section-header">
      <h2>Powerful Features</h2>
      <p>Everything you need to build beautiful interfaces</p>
    </div>

    <div class="features-grid">
      <ui-card variant="ghost" class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Lightning Fast</h3>
        <p>Built for performance with minimal overhead and instant rendering</p>
      </ui-card>

      <ui-card variant="ghost" class="feature-card">
        <div class="feature-icon">🎨</div>
        <h3>Customizable</h3>
        <p>Easy to style with flexible properties and CSS customization</p>
      </ui-card>

      <ui-card variant="ghost" class="feature-card">
        <div class="feature-icon">♿</div>
        <h3>Accessible</h3>
        <p>WCAG compliant with keyboard navigation and screen reader support</p>
      </ui-card>
    </div>
  </div>
</section>
```

---

## Shadow DOM Styling

Components use Shadow DOM for encapsulation. This means:

✅ Component styles don't leak out  
✅ Global styles don't affect components  
✅ Each component is an isolated style scope  

**To style slot content**, use the container's CSS:

```html
<style>
  ui-card {
    /* These don't work - Shadow DOM blocks it */
    color: red; /* ❌ No effect */
  }

  /* Instead, style the slot content's parent */
  .card-content {
    color: #1f2937;
    line-height: 1.6;
  }
</style>

<ui-card>
  <div class="card-content">
    <!-- ✅ This gets styled -->
    <h3>Styled Title</h3>
    <p>Styled paragraph</p>
  </div>
</ui-card>
```

---

## AI Agent Tips

When users ask "make it look good", follow this process:

1. **Choose an Aesthetic Direction**
   - Minimal/refined (white, gray, single accent color)
   - Bold/maximalist (vibrant colors, gradients, animations)
   - Professional (blues, grays, subtle shadows)
   - Fun/playful (bright colors, rounded elements)

2. **Use Component Properties**
   - Start with `variant`, `elevation`, `shadow`, `shadow-color`
   - Don't jump to custom CSS immediately
   - Properties are intentionally designed for beauty

3. **Apply Container CSS**
   - Use flexbox/grid for layout
   - Add background gradients
   - Control spacing with padding/gap
   - Responsive design with media queries

4. **Compose with Intent**
   - Pair components thoughtfully
   - Match card variants with button variants
   - Use consistent spacing (multiples of 4px or 8px)
   - Limit to 2-3 colors max

5. **Test Responsiveness**
   - Mobile-first approach
   - Test on different screen sizes
   - Use `max-width` for centered layouts

---

## Common Mistakes to Avoid

❌ Using all component variants on one page (use 1-2 max)  
❌ Inconsistent spacing (use a consistent scale)  
❌ Too many colors (3-4 color palette max)  
❌ Skipping typography hierarchy (use clear h1 → h3 progression)  
❌ Forgetting mobile responsiveness  
❌ Over-animating (motion should guide, not distract)

---

## Ready to Create?

Use these patterns, adjust colors/spacing for your context, and build with intention. AI agents should reference this guide when users ask for beautiful styling.
