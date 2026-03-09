/**
 * Class Builders
 * 
 * Utilities for building CSS class objects for use with classMap.
 * Centralizes common class patterns used across components.
 */

/**
 * Common size types used across components
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Common position types for dropdowns, tooltips, etc.
 */
export type Position = 'top' | 'bottom' | 'left' | 'right';

/**
 * Common variant types for buttons, badges, etc.
 */
export type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';

/**
 * Builds size-related CSS classes.
 * 
 * @param size - The size value (sm, md, lg)
 * @param prefix - Optional prefix for class names (default: 'size-')
 * @returns Object with size classes for classMap
 * 
 * @example
 * ```ts
 * const classes = classMap({
 *   'button': true,
 *   ...buildSizeClasses(this.size)
 * });
 * // Results in: 'button size-md'
 * ```
 */
export function buildSizeClasses(size: Size, prefix: string = 'size-'): Record<string, boolean> {
  return {
    [`${prefix}sm`]: size === 'sm',
    [`${prefix}md`]: size === 'md',
    [`${prefix}lg`]: size === 'lg'
  };
}

/**
 * Builds state-related CSS classes.
 * Filters out undefined/null values automatically.
 * 
 * @param states - Object with state keys and boolean values
 * @returns Object with state classes for classMap
 * 
 * @example
 * ```ts
 * const classes = classMap({
 *   'input': true,
 *   ...buildStateClasses({
 *     disabled: this.disabled,
 *     active: this.isActive,
 *     invalid: !this.valid
 *   })
 * });
 * ```
 */
export function buildStateClasses(states: {
  disabled?: boolean;
  active?: boolean;
  open?: boolean;
  selected?: boolean;
  checked?: boolean;
  invalid?: boolean;
  valid?: boolean;
  focused?: boolean;
  loading?: boolean;
  readonly?: boolean;
  [key: string]: boolean | undefined;
}): Record<string, boolean> {
  return Object.fromEntries(
    Object.entries(states)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, !!value])
  );
}

/**
 * Builds variant-related CSS classes.
 * 
 * @param variant - The variant value
 * @param prefix - Optional prefix for class names (default: '')
 * @returns Object with variant class for classMap
 * 
 * @example
 * ```ts
 * const classes = classMap({
 *   'btn': true,
 *   ...buildVariantClasses(this.variant)
 * });
 * // Results in: 'btn primary'
 * ```
 */
export function buildVariantClasses(variant: Variant, prefix: string = ''): Record<string, boolean> {
  return {
    [`${prefix}${variant}`]: true
  };
}

/**
 * Builds position-related CSS classes.
 * 
 * @param position - The position value (top, bottom, left, right)
 * @param prefix - Optional prefix for class names (default: 'position-')
 * @returns Object with position class for classMap
 * 
 * @example
 * ```ts
 * const classes = classMap({
 *   'tooltip': true,
 *   ...buildPositionClasses(this.position)
 * });
 * // Results in: 'tooltip position-top'
 * ```
 */
export function buildPositionClasses(position: Position, prefix: string = 'position-'): Record<string, boolean> {
  return {
    [`${prefix}${position}`]: true
  };
}

/**
 * Builds conditional classes based on a prefix and boolean conditions.
 * Useful for BEM-style modifiers or custom class patterns.
 * 
 * @param prefix - Base class prefix
 * @param conditions - Object with modifier names and boolean values
 * @returns Object with prefixed classes for classMap
 * 
 * @example
 * ```ts
 * const classes = classMap({
 *   'card': true,
 *   ...buildConditionalClasses('card--', {
 *     'elevated': this.elevated,
 *     'bordered': this.bordered,
 *     'interactive': this.clickable
 *   })
 * });
 * // Results in: 'card card--elevated card--interactive'
 * ```
 */
export function buildConditionalClasses(
  prefix: string,
  conditions: Record<string, boolean | undefined>
): Record<string, boolean> {
  return Object.fromEntries(
    Object.entries(conditions)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [`${prefix}${key}`, !!value])
  );
}

/**
 * Combines multiple class objects into a single object.
 * Useful when composing classes from multiple helper functions.
 * 
 * @param classObjects - Array of class objects to merge
 * @returns Combined class object for classMap
 * 
 * @example
 * ```ts
 * const classes = classMap(
 *   combineClasses(
 *     { 'button': true },
 *     buildSizeClasses(this.size),
 *     buildStateClasses({ disabled: this.disabled })
 *   )
 * );
 * ```
 */
export function combineClasses(...classObjects: Record<string, boolean>[]): Record<string, boolean> {
  return Object.assign({}, ...classObjects);
}

/**
 * Builds classes for icon positioning within a component.
 * 
 * @param hasIcon - Whether an icon is present
 * @param iconPosition - Position of the icon (left or right)
 * @param hasContent - Whether there's additional content besides the icon
 * @returns Object with icon-related classes
 * 
 * @example
 * ```ts
 * const classes = classMap({
 *   'btn': true,
 *   ...buildIconClasses(!!this.icon, this.iconPosition, this.hasLabel)
 * });
 * // Results in: 'btn has-icon icon-left' or 'btn icon-only'
 * ```
 */
export function buildIconClasses(
  hasIcon: boolean,
  iconPosition: 'left' | 'right' = 'left',
  hasContent: boolean = true
): Record<string, boolean> {
  return {
    'has-icon': hasIcon,
    'icon-only': hasIcon && !hasContent,
    'icon-left': hasIcon && hasContent && iconPosition === 'left',
    'icon-right': hasIcon && hasContent && iconPosition === 'right'
  };
}
