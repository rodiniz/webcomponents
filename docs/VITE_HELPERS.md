# Dom Helpers

## Available Helpers

Import from the package root:

```typescript
import {
  initUI,
  getEl,
  bindProps,
  onCE,
  createFormBridge
} from '@diniz/webcomponents';
```

- `initUI(options)` — Apply theme and bootstrap router
- `getEl(selector, root?)` — Query element and throw if missing
- `bindProps(el, props)` — Assign complex properties in one call
- `onCE(target, eventName, handler)` — Typed custom-event subscription
- `createFormBridge(form)` — Form values/validation/reset facade

---

## 1) App Bootstrap (`main.ts`)

```typescript
import { initUI } from '@diniz/webcomponents';

initUI({
  theme: 'shadcn',
  routes: [
    { path: '/', component: 'home-page', load: () => import('./pages/home') },
    { path: '/users', component: 'users-page', load: () => import('./pages/users') }
  ],
  outlet: '#app'
});
```

---

## 2) `ui-table` Setup

```typescript
import { bindProps, getEl, onCE } from '@diniz/webcomponents';

type UserRow = {
  name: string;
  email: string;
};

type UserColumn = {
  key: keyof UserRow | 'actions';
  label: string;
  sortable?: boolean;
  actions?: {
    edit?: boolean;
    delete?: boolean;
  };
};

type TableActionDetail = {
  action: 'edit' | 'delete';
  row: UserRow;
  rowIndex: number;
};

type UsersTableElement = HTMLElement & {
  columns: UserColumn[];
  rows: UserRow[];
};

const table = getEl<UsersTableElement>('ui-table#users');

const columns: UserColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'actions', label: 'Actions', actions: { edit: true, delete: true } }
];

const rows: UserRow[] = [
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com' }
];

bindProps(table, {
  columns,
  rows
});

onCE<TableActionDetail>(table, 'action', ({ action, rowIndex }) => {
  console.log('Action:', action, 'Row:', rowIndex);
});
```

---

## 3) Form Handling

```typescript
import { createFormBridge, getEl } from '@diniz/webcomponents';

const form = getEl<HTMLFormElement>('#login-form');
const bridge = createFormBridge(form);

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const validation = bridge.validate();
  if (!validation.isValid) {
    console.log(validation.errors);
    return;
  }

  const { email, password } = bridge.values();
  await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
});
```

---

## 4) Why This Is DRY

- no repeated DOM-ready router bootstrap code
- no repeated `querySelector + null checks` for required elements
- no repeated `Object.assign` boilerplate for component props
- no repeated `CustomEvent` casting per listener
- no repeated `getFormValues + validateForm + reset` wiring per form
