import{b as r}from"./iframe-Ck3e-F9w.js";import"./input-DpGqbU1A.js";import{a as p}from"./icons-lgEBa0uT.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./query-BApjzB0v.js";import"./icon-helpers-uywyl4Wq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./unsafe-html-7KbQsD9c.js";import"./theme-DBvyg58T.js";var m=Object.freeze,S=Object.defineProperty,C=(e,a)=>m(S(e,"raw",{value:m(e.slice())})),h;const W={title:"Components/Input",tags:["autodocs"],argTypes:{type:{control:"select",options:["text","email","password","number","tel","url"]},icon:{control:"text"},iconPosition:{control:"select",options:["left","right"]},required:{control:"boolean"},disabled:{control:"boolean"}},args:{label:"Email",placeholder:"name@company.com",type:"email",icon:"mail",iconPosition:"left",required:!0,disabled:!1}},t={render:({label:e,placeholder:a,type:o,icon:l,iconPosition:d,required:u,disabled:c})=>r`
    <ui-input
      label=${e}
      placeholder=${a}
      type=${o}
      icon=${l}
      icon-position=${d}
      ?required=${u}
      ?disabled=${c}
      name="storybook-input"
    ></ui-input>
  `},i={args:{label:"Name",placeholder:"Enter your name",type:"text",icon:"",iconPosition:"left",required:!1,disabled:!1},render:({label:e,placeholder:a,type:o,icon:l,iconPosition:d,required:u,disabled:c})=>r`
    <ui-input
      label=${e}
      placeholder=${a}
      type=${o}
      icon=${l}
      icon-position=${d}
      ?required=${u}
      ?disabled=${c}
      name="basic-input"
    ></ui-input>
  `},n={render:()=>r(h||(h=C([`
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
        <\/script>
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
        <\/script>
      </div>
    </div>
  `])))},s={render:()=>r`
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <ui-input label="Email" placeholder="Enter your email" type="email" icon=${"mail"} icon-position="left"></ui-input>
        <ui-input label="Search" placeholder="Search..." type="search" icon=${"search"} icon-position="right"></ui-input>
        <ui-input label="Password" placeholder="Enter password" type="password" icon="lock" icon-position="left"></ui-input>
        <p style="font-size: 14px; color: #666;">
          Available icons: ${p.slice(0,10).join(", ")}... (${p.length} total)
        </p>
      </div>
    `};var v,f,y;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: ({
    label,
    placeholder,
    type,
    icon,
    iconPosition,
    required,
    disabled
  }) => html\`
    <ui-input
      label=\${label}
      placeholder=\${placeholder}
      type=\${type}
      icon=\${icon}
      icon-position=\${iconPosition}
      ?required=\${required}
      ?disabled=\${disabled}
      name="storybook-input"
    ></ui-input>
  \`
}`,...(y=(f=t.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var b,g,w;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    type: 'text',
    icon: '',
    iconPosition: 'left',
    required: false,
    disabled: false
  },
  render: ({
    label,
    placeholder,
    type,
    icon,
    iconPosition,
    required,
    disabled
  }) => html\`
    <ui-input
      label=\${label}
      placeholder=\${placeholder}
      type=\${type}
      icon=\${icon}
      icon-position=\${iconPosition}
      ?required=\${required}
      ?disabled=\${disabled}
      name="basic-input"
    ></ui-input>
  \`
}`,...(w=(g=i.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};var $,x,P;n.parameters={...n.parameters,docs:{...($=n.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => html\`
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
        <\/script>
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
        <\/script>
      </div>
    </div>
  \`
}`,...(P=(x=n.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};var E,q,I;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => {
    const icon: IconName = 'mail';
    const iconRight: IconName = 'search';
    return html\`
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <ui-input label="Email" placeholder="Enter your email" type="email" icon=\${icon} icon-position="left"></ui-input>
        <ui-input label="Search" placeholder="Search..." type="search" icon=\${iconRight} icon-position="right"></ui-input>
        <ui-input label="Password" placeholder="Enter password" type="password" icon="lock" icon-position="left"></ui-input>
        <p style="font-size: 14px; color: #666;">
          Available icons: \${ICONS.slice(0, 10).join(', ')}... (\${ICONS.length} total)
        </p>
      </div>
    \`;
  }
}`,...(I=(q=s.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};const Z=["Playground","Basic","CustomValidation","WithIconEnum"];export{i as Basic,n as CustomValidation,t as Playground,s as WithIconEnum,Z as __namedExportsOrder,W as default};
