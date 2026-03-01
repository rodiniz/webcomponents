# Template URL Component - Implementation Guide

## Overview

This document describes the new approach for creating web components using external HTML templates and CSS files with build-time conversion to lit-html.

## Architecture

The solution consists of:

1. **Base Class** (`TemplateUrlComponent`) - Extended LitElement with templateUrl/cssUrl properties
2. **Build Script** (`convert-html-to-lit.ts`) - Converts HTML to lit-html at build time
3. **Example Component** - Demonstrates the pattern

## Files Created

### 1. Base Class
- **Location**: `src/core/template-url-component.ts`
- **Purpose**: Abstract base class that components extend
- **Features**:
  - Properties: `templateUrl`, `cssUrl`
  - Abstract method: `getTemplate()`
  - Inherits from LitElement

```typescript
export abstract class TemplateUrlComponent extends LitElement {
  @property({ type: String }) templateUrl: string = '';
  @property({ type: String }) cssUrl: string = '';
  
  abstract getTemplate(): TemplateResult;
  
  render() {
    return this.getTemplate();
  }
}
```

### 2. Build Script
- **Location**: `scripts/convert-html-to-lit.ts`
- **Purpose**: Convert HTML files to lit-html templates at build time
- **Usage**: 
  ```bash
  npx ts-node scripts/convert-html-to-lit.ts src/features/example-demo
  ```

### 3. Example Component
- **Files**:
  - `src/features/example-demo/example-button.html` - HTML template
  - `src/features/example-demo/example-button.css` - CSS styles
  - `src/features/example-demo/example-button.template.ts` - Generated lit-html
  - `src/features/example-demo/example-button.ts` - Component class

## How It Works

### Step 1: Create HTML Template
```html
<!-- example-button.html -->
<button class="example-btn" type="button">
  <slot></slot>
</button>
```

### Step 2: Create CSS File
```css
/* example-button.css */
.example-btn {
  display: inline-flex;
  background: var(--color-primary);
  /* ... */
}
```

### Step 3: Run Build Script
```bash
npx ts-node scripts/convert-html-to-lit.ts src/features/example-demo
```

### Step 4: Generated Template File
The script generates:
```typescript
// example-button.template.ts
import { html, css } from 'lit';

export const exampleButtonTemplate = html`
<button class="example-btn" type="button">
  <slot></slot>
</button>
`;

export const exampleButtonStyles = css`
.example-btn {
  display: inline-flex;
  /* ... */
}
`;
```

### Step 5: Create Component
```typescript
// example-button.ts
import { TemplateUrlComponent } from '../../core/template-url-component';
import { exampleButtonTemplate, exampleButtonStyles } from './example-button.template';

@customElement('ui-example-button')
export class UIExampleButton extends TemplateUrlComponent {
  static styles = [css`:host { display: inline-block; }`, unsafeCSS(exampleButtonStyles.toString())];

  getTemplate() {
    return exampleButtonTemplate;
  }
}
```

## Benefits

1. **Separation of Concerns**: HTML, CSS, and TypeScript in separate files
2. **Type Safety**: Full TypeScript support with lit-html templates
3. **Build-time Conversion**: No runtime overhead
4. **IDE Support**: Full autocomplete and type checking
5. **Maintainability**: Easier to edit templates without touching component logic

## Integration with Vite

The build script can be integrated into the Vite build process:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { convertHtmlToLit } from './scripts/convert-html-to-lit';

export default defineConfig({
  plugins: [
    {
      name: 'html-to-lit-transform',
      closeBundle() {
        convertHtmlToLit({
          inputDir: 'src/features',
          outputDir: 'src/generated/templates'
        });
      }
    }
  ]
});
```

## Future Enhancements

1. **Hot Module Replacement**: Support for HMR during development
2. **Dynamic Interpolation**: Support for {{variable}} syntax in HTML
3. **Component Imports**: Auto-detect and import child components
4. **Scoped Styles**: CSS scoping to avoid conflicts
5. **Watch Mode**: Auto-rebuild on file changes

## Migration Guide

To migrate existing components to this approach:

1. **Extract HTML**: Move template HTML to separate `.html` file
2. **Extract CSS**: Move component styles to separate `.css` file
3. **Run Converter**: Use build script to generate template
4. **Update Component**: Extend TemplateUrlComponent and import generated template

## Example Use Cases

- **Large Teams**: Multiple developers can work on templates independently
- **Design Systems**: Templates can be designed in Figma/HTML and converted
- **Legacy Migration**: Convert existing HTML templates to web components
- **Design-to-Code**: Import HTML from design tools

## Notes

- This is an **example implementation** - not meant to replace existing components
- The build script is a **proof of concept** - can be enhanced as needed
- All existing components continue to work as before
- No breaking changes to the existing codebase
