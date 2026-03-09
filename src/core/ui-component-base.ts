/**
 * UI Component Base
 * 
 * Base class for all UI components in the library.
 * Provides common functionality and automatic data-ui attribute management.
 */

import { LitElement } from 'lit';

/**
 * Base class for UI components that extends LitElement.
 * Automatically sets data-ui attribute based on the component's tag name.
 * 
 */
export class UIComponentBase extends LitElement {
  /**
   * Called when the component is added to the DOM.
   * Automatically sets the data-ui attribute based on tag name.
   */
  connectedCallback(): void {
    // Extract component name from tag (e.g., 'ui-button' -> 'button')
    const tagName = this.tagName.toLowerCase();
    const componentName = tagName.startsWith('ui-') 
      ? tagName.substring(3) 
      : tagName;
    
    this.setAttribute('data-ui', componentName);
    super.connectedCallback();
  }

  /**
   * Helper method to emit a custom event from the component.
   * Provides a cleaner API for dispatching events.
   * 
   * @param eventName - Name of the event to dispatch
   * @param detail - Optional event detail payload
   * @param options - Event configuration options
   * @returns true if the event was not cancelled
   * 
   * @example
   * ```ts
   * this.emit('change', { value: this.value });
   * this.emit('close');
   * this.emit('select', { id: '123' }, { cancelable: true });
   * ```
   */
  protected emit<T = any>(
    eventName: string,
    detail?: T,
    options?: { bubbles?: boolean; composed?: boolean; cancelable?: boolean }
  ): boolean {
    const event = new CustomEvent<T>(eventName, {
      detail,
      bubbles: options?.bubbles ?? true,
      composed: options?.composed ?? true,
      cancelable: options?.cancelable ?? false
    });
    
    return this.dispatchEvent(event);
  }
}

/**
 * Alternative base class that includes common theme styles.
 * Use this when you want automatic theme integration.
 * 
 * Note: Requires theme styles to be imported in the component.
 * 

 */
export abstract class UIThemedComponent extends UIComponentBase {
  // Components can extend this and add theme styles
  // The actual theme styles should be added by each component
}
