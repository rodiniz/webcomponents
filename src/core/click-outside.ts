/**
 * Click Outside Detection
 * 
 * Utilities for detecting clicks outside of elements.
 * Commonly used for closing dropdowns, modals, tooltips, etc.
 */

export interface ClickOutsideOptions {
  /** Whether the handler is currently enabled */
  enabled?: boolean | (() => boolean);
  /** Event type to listen for (default: 'click') */
  eventType?: 'click' | 'mousedown' | 'pointerdown';
  /** Whether to use capture phase (default: false) */
  capture?: boolean;
}

/**
 * Creates a click outside detector for an element.
 * Returns attach/detach methods for lifecycle management.
 * 
 * @param element - The element to detect clicks outside of
 * @param callback - Function to call when clicking outside
 * @param options - Configuration options
 * @returns Object with attach() and detach() methods
 * 
 * @example
 * ```ts
 * private clickOutside = useClickOutside(
 *   this,
 *   () => this.isOpen = false,
 *   { enabled: () => this.isOpen }
 * );
 * 
 * connectedCallback() {
 *   super.connectedCallback();
 *   this.clickOutside.attach();
 * }
 * 
 * disconnectedCallback() {
 *   this.clickOutside.detach();
 *   super.disconnectedCallback();
 * }
 * ```
 */
export function useClickOutside(
  element: HTMLElement,
  callback: (event: Event) => void,
  options: ClickOutsideOptions = {}
): { attach: () => void; detach: () => void } {
  const {
    enabled = true,
    eventType = 'click',
    capture = false
  } = options;

  const handler = (event: Event): void => {
    // Check if enabled
    const isEnabled = typeof enabled === 'function' ? enabled() : enabled;
    if (!isEnabled) return;

    // Check if click is outside element
    const path = event.composedPath();
    if (!path.includes(element)) {
      callback(event);
    }
  };

  return {
    attach: () => {
      document.addEventListener(eventType, handler, capture);
    },
    detach: () => {
      document.removeEventListener(eventType, handler, capture);
    }
  };
}

// Note: Class decorator version removed due to TypeScript complexity.
// Use the useClickOutside function directly in your components instead.
// See dropdown.ts for example usage.

/**
 * Checks if an event occurred within an element.
 * Useful for manual click outside checks.
 * 
 * @param event - The event to check
 * @param element - The element to check against
 * @returns true if event is inside element
 * 
 * @example
 * ```ts
 * handleClick(e: MouseEvent) {
 *   if (!isEventInElement(e, this)) {
 *     this.close();
 *   }
 * }
 * ```
 */
export function isEventInElement(event: Event, element: HTMLElement): boolean {
  return event.composedPath().includes(element);
}

/**
 * Creates a click outside handler that respects multiple elements.
 * Useful when you have a trigger and a popup in different parts of the DOM.
 * 
 * @param elements - Array of elements to check against
 * @param callback - Function to call when clicking outside all elements
 * @param options - Configuration options
 * @returns Object with attach() and detach() methods
 * 
 * @example
 * ```ts
 * private clickOutside = useClickOutsideMultiple(
 *   [this, this.popupElement],
 *   () => this.close()
 * );
 * ```
 */
export function useClickOutsideMultiple(
  elements: HTMLElement[],
  callback: (event: Event) => void,
  options: ClickOutsideOptions = {}
): { attach: () => void; detach: () => void } {
  const {
    enabled = true,
    eventType = 'click',
    capture = false
  } = options;

  const handler = (event: Event): void => {
    const isEnabled = typeof enabled === 'function' ? enabled() : enabled;
    if (!isEnabled) return;

    const path = event.composedPath();
    const isInAnyElement = elements.some(el => path.includes(el));
    
    if (!isInAnyElement) {
      callback(event);
    }
  };

  return {
    attach: () => {
      document.addEventListener(eventType, handler, capture);
    },
    detach: () => {
      document.removeEventListener(eventType, handler, capture);
    }
  };
}
