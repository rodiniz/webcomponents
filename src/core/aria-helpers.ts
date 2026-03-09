/**
 * ARIA Helpers
 * 
 * Utilities for building ARIA attributes consistently across components.
 * Ensures proper accessibility markup with minimal boilerplate.
 */

import { nothing } from 'lit';

/**
 * Type for ARIA attribute objects
 */
export type AriaAttributes = Record<string, string | number | boolean | typeof nothing>;

/**
 * Builds aria-expanded attribute.
 * Used for collapsible/expandable elements.
 * 
 * @param isExpanded - Whether the element is expanded
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <button ...=${ariaExpanded(this.isOpen)}>
 * ```
 */
export function ariaExpanded(isExpanded: boolean | undefined): AriaAttributes {
  return isExpanded !== undefined
    ? { 'aria-expanded': String(isExpanded) }
    : {};
}

/**
 * Builds aria-checked attribute.
 * Used for checkboxes, radio buttons, and toggle switches.
 * 
 * @param isChecked - Whether the element is checked
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <div role="checkbox" ...=${ariaChecked(this.checked)}>
 * ```
 */
export function ariaChecked(isChecked: boolean | 'mixed' | undefined): AriaAttributes {
  return isChecked !== undefined
    ? { 'aria-checked': String(isChecked) }
    : {};
}

/**
 * Builds aria-selected attribute.
 * Used for selectable elements like tabs, options, etc.
 * 
 * @param isSelected - Whether the element is selected
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <div role="tab" ...=${ariaSelected(this.isActive)}>
 * ```
 */
export function ariaSelected(isSelected: boolean | undefined): AriaAttributes {
  return isSelected !== undefined
    ? { 'aria-selected': String(isSelected) }
    : {};
}

/**
 * Builds aria-disabled attribute.
 * 
 * @param isDisabled - Whether the element is disabled
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <div ...=${ariaDisabled(this.disabled)}>
 * ```
 */
export function ariaDisabled(isDisabled: boolean | undefined): AriaAttributes {
  return isDisabled !== undefined
    ? { 'aria-disabled': String(isDisabled) }
    : {};
}

/**
 * Builds aria-controls attribute.
 * Links an element to the ID(s) it controls.
 * 
 * @param controlsId - ID or array of IDs of controlled elements
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <button ...=${ariaControls('panel-1')}>
 * <button ...=${ariaControls(['panel-1', 'panel-2'])}>
 * ```
 */
export function ariaControls(controlsId: string | string[] | null | undefined): AriaAttributes {
  if (!controlsId) return {};
  
  const value = Array.isArray(controlsId) ? controlsId.join(' ') : controlsId;
  return { 'aria-controls': value };
}

/**
 * Builds aria-labelledby attribute.
 * References the ID(s) of elements that label this element.
 * 
 * @param labelId - ID or array of IDs of labeling elements
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <div ...=${ariaLabelledBy('label-1')}>
 * ```
 */
export function ariaLabelledBy(labelId: string | string[] | null | undefined): AriaAttributes {
  if (!labelId) return {};
  
  const value = Array.isArray(labelId) ? labelId.join(' ') : labelId;
  return { 'aria-labelledby': value };
}

/**
 * Builds aria-describedby attribute.
 * References the ID(s) of elements that describe this element.
 * 
 * @param descriptionId - ID or array of IDs of describing elements
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <input ...=${ariaDescribedBy('help-text')}>
 * ```
 */
export function ariaDescribedBy(descriptionId: string | string[] | null | undefined): AriaAttributes {
  if (!descriptionId) return {};
  
  const value = Array.isArray(descriptionId) ? descriptionId.join(' ') : descriptionId;
  return { 'aria-describedby': value };
}

/**
 * Builds aria-label attribute.
 * Provides an accessible label for the element.
 * 
 * @param label - Label text
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <button ...=${ariaLabel('Close dialog')}>
 * ```
 */
export function ariaLabel(label: string | null | undefined): AriaAttributes {
  return label ? { 'aria-label': label } : {};
}

/**
 * Builds aria-hidden attribute.
 * Hides element from screen readers.
 * 
 * @param isHidden - Whether the element should be hidden
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <div ...=${ariaHidden(true)}>Decorative content</div>
 * ```
 */
export function ariaHidden(isHidden: boolean | undefined): AriaAttributes {
  return isHidden !== undefined
    ? { 'aria-hidden': String(isHidden) }
    : {};
}

/**
 * Builds aria-current attribute.
 * Indicates the current item within a set.
 * 
 * @param current - Type of current item or boolean
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <a ...=${ariaCurrent('page')}>Current page</a>
 * <li ...=${ariaCurrent(true)}>Current item</li>
 * ```
 */
export function ariaCurrent(
  current: boolean | 'page' | 'step' | 'location' | 'date' | 'time' | undefined
): AriaAttributes {
  if (current === undefined) return {};
  
  return { 'aria-current': current === true ? 'true' : String(current) };
}

/**
 * Builds aria-live attribute for dynamic content updates.
 * 
 * @param level - Politeness level
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <div ...=${ariaLive('polite')}>Status message</div>
 * ```
 */
export function ariaLive(level: 'off' | 'polite' | 'assertive'): AriaAttributes {
  return { 'aria-live': level };
}

/**
 * Builds aria-invalid attribute for form validation.
 * 
 * @param isInvalid - Whether the input is invalid
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <input ...=${ariaInvalid(!this.valid)}>
 * ```
 */
export function ariaInvalid(isInvalid: boolean | undefined): AriaAttributes {
  return isInvalid !== undefined
    ? { 'aria-invalid': String(isInvalid) }
    : {};
}

/**
 * Builds aria-required attribute for form fields.
 * 
 * @param isRequired - Whether the field is required
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <input ...=${ariaRequired(this.required)}>
 * ```
 */
export function ariaRequired(isRequired: boolean | undefined): AriaAttributes {
  return isRequired !== undefined
    ? { 'aria-required': String(isRequired) }
    : {};
}

/**
 * Builds aria-haspopup attribute.
 * Indicates the element triggers a popup.
 * 
 * @param popupType - Type of popup or boolean
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <button ...=${ariaHasPopup('menu')}>Menu</button>
 * ```
 */
export function ariaHasPopup(
  popupType: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined
): AriaAttributes {
  if (popupType === undefined) return {};
  
  return { 'aria-haspopup': popupType === true ? 'menu' : String(popupType) };
}

/**
 * Builds multiple ARIA attributes at once.
 * Useful for combining several ARIA attributes.
 * 
 * @param attributes - Object with ARIA attribute builders
 * @returns Combined ARIA attributes object
 * 
 * @example
 * ```ts
 * <button ...${combineAria(
 *   ariaExpanded(this.isOpen),
 *   ariaControls('panel-1'),
 *   ariaLabel('Toggle panel')
 * )}>
 * ```
 */
export function combineAria(...attributes: AriaAttributes[]): AriaAttributes {
  return Object.assign({}, ...attributes);
}

/**
 * Builds role attribute with proper value.
 * 
 * @param role - ARIA role name
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <div ...${ariaRole('dialog')}>
 * ```
 */
export function ariaRole(role: string): AriaAttributes {
  return { role };
}

/**
 * Builds aria-valuemin, aria-valuemax, aria-valuenow attributes.
 * Used for range widgets like sliders and progress bars.
 * 
 * @param value - Current value
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <div role="slider" ...${ariaValueRange(50, 0, 100)}>
 * ```
 */
export function ariaValueRange(
  value: number,
  min: number,
  max: number
): AriaAttributes {
  return {
    'aria-valuenow': String(value),
    'aria-valuemin': String(min),
    'aria-valuemax': String(max)
  };
}

/**
 * Builds aria-valuetext attribute for human-readable value.
 * 
 * @param text - Text representation of the value
 * @returns ARIA attribute object
 * 
 * @example
 * ```ts
 * <div role="slider" ...${ariaValueText('50 percent')}>
 * ```
 */
export function ariaValueText(text: string | null | undefined): AriaAttributes {
  return text ? { 'aria-valuetext': text } : {};
}
