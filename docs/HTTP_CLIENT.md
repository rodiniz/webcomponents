# HTTP Client

Lightweight `fetch` wrapper with interceptors, timeouts, and a simple API.

## Import

```javascript
import { http, HTTPClient } from '@diniz/webcomponents';
```

## Basic Usage

```javascript
// GET
const users = await http.get('/api/users');

// POST
const created = await http.post('/api/users', { name: 'Ava' });

// PUT
await http.put('/api/users/1', { name: 'Ava Johnson' });

// PATCH
await http.patch('/api/users/1', { status: 'active' });

// DELETE
await http.delete('/api/users/1');
```

## Configuration

### Base URL

```javascript
http.setBaseURL('https://api.example.com');
```

### Default Headers

```javascript
http.setDefaultHeaders({
  Authorization: 'Bearer <token>',
  'X-App-Version': '1.2.0'
});
```

### Default Timeout

```javascript
http.setDefaultTimeout(8000);
```

## Request Options

You can pass a `RequestConfig` to each request:

```javascript
await http.get('/api/users', {
  headers: { 'X-Trace-Id': 'abc-123' },
  timeout: 3000
});
```

## Interceptors

### Request Interceptor

```javascript
http.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
});
```

### Response Interceptor

```javascript
http.interceptors.response.use((response) => {
  // Example: unwrap a data envelope
  if (response && response.data && response.data.data) {
    return { ...response, data: response.data.data };
  }
  return response;
});
```

### Error Interceptor

```javascript
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('HTTP error:', error);
    throw error;
  }
);
```

## Timeouts

Requests are aborted using `AbortController`. A timeout throws an error:

```javascript
try {
  await http.get('/api/slow', { timeout: 1000 });
} catch (error) {
  console.error(error.message); // Request timeout after 1000ms
}
```

## Response Handling

The client parses response bodies automatically:

- `application/json` -> `response.data` is an object
- `text/*` -> `response.data` is a string
- other -> `response.data` is a `Blob`

## Custom Instance

Use `HTTPClient` to create an isolated instance (custom base URL, headers, interceptors):

```javascript
const api = new HTTPClient();
api.setBaseURL('https://internal-api.example.com');
api.setDefaultHeaders({ 'X-Client': 'admin-ui' });

const items = await api.get('/items');
```

## Types

```typescript
import type {
  RequestConfig,
  ResponseConfig,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor
} from '@diniz/webcomponents';
```

## Common Patterns

### Data Table Load

```javascript
import { http } from '@diniz/webcomponents';

const table = document.querySelector('ui-table');

table.columns = [
  { key: 'id', label: 'ID', sortable: true, resizable: true },
  { key: 'name', label: 'Name', sortable: true, resizable: true },
  { key: 'email', label: 'Email', sortable: true, resizable: true }
];

const data = await http.get('/api/users');
table.rows = data;
```
