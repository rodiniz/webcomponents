# ui-textarea Component

Multiline text input component with native-like textarea behavior and `maxlength` enforcement.

## Features

- Optional label
- Native `required`, `minlength`, and `maxlength` support
- Disabled state support
- Value updates via `input` and `change` events
- Hard `maxlength` enforcement while typing

## Basic Usage

```html
<ui-textarea
  label="Description"
  name="description"
  placeholder="Write your message"
  maxlength="200"
></ui-textarea>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | `string` | `''` | Field label |
| `name` | `string` | `''` | Field name |
| `placeholder` | `string` | `''` | Placeholder text |
| `rows` | `number` | `4` | Visible row count |
| `required` | `boolean` | `false` | Marks field as required |
| `disabled` | `boolean` | `false` | Disables interaction |
| `minlength` | `number` | `null` | Native minimum length |
| `maxlength` | `number` | `null` | Max characters allowed |
| `value` | `string` | `''` | Current textarea value |

## Max Length Behavior

```html
<ui-textarea maxlength="10"></ui-textarea>
```

When users type beyond 10 characters, the value is automatically truncated to 10 characters.
