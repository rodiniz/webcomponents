import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/input';
import { IconName, ICONS } from '../src/lib/icons';

type InputArgs = {
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  icon: string;
  iconPosition: 'left' | 'right';
  required: boolean;
  disabled: boolean;
};

const meta: Meta<InputArgs> = {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url'] },
    icon: { control: 'text' },
    iconPosition: { control: 'select', options: ['left', 'right'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  args: {
    label: 'Email',
    placeholder: 'name@company.com',
    type: 'email',
    icon: 'mail',
    iconPosition: 'left',
    required: true,
    disabled: false
  }
};

export default meta;

type Story = StoryObj<InputArgs>;

export const Playground: Story = {
  render: ({ label, placeholder, type, icon, iconPosition, required, disabled }) => html`
    <ui-input
      label=${label}
      placeholder=${placeholder}
      type=${type}
      icon=${icon}
      icon-position=${iconPosition}
      ?required=${required}
      ?disabled=${disabled}
      name="storybook-input"
    ></ui-input>
  `
};

export const Basic: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    type: 'text',
    icon: '',
    iconPosition: 'left',
    required: false,
    disabled: false
  },
  render: ({ label, placeholder, type, icon, iconPosition, required, disabled }) => html`
    <ui-input
      label=${label}
      placeholder=${placeholder}
      type=${type}
      icon=${icon}
      icon-position=${iconPosition}
      ?required=${required}
      ?disabled=${disabled}
      name="basic-input"
    ></ui-input>
  `
};

export const CustomValidation: Story = {
  render: () => html`
    <style>
      .validation-demo {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 400px;
      }
      .demo-section {
        padding: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
      }
      .demo-section h4 {
        margin: 0 0 1rem 0;
        color: #374151;
      }
    </style>
    <div class="validation-demo">
      <div class="demo-section">
        <h4>Validation Rule (JSON)</h4>
        <ui-input
          label="Work Email"
          placeholder="you@company.com"
          type="email"
          name="work-email"
          validationRule='{"type":"emailDomain","domain":"company.com"}'
        ></ui-input>
      </div>
      <div class="demo-section">
        <h4>Custom Validator (Programmatic)</h4>
        <ui-input
          label="Username"
          placeholder="Enter username (3-15 chars, letters only)"
          type="text"
          name="username"
          id="custom-validator-input"
        ></ui-input>
        <script>
          const input = document.getElementById('custom-validator-input');
          input.setCustomValidator((value, el) => {
            if (!value) return { valid: false, message: 'Username is required' };
            if (value.length < 3) return { valid: false, message: 'Username must be at least 3 characters' };
            if (value.length > 15) return { valid: false, message: 'Username must be at most 15 characters' };
            if (!/^[a-zA-Z]+$/.test(value)) return { valid: false, message: 'Username must contain only letters' };
            return { valid: true };
          });
        </script>
      </div>
      <div class="demo-section">
        <h4>Password Strength</h4>
        <ui-input
          label="Password"
          placeholder="Enter password"
          type="password"
          name="password"
          id="password-input"
        ></ui-input>
        <script>
          const passwordInput = document.getElementById('password-input');
          passwordInput.setCustomValidator((value, el) => {
            if (!value) return { valid: false, message: 'Password is required' };
            if (value.length < 8) return { valid: false, message: 'Password must be at least 8 characters' };
            if (!/[A-Z]/.test(value)) return { valid: false, message: 'Password must contain at least one uppercase letter' };
            if (!/[0-9]/.test(value)) return { valid: false, message: 'Password must contain at least one number' };
            if (!/[!@#$%^&*]/.test(value)) return { valid: false, message: 'Password must contain at least one special character (!@#$%^&*)' };
            return { valid: true };
          });
        </script>
      </div>
    </div>
  `
};

export const WithIconEnum: Story = {
  render: () => {
    const icon: IconName = 'mail';
    const iconRight: IconName = 'search';
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <ui-input label="Email" placeholder="Enter your email" type="email" icon=${icon} icon-position="left"></ui-input>
        <ui-input label="Search" placeholder="Search..." type="search" icon=${iconRight} icon-position="right"></ui-input>
        <ui-input label="Password" placeholder="Enter password" type="password" icon="lock" icon-position="left"></ui-input>
        <p style="font-size: 14px; color: #666;">
          Available icons: ${ICONS.slice(0, 10).join(', ')}... (${ICONS.length} total)
        </p>
      </div>
    `;
  }
};
