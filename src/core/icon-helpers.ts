/**
 * Icon Helpers
 * 
 * Utilities for rendering Feather icons consistently across components.
 * Centralizes icon rendering logic and reduces bundle size duplication.
 */

import feather from 'feather-icons';
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { nothing } from 'lit';

export type IconName = keyof typeof feather.icons;

export interface FeatherIconOptions {
  /** CSS class(es) to apply to the icon */
  class?: string;
  /** Icon width (default: 24) */
  width?: number | string;
  /** Icon height (default: 24) */
  height?: number | string;
  /** Stroke width (default: 2) */
  'stroke-width'?: number | string;
  /** Additional SVG attributes */
  [key: string]: string | number | undefined;
}

/**
 * Renders a Feather icon as a Lit TemplateResult.
 * Returns `nothing` if the icon doesn't exist.
 * 
 * @param iconName - Name of the Feather icon to render
 * @param options - Optional SVG attributes (class, width, height, etc.)
 * @returns Lit TemplateResult or nothing if icon not found
 * 
 * @example
 * ```ts
 * ${renderIcon('check', { class: 'btn-icon' })}
 * ${renderIcon('x', { width: 16, height: 16 })}
 * ${renderIcon(this.icon)}
 * ```
 */
export function renderIcon(
  iconName: string | undefined | null,
  options?: FeatherIconOptions
): TemplateResult | typeof nothing {
  if (!iconName) return nothing;
  
  const icon = feather.icons[iconName as IconName];
  if (!icon) {
    console.warn(`Icon "${iconName}" not found in Feather icons`);
    return nothing;
  }
  
  const svg = icon.toSvg(options);
  return html`${unsafeHTML(svg)}`;
}

/**
 * Gets the raw SVG string for a Feather icon.
 * Returns empty string if icon doesn't exist.
 * 
 * @param iconName - Name of the Feather icon
 * @param options - Optional SVG attributes
 * @returns SVG string or empty string if not found
 * 
 * @example
 * ```ts
 * const svg = getIconSvg('check');
 * element.innerHTML = svg;
 * ```
 */
export function getIconSvg(
  iconName: string | undefined | null,
  options?: FeatherIconOptions
): string {
  if (!iconName) return '';
  
  const icon = feather.icons[iconName as IconName];
  if (!icon) {
    console.warn(`Icon "${iconName}" not found in Feather icons`);
    return '';
  }
  
  return icon.toSvg(options);
}

/**
 * Checks if an icon name exists in Feather icons.
 * 
 * @param iconName - Name to check
 * @returns true if icon exists
 * 
 * @example
 * ```ts
 * if (hasIcon(this.icon)) {
 *   // render icon
 * }
 * ```
 */
export function hasIcon(iconName: string | undefined | null): boolean {
  return !!iconName && iconName in feather.icons;
}

/**
 * Wraps an icon in a span with optional CSS class.
 * Useful for consistent icon positioning in layouts.
 * 
 * @param iconName - Name of the Feather icon
 * @param className - CSS class for the wrapper span
 * @param iconOptions - Optional SVG attributes for the icon
 * @returns Lit TemplateResult with wrapped icon or nothing
 * 
 * @example
 * ```ts
 * ${wrapIcon('check', 'btn-icon')}
 * ${wrapIcon(this.icon, 'input-icon', { width: 16 })}
 * ```
 */
export function wrapIcon(
  iconName: string | undefined | null,
  className?: string,
  iconOptions?: FeatherIconOptions
): TemplateResult | typeof nothing {
  if (!iconName) return nothing;
  
  const icon = renderIcon(iconName, iconOptions);
  if (icon === nothing) return nothing;
  
  return html`<span class=${className || 'icon'}>${icon}</span>`;
}

/**
 * Gets all available Feather icon names.
 * Useful for documentation or type generation.
 * 
 * @returns Array of all icon names
 */
export function getAvailableIcons(): string[] {
  return Object.keys(feather.icons);
}
