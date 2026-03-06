# UI Card Component

A flexible and customizable card container component with shadow effects, color customization, and multiple visual variants.

## Features

- ✅ Customizable shadows with color support
- ✅ Multiple elevation levels (sm, md, lg, xl)
- ✅ Rounded or square corners
- ✅ Multiple visual variants (default, elevated, bordered, ghost)
- ✅ Smooth hover transitions
- ✅ Responsive design
- ✅ Slotted content support
- ✅ Accessibility-focused
- ✅ Print-friendly

## Usage

### Basic Example

```html
<ui-card shadow elevation="md">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</ui-card>
```

### With Custom Shadow Color

```html
<ui-card shadow shadow-color="99, 102, 241" elevation="lg">
  <h3>Blue Shadow Card</h3>
  <p>This card has a beautiful blue-tinted shadow.</p>
</ui-card>
```

### Different Variants

```html
<!-- Default variant -->
<ui-card variant="default" shadow elevation="sm">
  <p>Standard card with border and subtle shadow.</p>
</ui-card>

<!-- Elevated variant with gradient -->
<ui-card variant="elevated" shadow elevation="md">
  <p>Premium card with gradient background.</p>
</ui-card>

<!-- Bordered variant -->
<ui-card variant="bordered" shadow elevation="sm">
  <p>Card with strong border emphasis.</p>
</ui-card>

<!-- Ghost variant -->
<ui-card variant="ghost">
  <p>Minimal card with dashed border.</p>
</ui-card>
```

### Square Corners

```html
<ui-card rounded="false" shadow elevation="md">
  <p>Card with sharp, geometric corners.</p>
</ui-card>
```

### Background Color

Use the `bg` attribute to apply a predefined background color class. The component maps
`bg="<name>"` to a `.card.bg-<name>` style.

```html
<ui-card bg="primary" shadow elevation="md">
  <h3>Primary Card</h3>
  <p>Uses the primary background style.</p>
</ui-card>

<ui-card bg="rose" shadow elevation="md">
  <h3>Rose Card</h3>
  <p>Uses the rose background style.</p>
</ui-card>

<ui-card bg="light" shadow elevation="sm">
  <h3>Light Card</h3>
  <p>Soft neutral background.</p>
</ui-card>
```

Available `bg` values include: `transparent`, `primary`, `secondary`, `success`, `warning`, `danger`,
`dark`, `light`, `slate`, `zinc`, `neutral`, `stone`, `amber`, `orange`, `pink`, `rose`, `fuchsia`,
`violet`, `indigo`, `blue`, `cyan`, `emerald`, `lime`.

You can also override the background manually with CSS if you need a custom color:

```css
ui-card.custom-bg .card {
  background: #0f172a;
  color: #f8fafc;
}
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `shadow` | boolean | `false` | Enables shadow effect |
| `shadow-color` | string | `"0, 0, 0"` | Shadow color in RGB format (e.g., "99, 102, 241") |
| `rounded` | boolean | `true` | Enables rounded corners (16px radius) |
| `variant` | string | `"default"` | Visual style: `default`, `elevated`, `bordered`, `ghost` |
| `elevation` | string | `"sm"` | Shadow depth: `none`, `sm`, `md`, `lg`, `xl` |

## Variants

### Default
Standard card with white background, subtle border, and customizable shadow.

```html
<ui-card variant="default" shadow elevation="sm">
  <p>Clean, classic card design.</p>
</ui-card>
```

### Elevated
Premium card with gradient background and animated glow effect on hover.

```html
<ui-card variant="elevated" shadow elevation="md">
  <p>Sophisticated card for important content.</p>
</ui-card>
```

### Bordered
Card with prominent 2px border for strong visual structure.

```html
<ui-card variant="bordered" shadow elevation="sm">
  <p>Structured card with clear boundaries.</p>
</ui-card>
```

### Ghost
Minimal card with dashed border and transparent background.

```html
<ui-card variant="ghost">
  <p>Subtle, unobtrusive card design.</p>
</ui-card>
```

## Elevation Levels

Control shadow depth with the `elevation` attribute:

- **`none`** - No shadow
- **`sm`** - Subtle shadow (1-3px)
- **`md`** - Medium shadow (4-6px)
- **`lg`** - Large shadow (10-15px)
- **`xl`** - Extra large shadow (20-25px)

```html
<ui-card shadow elevation="sm">Small shadow</ui-card>
<ui-card shadow elevation="md">Medium shadow</ui-card>
<ui-card shadow elevation="lg">Large shadow</ui-card>
<ui-card shadow elevation="xl">Extra large shadow</ui-card>
```

## Custom Shadow Colors

Use RGB values for colored shadows:

```html
<!-- Blue shadow -->
<ui-card shadow shadow-color="99, 102, 241" elevation="lg">
  <p>Blue-tinted shadow</p>
</ui-card>

<!-- Pink shadow -->
<ui-card shadow shadow-color="236, 72, 153" elevation="lg">
  <p>Pink-tinted shadow</p>
</ui-card>

<!-- Green shadow -->
<ui-card shadow shadow-color="16, 185, 129" elevation="lg">
  <p>Green-tinted shadow</p>
</ui-card>

<!-- Orange shadow -->
<ui-card shadow shadow-color="251, 146, 60" elevation="lg">
  <p>Orange-tinted shadow</p>
</ui-card>
```

## Styling

### CSS Custom Properties

The card component uses theme CSS variables and can be customized:

```css
ui-card {
  --card-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Slotted Content

Content inside the card is automatically styled with proper spacing:

```html
<ui-card shadow elevation="md">
  <h1>First child has no top margin</h1>
  <p>Content is properly spaced.</p>
  <p>Last child has no bottom margin</p>
</ui-card>
```

## Responsive Design

Cards automatically adjust padding on smaller screens:

- **Desktop (>768px)**: 24px padding, 16px border-radius
- **Tablet (≤768px)**: 20px padding, 12px border-radius
- **Mobile (≤480px)**: 16px padding, 10px border-radius

## Interactions

### Hover Effects

All card variants include smooth hover transitions:

- **Default**: Border color change + subtle lift
- **Elevated**: Larger lift + animated gradient glow
- **Bordered**: Border emphasis + background tint
- **Ghost**: Border darkening + subtle background

### Focus States

Cards with interactive content include focus-visible outlines for accessibility:

```css
.card:focus-within {
  outline: 2px solid #9ec5ff;
  outline-offset: 2px;
}
```

## Examples

### Content Card

```html
<ui-card variant="elevated" shadow elevation="md">
  <h2>Welcome to Our Platform</h2>
  <p>Discover amazing features and tools designed to help you succeed.</p>
  <button>Get Started</button>
</ui-card>
```

### Stats Card

```html
<ui-card variant="default" shadow elevation="sm">
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <span style="font-size: 12px; color: #6b7280;">Total Users</span>
    <span style="font-size: 32px; font-weight: 700;">12,345</span>
    <span style="font-size: 14px; color: #10b981;">+12% from last month</span>
  </div>
</ui-card>
```

### Image Card

```html
<ui-card variant="bordered" rounded="true">
  <img src="image.jpg" alt="Description" style="width: 100%; border-radius: 8px;">
  <h3 style="margin-top: 16px;">Card Title</h3>
  <p>Image card with bordered variant.</p>
</ui-card>
```

### Minimal Card

```html
<ui-card variant="ghost" rounded="false">
  <blockquote style="font-style: italic; color: #6b7280;">
    "A minimal, unobtrusive design for quotes or subtle content."
  </blockquote>
</ui-card>
```

## Accessibility

- Focus-visible outlines for keyboard navigation
- Semantic HTML structure within slots
- Print-friendly styles (shadows removed, borders added)
- Respects user motion preferences

## Browser Support

Works in all modern browsers that support:
- Web Components (Custom Elements v1)
- Shadow DOM v1
- CSS Custom Properties
- CSS Grid and Flexbox
