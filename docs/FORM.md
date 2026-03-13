# Form Handling

Complete guide for building and validating forms with Web Components, including form value collection with destructuring and validation patterns.

## Features

- **Collect Form Values** — Get all form field values with a single function call
- **Validate Forms** — Built-in validation for required fields, email, phone, and custom rules
- **Destructure Values** — Use ES6 destructuring to extract specific form fields
- **Web Component Support** — Works with `ui-input`, `ui-select`, `ui-checkbox`, `ui-date-picker`, `ui-upload` plus native HTML inputs
- **Flexible Options** — Include/exclude disabled fields and empty values

## Basic Form Structure

```html
<form id="login-form">
  <div class="form-group">
    <ui-input 
      name="email" 
      label="Email" 
      type="email" 
      required 
      placeholder="you@example.com"
    ></ui-input>
  </div>

  <div class="form-group">
    <ui-input 
      name="password" 
      label="Password" 
      type="password" 
      required
      placeholder="••••••••"
    ></ui-input>
  </div>

  <ui-button type="submit">Login</ui-button>
</form>
```

## Get Form Values

Use `getFormValues()` to collect all form field values. The most common use case is destructuring specific fields:

### Destructuring Example

```typescript
import { getFormValues } from '@diniz/webcomponents';

const form = document.getElementById('login-form') as HTMLFormElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Destructure email and password directly
  const { email, password } = getFormValues(form);

  console.log('Email:', email);
  console.log('Password:', password);

  // Send to server
  await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
});
```

### All Form Values

Get all values at once:

```typescript
const form = document.getElementById('login-form') as HTMLFormElement;
const allValues = getFormValues(form);

console.log(allValues);
// Output: { email: 'user@example.com', password: 'secret123' }
```

### Options

Control which fields to include:

```typescript
const values = getFormValues(form, {
  includeDisabled: true,  // Include disabled fields (default: false)
  includeEmpty: false      // Exclude empty fields (default: true)
});
```

## Helper-First Pattern (Vite)

To reduce repeated form wiring code, use built-in helpers (see `docs/VITE_HELPERS.md`) and `createFormBridge()`:

```typescript
import { createFormBridge, getEl } from '@diniz/webcomponents';

const form = getEl<HTMLFormElement>('#login-form');
const bridge = createFormBridge(form);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const result = bridge.validate();
  if (!result.isValid) return;

  const { email, password } = bridge.values();
  await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
});
```

## Validate Forms

Use `validateForm()` to validate all form fields and get error messages:

### Basic Validation

```typescript
import { validateForm } from '@diniz/webcomponents';

const form = document.getElementById('login-form') as HTMLFormElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate the form
  const result = validateForm(form);

  if (!result.isValid) {
    console.log('Validation errors:', result.errors);
    // Output: { email: 'Please enter a valid email address' }
    return;
  }

  // Form is valid, process data
  const { email, password } = getFormValues(form);
  await loginUser(email, password);
});
```

### Validation Features

The `validateForm()` function automatically validates:

- **Required Fields** — Checks if required inputs have values
- **Email Validation** — Validates email format for fields named `email`
- **Phone Validation** — Validates phone format for fields named `phone`
- **Checkboxes** — Ensures at least one checkbox is selected

```typescript
const result = validateForm(form);

if (!result.isValid) {
  // Loop through errors and display them
  Object.entries(result.errors).forEach(([field, message]) => {
    console.log(`${field}: ${message}`);
  });
}
```

## Complete Login Form Example

```html
<style>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .error-message {
    color: #dc2626;
    font-size: 13px;
  }

  .button-group {
    display: flex;
    gap: 12px;
  }

  .button-group ui-button {
    flex: 1;
  }
</style>

<div class="login-container">
  <h2>Login</h2>

  <form id="login-form">
    <div class="form-group">
      <ui-input 
        name="email" 
        label="Email Address" 
        type="email" 
        required
        placeholder="you@example.com"
      ></ui-input>
      <div class="error-message" id="email-error"></div>
    </div>

    <div class="form-group">
      <ui-input 
        name="password" 
        label="Password" 
        type="password" 
        required
        placeholder="••••••••"
      ></ui-input>
      <div class="error-message" id="password-error"></div>
    </div>

    <div class="button-group">
      <ui-button type="button" variant="secondary" id="reset-btn">
        Clear
      </ui-button>
      <ui-button type="submit" variant="primary">
        Login
      </ui-button>
    </div>
  </form>
</div>

<script type="module">
  import { getFormValues, validateForm } from '@diniz/webcomponents';

  const form = document.getElementById('login-form');
  const resetBtn = document.getElementById('reset-btn');

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate form
    const validation = validateForm(form);

    // Clear previous errors
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    if (!validation.isValid) {
      // Display errors
      Object.entries(validation.errors).forEach(([field, message]) => {
        const errorEl = document.getElementById(`${field}-error`);
        if (errorEl) errorEl.textContent = message;
      });
      return;
    }

    // Get form values with destructuring
    const { email, password } = getFormValues(form);

    try {
      // Send to server
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        console.log('Login successful');
        // Redirect or update UI
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Reset form
  resetBtn.addEventListener('click', () => {
    form.reset();
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
  });
</script>
```

## Multi-Field Form Example

Extract multiple fields with destructuring:

```typescript
const { email, password, firstName, lastName, phone } = getFormValues(form);

console.log({
  email,
  password,
  firstName,
  lastName,
  phone
});
```

HTML:

```html
<form id="signup-form">
  <ui-input name="firstName" label="First Name" required></ui-input>
  <ui-input name="lastName" label="Last Name" required></ui-input>
  <ui-input name="email" label="Email" type="email" required></ui-input>
  <ui-input name="password" label="Password" type="password" required></ui-input>
  <ui-input name="phone" label="Phone" type="tel"></ui-input>
  <ui-button type="submit">Sign Up</ui-button>
</form>
```

## Advanced: Custom Field Handling

### Handle Checkboxes

```typescript
const form = document.getElementById('form');
const { agreeToTerms, newsletter } = getFormValues(form);

// agreeToTerms and newsletter will be boolean values
console.log('Agreed to terms:', agreeToTerms);
console.log('Subscribe to newsletter:', newsletter);
```

HTML:

```html
<form id="form">
  <ui-checkbox name="agreeToTerms" label="I agree to the terms"></ui-checkbox>
  <ui-checkbox name="newsletter" label="Subscribe to newsletter"></ui-checkbox>
  <ui-button type="submit">Submit</ui-button>
</form>
```

### Handle File Uploads

```typescript
const form = document.getElementById('form');
const { avatar, documents } = getFormValues(form);

// avatar and documents will be File[] arrays
console.log('Avatar files:', avatar);
console.log('Document files:', documents);
```

HTML:

```html
<form id="form">
  <ui-upload name="avatar" label="Profile Picture"></ui-upload>
  <ui-upload name="documents" label="Documents" multiple></ui-upload>
  <ui-button type="submit">Upload</ui-button>
</form>
```

### Handle Select/Dropdown

```typescript
const form = document.getElementById('form');
const { country, category } = getFormValues(form);

console.log('Selected country:', country);
console.log('Selected category:', category);
```

HTML:

```html
<form id="form">
  <ui-select name="country" label="Country" required>
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
  </ui-select>

  <ui-select name="category" label="Category" multiple>
    <option value="tech">Technology</option>
    <option value="sports">Sports</option>
    <option value="news">News</option>
  </ui-select>

  <ui-button type="submit">Submit</ui-button>
</form>
```

### Handle Date Picker

```typescript
const form = document.getElementById('form');
const { birthDate, eventDate } = getFormValues(form);

// birthDate and eventDate will be date strings
console.log('Birth date:', birthDate);
console.log('Event date:', eventDate);
```

HTML:

```html
<form id="form">
  <ui-date-picker name="birthDate" label="Birth Date" required></ui-date-picker>
  <ui-date-picker name="eventDate" label="Event Date"></ui-date-picker>
  <ui-button type="submit">Submit</ui-button>
</form>
```

## Form Validation Rules Reference

### Required Fields

```html
<ui-input name="email" required></ui-input>
<ui-select name="category" required></ui-select>
<ui-input name="phone" required></ui-input>
```

### Email Validation

Add validation rule to `ui-input` with type `email`:

```html
<ui-input 
  name="email" 
  type="email" 
  required
  label="Email"
></ui-input>
```

Fields named `email` are automatically validated with email regex.

### Phone Validation

Fields named `phone` are automatically validated:

```html
<ui-input 
  name="phone" 
  type="tel" 
  label="Phone Number"
></ui-input>
```

Valid formats: `123-456-7890`, `(123) 456-7890`, `+1 234 567 8900`, etc.

### Custom Validation Rules

Use `validationRule` attribute on `ui-input`:

```html
<!-- Email domain validation -->
<ui-input 
  name="work-email" 
  type="email"
  validationRule='{"type":"emailDomain","domain":"company.com"}'
  label="Work Email"
></ui-input>

<!-- Password match validation -->
<ui-input name="password" type="password" label="Password"></ui-input>
<ui-input 
  name="confirmPassword" 
  type="password"
  validationRule='{"type":"match","selector":"input[name=\"password\"]"}'
  label="Confirm Password"
></ui-input>

<!-- Min/Max length -->
<ui-input 
  name="username" 
  validationRule='{"type":"minLength","length":3}'
  label="Username (min 3)"
></ui-input>

<!-- Regex pattern -->
<ui-input 
  name="code" 
  validationRule='{"type":"regex","pattern":"^[A-Z]{3}[0-9]{3}$"}'
  label="Code (e.g., ABC123)"
></ui-input>
```

### Programmatic Validation

Set custom validators on `ui-input` elements:

```typescript
const input = document.querySelector('ui-input[name="username"]');

input.setCustomValidator((value, el) => {
  if (!value) {
    return { valid: false, message: 'Username is required' };
  }
  if (value.length < 3) {
    return { valid: false, message: 'Username must be at least 3 characters' };
  }
  if (value.length > 20) {
    return { valid: false, message: 'Username must be at most 20 characters' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return { valid: false, message: 'Username can only contain letters, numbers, and underscores' };
  }
  return { valid: true };
});
```

## Complete Registration Form

```html
<style>
  .registration-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 24px;
  }

  .form-section {
    margin-bottom: 24px;
  }

  .form-section h3 {
    font-size: 16px;
    margin-bottom: 16px;
    color: #374151;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 12px;
  }

  .form-row.full {
    grid-template-columns: 1fr;
  }

  .error-container {
    padding: 12px;
    background-color: #fee2e2;
    border: 1px solid #fca5a5;
    border-radius: 4px;
    margin-bottom: 16px;
    display: none;
  }

  .error-container.show {
    display: block;
  }

  .error-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .error-list li {
    color: #dc2626;
    font-size: 13px;
    margin-bottom: 4px;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .button-actions {
    display: flex;
    gap: 12px;
    justify-content: space-between;
  }
</style>

<div class="registration-container">
  <h2>Create Account</h2>

  <div class="error-container" id="error-container">
    <ul class="error-list" id="error-list"></ul>
  </div>

  <form id="registration-form">
    <!-- Personal Information -->
    <div class="form-section">
      <h3>Personal Information</h3>

      <div class="form-row">
        <ui-input 
          name="firstName" 
          label="First Name" 
          required
        ></ui-input>
        <ui-input 
          name="lastName" 
          label="Last Name" 
          required
        ></ui-input>
      </div>

      <div class="form-row full">
        <ui-input 
          name="email" 
          type="email" 
          label="Email Address" 
          required
        ></ui-input>
      </div>

      <div class="form-row full">
        <ui-input 
          name="phone" 
          type="tel" 
          label="Phone Number"
        ></ui-input>
      </div>
    </div>

    <!-- Account Information -->
    <div class="form-section">
      <h3>Account Information</h3>

      <div class="form-row full">
        <ui-input 
          name="password" 
          type="password" 
          label="Password" 
          required
        ></ui-input>
      </div>

      <div class="form-row full">
        <ui-input 
          name="confirmPassword" 
          type="password" 
          label="Confirm Password" 
          required
          validationRule='{"type":"match","selector":"input[name=\"password\"]"}'
        ></ui-input>
      </div>
    </div>

    <!-- Preferences -->
    <div class="form-section">
      <h3>Preferences</h3>

      <div class="checkbox-group">
        <ui-checkbox 
          name="newsletter" 
          label="Subscribe to our newsletter"
        ></ui-checkbox>
        <ui-checkbox 
          name="terms" 
          label="I agree to the terms and conditions"
          required
        ></ui-checkbox>
      </div>
    </div>

    <!-- Actions -->
    <div class="button-actions">
      <ui-button type="button" variant="secondary" id="reset-btn">
        Clear Form
      </ui-button>
      <ui-button type="submit" variant="primary">
        Create Account
      </ui-button>
    </div>
  </form>
</div>

<script type="module">
  import { getFormValues, validateForm } from '@diniz/webcomponents';

  const form = document.getElementById('registration-form');
  const resetBtn = document.getElementById('reset-btn');
  const errorContainer = document.getElementById('error-container');
  const errorList = document.getElementById('error-list');

  function showErrors(errors) {
    errorList.innerHTML = '';
    Object.values(errors).forEach(error => {
      const li = document.createElement('li');
      li.textContent = error;
      errorList.appendChild(li);
    });
    errorContainer.classList.add('show');
  }

  function clearErrors() {
    errorContainer.classList.remove('show');
    errorList.innerHTML = '';
  }

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate form
    const validation = validateForm(form);

    if (!validation.isValid) {
      showErrors(validation.errors);
      return;
    }

    clearErrors();

    // Get form values with destructuring
    const { firstName, lastName, email, password, newsletter, terms } = getFormValues(form);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          newsletter,
          terms
        })
      });

      if (response.ok) {
        console.log('Registration successful');
        // Redirect or show success message
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      showErrors({ submit: 'An error occurred. Please try again.' });
    }
  });

  // Reset form
  resetBtn.addEventListener('click', () => {
    form.reset();
    clearErrors();
  });
</script>
```

## API Reference

### `getFormValues(form, options?)`

Collect values from all form fields in a form element.

**Parameters:**
- `form` (`HTMLFormElement`) — The form element to collect values from
- `options` (`GetFormValuesOptions`, optional) — Collection options
  - `includeDisabled` (`boolean`) — Include disabled fields (default: `false`)
  - `includeEmpty` (`boolean`) — Include empty fields (default: `true`)

**Returns:** `Record<string, FormValue>` — Object with field names as keys and field values

**Supported fields:**
- Native: `<input>`, `<select>`, `<textarea>`
- Web Components: `<ui-input>`, `<ui-select>`, `<ui-date-picker>`, `<ui-checkbox>`, `<ui-upload>`

### `validateForm(form)`

Validate all form fields and collect validation errors.

**Parameters:**
- `form` (`HTMLFormElement`) — The form element to validate

**Returns:** `ValidationResult` — Validation result object
- `isValid` (`boolean`) — Whether all fields are valid
- `errors` (`Record<string, string>`) — Object with error messages keyed by field name

**Validation includes:**
- Required field checks
- Email format validation (for fields named `email`)
- Phone format validation (for fields named `phone`)
- At least one checkbox selection requirement
