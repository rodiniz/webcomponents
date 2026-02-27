# Web Components Skills

AI agent skills for the @diniz/webcomponents library.

## Overview

This skill provides comprehensive guidance for AI agents and developers working with the web components library. It includes:

- Component API reference and usage examples
- Form validation patterns
- Data table configuration
- **Styling guide with beautiful UI patterns and design best practices**
- TypeScript support
- Responsive design patterns

## Installation

```bash
npm install @diniz/webcomponents
```

## Quick Start

```html
<head>
  <link rel="stylesheet" href="node_modules/@diniz/webcomponents/dist/style.css" />
</head>
<body>
  <ui-card shadow elevation="md">
    <ui-input label="Email" type="email" required></ui-input>
    <ui-button variant="primary">Submit</ui-button>
  </ui-card>

  <script type="module">
    import '@diniz/webcomponents';
  </script>
</body>
```

## Available Components

- **ui-button** - Button with variants (primary, secondary, ghost), sizes, and icon support
- **ui-input** - Input with native and custom validation, multiple types
- **ui-card** - Card container with elevation, variants, and customizable shadows
- **ui-table** - Data table with columns, rows, and row actions
- **ui-date-picker** - Date picker with format and range support
- **ui-pagination** - Pagination control with page change events
- **ui-toast** - Toast notifications with auto-dismiss and stacking
- **ui-checkbox** - Checkbox with label support
- **ui-select** - Select dropdown with options
- **ui-modal** - Modal dialog with open/close API
- **ui-tabs** - Tab navigation
- **ui-stepper** - Step indicator
- **ui-upload** - File upload component
- **ui-layout** - Layout system with header, footer, sidebar, content

## Key Documentation

- [SKILL.md](./SKILL.md) - Component API reference and validation patterns
- [../docs/STYLING_GUIDE.md](../docs/STYLING_GUIDE.md) - **Complete styling guide for creating beautiful UIs**
- [../docs/CARD.md](../docs/CARD.md) - Detailed card component documentation

## Styling

For beautiful UI patterns, design best practices, and complete styling guidance, see [STYLING_GUIDE.md](../docs/STYLING_GUIDE.md).

Key styling approaches:
1. Use component properties for visual customization
2. Container CSS for layout and spacing
3. Shadow DOM scoping for style encapsulation

## When the Skill is Used

The AI agent will apply this skill when:

- Creating or modifying components from this library
- Styling components beautifully with design intent
- Setting up forms with validation
- Building data tables and pagination
- Creating responsive layouts
- Adding TypeScript support

## Design Philosophy for AI Agents

When styling components, remember:

- **Bold > Timid**: Commit to a clear aesthetic direction
- **Intentional**: Every choice should have purpose
- **Component-First**: Use built-in properties before custom CSS
- **Cohesive**: Limit colors and use consistent spacing

See [STYLING_GUIDE.md](../docs/STYLING_GUIDE.md) for complete patterns and examples.
